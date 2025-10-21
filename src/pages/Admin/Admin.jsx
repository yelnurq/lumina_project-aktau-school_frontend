import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import styles from './Admin.module.css';
import AdminHeader from '../../components/AdminHeader';
import { FaRegNewspaper,FaEye } from 'react-icons/fa';



const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Пагинация
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 30;

  // Сортировка
  const [sortBy, setSortBy] = useState('views'); // 'views' | 'date'
  const [sortDir, setSortDir] = useState('desc'); // 'asc' | 'desc'

  useEffect(() => {
    fetchNews();
  }, [sortBy, sortDir, page]);

  const fetchNews = () => {
    setLoading(true);
    axiosInstance
      .get(`/api/admin/news/views`, {
        params: {
          sort_by: sortBy,
          sort_dir: sortDir,
          page,
          per_page: perPage
        }
      })
      .then((res) => {
        setNews(res.data.news);
        setTotalViews(res.data.total_views);
        setTotalCount(res.data.total_count);
        setLastPage(res.data.last_page);
      })
      .catch(() => setError('Ошибка загрузки новостей'))
      .finally(() => setLoading(false));
  };

  const handleDelete = (slug) => {
    if (!window.confirm('Удалить новость?')) return;

    axiosInstance
      .delete(`/api/admin/news/${slug}`)
      .then(() => {
        setNews((prev) => prev.filter((n) => n.slug !== slug));
        setTotalCount((prev) => prev - 1);
        const deleted = news.find((n) => n.slug === slug);
        if (deleted) setTotalViews((prev) => prev - deleted.views);
      })
      .catch(() => alert('Ошибка при удалении'));
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
    setPage(1);
  };

  const sortArrow = (field) => {
    if (sortBy !== field) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
      <div className={styles.adminNews}>
        <div className={styles.summary}>
          <div className={styles.summaryBlock}>
            <p className={styles.summaryTitle}>
            {loading ? (
              <>  
              
              <FaRegNewspaper className={styles.icon} /> #

              </>
            )
          
          : (
            <>  
              <FaRegNewspaper className={styles.icon} /> {totalCount}
              </>
          )}
            </p>

            <p className={styles.summaryDesc}>Всего новостей</p>
          </div>
          <div className={styles.summaryBlock}>
            <p className={styles.summaryTitle}>
                          {loading ? (
              <>  
              
              <FaEye className={styles.icon} /> #

              </>
            )
          
          : (
            <>  
              <FaEye className={styles.icon} /> {totalViews}
              </>
          )}
            </p>
            <p className={styles.summaryDesc}>Общие просмотры</p>
          </div>
        </div>


          {loading ? (
            <>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
            </>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <ul className={styles.newsList}>
                <li className={`${styles.newsItem} ${styles.headerRow}`}>
                  <div><strong>Заголовок</strong></div>
                  <div
                    className={styles.sortable}
                    onClick={() => toggleSort('views')}
                    style={{ cursor: 'pointer' }}
                  >
                    Просмотры{sortArrow('views')}
                  </div>
                  <div
                    className={styles.sortable}
                    onClick={() => toggleSort('date')}
                    style={{ cursor: 'pointer' }}
                  >
                    Дата{sortArrow('date')}
                  </div>
                  <div>Действие</div>
                </li>

                {news.map((n) => (
                  <li key={n.id} className={styles.newsItem}>
                    <div>{n.title}</div>
                    <div>{n.views} 👁️</div>
                    <div className={styles.date}>
                      {new Date(n.created_at).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleDelete(n.slug)}
                      className={styles.deleteBtn}
                    >
                      ❌ Удалить
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.pagination}>
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  ⬅ Назад
                </button>
                <span>Страница {page} из {lastPage}</span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
                  disabled={page === lastPage}
                >
                  Вперёд ➡
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminNews;
