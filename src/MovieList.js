// MovieList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieList = ({ onFavorite, favorites }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "da3c77382414785c7560cd0819ef8c53";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error("Error fetching movies", error));
  }, []);

  const isMovieFavorited = (movie) => {
    return favorites.some((favorite) => favorite.id === movie.id);
  };

  return (
    <div>
      <h2>New Releases</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button
              onClick={() => onFavorite(movie)}
              disabled={isMovieFavorited(movie)}
            >
              {isMovieFavorited(movie) ? "Favorited" : "Favorite"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
