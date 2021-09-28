import { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import * as moviesAPI from '../servises/movies-api';
import Searchbar from '../Searchbar/Searchbar';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const formSubmitHandler = data => {
    setQuery(data);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    moviesAPI
      .fetchMoviesByQuery(query)
      .then(response => setMovies(response.results));
  }, [query]);

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      )}

      <Route path="/movies?query=:querry">
        {movies && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
              </li>
            ))}
          </ul>
        )}
      </Route>
    </>
  );
}
