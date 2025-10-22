import React, { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Committee.module.css";

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
      <main className={styles.committeeContainer}>
        <div className={styles.committeeHeader}>
          <h1>Приёмная комиссия</h1>
          <p>
            Добро пожаловать в школу Lumina! Здесь вы узнаете о правилах
            поступления, подадите онлайн-заявку и получите ответы на все
            вопросы.
          </p>
          <a
            href="/files/admission_rules.pdf"
            download
            className={styles.downloadBtn}
          >
            📄 Скачать правила поступления (PDF)
          </a>
        </div>

        {/* Этапы и документы */}
        <div className={styles.committeeGrid}>
          <div className={styles.committeeCard}>
            <h2>Этапы поступления</h2>
            <ol>
              <li>Подача онлайн-заявки</li>
              <li>Собеседование с приёмной комиссией</li>
              <li>Тестирование и оценка знаний</li>
              <li>Заключение договора и зачисление</li>
            </ol>
          </div>

          <div className={styles.committeeCard}>
            <h2>Необходимые документы</h2>
            <ul>
              <li>Заявление на поступление</li>
              <li>Копия удостоверения личности / свидетельства о рождении</li>
              <li>Документ об образовании</li>
              <li>2 фотографии 3x4</li>
            </ul>
          </div>
        </div>

        {/* Преимущества */}
        <div className={styles.advantagesSection}>
          <h2>Почему выбирают нашу школу</h2>
          <div className={styles.advantagesGrid}>
            <div className={styles.advantageCard}>
              <h3>🎓 Качественное образование</h3>
              <p>
                Мы обучаем по современным международным стандартам и используем
                инновационные методики преподавания.
              </p>
            </div>
            <div className={styles.advantageCard}>
              <h3>🌍 Иностранные языки</h3>
              <p>
                Изучение английского, китайского и других языков с опытными
                преподавателями.
              </p>
            </div>
            <div className={styles.advantageCard}>
              <h3>💡 Технологии и проекты</h3>
              <p>
                Ученики работают над IT-проектами, участвуют в олимпиадах и
                хакатонах, развивая свои реальные навыки.
              </p>
            </div>
          </div>
        </div>

        {/* Форма подачи */}
        <div className={styles.formSection}>
          <h2>Подать онлайн-заявку</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="fullName"
                placeholder="ФИО"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Электронная почта"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="grade"
                placeholder="Желаемый класс"
                value={formData.grade}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Дополнительная информация"
                value={formData.message}
                onChange={handleChange}
              />
              <button type="submit">Отправить заявку</button>
            </form>
          ) : (
            <div className={styles.successBox}>
              <h3>✅ Заявка успешно отправлена!</h3>
              <p>Наши специалисты свяжутся с вами в ближайшее время.</p>
              <button onClick={() => setSubmitted(false)}>
                Отправить новую заявку
              </button>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <h2>Часто задаваемые вопросы</h2>
          {[
            {
              q: "Как подать заявку на поступление?",
              a: "Вы можете заполнить онлайн-форму выше или посетить школу лично. После подачи заявки с вами свяжется приёмная комиссия.",
            },
            {
              q: "Есть ли вступительные экзамены?",
              a: "Да, проводится собеседование и тестирование по основным предметам — математике, языкам и логике.",
            },
            {
              q: "Какие классы принимаются?",
              a: "Мы принимаем учеников с 1 по 11 класс, в зависимости от наличия мест и уровня подготовки.",
            },
            {
              q: "Можно ли перевестись из другой школы?",
              a: "Да, перевод возможен после собеседования и анализа академических результатов.",
            },
          ].map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                {faq.q}
              </div>
              {openFAQ === index && (
                <div className={styles.faqAnswer}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </Header>
  );
}
