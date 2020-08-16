"use strict";class MoviesController {
  constructor(Movie) {
    this.Movie = Movie;
  }

  async index (request, response) {
    const { name: primaryTitle } = request.query;
    try {
      if (primaryTitle) {
        const users = await this.Movie.find({primaryTitle}).sort({'date': -1})
        .limit(3);
        return response.status(200).json(users);  
      }
      const users = await this.Movie.find({}).sort({'date': -1})
      .limit(3);
      return response.status(200).json(users);

    } catch (err) {
      console.log(err.message);
      response.status(400).json({
        description: 'Failed to list movies',
        error: true
      });
    }
  }

  async store (request, response) {
    const data = request.body;
    try {
      const movie = new this.Movie(data);
      await movie.save();
      return response.status(201).json(movie);

    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        description: 'Failed to create movie',
        error: true
      });
    }
  }

  async show (request, response) {
    const { params: { id } } = request;
    try {
      const user = await this.Movie.findById(id, '-__v');
      return response.status(200).json(user);

    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        description: 'Failed to list movie',
        error: true
      });
    }
  }

  async update (request, response) {
    const { params: { id } } = request;
    const data = request.body;
    try {
      const result = await this.Movie.updateOne({ _id: id }, data);
      return response.status(204).send();

    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        description: 'Failed to update movie',
        error: true
      });
    }
  }

  async destroy (request, response) {
    const { params: { id } } = request;
    try {
      await this.Movie.deleteOne({ _id: id });
      return response.sendStatus(204);

    } catch (err) {
      console.log(err.message);
      return response.status(400).json({
        description: 'Failed to delete movie',
        error: true
      });
    }
  }
}

module.exports = MoviesController
