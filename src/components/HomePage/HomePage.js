import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import * as moviesAPI from '../servises/movies-api';

export default function HomePage() {
  const [bestMovies, setBestMovies] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchTrendingMovies()
      .then(response => setBestMovies(response.results));
  }, []);

  return (
    <div>
      <h2>Tranding today</h2>
      {bestMovies && (
        <ul>
          {bestMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
