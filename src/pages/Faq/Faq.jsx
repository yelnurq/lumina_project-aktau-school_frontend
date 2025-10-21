import { useState } from "react";
import styles from "./Faq.module.css";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import SeoHelmet from "../../components/SeoHelmet";

const faqs = [
  {
    question: "Что такое Lumina?",
    answer: "Lumina — это современная студия, которая создает сайты, онлайн-сервисы и цифровые продукты под ключ."
  },
  {
    question: "Вы делаете сайты на заказ?",
    answer: "Да, мы разрабатываем сайты любой сложности: лендинги, интернет-магазины, порталы, системы онлайн-обучения."
  },
  {
    question: "Есть ли гарантия на проект?",
    answer: "Да, мы предоставляем гарантию на исправность и стабильность работы сайта. В течение гарантийного срока мы бесплатно устраняем технические ошибки."
  },
  {
    question: "Какие этапы разработки?",
    answer: "1. Анализ и обсуждение проекта.\n2. Дизайн и прототип.\n3. Разработка и тестирование.\n4. Запуск и поддержка."
  },
  {
    question: "Сколько стоит создание сайта?",
    answer: "Стоимость зависит от сложности проекта. Мы предлагаем гибкую систему цен — от простых лендингов до крупных порталов."
  },
  {
    question: "Можно ли доработать мой текущий сайт?",
    answer: "Да, мы занимаемся доработкой и оптимизацией уже существующих сайтов."
  },
  {
    question: "Вы делаете адаптивные сайты?",
    answer: "Да, все проекты Lumina автоматически адаптируются под мобильные устройства, планшеты и компьютеры."
  },
  {
    question: "Какие технологии вы используете?",
    answer: "Мы работаем с современными технологиями: React, Laravel, Tailwind, MySQL, API-интеграции."
  },
  {
    question: "Можно ли подключить оплату на сайте?",
    answer: "Да, мы интегрируем онлайн-оплату (Kaspi, Halyk, Visa, Mastercard, PayPal и другие системы)."
  },
  {
    question: "Вы помогаете с продвижением?",
    answer: "Да, мы предлагаем базовую SEO-оптимизацию и настройку аналитики."
  },
  {
    question: "Сколько времени занимает разработка?",
    answer: "Сроки зависят от сложности проекта: от 1 недели для лендинга до 2-3 месяцев для крупных систем."
  },
  {
    question: "Даете ли вы админ-панель?",
    answer: "Да, каждый сайт получает удобную админ-панель для управления контентом."
  },
  {
    question: "Есть ли поддержка после сдачи проекта?",
    answer: "Да, у нас есть пакеты технической поддержки для клиентов."
  },
  {
    question: "Как вы обеспечиваете безопасность сайта?",
    answer: "Мы настраиваем защиту от взломов, используем SSL-сертификаты, делаем регулярные бэкапы."
  },
  {
    question: "Можно ли заказать сайт с уникальным дизайном?",
    answer: "Конечно! Мы создаем индивидуальный дизайн с нуля под ваши цели и стиль компании."
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
           <>
           <SeoHelmet
         title="FAQ | Lumina — ответы на вопросы"
        description="Часто задаваемые вопросы о Lumina: услуги по разработке сайтов, онлайн-олимпиады, блоги и IT-платформа."
        keywords="Lumina, FAQ, часто задаваемые вопросы, веб-разработка, услуги, блог, онлайн-олимпиады"
       />
   <Header>
        <div className={styles.container}>
                    <nav className={styles.breadcrumbs}>
          <ol>
            <li><Link to="/">Главная</Link></li>
            <li>/</li>
            <li>FAQ - Часто задаваемые вопросы</li>
          </ol>
        </nav>
                        <section className={styles.faqSection}>
      <h2 className={styles.title}>FAQ - Часто задаваемые вопросы</h2>
      <ul className={styles.faqList}>
        {faqs.map((faq, index) => (
          <li key={index} className={styles.faqItem}>
            <button
              className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className={styles.icon}>{openIndex === index ? "−" : "+"}</span>
            </button>
            <div
              className={`${styles.faqAnswer} ${openIndex === index ? styles.show : ""}`}
            >
              <p>{faq.answer}</p>
            </div>
          </li>
        ))}
      </ul>


    </section>
        </div>
    </Header>
    </>
  );
}
