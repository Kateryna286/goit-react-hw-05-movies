import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as moviesAPI from '../servises/movies-api';

export default function HomePage() {
  const [bestMovies, setBestMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    setStatus('pending');
    moviesAPI
      .fetchTrendingMovies()
      .then(response => {
        setBestMovies(response.results);
        setStatus('response');
      })
      .catch(error => {
        setError(error);
        setStatus('reject');
      });
  }, []);

  return (
    <>
      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'reject' && <div>UPS! {error.message}</div>}
      {status === 'response' && (
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
      )}
    </>
  );
}
