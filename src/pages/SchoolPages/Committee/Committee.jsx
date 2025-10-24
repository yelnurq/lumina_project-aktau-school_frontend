import { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Committee.module.css";
import { Link } from "react-router-dom";

export default function Committee() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    grade: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Заявка отправлена:", formData);
    setSubmitted(true);
    setFormData({ fullName: "", email: "", grade: "", message: "" });
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Header>
      <div className={styles.container}>
        {/* ===== HEADER ===== */}
        <section
          className={styles.pageHeader}
          style={{ backgroundImage: `url('/images/admissions-office.jpg')` }}
        >
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">Главная</Link></li>
                    <li>/</li>
                    <li>Приёмная комиссия</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>Приёмная комиссия</h1>
              </div>
            </div>
          </div>
        </section>

        {/* ===== INFO SECTION ===== */}
        <section className={styles.committeeSection}>
          <div className={styles.sectionContent}>
            <h2>Добро пожаловать в приёмную комиссию</h2>
            <p>
              Мы рады приветствовать будущих учеников и их родителей! 
              Наша приёмная комиссия поможет вам пройти все этапы поступления, 
              ответит на вопросы и предоставит подробную информацию об обучении.
            </p>
            <p>
              Поступление в нашу школу — это первый шаг к успешному образовательному пути.
              Мы создаём условия, где каждый ребёнок может раскрыть свой потенциал.
            </p>
          </div>
          <img
            src="/images/admissions.jpg"
            alt="Приёмная комиссия"
            className={styles.sectionImage}
          />
        </section>

        {/* ===== STEPS SECTION ===== */}
        <section className={styles.cardsSection}>
          <h2>Этапы поступления</h2>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <img src="/images/form.jpg" alt="Заявка" />
              <h3>1. Подача заявки</h3>
              <p>Заполните онлайн-форму или посетите школу лично для подачи документов.</p>
            </div>
            <div className={styles.card}>
              <img src="/images/interview.jpg" alt="Собеседование" />
              <h3>2. Собеседование</h3>
              <p>Проводится ознакомительное интервью с родителями и учеником.</p>
            </div>
            <div className={styles.card}>
              <img src="/images/decision.jpg" alt="Решение" />
              <h3>3. Решение комиссии</h3>
              <p>После рассмотрения заявки комиссия принимает решение о зачислении.</p>
            </div>
          </div>
        </section>

        {/* ===== APPLICATION FORM ===== */}
        <section className={styles.formSection}>
          <h2>Подать заявку на поступление</h2>
          {submitted ? (
            <p className={styles.successMessage}>Спасибо! Ваша заявка успешно отправлена.</p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="fullName"
                placeholder="ФИО ребёнка"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email для связи"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="grade"
                placeholder="Класс поступления"
                value={formData.grade}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Комментарий или вопрос"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" className={styles.submitBtn}>Отправить заявку</button>
            </form>
          )}
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section className={styles.faqSection}>
          <h2>Часто задаваемые вопросы</h2>
          <div className={styles.faqList}>
            {[
              {
                question: "С какого возраста принимаются дети?",
                answer: "Мы принимаем учеников начиная с 1-го класса — обычно с 6,5–7 лет.",
              },
              {
                question: "Какие документы нужны для поступления?",
                answer: "Необходимо предоставить свидетельство о рождении, медицинскую карту и заявление родителей.",
              },
              {
                question: "Можно ли подать документы онлайн?",
                answer: "Да, вы можете заполнить электронную форму прямо на нашем сайте.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openFAQ === index ? styles.open : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                {openFAQ === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Header>
  );
}
