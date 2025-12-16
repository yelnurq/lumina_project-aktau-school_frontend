import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import SeoHelmet from '../../components/SeoHelmet';

// 1. Объект с переводами
const translations = {
  ru: {
    seoTitle: "Страница не найдена",
    seoDesc: "Страница, которую вы ищете, не найдена. Вернитесь на главную страницу Lumina или попробуйте другой раздел.",
    seoKeywords: "404, не найдено, Lumina, страницы нет",
    title: "Страница не найдена",
    message: "К сожалению, такой страницы не существует или она была удалена.",
    backBtn: "Вернуться на главную"
  },
  kk: {
    seoTitle: "Бет табылмады",
    seoDesc: "Сіз іздеген бет табылмады. Lumina басты бетіне оралыңыз немесе басқа бөлімді байқап көріңіз.",
    seoKeywords: "404, табылмады, Lumina, бет жоқ",
    title: "Бет табылмады",
    message: "Өкінішке орай, мұндай бет жоқ немесе ол өшірілген.",
    backBtn: "Басты бетке оралу"
  }
};

export default function NotFound() {
  // 2. Состояние языка и синхронизация
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
    <div className={styles.container}>
      <SeoHelmet
        title={t.seoTitle}
        description={t.seoDesc}
      />

      <div className={styles.content}>
        <h1>404</h1>
        <h2>{t.title}</h2>
        <p>{t.message}</p>
        <Link to="/" className={styles.homeLink}>{t.backBtn}</Link>
      </div>
    </div>
  );
}