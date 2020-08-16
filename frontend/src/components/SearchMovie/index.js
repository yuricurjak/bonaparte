import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import api from '../../services/api';
import CardMovie from '../CardMovie';


export default function Search() {
  const [movieName, setMovieName] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);

  async function submitMovies() {
    const { data } = await api.get(
      `/movies?name=${movieName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
      }
    );
    setSearchMovies(data.slice(0, 3));
  }

  return (
    <Container fluid style={{backgroundColor: '#F4F4F4', padding: '15px 0' }}>
      <Row className="justify-content-center m-0">
        <Col xs md={8}>
          <InputGroup onChange={(event) => setMovieName(event.target.value)}>
            <FormControl
              placeholder="Encontre milhões de filmes"
              aria-label="Encontre milhões de filmes"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-dark" onClick={submitMovies}>Buscar</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className="w-auto d-flex flex-column" style={{minHeight: '250px'}}>
          {
          searchMovies.length > 0 && searchMovies.map( movie => (
            <CardMovie key={movie._id} movie={movie}/>
          ))
          }
          </div>
        </Col>
      </Row>
    </Container>
  );
}