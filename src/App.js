import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar/AppBar';
//import HomePage from './components/HomePage/HomePage';
//import MoviesPage from './components/MoviesPage/MoviesPage';
//import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';

const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  ),
);
const HomePage = lazy(() =>
  import(
    './components/HomePage/HomePage.js' /* webpackChunkName: "home-page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-detail-page" */
  ),
);

function App() {
  return (
    <div className="App">
      <AppBar />
      <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
