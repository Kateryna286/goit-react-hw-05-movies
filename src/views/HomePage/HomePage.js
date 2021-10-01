import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as moviesAPI from '../../servises/movies-api';
import styles from './Homepage.module.css';

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
        setStatus('resolved');
      })
      .catch(error => {
        setError('Something went wrong');
        setStatus('rejected');
      });
  }, []);

  return (
    <>
      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'rejected' && (
        <div className={styles.error}>UPS! {error}</div>
      )}
      {status === 'resolved' && (
        <div>
          <h2 className={styles.header}>Tranding today</h2>
          {bestMovies && (
            <ul className={styles.list}>
              {bestMovies.map(movie => (
                <li key={movie.id}>
                  <Link
                    className={styles.item}
                    activeClassName={styles.activeItem}
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
