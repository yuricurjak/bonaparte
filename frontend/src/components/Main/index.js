import React from 'react';
import SearchMovie from '../SearchMovie'
import InsertMovie from '../InsertMovie'
import { Title } from './styles';
import { Container, Row, Col } from 'react-bootstrap';

export default function Main() {

  return (
  <>
    <Container fluid>
      <Row>
        <Col style={{backgroundColor: '#222', padding: '15px 0'}}>
          <Title>Bonaparte Filmes</Title>
        </Col>
      </Row>
    </Container>
    <SearchMovie/>
    <InsertMovie/>
  </>
  );
}
