import React from 'react';
import { Container } from 'reactstrap';
import NavBar from '../Components/NavBar';
import { SnackbarProvider } from 'notistack';

export default props => (
  <div>
    <NavBar />
    <Container>
      <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>
    </Container>
  </div>
);
