import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSearch, FaTelegramPlane, FaWhatsapp, FaFacebook, 
  FaTwitter, FaTimes, FaBlog, FaInfoCircle, 
  FaTrophy, FaHome, FaSchool, FaGlobe, 
  FaUsers,
  FaChalkboardTeacher,
  FaDraftingCompass,
  FaUserTie,
  FaUserShield
} from 'react-icons/fa';

import styles from './Header.module.css';
import axiosInstance from '../axiosConfig';

// Объект с переводами
const translations = {
  ru: {
    title: "ШКОЛА ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ И ИНОСТРАННЫХ ЯЗЫКОВ",
    nav: {
      about: "О нас",
      education: "Обучение",
      committee: "Приемная комиссия",
      news: "Новости",
      contacts: "Контакты",
    },
    dropdown: {
      teachers: "Педагогический коллектив",
      achievements: "Достижения",
      circles: "Кружки",
      feedback: "Связь с директором",
      safety: "Безопасность",
    },
    search: {
      placeholder: "Введите запрос...",
      nothing: "Ничего не найдено.",
      loading: "Загрузка...",
      prev: "Назад",
      next: "Вперед"
    },
    footer: {
      school: "О школе",
      students: "Ученикам",
      parents: "Родителям",
      socials: "Мы в соцсетях",
      address: "Мангистауская область, Жанаозен, улица Нургисы Тилендиева"
    }
  },
  kk: {
    title: "АҚПАРАТТЫҚ ТЕХНОЛОГИЯЛАР ЖӘНЕ ШЕТ ТІЛДЕРІ МЕКТЕБІ",
    nav: {
      about: "Біз туралы",
      education: "Оқу",
      committee: "Қабылдау комиссиясы",
      news: "Жаңалықтар",
      contacts: "Байланыс",
    },
    dropdown: {
      teachers: "Педагогикалық ұжым",
      achievements: "Жетістіктер",
      circles: "Үйірмелер",
      feedback: "Директормен байланыс",
      safety: "Қауіпсіздік",
    },
    search: {
      placeholder: "Сұранысты енгізіңіз...",
      nothing: "Ештеңе табылмады.",
      loading: "Жүктеу...",
      prev: "Артқа",
      next: "Алға"
    },
    footer: {
      school: "Мектеп туралы",
      students: "Оқушыларға",
      parents: "Ата-аналарға",
      socials: "Әлеуметтік желілер",
      address: "Маңғыстау облысы, Жаңаөзен, Нұрғиса Тілендиев көшесі"
    }
  }
};

