import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItemText
} from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import HrLabel from '../HrLabel/index';
import NoteService from '../../Services/NoteService';
import NotePanelPlaceholder from './NotePanelPlaceholder';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import './index.scss';

export default class NotePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    NoteService.getNote(this.props.id).then(r => {
      this.setState({ note: r, loaded: true });
    });
  }
  render() {
    const note = this.state.note;
    return (
      <div>
        <ReactPlaceholder
          ready={this.state.loaded}
          customPlaceholder={<NotePanelPlaceholder />}>
          {this.state.loaded && (
            <div className="note-panel">
              <div className="document-viewer dashboard-wrapper">
                <ol
                  className="breadcrumb clearfiks"
                  itemtype="http://schema.org/BreadcrumbList">
                  <li
                    itemtype="http://schema.org/ListItem"
                    itemprop="itemListElement">
                    <a href="#">
                      <span itemprop="name">{note.voivodeship.name}</span>
                      <meta content="1" />
                    </a>
                  </li>
                  <li
                    itemtype="http://schema.org/ListItem"
                    itemprop="itemListElement">
                    <a href="#">
                      <span itemprop="name">{note.university.name}</span>
                      <meta content="2" />
                    </a>
                  </li>
                  <li
                    itemtype="http://schema.org/ListItem"
                    itemprop="itemListElement">
                    <a href="#">
                      <span itemprop="name">{note.course.name}</span>
                      <meta content="2" />
                    </a>
                  </li>
                </ol>

                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6} md={8} lg={8}>
                    <Card className="note-data">
                      <CardContent className="mx-auto">
                        <Typography
                          component="h1"
                          className="title mx-auto"
                          variant="h4"
                          align="center"
                          color="textPrimary"
                          gutterBottom>
                          {note.name}
                        </Typography>
                        <Typography
                          className="subtitle mx-auto"
                          align="center"
                          color="textSecondary"
                          paragraph>
                          {note.description}
                        </Typography>

                        <HrLabel text="Podgląd notatki" />
                        <div className="preview-image">
                          <img src="http://placekitten.com/g/400/400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card className="note-info">
                      <Button
                        fullWidth
                        type="submit"
                        className="button submit p-3 mb-2 text-white add-to-cart"
                        onClick={this.handle}>
                        <p className="price">
                          <i className="fa fa-shopping-cart" />{' '}
                          <span>{note.price} zł</span>
                        </p>
                        <p className="label">Dodaj do koszyka</p>
                      </Button>
                      <div className="note-author">
                        <HrLabel text="Autor" />
                        <Link to={`/user/${note.author.id}`}>
                          <span className="author-name mx-auto">
                            {note.author.name}
                          </span>
                          <div className="author-image">
                            <img src="http://placekitten.com/g/50/50" />
                          </div>
                        </Link>
                      </div>
                      <div className="docinfo-full card-row">
                        <HrLabel text="Informacje" />
                        <Grid container spacing={16}>
                          <Grid item xs={4} sm={6} md={12}>
                            <ListItemText
                              className="document-what"
                              primary="Semestr"
                              secondary={this.state.semester}
                            />
                          </Grid>
                          <Grid item xs={4} sm={6} md={12}>
                            <ListItemText
                              className="document-what"
                              primary="Województwo"
                              secondary={note.voivodeship.name}
                            />
                          </Grid>
                          <Grid item xs={4} sm={6} md={12}>
                            <ListItemText
                              className="document-what"
                              primary="Uczelnia"
                              secondary={note.university.name}
                            />
                          </Grid>
                          <Grid item xs={4} sm={6} md={12}>
                            <ListItemText
                              className="document-what"
                              primary="Kierunek"
                              secondary={note.course.name}
                            />
                          </Grid>
                          <Grid item xs={4} sm={6} md={12}>
                            <ListItemText
                              className="document-what"
                              primary="Data dodania"
                              secondary={new Date(
                                note.createdAt
                              ).toLocaleDateString()}
                            />
                          </Grid>
                          <Grid item xs={4} sm={6} md={12}>
                            <ListItemText
                              className="document-what"
                              primary="Typ pliku"
                              secondary={note.type}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </ReactPlaceholder>
      </div>
    );
  }
}
