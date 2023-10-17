// App.js
import React, { useState } from "react";
import MovieList from "./MovieList";
import FavoriteList from "./FavoriteList";

import "./App.css";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (movie) => {
    if (!favorites.some((favorite) => favorite.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== movie.id
    );
    setFavorites(updatedFavorites);
  };

  return (
    <div className="app-container">
      <MovieList onFavorite={addToFavorites} favorites={favorites} />
      <FavoriteList
        favorites={favorites}
        onRemoveFavorite={removeFromFavorites}
      />
    </div>
  );
};

export default App;
