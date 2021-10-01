import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as moviesAPI from '../../servises/movies-api';
import Searchbar from '../../components/Searchbar/Searchbar';
import styles from './Moviespage.module.css';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const formSubmitHandler = query => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    setStatus('pending');
    moviesAPI
      .fetchMoviesByQuery(query)
      .then(response => {
        if (response.total_results === 0) {
          console.log('Ups');
          setStatus('rejected');
          setError(`No movies found for '${query}' `);
          return;
        }
        setMovies(response.results);
        setStatus('resolved');
      })
      .catch(error => {
        setError('Something went wrong');
        setStatus('rejected');
      });
  }, [location.search, query]);

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'rejected' && (
        <div className={styles.error}>UPS! {error}</div>
      )}

      {status === 'resolved' && (
        <ul className={styles.list}>
          {movies.map(movie => (
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
    </>
  );
}
