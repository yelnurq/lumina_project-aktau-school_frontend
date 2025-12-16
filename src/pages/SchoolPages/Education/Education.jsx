import { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Education.module.css";

// 1. Объект с переводами
const translations = {
  ru: {
    breadcrumbs: { home: "Главная", current: "Обучение" },
    pageTitle: "Обучение",
    approachTitle: "Современный подход к обучению",
    approachText1: "В нашей школе реализуются инновационные программы, объединяющие классические методы и современные технологии. Каждый ученик вовлечён в процесс обучения через интерактив, проектную деятельность и командную работу.",
    approachText2: "Мы стремимся сделать образование не просто обязательным процессом, а увлекательным путешествием, где знания — это инструмент для будущих свершений.",
    directionsTitle: "Основные направления обучения",
    dirIT: "Информационные технологии",
    dirITDesc: "Кодинг, робототехника, веб-разработка и цифровая грамотность с ранних классов.",
    dirLang: "Иностранные языки",
    dirLangDesc: "Английский, турецкий, казахский и другие языки с применением разговорных методик.",
    lifeTitle: "Внеурочная жизнь школы",
    lifeText: "Мы верим, что личность формируется не только на уроках. Поэтому в школе активно развиваются спортивные секции, клубы программирования, театральная студия и дебаты.",
    quote: "“Образование — это не подготовка к жизни. Образование — это сама жизнь.”",
    author: "Джон Дьюи",
    digitalTitle: "Цифровая школа",
    digitalText: "Мы внедряем электронные дневники, онлайн-олимпиады, индивидуальные цифровые профили учеников. Все образовательные ресурсы доступны родителям и ученикам в один клик.",
    stats: {
      platforms: "онлайн-платформ",
      usage: "учеников используют цифровые ресурсы",
      access: "доступ к материалам"
    }
  },
  kk: {
    breadcrumbs: { home: "Басты бет", current: "Оқу" },
    pageTitle: "Оқу",
    approachTitle: "Оқытудың заманауи тәсілі",
    approachText1: "Біздің мектепте классикалық әдістер мен заманауи технологияларды біріктіретін инновациялық бағдарламалар жүзеге асырылады. Әрбір оқушы интерактивті оқыту, жобалық қызмет және командалық жұмыс арқылы оқу процесіне тартылған.",
    approachText2: "Біз білім беруді жай ғана міндетті процесс емес, білім болашақ жетістіктердің құралы болатын қызықты саяхатқа айналдыруға тырысамыз.",
    directionsTitle: "Оқытудың негізгі бағыттары",
    dirIT: "Ақпараттық технологиялар",
    dirITDesc: "Бастауыш сыныптардан бастап кодтау, робототехника, веб-әзірлеу және цифрлық сауаттылық.",
    dirLang: "Шет тілдері",
    dirLangDesc: "Сөйлеу әдістемелерін қолдана отырып ағылшын, түрік, қазақ және басқа тілдерді үйрету.",
    lifeTitle: "Мектептің сабақтан тыс өмірі",
    lifeText: "Біз тұлға тек сабақта ғана қалыптаспайтынына сенеміз. Сондықтан мектепте спорттық секциялар, бағдарламалау клубтары, театр студиясы және дебаттар белсенді дамып келеді.",
    quote: "“Білім — өмірге дайындық емес. Білімнің өзі — өмір.”",
    author: "Джон Дьюи",
    digitalTitle: "Цифрлық мектеп",
    digitalText: "Біз электронды күнделіктерді, онлайн-олимпиадаларды, оқушылардың жеке цифрлық профильдерін енгізудеміз. Барлық білім беру ресурстары ата-аналар мен оқушыларға бір рет басу арқылы қолжетімді.",
    stats: {
      platforms: "онлайн-платформалар",
      usage: "оқушылар цифрлық ресурстарды пайдаланады",
      access: "материалдарға қолжетімділік"
    }
  }
};

export default function Education() {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  // Синхронизация языка с Header
  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('app_lang') || 'ru');
    };
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Header>
      <div className={styles.container}>
        <section
          className={styles.pageHeader}
          style={{ backgroundImage: `url('/images/elementary-school-classroom-design.jpg')` }}
        >
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">{t.breadcrumbs.home}</Link></li>
                    <li>/</li>
                    <li>{t.breadcrumbs.current}</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.eduSection}>
          <div className={styles.sectionContent}>
            <h2>{t.approachTitle}</h2>
            <p>{t.approachText1}</p>
            <p>{t.approachText2}</p>
          </div>
          <img src="/images/6.jpg" alt="Modern Classroom" className={styles.sectionImage} />
        </section>

        <section className={styles.cardsSection}>
          <h2>{t.directionsTitle}</h2>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <img src="/images/5.jpg" alt="IT" />
              <h3>{t.dirIT}</h3>
              <p>{t.dirITDesc}</p>
            </div>
            <div className={styles.card}>
              <img src="/images/3.png" style={{ objectPosition: 'center' }} alt="Languages" />
              <h3>{t.dirLang}</h3>
              <p>{t.dirLangDesc}</p>
            </div>
          </div>
        </section>

        <section className={`${styles.eduSection} ${styles.reverse}`}>
          <img src="/images/2.jpg" alt="Extra-curricular" className={styles.sectionImage} />
          <div className={styles.sectionContent}>
            <h2>{t.lifeTitle}</h2>
            <p>{t.lifeText}</p>
            <blockquote className={styles.quote}>
              {t.quote}
              <span>— {t.author}</span>
            </blockquote>
          </div>
        </section>

        <section className={styles.digitalSection}>
          <div className={styles.textBlock}>
            <h2>{t.digitalTitle}</h2>
            <p>{t.digitalText}</p>
          </div>
          <div className={styles.stats}>
            <div>
              <h3>+25</h3>
              <p>{t.stats.platforms}</p>
            </div>
            <div>
              <h3>100%</h3>
              <p>{t.stats.usage}</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>{t.stats.access}</p>
            </div>
          </div>
        </section>
      </div>
    </Header>
  );
}