import React from "react";
import MovieList from "./MovieList";
import "./App.css";

const App = () => {
  return (
    <div>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="TMDB Logo"
          className="small-logo"
        />
      </a>
      <div className="app-container">
        <MovieList />
      </div>
    </div>
  );
};

export default App;