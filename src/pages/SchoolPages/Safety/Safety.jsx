import { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Safety.module.css";

// 1. Объект с переводами
const translations = {
  ru: {
    breadcrumbs: { home: "Главная", current: "Безопасность" },
    pageTitle: "Борьба с терроризмом и безопасность школ",
    pdfTitle: "Правила безопасности (PDF)"
  },
  kk: {
    breadcrumbs: { home: "Басты бет", current: "Қауіпсіздік" },
    pageTitle: "Терроризмге қарсы күрес және мектеп қауіпсіздігі",
    pdfTitle: "Қауіпсіздік ережелері (PDF)"
  }
};

export default function Safety() {
  // 2. Состояние языка и синхронизация
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('app_lang') || 'ru');
    };
    // Проверка изменений каждые 500мс для мгновенной реакции на переключатель в Header
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

        <section className={styles.pdfSection}>
          <div className={styles.pdfWrapper}>
            <iframe
              src="/pdf.pdf#navpanes=0&scrollbar=0"
              className={styles.pdfFrame}
              title={t.pdfTitle}
            ></iframe>
          </div>
        </section>
      </div>
    </Header>
  );
}