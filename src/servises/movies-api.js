const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a5025e9c048c765a07b555d910269819';

async function fetchWithErrorHandling(url = '') {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

// список самых популярных фильмов на сегодня для создания коллекции на главной странице
// https://api.themoviedb.org/3/trending/movie/day?api_key=a5025e9c048c765a07b555d910269819

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
}

// поиск кинофильма по ключевому слову на странице фильмов
// https://api.themoviedb.org/3/search/movie?api_key=a5025e9c048c765a07b555d910269819&query=cat

export function fetchMoviesByQuery(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
}

// запрос полной информации о фильме для страницы кинофильма
// https://api.themoviedb.org/3/movie/10588?api_key=a5025e9c048c765a07b555d910269819

export function fetchMoviesFullInfo(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
}

// запрос информации о актёрском составе для страницы кинофильма
//api.themoviedb.org/3/movie/10588/credits?api_key=a5025e9c048c765a07b555d910269819

export function fetchMoviesCasting(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  );
}

// запрос обзоров для страницы кинофильма
// https://api.themoviedb.org/3/movie/10588/reviews?api_key=a5025e9c048c765a07b555d910269819&page=1

export function fetchMoviesReview(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
}
