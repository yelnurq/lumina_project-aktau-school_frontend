import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSearch, FaTelegramPlane,FaWhatsapp, FaFacebook, 
  FaTwitter, FaEnvelopeOpenText, FaCheckCircle, FaTimesCircle, FaTimes,FaBlog, FaLaptopCode, FaRss, FaInfoCircle, 
  FaTrophy, 
  FaDiceThree,
  FaHome,


  FaInstagram, FaYoutube, FaEye
} from 'react-icons/fa';

import styles from './Header.module.css';
import axiosInstance from '../axiosConfig';

export default function Header({ children }) {
  const [activeMenu, setActiveMenu] = useState(null); // "articles" | "services" | null
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
const [results, setResults] = useState([]);
const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
const [loading, setLoading] = useState(false);

const fetchResults = async (page = 1) => {
  if (!searchQuery.trim()) return;
  setLoading(true);
  try {
    const res = await axiosInstance.get(`/api/news/search?q=${encodeURIComponent(searchQuery)}&page=${page}`);
    setResults(res.data.data);
    setMeta(res.data.meta);
  } catch (err) {
    console.error('Ошибка поиска:', err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    fetchResults(1);
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);

const handlePrevPage = () => {
  if (meta.current_page > 1) {
    fetchResults(meta.current_page - 1);
  }
};
const handleNextPage = () => {
  if (meta.current_page < meta.last_page) {
    fetchResults(meta.current_page + 1);
  }
};

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      await axiosInstance.post('/api/email', { email });
      setTimeout(() => {
        setSubmissionResult('success');
        setEmail('');
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setSubmissionResult('error');
      }, 800);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionResult(null);
      }, 2500);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/news/search?q=${encodeURIComponent(searchQuery)}`);
        setResults(res.data.data);
      } catch (err) {
        console.error('Ошибка поиска:', err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) {
      setCategories(JSON.parse(stored));
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        setCategories(response.data);
        localStorage.setItem('categories', JSON.stringify(response.data));
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>


      <header className={styles.header}>
        <div className={styles.container}>
      <Link className={styles.logoLink} to={'/'}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.logo}>
              ШКОЛА ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ И ИНОСТРАННЫХ ЯЗЫКОВ
          </h1>
        </div>
      </Link>

          {/* Десктоп/мобильное меню */}
          <nav className={styles.nav}>
            {/* Бургер кнопка */}

              {isMobile && (
                <button
                  className={styles.burgerBtn}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className={styles.burgerLine}></span>
                  <span className={styles.burgerLine}></span>
                  <span className={styles.burgerLine}></span>
                </button>
              )}
            {/* Десктопное меню */}
            {!isMobile && (
              <>
              
                {/* Статьи */}
                <div
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => setActiveMenu("articles")}
                >
                  <Link to="/articles" className={styles.link}>О нас ▾</Link>
                  {activeMenu === "articles" && (
                    <div
                      className={styles.dropdownMenu}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      {categories.map(category => (
                        <Link
                          key={category.id}
                          to={`/articles?category=${category.slug}`}
                          className={styles.dropdownItem}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/order" className={styles.link}>Обучение</Link>
                <Link to="/order" className={styles.link}>Приемная комиссия</Link>


                <Link to="/about" className={styles.link}>Новости</Link>
                <Link to="/about" className={styles.link}>Контакты</Link>


              </>
            )}

            {/* Мобильное меню */}
  {/* Overlay для затемнения */}
{isMobile && (
  <div
    className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.show : ''}`}
    onClick={() => setIsMobileMenuOpen(false)}
  />
)}

