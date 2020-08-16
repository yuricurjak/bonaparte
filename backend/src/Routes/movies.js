import express from 'express';
import MoviesController from '../Controllers/MoviesController';
import Movie from '../Models/Movie';
import auth from '../Middlewares/auth';


const router = express.Router();
const moviesController = new MoviesController(Movie);

router.get('/', auth, (req, res) => moviesController.index(req, res));
router.get('/:id', auth, (req, res) => moviesController.show(req, res));
router.post('/', auth, (req, res) => moviesController.store(req, res));
router.put('/:id', auth,  (req, res) => moviesController.update(req, res));
router.delete('/:id', auth, (req, res) => moviesController.destroy(req, res));

export default router;
