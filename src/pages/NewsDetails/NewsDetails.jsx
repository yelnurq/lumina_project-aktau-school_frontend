import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './NewsDetails.module.css';
import Header from '../../components/Header';
import { FaTelegramPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import AdBanner from '../../components/AdBanner/AdBanner';
import { Helmet } from 'react-helmet';





export default function NewsDetails() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await axiosInstance.get(`/api/news/${slug}`);
        setNews(res.data);
        setRelatedNews(res.data.related);
      } catch (error) {
        console.error('Ошибка при загрузке новости:', error);
      }
    };

    fetchNewsItem();
  }, [slug]);

  if (!news) {
    return (
      <>
        <Header>
          <div className={styles.container}>
            <div className={styles.skeletonArticle}>
              <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
              <div className={`${styles.skeleton} ${styles.skeletonMeta}`}></div>
              <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
              <div className={`${styles.skeleton} ${styles.skeletonContent}`}></div>
            </div>

            <div className={styles.related}>
              <h2>Смотрите также</h2>
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
      </>
    );
  }

  const description =
    news.excerpt || news.content.replace(/<[^>]+>/g, '').slice(0, 160);

  const imageUrl = news.image
    ? `https://lumina.kz/storage/${news.image}`
    : 'https://lumina.kz/preview-image.png';

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
  "publisher": {
    "@type": "Organization",
    "name": "Lumina",
    "logo": {
      "@type": "ImageObject",
      "url": "https://lumina.kz/favicon-96x96.png"
    }
  },
  "datePublished": new Date(news.created_at).toISOString(),
  "dateModified": new Date(news.updated_at || news.created_at).toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://lumina.kz/articles/${news.slug}`
  },
  "articleSection": news.category || "Новости",
  "keywords": news.tags?.join(", ") || ""
};

  return (
    <>
      <Helmet>
        {/* Title & Description */}
        <title>{news.title} | Lumina</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`https://lumina.kz/articles/${news.slug}`} />
        <meta property="og:site_name" content="Lumina" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      </Helmet>

      <Header>
        <div className={styles.container}>
          {/* Хлебные крошки */}
          <nav className={styles.breadcrumbs}>
            <ol>
              <li><Link to="/">Главная</Link></li>
              <li>/</li>
              <li><Link to="/articles/">Статьи</Link></li>
              <li>/</li>
              <li><Link to={`/articles?category=${news.category_slug}`}>{news.category}</Link></li>
              <li>/</li>
              <li className={styles.current}>{news.title}</li>
            </ol>
          </nav>

          {/* Основной контент */}
          <article className={styles.article} id='article-content'>
            <h1 className={styles.title}>{news.title}</h1>

            <div className={styles.meta}>
              <div className={styles.metaDiv}>
                <p>{news.category}</p>
              </div>
              <span>{new Date(news.created_at).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className='no-pdf'>
              {news.image && (
                <img
                  src={imageUrl}
                  alt={news.title}
                  className={styles.image}
                />
              )}
            </div>

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>

            <div className='no-pdf'>
              <div className={styles.shareButtons}>
                <span>Поделиться:</span>

                <a
                  href={`https://t.me/share/url?url=${window.location.href}&text=${encodeURIComponent(news.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.shareLink}
                >
                  <FaTelegramPlane /> Telegram
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(news.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.shareLink}
                >
                  <FaTwitter /> Twitter
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title)} ${window.location.href}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.shareLink}
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>

            </div>
          </article>


          {/* Смотрите также */}
          <section className={styles.related}>
            <h2>Смотрите также</h2>
            <div className={styles.relatedGrid}>
              {relatedNews.map((item) => (
                <Link to={`/articles/${item.slug}`} key={item.id} className={styles.relatedCard}>
                  <img src={`https://lumina.kz/storage/${item.image}`} alt={item.title} />
                  <div className={styles.relatedText}>
                    <h3>
                      {item.title.length > 60 ? item.title.slice(0, 60) + '...' : item.title}
                    </h3>
                    <p className={styles.relatedDate}>
                      {new Date(item.created_at).toLocaleDateString('ru-RU')}
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
