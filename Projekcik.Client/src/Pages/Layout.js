import React from 'react';
import { Container } from 'reactstrap';
import NavBar from '../Components/NavBar';

export default props => (
  <div>
    <NavBar />
    <Container>{props.children}</Container>
  </div>
);
