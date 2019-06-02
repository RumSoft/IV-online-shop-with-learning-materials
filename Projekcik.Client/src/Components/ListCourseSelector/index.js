import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from 'reactstrap';
import UniService from '../../Services/UniService';
import classnames from 'classnames';
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  CircularProgress
} from '@material-ui/core';
import './index.scss';

export default class ListCourseSelector extends Component {
  state = {
    voivodeships: [],
    universities: [],
    courses: [],

    voivodeship: '',
    university: '',
    course: '',
    courseId: null,

    open: false,
    loading: false,
    activeTab: 1,
    disabledTabs: 2,
    filterText: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleDialogOpen = () => {
    this.setState(
      {
        open: true,
        loading: true,
        voivodeship: '',
        university: '',
        course: ''
      },
      () =>
        UniService.getVoivodeships()
          .then(data => this.setState({ voivodeships: data, loading: false }))
          .then(() => this.notifyParent())
    );
  };

  handleDialogClose = () => {
    let stateUpdate = {
      open: false,
      loading: false,
      disabledTabs: 2,
      activeTab: 1
    };
    if (this.state.courseId == null) {
      stateUpdate = {
        ...stateUpdate,
        voivodeship: '',
        university: '',
        course: ''
      };
    }
    this.setState(stateUpdate, () => this.notifyParent());
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        filterText: ''
      });
    }
  }

  handleTabChange(currentTab, itemId, itemName) {
    if (currentTab === 1) {
      this.setState(
        {
          disabledTabs: 1,
          voivodeship: itemName,
          university: '',
          course: '',
          filterText: '',
          activeTab: 2
        },
        () => {
          UniService.getUniversities(itemId).then(data =>
            this.setState({ universities: data }, () => this.notifyParent())
          );
        }
      );
    } else if (currentTab === 2) {
      this.setState(
        {
          disabledTabs: 0,
          university: itemName,
          course: '',
          filterText: '',
          activeTab: 3
        },
        () => {
          UniService.getCourses(itemId).then(data =>
            this.setState({ courses: data }, () => this.notifyParent())
          );
        }
      );
    } else if (currentTab === 3) {
      this.setState({ courseId: itemId, course: itemName }, () => {
        this.notifyParent();
        // this.handleDialogClose(); // maybe auto close?
      });
    }
  }

  filterList = list => {
    return (list = list.filter(
      item =>
        item.name.toLocaleLowerCase().indexOf(this.state.filterText.toLocaleLowerCase()) >=
        0
    )).map(item => {
      return (
        <ListGroupItem
          className="mb-1 md text-center list-item"
          key={item.id}
          tag="button"
          action
          onClick={() =>
            this.handleTabChange(this.state.activeTab, item.id, item.name)
          }>
          {item.imageUrl && (
            <div className="uniImage">
              <img src={item.imageUrl} alt="" />
            </div>
          )}
          {item.name}
        </ListGroupItem>
      );
    });
  };

  notifyParent() {
    this.props.searchData({
      voivodeship: this.state.voivodeship ? this.state.voivodeship : '',
      university: this.state.university ? this.state.university : '',
      course: this.state.course ? this.state.course : '',
      courseId: this.state.course ? this.state.courseId : null
    });
  }

  render() {
    const { voivodeships, universities, courses, disabledTabs } = this.state;
    const voiData = this.filterList(voivodeships);
    const uniData = this.filterList(universities);
    const courseData = this.filterList(courses);

    return (
      <div>
        <Button
          className="button"
          variant="outlined"
          color="primary"
          onClick={this.handleDialogOpen}>
          Wybierz uczelnię i kierunek
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Wybór uczelni i kierunku
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="mb-2">
              Wybierz województwo, wyszukaj swoją uczelnię, a następnie wybierz
              kierunek odpowiadający Twojej notatce...
            </DialogContentText>

            <Nav tabs>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 1
                  })}
                  onClick={() => {
                    this.toggle(1);
                  }}>
                  Województwo
                </NavLink>
              </NavItem>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 2
                  })}
                  disabled={disabledTabs > 1}
                  onClick={() => {
                    this.toggle(2);
                  }}>
                  Uczelnia
                </NavLink>
              </NavItem>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 3
                  })}
                  disabled={disabledTabs > 0}
                  onClick={() => {
                    this.toggle(3);
                  }}>
                  Kierunek
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TextField
                id="filterText"
                className="field mb-3 mt-3"
                label="Wyszukaj..."
                fullWidth
                value={this.state.filterText}
                onChange={this.handleChange}
              />
              <TabPane tabId={1} className="mb-2">
                {this.state.loading && (
                  <div className="text-center mb-3">
                    <CircularProgress />
                  </div>
                )}

                <ListGroup>{voiData}</ListGroup>
              </TabPane>

              <TabPane tabId={2}>
                {this.state.loading && (
                  <div className="text-center mb-3">
                    <CircularProgress />
                  </div>
                )}
                <ListGroup>{uniData}</ListGroup>
              </TabPane>

              <TabPane tabId={3}>
                {this.state.loading && (
                  <div className="text-center mb-3">
                    <CircularProgress />
                  </div>
                )}
                <ListGroup>{courseData}</ListGroup>
              </TabPane>
            </TabContent>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => this.handleDialogClose('send')}
              disabled={this.state.course === ''}
              color="primary"
              variant="contained">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
