import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Button, Grid } from '@material-ui/core';
import './index.scss';
import NoPreviewImage from '../../images/alt128.png';

const ShoppingCartItem = props => (
  <Card className="cart-note-item p-2 m-2">
    <Grid container spacing={16}>
      <Grid item md={2} sm={3} xs={4} className="note-image">
        {props.note.previewUrl ? (
          <img
            className="img-fluid p-2 m-2"
            src={props.note.previewUrl}
            alt="notePreview"
          />
        ) : (
          <img
            className="img-fluid p-2 m-2"
            src={NoPreviewImage}
            alt="notePreview"
          />
        )}
      </Grid>

      <Grid item md={10} sm={9} xs={8} container className="note-main">
        <Grid item sm={12} className="note-title">
          <Link to={`/note/${props.note.id}`}>
            <Typography variant="h6" className="name">
              <span>
                <span>{props.note.name}</span>
              </span>
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={8} md={9} className="note-origins">
          <Link to={`/user/${props.note.author.id}`}>
            <Typography>
              <i className="fa fa-user" /> {props.note.author.name}
            </Typography>
          </Link>
          <Link to={`/search?voivodeshipId=${props.note.voivodeship.id}`}>
            <Typography>
              <i className="fa fa-globe" /> {props.note.voivodeship.name}
            </Typography>
          </Link>
          <Link to={`/search?universityId=${props.note.university.id}`}>
            <Typography>
              <i className="fa fa-university" /> {props.note.university.name}
            </Typography>
          </Link>
          <Link to={`/search?courseId=${props.note.course.id}`}>
            <Typography>
              <i className="fa fa-book" /> {props.note.course.name}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className="actions pb-3">
          <Typography variant="h6" className="m-auto">
            {props.note.price} zł
          </Typography>
          <Button
            type="button"
            onClick={() => props.onRemove(props.note.id)}
            className="remove-item btn btn-danger btn-circle btn-lg m-auto">
            <i className="fa fa-times m-0" />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default ShoppingCartItem;
