import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/" className="link" activeClassName="active-link">
        Home
      </NavLink>
      <NavLink
        exact
        to="/movies"
        className="link"
        activeClassName="active-link"
      >
        Movies
      </NavLink>
      {/* <NavLink
        exact
        to="/movies/:movieId"
        className="link"
        activeClassName="active-link"
      >
        MovieDetailsPage
      </NavLink> */}
      {/* <NavLink
        to="/movies/:movieId/cast"
        className="link"
        activeClassName="active-link"
      >
        Cast
      </NavLink> */}
      {/* <NavLink
        to="/movies/:movieId/reviews"
        className="link"
        activeClassName="active-link"
      >
        Reviews
      </NavLink> */}
    </nav>
  );
};

export default Navigation;
