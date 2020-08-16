import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Modal from '../Modal';

export default function CardMovie(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal handleClose={handleClose} handleShow={handleShow} show={show} movie={props.movie}/>
      <Card className="w-auto my-2">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">{props.movie.primaryTitle}</Card.Title>
          <Card.Link onClick={handleShow}>Detalhes</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}