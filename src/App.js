import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Loader from 'react-loader-spinner';
import Container from './components/Container/Container';
import './App.css';

const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  ),
);
const HomePage = lazy(() =>
  import('./views/HomePage/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-detail-page" */
  ),
);

function App() {
  return (
    <>
      <Container>
        <AppBar />
        <Suspense
          fallback={
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          }
        >
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
            <Route>
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
