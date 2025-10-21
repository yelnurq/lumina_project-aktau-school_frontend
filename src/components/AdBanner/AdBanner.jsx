import { Link } from 'react-router-dom';
import styles from './AdBanner.module.css';

export default function AdBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.textBlock}>
        <h2 className={styles.title}>
          Нужен сайт под ключ? — Мы создаём продающие сайты, которые работают на вас
        </h2>
        <p className={styles.description}>
          Бизнесу, блогеру, агентству или онлайн-школе — подберём дизайн, структуру и функционал. Сделаем быстро и с фокусом на результат.
        </p>
        <Link
          to={'/order'}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Оставить заявку
        </Link>
      </div>

      <img
        src="/images/luminadev.png"
        alt="Создание сайтов"
        className={styles.image}
      />
    </div>
  );
}
