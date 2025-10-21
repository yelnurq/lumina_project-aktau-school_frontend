import styles from './ArticleCard.module.css';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.slug}`} className={styles.card}>
      <img src={article.thumbnail || '/images/default.jpg'} alt={article.title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <span className={styles.date}>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
