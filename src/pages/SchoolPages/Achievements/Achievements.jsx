import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Achievements.module.css";
import AchievementsGallery from "../../../components/Achievements/AchievementsGallery";

// 1. Объект с переводами
const translations = {
  ru: {
    breadcrumbs: {
      home: "Главная",
      current: "Достижения"
    },
    pageTitle: "Достижения наших учеников"
  },
  kk: {
    breadcrumbs: {
      home: "Басты бет",
      current: "Жетістіктер"
    },
    pageTitle: "Оқушыларымыздың жетістіктері"
  }
};

export default function Achievements() {
  // 2. Состояние языка и синхронизация с Header
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('app_lang') || 'ru');
    };
    // Проверка изменений каждые 500мс для мгновенного отклика
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

        <section className={styles.achievementsSection}>
          {/* Если компонент AchievementsGallery тоже содержит текст, 
            его нужно будет обновить похожим образом внутри него самого.
          */}
          <AchievementsGallery />
        </section>
      </div>
    </Header>
  );
}