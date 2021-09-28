import { useState, useEffect } from 'react';
import * as moviesAPI from '../servises/movies-api';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMoviesCasting(movieId)
      .then(response => setCast(response.cast));
  }, [movieId]);

  return (
    <ul>
      {cast &&
        cast.map(actor => (
          <li key={actor.id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width="80px"
              />
            )}
            {actor.name}
            <div>Character: {actor.character}</div>
          </li>
        ))}
    </ul>
  );
}
