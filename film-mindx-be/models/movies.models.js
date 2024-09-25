import mongoose from "mongoose";
import Collections from "../utils/collections.js";
const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    time: {type: String, required: true},
    year: {type: String, required: true},
    image: {type: String, required: true},
    introduce: {type: String, required: true}
})
movieSchema.index({name: 'text', introduce: 'text'});

const MovieModel = mongoose.model(Collections.MOVIES, movieSchema)

const countMovieDB = () => MovieModel.countDocuments()
const getMovieDB = (data, sort) => MovieModel.find(data).sort(sort).exec()
const createMovieDB = (data) => MovieModel.create(data)
const updateMovieDB = (...args) => MovieModel.findOneAndUpdate(...args)
const deleteMovieDB = (...args) => MovieModel.findOneAndDelete(...args)
export {
    countMovieDB,
    getMovieDB,
    createMovieDB,
    updateMovieDB,
    deleteMovieDB
}