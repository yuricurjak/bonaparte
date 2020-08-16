import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function InsertMovie() {
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    try {
      const { data } = await api.post(
        '/movies',
        {
          primaryTitle: title,
          titleType: type
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
        console.log(data);
      setMessage('Filme cadastrado com sucesso');

      setTimeout(() => {
        setMessage('');
      }, 2000);
      
    } catch (err) {
      console.log(err.message);
      setMessage('Falha ao tentar cadastrar');
    }
  }

  return (
    <Container fluid style={{backgroundColor: '#fff', padding: '15px 0' }}>
      <Row className="justify-content-center m-0">
        <Col xs md={8}>
          <h3 className="display-4">
            Cadastrar um filme
          </h3>
          <Form>
            <Form.Group controlId="formBasicPrimaryTitle">
              <Form.Label>Title Type</Form.Label>
              <Form.Control type="text" placeholder="Insira o tipo do título" required onChange={(event) => setTitle(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicTitleType">
              <Form.Label>Primary Title</Form.Label>
              <Form.Control type="text" placeholder="Insira o título principal" required onChange={(event) => setType(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicTitleType">
              <Form.Label>Original Title</Form.Label>
              <Form.Control type="text" placeholder="Insira o título original" required onChange={(event) => setType(event.target.value)}/>
            </Form.Group>

            <div className="d-flex align-items-center">
              <Button variant="dark" type="button" onClick={handleSubmit}>
                Cadastrar
              </Button>
              {message && (
              <h4 style={{padding: 0, fontSize: '1em', margin: '0 10px'}}>{message}</h4>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}