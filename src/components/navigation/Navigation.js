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
    </nav>
  );
};

export default Navigation;
