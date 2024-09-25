import dotenv from "dotenv"
dotenv.config()
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

import {
  getMovieDB,
  createMovieDB,
  updateMovieDB,
  countMovieDB,
  deleteMovieDB,
} from "../models/movies.models.js";

const getMovie = async (req, res) => {
  const { key, sort } = req.query;
  try {
    if(key){
        let regex = new RegExp(key,'i')
        const movies = await getMovieDB({ name: regex })
        res.status(200).send({
            data: {
                movies
            }
        })
        return
    }
    if(sort){
        const movies = await getMovieDB({}, {year: +sort})
        res.status(200).send({
            data: {
                movies
            }
        })
        return
    }
    const movies = await getMovieDB();
    const countMovie = await countMovieDB();
    res.status(200).send({
      data: {
        movies,
        countMovie,
      },
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const createMovie = async (req, res) => {
  const { name, time, year, image, introduce } = req.body;
  try {
    if (!name || !time || !year || !image || !introduce)
      throw new Error("Please enter all movie's information");
    const film = await createMovieDB({
      name,
      time,
      year,
      image,
      introduce,
    });
    res.status(200).send({
      message: "Create movie success",
      data: {
        film,
      },
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const updateMovie = async (req, res) => {
  const { filmId } = req.params;
  const body = req.body;
  const file = req.file;
  try {
    if (!filmId) throw new Error("ca'nt find this film");
    let urlImage;
    if (file) {
      const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const fileName = file.originalname.split(".")[0];
      await cloudinary.uploader.upload(
        dataUrl,
        {
          public_id: fileName,
          resource_type: "auto",
        },
        (err, result) => {
          if (err) throw new Error("upload file failed")
          if (result) {
            urlImage =  result.secure_url;
            return urlImage
          }
        }
      );
    }
    const film = await updateMovieDB(
      {
        _id: filmId,
      },
      {
        ...body,
        image: urlImage
      }
    );
    if (!film) throw new Error("ca'nt find this film");
    const newFilm = await getMovieDB({ _id: filmId });
    res.status(200).send({
      message: "updated film success",
      data: {
        newFilm,
      },
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const deleteMovie = async (req, res) => {
  const { filmId } = req.params;
  try {
    if (!filmId) throw new Error("ca'nt find this film");
    const result = await deleteMovieDB({
      _id: filmId,
    });
    if (!result) throw new Error("ca'nt find this film");
    const movies = await getMovieDB();
    const countMovie = await countMovieDB();
    res.status(200).send({
      message: "deleted film success",
      data: {
        movies,
        countMovie,
      },
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
export { getMovie, createMovie, updateMovie, deleteMovie };
