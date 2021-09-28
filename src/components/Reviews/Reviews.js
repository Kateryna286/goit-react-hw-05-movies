import { useState, useEffect } from 'react';
import * as moviesAPI from '../servises/movies-api';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMoviesReview(movieId)
      .then(response => setReviews(response.results));
  }, [movieId]);

  return (
    <ul>
      {reviews && reviews.length > 0 ? (
        reviews.map(
          review =>
            (
              <li key={review.id}>
                {review.author}
                <div>{review.content}</div>
              </li>
            ) ?? <div>Reviews not found</div>,
        )
      ) : (
        <div>We don't have any reviews for this movie</div>
      )}
    </ul>
  );
}
