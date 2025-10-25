import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './NewsList.module.css';
import Header from '../../components/Header';
import {  FaTimesCircle, FaTrophy } from 'react-icons/fa';
import SeoHelmet from '../../components/SeoHelmet';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialFilters = () => ({
    category: searchParams.get('category') || '',
    date: searchParams.get('date') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page') || '1'),
  });

  const [filters, setFilters] = useState(getInitialFilters);
  useEffect(() => {
    setFilters(getInitialFilters());
  }, [searchParams]);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [catRes] = await Promise.all([
          axiosInstance.get('/api/categories'),
        ]);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий и тегов:', error);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/news', {
          params: filters,
        });
        setNews(response.data.data);
        setPagination(response.data.meta);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filters]);

  const updateURL = (updatedFilters) => {
    const params = new URLSearchParams();
    if (updatedFilters.category) params.set('category', updatedFilters.category);
    if (updatedFilters.date) params.set('date', updatedFilters.date);
    if (updatedFilters.sort) params.set('sort', updatedFilters.sort);
    if (updatedFilters.page) params.set('page', updatedFilters.page);
    setSearchParams(params);
  };

  const handleFilterChange = (field, value) => {
    const updated = { ...filters, [field]: value, page: 1 };
    setFilters(updated);
    updateURL(updated);
  };

  const handlePageChange = (page) => {
    const updated = { ...filters, page };
    setFilters(updated);
    updateURL(updated);
  };

  const url = `https://aktau-it-school.lumina.kz/articles${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  return (
    <>
      <SeoHelmet
        title="Блоги | Lumina — статьи, новости и IT-обучение"
        description="Читайте все статьи и новости на Lumina: блоги, обучение, IT-технологии, обзоры и полезные материалы для разработчиков."
        keywords="блоги, статьи, новости IT, обучение программированию, технологии"
        url={url}
        type="website"
        jsonLdType="CollectionPage"
      />
      
    <Header>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <ol>
            <li><Link to="/">Главная</Link></li>
            <li>/</li>
            <li>Новости</li>
          </ol>
        </nav>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="category">Категория:</label>
            <select
              style={{width:200}}
              id="category"
              value={filters.category}
              onChange={e => handleFilterChange('category', e.target.value)}
            >
              <option value="">Все</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>


          <div className={styles.filterGroup}>
            <label htmlFor="sort">Сортировать:</label>
            <select
              id="sort"
              value={filters.sort}
              onChange={e => handleFilterChange('sort', e.target.value)}
            >
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
            </select>
          </div>
        </div>

        <div className={styles.mainContent}>

          <div className={styles.gridBlocks}>

 
          <div className={styles.grid}>
            {!loading ? (
                   [...Array(6)].map((_, i) => (
                  <div key={i} className={`${styles.card} ${styles.skeleton}`}></div>
                ))
            ) : news.length === 0 ? (
              <div className={styles.notfound}><FaTimesCircle className={styles.iconMobile} style={{color:'red'}}/> Ничего не найдено</div>
            ) : (
              news.map(item => (
                <Link
                  to={`/articles/${item.slug}`}
                  key={item.id}
                  className={styles.card}
                >
                  <img
                    src={`https://aktau-it-school.lumina.kz/storage/${item.image}`}
                    alt={item.title}
                    className={styles.image}
                  />
                  <div className={styles.cardContent}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.date}>
                      <p className={styles.readTime}>⏱ {item.reading_time} мин чтения</p>
                      {new Date(item.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </Link>
              ))
            )}
    
          </div>
            {!loading && news.length > 0 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                >
                  ← Назад
                </button>
                <span>
                  Страница {pagination.current_page} из {pagination.last_page}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  Вперёд →
                </button>
              </div>
            )}

            </div>

  
        </div>
      </div>
    </Header>
    </>
  );
}