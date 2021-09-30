import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Loader from 'react-loader-spinner';

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
    </div>
  );
}

export default App;
