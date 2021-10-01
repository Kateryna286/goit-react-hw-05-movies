import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import * as moviesAPI from '../../servises/movies-api';
import styles from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setStatus('pending');
    moviesAPI
      .fetchMoviesReview(movieId)
      .then(response => {
        setReviews(response.results);
        setStatus('resolved');
      })
      .catch(error => {
        setError('Something went wrong');
        setStatus('rejected');
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && (
        <Loader type="Oval" color="#00BFFF" height={40} width={40} />
      )}
      {status === 'rejected' && (
        <div className={styles.error}>UPS! {error}</div>
      )}
      {status === 'resolved' && (
        <ul>
          {reviews.length > 0 ? (
            reviews.map(
              review =>
                (
                  <li key={review.id} className={styles.listItem}>
                    <span className={styles.titleReviews}>{review.author}</span>
                    <div>{review.content}</div>
                  </li>
                ) ?? <div>Reviews not found</div>,
            )
          ) : (
            <div>We don't have any reviews for this movie</div>
          )}
        </ul>
      )}
    </>
  );
}
