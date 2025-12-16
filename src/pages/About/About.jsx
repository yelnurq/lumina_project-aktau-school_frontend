import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import Header from "../../components/Header";

const translations = {
  ru: {
    breadcrumbs: { home: "Главная", current: "Контакты" },
    pageTitle: "Контактная информация",
    fullNameLabel: "Полное название:",
    fullName: "«Школа информационных технологий и иностранных языков города Жаңаөзен»",
    descriptionLabel: "Описание:",
    desc1: "Современное образовательное учреждение, где сочетаются классическое обучение и современные цифровые технологии. Здесь учащиеся получают качественные знания по основным школьным предметам, а также углублённо изучают программирование, робототехнику и иностранные языки.",
    desc2: "Коллектив школы состоит из профессиональных педагогов, которые используют инновационные методики преподавания, активно внедряют ИКТ в учебный процесс и развивают у обучающихся критическое мышление, креативность и коммуникативные навыки. Ученики школы принимают участие в городских и республиканских олимпиадах, проектах и конкурсах, занимают призовые места и прославляют город Жаңаөзен.",
    table: {
      phone: "Телефон",
      mobile: "Мобильный",
      email: "Электронная почта",
      address: "Адрес",
      addressVal: "Мангистауская область, Жанаозен, улица Нургисы Тилендиева",
      workTime: "Время работы",
      days: "Пн–Пт: 09:00 – 18:00"
    },
    mapTitle: "Школа ИТ и иностранных языков на карте"
  },
  kk: {
    breadcrumbs: { home: "Басты бет", current: "Байланыс" },
    pageTitle: "Байланыс ақпараты",
    fullNameLabel: "Толық атауы:",
    fullName: "«Жаңаөзен қаласының ақпараттық технологиялар және шет тілдері мектебі»",
    descriptionLabel: "Сипаттама:",
    desc1: "Классикалық оқыту мен заманауи цифрлық технологиялар тоғысқан заманауи білім беру мекемесі. Мұнда оқушылар негізгі мектеп пәндері бойынша сапалы білім алып, бағдарламалауды, робототехниканы және шет тілдерін тереңдетіп оқиды.",
    desc2: "Мектеп ұжымы оқытудың инновациялық әдістемелерін қолданатын, оқу процесіне АКТ-ны белсенді енгізетін және білім алушылардың сыни ойлауын, креативтілігін және коммуникативті дағдыларын дамытатын кәсіби педагогтардан тұрады. Мектеп оқушылары қалалық және республикалық олимпиадаларға, жобалар мен конкурстарға қатысып, жүлделі орындарға ие болып, Жаңаөзен қаласының абыройын асқақтатуда.",
    table: {
      phone: "Телефон",
      mobile: "Мобильді",
      email: "Электрондық пошта",
      address: "Мекенжайы",
      addressVal: "Маңғыстау облысы, Жаңаөзен, Нұрғиса Тілендиев көшесі",
      workTime: "Жұмыс уақыты",
      days: "Дс–Жм: 09:00 – 18:00"
    },
    mapTitle: "Картадағы АТ және шет тілдері мектебі"
  }
};

export default function About() {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

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
          style={{
            backgroundImage: `url('/images/_gluster_2024_9_1_e1cefa2375f4156782ca3fc06d7219bb_original.199626.jpeg')`,
          }}
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

        <section className={styles.aboutSection}>
          <div className={styles.infoWrapper}>
            <div className={styles.schoolInfo}>
              <p style={{ fontWeight: 500 }}>
                <strong>{t.fullNameLabel}</strong><br />
                {t.fullName}
              </p>

              <p>
                <strong>{t.descriptionLabel}</strong><br />
                {t.desc1}
              </p>

              <p>{t.desc2}</p>
            </div>

            <table className={styles.contactTable}>
              <tbody>
                <tr>
                  <th>{t.table.phone}</th>
                  <td>+7 (7292) 45-67-89</td>
                </tr>
                <tr>
                  <th>{t.table.mobile}</th>
                  <td>+7 777 123 45 67</td>
                </tr>
                <tr>
                  <th>{t.table.email}</th>
                  <td>zhanaozen_it_school@mail.ru</td>
                </tr>
                <tr>
                  <th>{t.table.address}</th>
                  <td>{t.table.addressVal}</td>
                </tr>
                <tr>
                  <th>{t.table.workTime}</th>
                  <td>{t.table.days}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className={styles.map}>
            <div className={styles.mapContainer}>
              <iframe
                src="https://yandex.kz/map-widget/v1/?ll=52.875394%2C43.343706&mode=search&oid=219058251761&ol=biz&z=16.53"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                className={styles.mapFrame}
                title={t.mapTitle}
              ></iframe>
            </div>
          </section>
        </section>
      </div>
    </Header>
  );
}