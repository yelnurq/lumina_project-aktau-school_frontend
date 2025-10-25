import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSearch, FaTelegramPlane,FaWhatsapp, FaFacebook, 
  FaTwitter, FaEnvelopeOpenText, FaCheckCircle, FaTimesCircle, FaTimes,FaBlog, FaLaptopCode, FaRss, FaInfoCircle, 
  FaTrophy, 
  FaDiceThree,
  FaHome,


  FaInstagram, FaYoutube, FaEye,
  FaSchool
} from 'react-icons/fa';

import styles from './Header.module.css';
import axiosInstance from '../axiosConfig';

export default function Header({ children }) {
  const [activeMenu, setActiveMenu] = useState(null); 
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



  const currentPath = location.pathname;

  let headerClass = styles.header;

  if (currentPath === "/") {
    headerClass = `${styles.header} ${styles.homeHeader}`;
  } else {
    headerClass = `${styles.header} ${styles.altHeader}`;
  } 

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
      <header className={headerClass}>
        <div className={styles.container}>
      <Link className={styles.logoLink} to={'/'}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.logo}>
              ШКОЛА ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ И ИНОСТРАННЫХ ЯЗЫКОВ
          </h1>
        </div>
      </Link>

          <nav className={styles.nav}>

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
            {!isMobile && (
              <>

                <div
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => setActiveMenu("about")}
                >

                  <Link to="/" className={styles.link}>О нас ▾</Link>
                  {activeMenu === "about" && (
                    <div
                      className={styles.dropdownMenu}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <Link to="/school/director" className={styles.dropdownItem}>Обратная связь с директором</Link>
                      <Link to="/school/safety" className={styles.dropdownItem}>Борьба с терроризмом и безопасность школ</Link>

                    </div>
                  )}
                </div>
                <Link to="/education" className={styles.link}>Обучение</Link>
                <Link to="/committee" className={styles.link}>Приемная комиссия</Link>

                <div
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => setActiveMenu("articles")}
                >

                  <Link to="/articles" className={styles.link}>Новости ▾</Link>
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
                <Link to="/about" className={styles.link}>Контакты</Link>


              </>
            )}

{isMobile && (
  <div
    className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.show : ''}`}
    onClick={() => setIsMobileMenuOpen(false)}
  />
)}

{isMobile && (
  <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
    <div className={styles.mobileDropdown}>
      <span className={styles.mobileLink}>
        <Link to="/" className={styles.mobileLink}>
          <FaHome className={styles.iconMobile} /> О нас
        </Link>
      </span>
      <Link to="/school/director" className={styles.mobileSubLink}>
        <FaTrophy className={styles.iconMobile} /> Обратная связь с директором
      </Link>
      <Link to="/school/safety" className={styles.mobileSubLink}>
        <FaTrophy className={styles.iconMobile} /> Борьба с терроризмом и безопасность школ
      </Link>
    </div>
    <Link to="/articles" className={styles.mobileLink}>
      <FaBlog className={styles.iconMobile} /> Новости
    </Link>
    
    <Link to="/education" className={styles.mobileLink}>
      <FaSchool className={styles.iconMobile} /> Обучение
    </Link>
    <Link to="/committee" className={styles.mobileLink}>
      <FaSchool className={styles.iconMobile} /> Приемная комиссия
    </Link>


    <Link to="/about" className={styles.mobileLink}>
      <FaInfoCircle className={styles.iconMobile} /> Контакты
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
    {/* Футер */}
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerGrid}>
          <div>
            <h4>О школе</h4>
            <ul>
              <li><Link to="/about">История школы</Link></li>
              <li><Link to="/administration">Администрация</Link></li>
              <li><Link to="/teachers">Педагогический состав</Link></li>
              <li><Link to="/achievements">Достижения</Link></li>
            </ul>
          </div>

          <div>
            <h4>Ученикам</h4>
            <ul>
              <li><Link to="/schedule">Расписание</Link></li>
              <li><Link to="/library">Электронная библиотека</Link></li>
              <li><Link to="/quiz">Тесты и олимпиады</Link></li>
              <li><Link to="/clubs">Кружки и секции</Link></li>
            </ul>
          </div>

          <div>
            <h4>Родителям</h4>
            <ul>
              <li><Link to="/advice">Советы родителям</Link></li>
              <li><Link to="/documents">Документы школы</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>

          <div className={styles.supportSection}>
            <h4>Мы в соцсетях</h4>
            <p style={{ marginBottom: '8px' }}>Подписывайтесь, чтобы быть в курсе новостей:</p>
            <div className={styles.socials}>
              <a href="https://t.me/#" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
              <a href="https://wa.me/#" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a href="https://facebook.com/#" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com/#" target="_blank" rel="noreferrer"><FaTwitter /></a>
            </div>

            <div className={styles.collaboration}>
              <h4 style={{ marginTop: '24px' }}>Контакты</h4>
              <ul className={styles.contactList}>
                <li><a href="mailto:mangistau_school@mail.kz">zhanaozen_it_school@mail.kz</a></li>
                <li><a href="tel:+77292223344">+7 (7292) 22-33-44</a></li>
                <li><a href="https://goo.gl/maps/example" target="_blank" rel="noreferrer">Мангистауская область, Жанаозен, улица Нургисы Тилендиева</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>Lumina Dev.</p>
        </div>
      </div>
    </footer>

    </>
  );
}
