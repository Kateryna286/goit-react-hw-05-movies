import { useState } from 'react';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Введите ключевое слово');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchform}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleChange}
        />

        <button type="submit" className={styles.button}>
          <span className={styles.label}></span>
        </button>
      </form>
    </header>
  );
}
