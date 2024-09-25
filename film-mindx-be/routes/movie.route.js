import { Router } from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { getMovie, createMovie, updateMovie, deleteMovie } from "../controllers/movie.controllers.js";
const MovieRouter = Router()

MovieRouter.get('/movies', getMovie)
MovieRouter.post('/movies', createMovie)
MovieRouter.patch('/movies/:filmId', upload.single("file"), updateMovie)
MovieRouter.delete('/movies/:filmId', deleteMovie)

export default MovieRouter