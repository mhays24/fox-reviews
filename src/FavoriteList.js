// FavoriteList.js
import React from "react";

const FavoriteList = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <div className="favorite-list">
        {favorites.map((movie) => (
          <div key={movie.id} className="favorite-item">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="item-details">
              <h3>{movie.title}</h3>
            </div>
            <button onClick={() => onRemoveFavorite(movie)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
