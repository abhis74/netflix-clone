import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUtl] = useState("");

  //A snippet of code which runs based on a specific conditions/variables
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //"https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_networks=213"
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // if [] , run once when the row loads, and don't run again
  // for trailer popup we use package called npm i react-youtube and npm i movie-trailer
  const opts = {
    height: "390",
    width: "100%",
    player: {},
    autoPlay: 1,
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUtl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUtl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      {/* {title} */}
      <h2>{title}</h2>

      {/* {container->posters} */}
      <div className="row__posters">
        {/* {row__posters} */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
