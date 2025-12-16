import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './Home.module.css';
import Header from '../../components/Header';
import SeoHelmet from '../../components/SeoHelmet';
import Gallery from '../../components/Gallery/Gallery';

// 1. Объект с переводами
const translations = {
  ru: {
    welcome: "Добро пожаловать в нашу школу информационных технологий!",
    mainText: "Мы готовим новое поколение цифровых лидеров, способных создавать, анализировать и внедрять современные IT-решения. Наша миссия — развивать творческое мышление, инновационность и любовь к знаниям у каждого ученика. Здесь теория встречается с практикой, а обучение становится увлекательным путешествием в мир технологий.",
    address: "Мангистауская область, Жанаозен, улица Нургисы Тилендиева",
    more: "Подробнее",
    futureTitle: "Школа будущего — сегодня",
    goalLabel: "Главная цель школы",
    goalText: " — воспитать образованного, активного и патриотичного гражданина. Наши учителя — опытные и преданные своему делу профессионалы, которые с любовью делятся знаниями и вдохновляют учеников на новые достижения.",
    olympiads: "Ученики школы активно участвуют в олимпиадах, конкурсах и проектах различного уровня, занимая призовые места.",
    motto: "Наш девиз — «Образование — путь в будущее!»",
    advantages: ["STEM-обучение", "IT и робототехника", "Проектное мышление", "Креативное образование"],
    innovationsTitle: "Мы учим по-новому: сочетание классических знаний и цифровых технологий",
    innovationsText1: "Мы внедряем современные технологии в учебный процесс: интерактивные доски, онлайн-курсы, виртуальные лаборатории.",
    innovationsText2: "Ученики осваивают не только школьную программу, но и цифровые навыки, которые помогут им стать конкурентоспособными в будущем.",
    blogTitle: "Блог из школы",
    lifeTitle: "Жизнь нашей школы",
    quote: "Учись, дитя, получай знания — ведь именно от этого зависит твоё будущее",
    author: "Ыбырай Алтынсарин"
  },
  kk: {
    welcome: "Біздің ақпараттық технологиялар мектебімізге қош келдіңіздер!",
    mainText: "Біз заманауи IT-шешімдерді жасауға, талдауға және енгізуге қабілетті цифрлық көшбасшылардың жаңа буынын дайындаймыз. Біздің миссиямыз — әрбір оқушының шығармашылық ойлауын, инновациялық қабілетін және білімге деген құштарлығын дамыту. Мұнда теория практикамен ұштасады, ал оқу технологиялар әлеміне қызықты саяхатқа айналады.",
    address: "Маңғыстау облысы, Жаңаөзен қаласы, Нұрғиса Тілендиев көшесі",
    more: "Толығырақ",
    futureTitle: "Болашақ мектебі — бүгін",
    goalLabel: "Мектептің басты мақсаты",
    goalText: " — білімді, белсенді және патриот азаматты тәрбиелеу. Біздің мұғалімдер — өз ісіне берілген кәсіби мамандар, олар біліммен бөлісіп, оқушыларды жаңа жетістіктерге шабыттандырады.",
    olympiads: "Мектеп оқушылары түрлі деңгейдегі олимпиадаларға, конкурстар мен жобаларға белсенді қатысып, жүлделі орындарға ие болуда.",
    motto: "Біздің ұранымыз — «Білім — болашаққа жол!»",
    advantages: ["STEM-оқыту", "IT және робототехника", "Жобалық ойлау", "Креативті білім беру"],
    innovationsTitle: "Біз жаңаша оқытамыз: классикалық білім мен цифрлық технологиялардың үйлесімі",
    innovationsText1: "Біз оқу процесіне заманауи технологияларды енгіземіз: интерактивті тақталар, онлайн-курстар, виртуалды зертханалар.",
    innovationsText2: "Оқушылар мектеп бағдарламасын ғана емес, сонымен қатар болашақта бәсекеге қабілетті болуға көмектесетін цифрлық дағдыларды да меңгереді.",
    blogTitle: "Мектеп блогы",
    lifeTitle: "Мектеп тынысы",
    quote: "Оқы, бала, білім ал — себебі сенің болашағың соған байланысты",
    author: "Ыбырай Алтынсарин"
  }
};

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Состояние языка, которое синхронизируется с Header через localStorage
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  // Следим за изменениями в localStorage (когда в Header кликают на RU/KK)
  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('app_lang') || 'ru');
    };
    window.addEventListener('storage', handleStorageChange);
    // Также можно добавить интервал для проверки, если storage event не срабатывает в одном окне
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    axiosInstance.get('/api/news/home').then(res => {
      setLatest(res.data.latest);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderBlock}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <>
      <SeoHelmet
        title={t.welcome}
        description={t.mainText}
        keywords="Lumina, IT, блоги, мақалалар, олимпиадалар"
        url="https://mangystau.lumina.kz/"
        type="website"
        jsonLdType="WebSite"
      />

      <Header>
        <div className={styles.mainBlocks}>
          <div className={styles.left}>
            <p className={styles.welcome}>{t.welcome}</p>
            <p className={styles.textMain}>{t.mainText}</p>
            <p className={styles.address}>{t.address}</p>
            <button>{t.more}</button>
          </div>
        </div>

        <main className={styles.container}>
          <div className={styles.historyBlocks}>
            <div className={styles.right}>
              <div className={styles.historyText}>
                <p style={{ fontWeight: 900 }}>{t.futureTitle}</p>
              </div>
              <img src="./images/home/2.jpg" alt="Modern school" />
            </div>

            <div className={styles.left}>
              <p style={{ margin: 0 }}>
                <span>{t.goalLabel}</span>{t.goalText}
              </p>
              <p>{t.olympiads}</p>
              <p><span>{t.motto}</span></p>
              <div className={styles.advantages}>
                {t.advantages.map((adv, idx) => (
                  <div key={idx} className={styles.advantage}><p>{adv}</p></div>
                ))}
              </div>
            </div>
          </div>

          <section className={styles.about}>
            <div className={styles.container}>
              <div className={styles.right}>
                <h2>{t.innovationsTitle}</h2>
              </div>
              <div className={styles.left}>
                <p>{t.innovationsText1}</p>
                <p>{t.innovationsText2}</p>
                <img src="/images/4.jpg" alt="Innovation" className={styles.innovationImage} />
              </div>
            </div>
          </section>

          <section className={styles.categorySection}>
            <p className={styles.titleBlock} style={{ textAlign: 'left' }}>
              {t.blogTitle}
            </p>
            <section className={styles.latestBlock}>
              <div className={styles.latestGrid}>
                {latest.map(news => (
                  <div key={news.id} className={styles.card}>
                    <Link className={styles.newsLink} to={`/articles/${news.slug}`}>
                      <img loading="lazy" className={styles.latestImage} src={`https://mangystau.lumina.kz/storage/${news.image}`} alt={news.title} />
                      <p className={styles.latestTitle}>{news.title}</p>
                      <p className={styles.latestDesc}>{news.excerpt}</p>
                      <p className={styles.meta}>
                        <span>{new Date(news.created_at).toLocaleDateString()}</span>
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <section className={styles.factBlock}>
            <div className={styles.container}>
              <div className={styles.right}>
                <p className={styles.quoteTop}>“</p>
                <p className={styles.fact}>{t.quote}</p>
                <div className={styles.author}>
                  <p>{t.author}</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.gallerySection} style={{ paddingBottom: 50 }}>
            <div className={styles.categoryHeader}>
              <p className={styles.titleBlock}>{t.lifeTitle}</p>
            </div>
            <Gallery />
          </section>
        </main>
      </Header>
    </>
  );
}