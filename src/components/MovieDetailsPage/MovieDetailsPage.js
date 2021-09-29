import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useHistory,
} from 'react-router-dom';
import * as moviesAPI from '../servises/movies-api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  const history = useHistory();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMoviesFullInfo(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>

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
            <NavLink to={`${url}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </div>
      <hr />

      <Route path="/movies/:movieId/cast">
        {movie && <Cast movieId={movieId} />}
      </Route>
      <Route path="/movies/:movieId/reviews">
        {movie && <Reviews movieId={movieId} />}
      </Route>
    </div>
  );
}