export default function Header({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  const [activeMenu, setActiveMenu] = useState(null); 
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const currentPath = location.pathname;
  let headerClass = currentPath === "/" ? `${styles.header} ${styles.homeHeader}` : `${styles.header} ${styles.altHeader}`;

  const toggleLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

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
    const delayDebounce = setTimeout(() => { fetchResults(1); }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Чистка эффекта при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) { setCategories(JSON.parse(stored)); return; }
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        setCategories(response.data);
        localStorage.setItem('categories', JSON.stringify(response.data));
      } catch (error) { console.error(error); }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          <Link className={styles.logoLink} to={'/'}>
            <div className={styles.logoWrapper}>
              <h1 className={styles.logo}>{t.title}</h1>
            </div>
          </Link>

          <nav className={styles.nav}>
     

            {isMobile && (
              <button 
                className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerActive : ''}`} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
              </button>
            )}

            {!isMobile && (
              <>
                <div className={styles.dropdownWrapper} onMouseEnter={() => setActiveMenu("about")}>
                  <Link to="/" className={styles.link}>{t.nav.about} ▾</Link>
                  {activeMenu === "about" && (
                    <div className={styles.dropdownMenu} onMouseLeave={() => setActiveMenu(null)}>
                      <Link to="/structure" className={styles.dropdownItem}>{t.dropdown.teachers}</Link>
                      <Link to="/achievements" className={styles.dropdownItem}>{t.dropdown.achievements}</Link>
                      <Link to="/circles" className={styles.dropdownItem}>{t.dropdown.circles}</Link>
                      <Link to="/director" className={styles.dropdownItem}>{t.dropdown.feedback}</Link>
                      <Link to="/safety" className={styles.dropdownItem}>{t.dropdown.safety}</Link>
                    </div>
                  )}
                </div>
                <Link to="/education" className={styles.link}>{t.nav.education}</Link>
                <Link to="/committee" className={styles.link}>{t.nav.committee}</Link>

                <div className={styles.dropdownWrapper} onMouseEnter={() => setActiveMenu("articles")}>
                  <Link to="/articles" className={styles.link}>{t.nav.news} ▾</Link>
                  {activeMenu === "articles" && (
                    <div className={styles.dropdownMenu} onMouseLeave={() => setActiveMenu(null)}>
                      {categories.map(cat => (
                        <Link key={cat.id} to={`/articles?category=${cat.slug}`} className={styles.dropdownItem}>{cat.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/about" className={styles.link}>{t.nav.contacts}</Link>
               <div className={styles.langWrapper}>
                    <button onClick={() => toggleLang('ru')} className={lang === 'ru' ? styles.activeLang : ''}>RU</button>
                    <button onClick={() => toggleLang('kk')} className={lang === 'kk' ? styles.activeLang : ''}>KK</button>
                  </div>
              </>
            )}

            {isMobile && (
   <>
  <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.show : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
  <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
    <div className={styles.langWrapper} style={{ marginBottom: 20 }}>
      <button onClick={() => toggleLang('ru')} className={lang === 'ru' ? styles.activeLang : ''}>RU</button>
      <button onClick={() => toggleLang('kk')} className={lang === 'kk' ? styles.activeLang : ''}>KK</button>
    </div>
    
    {/* О школе и подпункты */}
    <div className={styles.mobileLink}><FaHome /> {t.nav.about}</div>
    
    <Link to="/structure" className={styles.mobileSubLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaChalkboardTeacher /> {t.dropdown.teachers}
    </Link>
    
    <Link to="/achievements" className={styles.mobileSubLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaTrophy /> {t.dropdown.achievements}
    </Link>
    
    <Link to="/circles" className={styles.mobileSubLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaDraftingCompass /> {t.dropdown.circles}
    </Link>
    
    <Link to="/director" className={styles.mobileSubLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaUserTie /> {t.dropdown.feedback}
    </Link>
    
    <Link to="/safety" className={styles.mobileSubLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaUserShield /> {t.dropdown.safety}
    </Link>

    <div className={styles.divider} style={{margin: '10px 0', borderBottom: '1px solid #eeeeee49'}} />

    {/* Основные разделы */}
    <Link to="/education" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaSchool /> {t.nav.education}
    </Link>
    
    <Link to="/committee" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaUsers /> {t.nav.committee}
    </Link>
    
    <Link to="/articles" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaBlog /> {t.nav.news}
    </Link>



    <Link to="/about" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
      <FaInfoCircle /> {t.nav.contacts}
    </Link>
  </div>
</>
            )}
              
          </nav>
        </div>
      </header>

  

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.footerGrid}>
            <div>
              <h4>{t.footer.school}</h4>
              <ul>
                <li><Link to="/about">История</Link></li>
                <li><Link to="/achievements">{t.dropdown.achievements}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t.footer.students}</h4>
              <ul>
                <li><Link to="/schedule">Расписание</Link></li>
                <li><Link to="/clubs">{t.dropdown.circles}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t.footer.parents}</h4>
              <ul>
                <li><Link to="/documents">Документы</Link></li>
                <li><Link to="/contacts">{t.nav.contacts}</Link></li>
              </ul>
            </div>
            <div className={styles.supportSection}>
              <h4>{t.footer.socials}</h4>
              <div className={styles.socials}>
                <a href="#"><FaTelegramPlane /></a>
                <a href="#"><FaWhatsapp /></a>
                <a href="#"><FaFacebook /></a>
              </div>
              <div className={styles.collaboration}>
                <ul className={styles.contactList}>
                  <li><a href="mailto:zhanaozen_it_school@mail.kz">zhanaozen_it_school@mail.kz</a></li>
                  <li><a href="tel:+77292223344">+7 (7292) 22-33-44</a></li>
                  <li>{t.footer.address}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}