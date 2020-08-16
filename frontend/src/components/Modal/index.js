import React from 'react';
import { Modal } from 'react-bootstrap';

export default props => {

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.movie.primaryTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>tconst: {props.movie.tconst}</p>
          <p>titleType: {props.movie.titleType}</p>
          <p>primaryTitle: {props.movie.primaryTitle}</p>
          <p>originalTitle: {props.movie.originalTitle}</p>
          <p>isAdult: {props.movie.isAdult}</p>
          <p>startYear: {props.movie.startYear}</p>
          <p>endYear: {props.movie.endYear}</p>
          <p>runtimeMinutes: {props.movie.runtimeMinutes}</p>
          <p>genres: {props.movie.genres}</p>
          <p>averageRating: {props.movie.averageRating}</p>
          <p>numVotes: {props.movie.numVotes}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}