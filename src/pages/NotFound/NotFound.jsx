import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import SeoHelmet from '../../components/SeoHelmet';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <SeoHelmet
        title="Страница не найдена | Lumina"
        description="Страница, которую вы ищете, не найдена. Вернитесь на главную страницу Lumina или попробуйте другой раздел."
        keywords="404, не найдено, Lumina, страницы нет"
      />

      <div className={styles.content}>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>К сожалению, такой страницы не существует или она была удалена.</p>
        <Link to="/" className={styles.homeLink}>Вернуться на главную</Link>
      </div>
    </div>
  );
}
