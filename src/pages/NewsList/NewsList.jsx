import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './NewsList.module.css';
import Header from '../../components/Header';
import { FaTimesCircle } from 'react-icons/fa';
import SeoHelmet from '../../components/SeoHelmet';

// 1. Объект с переводами интерфейса
const translations = {
  ru: {
    breadcrumbs: { home: "Главная", current: "Новости" },
    filters: {
      category: "Категория:",
      sort: "Сортировать:",
      all: "Все",
      newest: "Сначала новые",
      oldest: "Сначала старые"
    },
    status: {
      loading: "Загрузка...",
      notFound: "Ничего не найдено",
      readTime: "мин чтения"
    },
    pagination: {
      prev: "← Назад",
      next: "Вперёд →",
      page: "Страница",
      of: "из"
    },
    seo: {
      title: "Блоги | Lumina — статьи, новости и IT-обучение",
      description: "Читайте все статьи и новости на Lumina: блоги, обучение, IT-технологии.",
      keywords: "блоги, статьи, новости IT, обучение программированию"
    }
  },
  kk: {
    breadcrumbs: { home: "Басты бет", current: "Жаңалықтар" },
    filters: {
      category: "Санат:",
      sort: "Сұрыптау:",
      all: "Барлығы",
      newest: "Алдымен жаңалары",
      oldest: "Алдымен ескілері"
    },
    status: {
      loading: "Жүктеу...",
      notFound: "Ештеңе табылмады",
      readTime: "оқу уақыты"
    },
    pagination: {
      prev: "← Артқа",
      next: "Алға →",
      page: "Бет",
      of: "ішінен"
    },
    seo: {
      title: "Блогтар | Lumina — мақалалар, жаңалықтар және IT-оқыту",
      description: "Lumina-дағы барлық мақалалар мен жаңалықтарды оқыңыз: блогтар, оқыту, IT-технологиялар.",
      keywords: "блогтар, мақалалар, IT жаңалықтары, бағдарламалауды үйрету"
    }
  }
};

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Логика переключения языка
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  useEffect(() => {
    const handleStorageChange = () => {
      const currentLang = localStorage.getItem('app_lang') || 'ru';
      if (currentLang !== lang) setLang(currentLang);
    };
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, [lang]);

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

  // 3. Загрузка категорий с учетом языка
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Передаем заголовок или параметр языка, если ваш API это поддерживает
        const response = await axiosInstance.get('/api/categories', {
          headers: { 'Accept-Language': lang } 
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    fetchCategories();
  }, [lang]);

  // 4. Загрузка новостей с учетом языка
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/news', {
          params: { ...filters, lang: lang }, // Передаем язык в API
          headers: { 'Accept-Language': lang }
        });
        setNews(response.data.data);
        setPagination(response.data.meta);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [filters, lang]);

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

  return (
    <>
      <SeoHelmet
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        type="website"
        jsonLdType="CollectionPage"
      />
      
      <Header>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <ol>
              <li><Link to="/">{t.breadcrumbs.home}</Link></li>
              <li>/</li>
              <li>{t.breadcrumbs.current}</li>
            </ol>
          </nav>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="category">{t.filters.category}</label>
              <select
                style={{ width: 200 }}
                id="category"
                value={filters.category}
                onChange={e => handleFilterChange('category', e.target.value)}
              >
                <option value="">{t.filters.all}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="sort">{t.filters.sort}</label>
              <select
                id="sort"
                value={filters.sort}
                onChange={e => handleFilterChange('sort', e.target.value)}
              >
                <option value="newest">{t.filters.newest}</option>
                <option value="oldest">{t.filters.oldest}</option>
              </select>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.gridBlocks}>
              <div className={styles.grid}>
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className={`${styles.card} ${styles.skeleton}`}></div>
                  ))
                ) : news.length === 0 ? (
                  <div className={styles.notfound}>
                    <FaTimesCircle className={styles.iconMobile} style={{ color: 'red' }} /> 
                    {t.status.notFound}
                  </div>
                ) : (
                  news.map(item => (
                    <Link to={`/articles/${item.slug}`} key={item.id} className={styles.card}>
                      <img
                        src={`https://mangystau.lumina.kz/storage/${item.image}`}
                        alt={item.title}
                        className={styles.image}
                      />
                      <div className={styles.cardContent}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.date}>
                          <p className={styles.readTime}>
                            ⏱ {item.reading_time} {t.status.readTime}
                          </p>
                          {new Date(item.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'kk-KZ')}
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
                    {t.pagination.prev}
                  </button>
                  <span>
                    {t.pagination.page} {pagination.current_page} {t.pagination.of} {pagination.last_page}
                  </span>
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                  >
                    {t.pagination.next}
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