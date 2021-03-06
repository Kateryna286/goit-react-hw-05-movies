import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import * as moviesAPI from '../../servises/movies-api';
import Loader from 'react-loader-spinner';
import styles from './MovieDetalspage.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "cast" */),
);

const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setStatus('pending');
    moviesAPI
      .fetchMoviesFullInfo(movieId)
      .then(response => {
        setMovie(response);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('reject');
      });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <button type="button" onClick={onGoBack} className={styles.button}>
        <BiArrowBack />
        <span className={styles.btnText}>Go back</span>
      </button>

      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'reject' && (
        <div className={styles.error}>UPS! {error.message}</div>
      )}

      {status === 'resolved' && (
        <div>
          <div className={styles.movieFullInfo}>
            {movie.poster_path ? (
              <img
                src={`${BASE_IMG_URL}${movie.poster_path}`}
                alt={movie.original_title}
                height="300px"
              />
            ) : (
              <img
                src="http://dummyimage.com/200x300/99cccc.jpg&text=No+photo"
                alt={movie.original_title}
              />
            )}
            <div>
              <h2 className={styles.header}>
                {movie.original_title} ({movie.release_date.slice(0, 4)})
              </h2>

              <div className={styles.paragraph}>
                <span className={styles.text}>User score:</span>{' '}
                {movie.vote_average}
              </div>
              <div className={styles.paragraph}>
                <span className={styles.text}>Overview:</span> {movie.overview}
              </div>
              {movie.genres.length > 0 ? (
                <ul className={styles.list}>
                  <span className={styles.text}>Genres:</span>
                  {movie.genres.map(genre => (
                    <li key={genre.name}>{genre.name}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  <span className={styles.text}>Genres:</span>No info about
                  genres
                </div>
              )}
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <h3>Additional information:</h3>

            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to={{
                pathname: `${url}/cast`,
                state: { from: history?.location?.state?.from },
              }}
            >
              Cast
            </NavLink>

            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to={{
                pathname: `${url}/reviews`,
                state: { from: history?.location?.state?.from },
              }}
            >
              Reviews
            </NavLink>
          </div>
        </div>
      )}

      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        }
      >
        <Route path="/movies/:movieId/cast">{<Cast movieId={movieId} />}</Route>
        <Route path="/movies/:movieId/reviews">
          {<Reviews movieId={movieId} />}
        </Route>
      </Suspense>
    </>
  );
}