{/* Мобильное меню */}
{isMobile && (
  <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>

    <Link to="/" className={styles.mobileLink}>
      <FaHome className={styles.iconMobile} /> Главная
    </Link>

    <Link to="/articles" className={styles.mobileLink}>
      <FaBlog className={styles.iconMobile} /> Блоги
    </Link>
    
    <Link to="/order" className={styles.mobileLink}>
      <FaLaptopCode className={styles.iconMobile} /> Заказать сайт
    </Link>

    <div className={styles.mobileDropdown}>
      <span className={styles.mobileLink}>
        <FaDiceThree  className={styles.iconMobile} /> Сервисы
      </span>
      <Link to="/quiz" className={styles.mobileSubLink}>
        <FaTrophy className={styles.iconMobile} /> Тестирование
      </Link>
      {/* <Link to="/hub" className={styles.mobileSubLink}>
        <FaTools className={styles.iconMobile} /> Инструменты
      </Link> */}
      <a href="https://lumina.kz/rss" className={styles.mobileSubLink}>
        <FaRss className={styles.iconMobile} /> RSS
      </a>
    </div>

    <Link to="/about" className={styles.mobileLink}>
      <FaInfoCircle className={styles.iconMobile} /> О проекте
    </Link>
  </div>
)}

          </nav>
        </div>
      </header>

      {/* Поисковая панель */}
      {showSearch && (
        <>
          <div className={styles.searchOverlay} onClick={() => setShowSearch(false)} />
          <div className={styles.searchBar}>
            <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Введите запрос..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={() => setShowSearch(false)}>
                <FaTimes className={styles.icon} />
              </button>
            </form>

            {!loading && results.length > 0 && (
              <>
              <ul className={styles.resultsList}>
                {results.map(item => (
                  <li key={item.id}>
                    <Link to={`/articles/${item.slug}`} onClick={() => setShowSearch(false)}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
 <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={meta.current_page === 1}>
          Назад
        </button>
        <span>{meta.current_page} / {meta.last_page}</span>
        <button onClick={handleNextPage} disabled={meta.current_page === meta.last_page}>
          Вперед
        </button>
      </div>  
      </>
            )}

            {!loading && results.length === 0 && searchQuery && (
              <div className={styles.resultsList}><p>Ничего не найдено.</p></div>
            )}

            {loading && <div className={styles.resultsList}><p>Загрузка...</p></div>}
          </div>
        </>
      )}

      {children}

      {/* Блок подписки */}
      {location.pathname !== '/about' && location.pathname !== '/hub' && location.pathname !== '/order' && location.pathname !== '/quiz/document/verify' && location.pathname !== '/quiz' && location.pathname !== '/quiz/start' && (
        <section className={styles.subscribeBanner}>
          <div className={styles.subscribeInner}>
            <h3><FaEnvelopeOpenText className={styles.iconSubs} />Не пропустите важное</h3>
            <p>Оставьте email — мы свяжемся, когда появится что-то новое или интересное лично вам.</p>

            <form className={styles.subscribeForm} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Ваш Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn}>Подписаться</button>
            </form>
          </div>

          {isSubmitting && (
            <div className={styles.overlay}>
              {!submissionResult ? (
                <div className={styles.loader}></div>
              ) : submissionResult === 'success' ? (
                <FaCheckCircle className={styles.checkmark} />
              ) : (
                <FaTimesCircle className={styles.errorIcon} />
              )}
            </div>
          )}
        </section>
      )}

      {/* Футер */}
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.footerGrid}>
            <div>
              <h4>О проекте</h4>
              <ul>
                <li><Link to="/about">О платформе</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4>Разделы</h4>
              <ul>
                <li><Link to="/articles">Блоги</Link></li>
                <li><Link to="/order">Заказать сайт</Link></li>
                <li><Link to="/quiz">Тестирование</Link></li>
                {/* <li><Link to="/hub">Инструменты</Link></li> */}
              </ul>
            </div>

            <div>
              <h4>Категории</h4>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/articles?category=${cat.slug}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.supportSection}>
              <h4>Помочь развитию</h4>
              <p style={{ marginBottom: '8px' }}>Поделитесь проектом с друзьями:</p>
              <div className={styles.socials}>
                <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=Посмотри эту IT-платформу!`} target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
                <a href={`https://wa.me/?text=${encodeURIComponent('Посмотри эту IT-платформу! ' + window.location.origin)}`} target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`} target="_blank" rel="noreferrer"><FaFacebook /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin)}&text=Посмотри эту IT-платформу!`} target="_blank" rel="noreferrer"><FaTwitter /></a>
              </div>

              <div className={styles.collaboration}>
                <h4 style={{ marginTop: '24px' }}>Сотрудничество</h4>
                <p>Если вы хотите предложить партнёрство, интеграции или другие формы сотрудничества — напишите нам:</p>
                <ul className={styles.contactList}>
                  <li><a href="mailto:info@lumina.kz">info@lumina.kz</a></li>
                  <li><a href="https://t.me/yelnur_zeinolla" target="_blank" rel="noreferrer">Telegram: @yelnur_zeinolla</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Lumina: Youth Innovation & Knowledge Exchange Platform. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
