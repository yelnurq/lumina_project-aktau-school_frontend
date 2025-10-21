import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './Home.module.css';
import Header from '../../components/Header';
import facts from './../../json/facts.json'
import SeoHelmet from '../../components/SeoHelmet';
import { FaBrain } from 'react-icons/fa';

export default function Home() {
  const [main, setMain] = useState(null);
  const [latest, setLatest] = useState([]);
  const [categories, setCategories] = useState([]);
  const [byCategory, setByCategory] = useState({});
  const [loading, setLoading] = useState(true);
    const slugify = (text) => {
    const map = {
        а: "a", б: "b", в: "v", г: "g", д: "d",
        е: "e", ё: "yo", ж: "zh", з: "z", и: "i",
        й: "i", к: "k", л: "l", м: "m", н: "n",
        о: "o", п: "p", р: "r", с: "s", т: "t",
        у: "u", ф: "f", х: "x", ц: "ts", ч: "c",
        ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "",
        э: "e", ю: "yu", я: "ya",

        // Казахские буквы
        ә: "a", ғ: "g", қ: "k", ң: "n", ө: "o", ұ: "u", ү: "u", һ: "h", і: "i",

        А: "A", Б: "B", В: "V", Г: "G", Д: "D",
        Е: "E", Ё: "Yo", Ж: "Zh", З: "Z", И: "I",
        Й: "I", К: "K", Л: "L", М: "M", Н: "N",
        О: "O", П: "P", Р: "R", С: "S", Т: "T",
        У: "U", Ф: "F", Х: "X", Ц: "Ts", Ч: "C",
        Ш: "Sh", Щ: "Shch", Ъ: "", Ы: "Y", Ь: "",
        Э: "E", Ю: "Yu", Я: "Ya",

        Ә: "A", Ғ: "G", Қ: "K", Ң: "N", Ө: "O", Ұ: "U", Ү: "U", Һ: "H", І: "I",
    };

    return text
        .split("")
        .map(char => map[char] || char)
        .join("")
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    };
    function isNew(dateString) {
    const now = new Date();
    const published = new Date(dateString);
    const diffDays = (now - published) / (1000 * 60 * 60 * 24);
    return diffDays < 3; // меньше 3 суток
    }
    const [todayFact, setTodayFact] = useState(null);

useEffect(() => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${month}-${day}`;

  let factOfTheDay = facts.find(fact => fact.date === todayStr);

  if (!factOfTheDay) {
    // Если факта на сегодня нет, выбираем случайный
    const randomIndex = Math.floor(Math.random() * facts.length);
    factOfTheDay = facts[randomIndex];
  }

  setTodayFact(factOfTheDay.fact);
}, []);


  useEffect(() => {
    axiosInstance.get('/api/news/home').then(res => {
      setMain(res.data.main);
      setLatest(res.data.latest);
      setCategories(res.data.categories);
      setByCategory(res.data.byCategory);
    }).finally(() => setLoading(false));
  }, []);

if (loading) {
  return (
    <>
          <Header>
    <div className={styles.container}>
      <div className={styles.skeletonArticle}>
        <div className={styles.skeletonMainBlock}>
            <div className={`${styles.skeleton} ${styles.skeletonMain}`}></div>
            <div className={styles.skeletonLatestBlock}>
                <div className={`${styles.skeleton} ${styles.skeletonSide}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonSide}`}></div>
            </div>
        </div>
        
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonSide}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonSide}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonSide}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonSide}`}></div>
                
        
      </div>
    </div>
    </Header></>
  );
}
  return (
     <>
        <SeoHelmet
          title="Lumina — IT-портал: блоги, онлайн-олимпиады и заказ сайтов"
          description="Lumina — платформа для разработчиков: читайте блоги, проходите онлайн-олимпиады и заказывайте профессиональные сайты."
          keywords="Lumina, IT, блоги, статьи, олимпиады, веб-разработка"
          url="https://lumina.kz/"
          image={main ? `https://lumina.kz/storage/${main.image}` : "https://lumina.kz/preview-image.png"}
          type="website"
          jsonLdType="WebSite"
        />

    <Header>
      <div className={styles.mainBlocks}>
        
      </div>
      <main className={styles.container}>
        {/* Главная новость */}
        <div className={styles.mainBlock}>
{main && (
  <section className={styles.mainNews}>
      <Link className={styles.newsLink} to={`/articles/${main.slug}`}>

    <img loading="lazy" className={styles.image} src={`https://lumina.kz/storage/${main.image}`} alt={main.title} />
    <div>
      <h2>
        {main.title}
        {isNew(main.created_at) && <span className={styles.badge}>Новое</span>}
      </h2>
      <p>{main.excerpt}</p>
      <span className={styles.newsLink}>
        Читать далее →
      </span>
      <p className={styles.meta}>
        <span>⏱ {main.reading_time} мин чтения</span>
        <span>{new Date(main.created_at).toLocaleDateString()}</span>
      </p>
    </div>
      </Link>
  </section>
)}


        {/* Последние 3 статьи */}
        <section className={styles.latestBlock}>
          <div className={styles.latestGrid}>
            {latest.map(news => (
              <div key={news.id} className={styles.card}>
                <Link className={styles.newsLink} to={`/articles/${news.slug}`}>
                <img loading="lazy" className={styles.latestImage} src={`https://lumina.kz/storage/${news.image}`} alt={news.title} />
                <p className={styles.latestTitle}>{news.title}</p>
                <span className={styles.newsLink}>
                  Читать далее →
                </span>     
                    <p className={styles.meta}>
                     <span>⏱ {news.reading_time} мин чтения</span>
                    <span>{new Date(news.created_at).toLocaleDateString()} </span>
                    </p>
                </Link>
              </div>
            ))}
          </div>
        </section>

        </div>

    <section className={styles.factSection}>
      <div className={styles.inner}>
        <h2 className={styles.factTitle}><FaBrain className={styles.iconMobile}/> Факт дня</h2>
        <p className={styles.fact}>
          {todayFact}
        </p>
      </div>
    </section>
        {Object.entries(byCategory).map(([categoryName, articles]) => (
            <section key={categoryName} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
            <h3>{categoryName}</h3>
            <Link to={`/articles?category=${slugify(categoryName)}`} className={styles.viewAll}>
                Смотреть все →
            </Link>
            </div>
              <div className={styles.categoryGrid}>
                {articles.slice(0, 3).map(article => (
                  <div key={article.id} className={styles.card}>
                    <Link className={styles.newsLink} to={`/articles/${article.slug}`}>
                    <img loading="lazy" className={styles.latestObjectImage}  src={`https://lumina.kz/storage/${article.image}`} alt={article.title} />
                    <p className={styles.latestTitle}>{article.title}</p>
                  
                  <span className={styles.newsLink}>
                  Читать далее →
                </span>   
                    <p className={styles.meta}>
                     <span>⏱ {article.reading_time} мин чтения</span>
                    <span>{new Date(article.created_at).toLocaleDateString()} </span>
                    </p>

                  </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
          {/* <AdBanner/> */}
      </main>
    </Header>
    </>
  );
}
