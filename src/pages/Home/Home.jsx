
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './Home.module.css';
import Header from '../../components/Header';
import SeoHelmet from '../../components/SeoHelmet';
import Gallery from '../../components/Gallery/Gallery';

export default function Home() {
  const [latest, setLatest] = useState([]);
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



  useEffect(() => {
    axiosInstance.get('/api/news/home').then(res => {
      setLatest(res.data.latest);
    }).finally(() => setLoading(false));
  }, []);

if (loading) {
  return (
    <>
      <div className={styles.loaderBlock}>
        <div className={styles.loader}>

        </div>
      </div>
  </>
  );
}
  return (
     <>
        <SeoHelmet
          title="Lumina — IT-портал: блоги, онлайн-олимпиады и заказ сайтов"
          description="Lumina — платформа для разработчиков: читайте блоги, проходите онлайн-олимпиады и заказывайте профессиональные сайты."
          keywords="Lumina, IT, блоги, статьи, олимпиады, веб-разработка"
          url="https://aktau-it-school.lumina.kz/"
          // image={main ? `https://aktau-it-school.lumina.kz/storage/${main.image}` : "https://aktau-it-school.lumina.kz/preview-image.png"}
          type="website"
          jsonLdType="WebSite"
        />

    <Header>
      <div className={styles.mainBlocks}>
          <div className={styles.left}>
            <p className={styles.welcome}>Добро пожаловать в нашу школу информационных технологий!</p>
            <p className={styles.textMain}>
              Мы готовим новое поколение цифровых лидеров, способных создавать, анализировать и внедрять современные IT-решения.
            <br></br>Наша миссия — развивать творческое мышление, инновационность и любовь к знаниям у каждого ученика.
<br></br>Здесь теория встречается с практикой, а обучение становится увлекательным путешествием в мир технологий.
            </p>
            <p className={styles.address}>Мангистауская область, Жанаозен, улица Нургисы Тилендиева</p>
            <button>Подробнее</button>
          </div>
      </div>

      <main className={styles.container}>
      <div className={styles.historyBlocks}>
  <div className={styles.right}>
    <div className={styles.historyText}>
      <p style={{fontWeight:900}}>Школа будущего — сегодня</p>
    </div>
    <img src="./images/home/h2.jpeg" alt="Современная школа" />
  </div>

  <div className={styles.left}>
    <p style={{ margin: 0 }}>
      <span>Главная цель школы</span> — воспитать образованного, активного и патриотичного гражданина.
      Наши учителя — опытные и преданные своему делу профессионалы, которые с любовью делятся знаниями и вдохновляют учеников на новые достижения.
    </p>
    <p>
      Ученики школы активно участвуют в олимпиадах, конкурсах и проектах различного уровня, занимая призовые места.
    </p>
    <p>
      <span>Наш девиз — «Образование — путь в будущее!»</span>
    </p>
  <div className={styles.advantages}>
    <div className={styles.advantage}><p>STEM-обучение</p></div>
    <div className={styles.advantage}><p>IT и робототехника</p></div>
    <div className={styles.advantage}><p>Проектное мышление</p></div>
    <div className={styles.advantage}><p>Креативное образование</p></div>
  </div>

  </div>
      </div>
          <section className={styles.about}>
      <div className={styles.container}>
         <div className={styles.right}>
    <h2>Мы учим по-новому: сочетание классических знаний и цифровых технологий</h2>
  </div>
  <div className={styles.left}>
          <p>
      Мы внедряем современные технологии в учебный процесс: интерактивные доски,
      онлайн-курсы, виртуальные лаборатории.
    </p>
      <p>
      Ученики осваивают не только школьную программу, но и цифровые навыки,
      которые помогут им стать конкурентоспособными в будущем.
    </p>
    <img
      src="/images/comp.jpg"
      alt="Инновации в обучении"
      className={styles.innovationImage}
    />
  </div>

 
      </div>
    </section>
    <section className={styles.categorySection}>
            <p className={styles.titleBlock} style={{textAlign:'left'}}>
            Блог из школы
            </p>




        <section className={styles.latestBlock}>
          <div className={styles.latestGrid}>
            {latest.map(news => (
              <div key={news.id} className={styles.card}>
                <Link className={styles.newsLink} to={`/articles/${news.slug}`}>
                <img loading="lazy" className={styles.latestImage} src={`https://aktau-it-school.lumina.kz/storage/${news.image}`} alt={news.title} />
                <p className={styles.latestTitle}>{news.title}</p>
                <p className={styles.latestDesc}>{news.excerpt}</p>
                    <p className={styles.meta}>
                    <span>{new Date(news.created_at).toLocaleDateString()} </span>
                    </p>
                </Link>
              </div>
            ))}
          </div>
        </section>

    </section>
    {/* <section className={styles.factSection}>
      <div className={styles.inner}>
        <p className={styles.fact}>
          «Учись, дитя, получай знания — ведь именно от этого зависит твоё будущее»
        </p>
        <h2 className={styles.factTitle}> Ыбырай Алтынсарин</h2>
      </div>
    </section> */}

    <section className={styles.factBlock}>
      <div className={styles.container}>

        <div className={styles.right}>
          <p className={styles.quoteTop}>“</p>
        <p className={styles.fact}>
          Учись, дитя, получай знания — ведь именно от этого зависит твоё будущее
        </p>
          <div className={styles.author}>
              <p>Ыбырай Алтынсарин</p>
          </div>
        </div>
      </div>
    </section>


    <section className={styles.gallerySection} style={{ paddingBottom:50}}>
      <div className={styles.categoryHeader}>
          <p className={styles.titleBlock}>
            Жизнь нашей школы
          </p>
      </div>

      <Gallery/>
    </section>



      </main>
    </Header>
    </>
  );
}
