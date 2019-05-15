import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItemText,
  Grid
} from '@material-ui/core';
import HrLabel from '../HrLabel/index';
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape
} from 'react-placeholder/lib/placeholders';
import './index.scss';

const margin = '1.5rem 0';

const NotePanelPlaceholder = props => (
  <div className="note-panel">
    <div className="document-viewer dashboard-wrapper">
      <TextRow color="#E0E0E0" style={{ margin: margin }} />
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Card className="note-data">
            <CardContent className="mx-auto">
              <TextBlock rows={3} color="#E0E0E0" />
              <RectShape
                color="#E0E0E0"
                style={{ height: 400, margin: margin }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card className="note-info">
            <RectShape
              color="#E0E0E0"
              style={{ height: 100, margin: margin }}
            />
            <TextBlock color="#E0E0E0" rows={5} />
            <RoundShape
              color="#E0E0E0"
              style={{ height: 50, width: 50, margin: margin }}
            />
            <TextBlock color="#E0E0E0" rows={10} />
          </Card>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default NotePanelPlaceholder;
