import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieList = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const apiKey = "da3c77382414785c7560cd0819ef8c53";
        const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`;

        const response = await axios.get(nowPlayingUrl);
        setNowPlaying(response.data.results);
      } catch (error) {
        console.error("Error fetching now playing movies", error);
      }
    };

    const fetchPopular = async () => {
      try {
        const apiKey = "da3c77382414785c7560cd0819ef8c53";
        const totalPages = 10; // Number of pages to fetch
        const popularMovies = [];

        for (let page = 1; page <= totalPages; page++) {
          const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
          const response = await axios.get(popularUrl);
          popularMovies.push(...response.data.results);
        }

        setPopular(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies", error);
      }
    };

    fetchNowPlaying();
    fetchPopular();
  }, []);

  const handleReview = (movieId, rating) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [movieId]: rating,
    }));
  };

  return (
    <div>
      <div className="section-title">
        <h2>Now Playing</h2>
      </div>
      <div className="movie-list">
        {nowPlaying.map((movie) => (
          <div key={movie.id} className="movie-item">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-link"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="item-details">
                <h3>{movie.title}</h3>
                <p>
                  Release Date: {movie.release_date} Rating: {movie.vote_average} |{" "}
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 150)}...`
                    : movie.overview}
                </p>
                <div className="review-section">
                  <p>Your Rating: {reviews[movie.id] || "Not rated"}</p>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        role="button"
                        onClick={() => handleReview(movie.id, star)}
                        style={{
                          cursor: "pointer",
                          color: reviews[movie.id] >= star ? "gold" : "gray",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="section-title">
        <h2>Popular</h2>
      </div>
      <div className="movie-list">
        {popular.map((movie) => (
          <div key={movie.id} className="movie-item">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-link"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="item-details">
                <h3>{movie.title}</h3>
                <p>
                  Rating: {movie.vote_average} | Release Date: {movie.release_date} |{" "}
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 100)}...`
                    : movie.overview}
                </p>
                <div className="review-section">
                  <p>Your Rating: {reviews[movie.id] || "Not rated"}</p>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        role="button"
                        onClick={() => handleReview(movie.id, star)}
                        style={{
                          cursor: "pointer",
                          color: reviews[movie.id] >= star ? "gold" : "gray",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
