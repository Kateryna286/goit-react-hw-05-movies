import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Cast from '../Cast/Cast';
import HomePage from '../HomePage/HomePage';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import MoviesPage from '../MoviesPage/MoviesPage';
import Reviews from '../Reviews/Reviews';

const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/" className="link" activeClassName="active-link">
        <HomePage />
      </NavLink>
      <NavLink
        exact
        to="/movies"
        className="link"
        activeClassName="active-link"
      >
        <MoviesPage />
      </NavLink>
      <NavLink
        exact
        to="/movies/:movieId"
        className="link"
        activeClassName="active-link"
      >
        <MovieDetailsPage />
      </NavLink>
      <NavLink
        to="/movies/:movieId/cast"
        className="link"
        activeClassName="active-link"
      >
        <Cast />
      </NavLink>
      <NavLink
        to="/movies/:movieId/reviews"
        className="link"
        activeClassName="active-link"
      >
        <Reviews />
      </NavLink>
    </nav>
  );
};

export default Navigation;
