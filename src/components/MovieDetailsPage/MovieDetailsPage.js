import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesAPI from '../servises/movies-api';
import Loader from 'react-loader-spinner';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

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
        setStatus('response');
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
      <button type="button" onClick={onGoBack}>
        Go back
      </button>

      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'reject' && <div>UPS! {error.message}</div>}

      {status === 'response' && (
        <div>
          {movie && (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                height="300px"
              />
              <div>
                <h2>
                  {movie.original_title} ({movie.release_date.slice(0, 4)})
                </h2>

                <div>User score: {movie.vote_average}</div>
                <div>Overview: {movie.overview}</div>
                <ul>
                  {movie.genres.map(genre => (
                    <li key={genre.name}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <hr />
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: history?.location?.state?.from },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: history?.location?.state?.from },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}

      <hr />

      <Route path="/movies/:movieId/cast">{<Cast movieId={movieId} />}</Route>
      <Route path="/movies/:movieId/reviews">
        {<Reviews movieId={movieId} />}
      </Route>
    </>
  );
}
