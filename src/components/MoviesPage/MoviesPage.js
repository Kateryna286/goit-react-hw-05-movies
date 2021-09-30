import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as moviesAPI from '../servises/movies-api';
import Searchbar from '../Searchbar/Searchbar';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  console.log('Location moviePage:', location);

  const [movies, setMovies] = useState(null);

  const query = new URLSearchParams(location.search).get('query');

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

    moviesAPI
      .fetchMoviesByQuery(query)
      .then(response => setMovies(response.results));
  }, [location.search, query]);

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />

      {movies && (
        <ul>
          {movies.map(movie => (
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
    </>
  );
}
