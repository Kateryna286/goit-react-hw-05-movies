import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../servises/movies-api';

export default function HomePage() {
  const [bestMovies, setBestMovies] = useState(null);
  const location = useLocation();
  console.log('Location homePage:', location);

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
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
