import React, { Component } from 'react';
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
import './index.scss';

export default class NotePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    NoteService.getNote(this.props.id).then(r =>
      this.setState({ ...r, loaded: true })
    );
  }
  render() {
    return (
      <div>
        {this.state.loaded ? (
          <div className="note-panel">
            <div className="document-viewer dashboard-wrapper">
              <ol
                className="breadcrumb clearfiks"
                itemtype="http://schema.org/BreadcrumbList">
                <li
                  itemtype="http://schema.org/ListItem"
                  itemprop="itemListElement">
                  <a href="#">
                    <span itemprop="name">Semestr</span>
                    <meta content="1" />
                  </a>
                </li>
                <li
                  itemtype="http://schema.org/ListItem"
                  itemprop="itemListElement">
                  <a href="#">
                    <span itemprop="name">Semestr</span>
                    <meta content="2" />
                  </a>
                </li>
                <li
                  itemtype="http://schema.org/ListItem"
                  itemprop="itemListElement">
                  <a href="#">
                    <span itemprop="name">Semestr</span>
                    <meta content="2" />
                  </a>
                </li>
                <li
                  itemtype="http://schema.org/ListItem"
                  itemprop="itemListElement">
                  <a href="#">
                    <span itemprop="name">Semestr</span>
                    <meta content="4" />
                  </a>
                </li>
              </ol>

              <Card className="file_panel">
                <CardContent className="mx-auto">
                  <div className="column-doc">
                    <div ClassName="document-heading">
                      <Card className="main mb-3 mx-auto">
                        <br />
                        <Typography
                          component="h1"
                          className="title mx-auto"
                          variant="h4"
                          align="center"
                          color="textPrimary"
                          gutterBottom>
                          {/* Nazwa notatki: */}
                          {this.state.name}
                        </Typography>
                        <Typography
                          className="subtitle mx-auto"
                          align="center"
                          color="textSecondary"
                          paragraph>
                          {/* Krótki opis:  */}
                          {this.state.description}
                        </Typography>
                      </Card>

                      <div className="card-heading ">
                        <center>
                          <span className="docprev-gray">Podgląd</span>
                          {/* <span className="docprev-number"> z stron</span> */}
                        </center>
                      </div>
                    </div>
                    <div className="card-row pos-relative">
                      <center>
                        <input
                          id="iframe_src_doc"
                          type="hidden"
                          value="/documentPreview/..."
                        />

                        <div className="iframe-doc">
                          <iframe
                            className="scribd_iframe_embed"
                            id="document-preview"
                            title="Internet Memes"
                            // src="https://www.scribd.com/embeds/408421703/content?start_page=1&view_mode=scroll&show_recommendations=false&access_key=key-kvlLNujEEtjuNGj2xdf6"
                            data-auto-height="true"
                            data-aspect-ratio="null"
                            scrolling="no"
                            width="100%"
                            min-height="500px"
                            frameborder="0"
                          />
                        </div>
                      </center>
                    </div>
                  </div>
                  <HrLabel />
                </CardContent>
              </Card>
              <div className="column-info">
                <Card className="panel_1">
                  <CardContent className="mx-auto">
                    <div className="price-card">
                      <div className="document-info-type">
                        <Typography
                          component="h1"
                          className="title"
                          align="center"
                          color="textSecondary"
                          gutterBottom>
                          Cena
                        </Typography>
                      </div>

                      <Button
                        type="submit"
                        className="button submit p-3 mb-2 bg-success text-white"
                        //variant="contained"
                        onClick={this.handle}>
                        {this.state.price} zł
                        {/* <i className="fa fa-shopping-cart" /> */}
                        <br /> <br /> Dodaj do koszyka
                      </Button>
                      <HrLabel />
                    </div>
                    <div>
                      <div className="card-heading">
                        <span className="sellerinfo">
                          Autor: {this.state.author.name}
                        </span>

                        <HrLabel />
                      </div>
                      <div className="card-row">
                        <div className="rep-sell-block">
                          <Grid container justify="center" alignItems="center">
                            <Avatar
                              alt="avatar"
                              src="https://img.icons8.com/metro/52/000000/gender-neutral-user.png"
                              className="rep-sell-avatar"
                            />
                          </Grid>
                        </div>
                        <div className="rep-seller-text">
                          <br />
                          <a className="seller-name" href="#" target="_blank">
                            {this.props.title}
                            <i className="fa fa-external-link" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-heading">
                      <span className="sellerinfo">Informacje</span>
                      <HrLabel />
                    </div>

                    <div className="docinfo-full card-row">
                      {/* <div className="document-row font-15 border-bottom-gray doc-info-head left" /> */}
                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Semestr"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>
                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Nazwa kierunku"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>
                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Nazwa uczelni"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>

                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Nazwa województwa"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>
                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Liczba stron"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>
                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Data dodania"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>
                      <List className="document-row">
                        <ListItemText
                          className="document-what"
                          primary="Typ pliku"
                        />
                        <ListItemText class="document-info" secondary="test" />
                      </List>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    );
  }
}
