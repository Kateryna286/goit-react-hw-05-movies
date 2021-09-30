import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import * as moviesAPI from '../../servises/movies-api';
import styles from './Cast.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setStatus('pending');
    moviesAPI
      .fetchMoviesCasting(movieId)
      .then(response => {
        setCast(response.cast);
        setStatus('resolved');
      })
      .catch(error => {
        setError('Something went wrong');
        setStatus('rejected');
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'rejected' && <div>UPS! {error}</div>}
      {status === 'resolved' && (
        <ul className={styles.list}>
          {cast.length > 0 ? (
            cast.map(actor => (
              <li key={actor.id} className={styles.listItem}>
                {actor.profile_path ? (
                  <img
                    src={`${BASE_IMG_URL}${actor.profile_path}`}
                    alt={actor.name}
                    height="200px"
                  />
                ) : (
                  <img
                    src="http://dummyimage.com/133x200/99cccc.jpg&text=No+photo"
                    alt={actor.name}
                    height="200px"
                  />
                )}
                <div className={styles.description}>
                  <h3>{actor.name}</h3>
                  <div>
                    <span className={styles.text}>Character:</span>{' '}
                    {actor.character}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div>We don't have any actor for this movie</div>
          )}
        </ul>
      )}
    </>
  );
}
