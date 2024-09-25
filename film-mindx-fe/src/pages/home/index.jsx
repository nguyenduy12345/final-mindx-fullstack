import { useState, useEffect } from 'react'
import axios from "axios"
import Popup from '../../components/popup'

import './style.css'
const Home = () => {
  const [movies, setMovies] = useState([])
  const [count, setCount] = useState(0)
  const [dataPopup, setDataPopup] = useState(false)
  useEffect(() => {
    const fetchMovies = async() => {
    const result = await axios.get('http://localhost:8080/api/v1/movies')
      setMovies(result?.data?.data?.movies)
      setCount(result?.data?.data?.countMovie)
    }
    fetchMovies()
  }, [])
  console.log(movies)
  return (
    <>
    {dataPopup ? <Popup dataPopup={dataPopup} setDataPopup={setDataPopup} /> :
    <div className="home">
      <div className="home__header">
        <ul>
          <li><i className="fa-solid fa-bars"></i></li>
          <li><span>MOVIE</span><span>UI</span></li>
          <li><i className="fa-sharp fa-solid fa-magnifying-glass"></i></li>
        </ul>
      </div>
      <div className="home__container">
        <h3>Most Popular Movies</h3>
        {count && count > 4 && <i className="fa-solid fa-arrow-right"></i>}
        <ul>
          {movies.map((movie, index) => (
            <li key={index} onClick={() => setDataPopup(movie)}>
              <img src={movie.image} />
              <p>{movie.name}</p>
              <span>{`${movie.time} min - ${movie.year}`}</span>
          </li>
          ))}
        </ul>
      </div>
    </div>}
    </>
  )
}

export default Home
