import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './NewsDetails.module.css';
import Header from '../../components/Header';
import { FaTelegramPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

// 1. Объект с переводами интерфейса
const translations = {
  ru: {
    home: "Главная",
    news: "Новости",
    seeAlso: "Смотрите также",
    share: "Поделиться:",
    loading: "Загрузка...",
    error: "Ошибка при загрузке новости"
  },
  kk: {
    home: "Басты бет",
    news: "Жаңалықтар",
    seeAlso: "Сондай-ақ қараңыз",
    share: "Бөлісу:",
    loading: "Жүктелуде...",
    error: "Жаңалықты жүктеу қатесі"
  }
};

export default function NewsDetails() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  
  // 2. Логика языка
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

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        // Передаем текущий язык в API, чтобы получить переведенный контент
        const res = await axiosInstance.get(`/api/news/${slug}`, {
          params: { lang: lang },
          headers: { 'Accept-Language': lang }
        });
        setNews(res.data);
        setRelatedNews(res.data.related || []);
      } catch (error) {
        console.error(t.error, error);
      }
    };

    fetchNewsItem();
  }, [slug, lang, t.error]);

  if (!news) {
    return (
      <Header>
        <div className={styles.container}>
          <div className={styles.skeletonArticle}>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonMeta}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonContent}`}></div>
          </div>
          <div className={styles.related}>
            <h2>{t.seeAlso}</h2>
            <div className={styles.relatedGrid}>
              {[...Array(4)].map((_, i) => (
                <div className={styles.relatedCardSkeleton} key={i}>
                  <div className={`${styles.skeleton} ${styles.relatedImageSkeleton}`}></div>
                  <div className={`${styles.skeleton} ${styles.relatedTextSkeleton}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Header>
    );
  }

  const description = news.excerpt || news.content?.replace(/<[^>]+>/g, '').slice(0, 160);
  const imageUrl = news.image
    ? `http://127.0.0.1:8000/storage/${news.image}`
    : 'http://127.0.0.1:8000/preview-image.png';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": news.title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": news.author_name || "Lumina Team"
    },
    "datePublished": new Date(news.created_at).toISOString(),
    "articleSection": news.category || t.news
  };

  return (
    <>
      <Helmet>
        <title>{news.title} | Lumina</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Header>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <ol>
              <li><Link to="/">{t.home}</Link></li>
              <li>/</li>
              <li><Link to="/articles/">{t.news}</Link></li>
              <li>/</li>
              {news.category && (
                <>
                  <li><Link to={`/articles?category=${news.category_slug}`}>{news.category}</Link></li>
                  <li>/</li>
                </>
              )}
              <li className={styles.current}>{news.title}</li>
            </ol>
          </nav>

          <article className={styles.article}>
            <h1 className={styles.title}>{news.title}</h1>
            <div className={styles.meta}>
              <div className={styles.metaDiv}>
                <p>{news.category}</p>
              </div>
              <span>
                {new Date(news.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'kk-KZ')}
              </span>
            </div>

            {news.image && (
              <img src={imageUrl} alt={news.title} className={styles.image} />
            )}

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>

            <div className={styles.shareButtons}>
              <span>{t.share}</span>
              <a href={`https://t.me/share/url?url=${window.location.href}&text=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>
                <FaTelegramPlane /> Telegram
              </a>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title)} ${window.location.href}`} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </article>

          <section className={styles.related}>
            <h2>{t.seeAlso}</h2>
            <div className={styles.relatedGrid}>
              {relatedNews.map((item) => (
                <Link to={`/articles/${item.slug}`} key={item.id} className={styles.relatedCard}>
                  <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.title} />
                  <div className={styles.relatedText}>
                    <h3>{item.title.length > 60 ? item.title.slice(0, 60) + '...' : item.title}</h3>
                    <p className={styles.relatedDate}>
                      {new Date(item.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'kk-KZ')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Header>
    </>
  );
}