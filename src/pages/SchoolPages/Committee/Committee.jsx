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
        {/* === Заголовок === */}
        <div className={styles.committeeHeader}>
          <h1>Приёмная комиссия</h1>
          <p>
            Добро пожаловать в школу Lumina! Здесь вы узнаете о правилах
            поступления, сможете подать онлайн-заявку и получить подробную
            информацию о процессе зачисления. Наша команда поможет пройти все
            этапы поступления быстро и удобно.
          </p>
          <a
            href="/files/admission_rules.pdf"
            download
            className={styles.downloadBtn}
          >
            Скачать правила поступления (PDF)
          </a>
        </div>

        {/* === Этапы и документы === */}
        <div className={styles.committeeGrid}>
          <div className={styles.committeeCard}>
            <h2>Этапы поступления</h2>
            <ol>
              <li>Подача онлайн-заявки или личное обращение в школу.</li>
              <li>Собеседование с представителями приёмной комиссии.</li>
              <li>Прохождение тестирования по основным предметам.</li>
              <li>Заключение договора и официальное зачисление в школу.</li>
            </ol>
          </div>

          <div className={styles.committeeCard}>
            <h2>Необходимые документы</h2>
            <ul>
              <li>Заполненное заявление на поступление.</li>
              <li>Копия удостоверения личности или свидетельства о рождении.</li>
              <li>Документ об образовании.</li>
              <li>2 фотографии 3x4.</li>
            </ul>
          </div>
        </div>

        {/* === Преимущества === */}
        <div className={styles.advantagesSection}>
          <h2>Почему выбирают школу Lumina</h2>
          <div className={styles.advantagesGrid}>
            <div className={styles.advantageCard}>
              <h3>Качественное образование</h3>
              <p>
                Мы реализуем современные международные стандарты обучения,
                создавая условия для всестороннего развития учеников.
              </p>
            </div>
            <div className={styles.advantageCard}>
              <h3>Изучение иностранных языков</h3>
              <p>
                Обучение английскому, китайскому и другим языкам с акцентом на
                разговорную практику и уверенность в общении.
              </p>
            </div>
            <div className={styles.advantageCard}>
              <h3>Технологии и инновации</h3>
              <p>
                Ученики разрабатывают собственные проекты, участвуют в
                олимпиадах и хакатонах, развивая критическое мышление и навыки
                XXI века.
              </p>
            </div>
          </div>
        </div>

        {/* === Форма === */}
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
                placeholder="Дополнительная информация (по желанию)"
                value={formData.message}
                onChange={handleChange}
              />
              <button type="submit">Отправить заявку</button>
            </form>
          ) : (
            <div className={styles.successBox}>
              <h3>Заявка успешно отправлена!</h3>
              <p>Наши специалисты свяжутся с вами в ближайшее время.</p>
              <button onClick={() => setSubmitted(false)}>
                Отправить новую заявку
              </button>
            </div>
          )}
        </div>

        {/* === FAQ === */}
        <div className={styles.faqSection}>
          <h2>Часто задаваемые вопросы</h2>
          {[
            {
              q: "Как подать заявку на поступление?",
              a: "Вы можете подать онлайн-заявку прямо на сайте или прийти в школу лично. После этого с вами свяжется приёмная комиссия для уточнения деталей.",
            },
            {
              q: "Есть ли вступительные экзамены?",
              a: "Да, проводится собеседование и тестирование по ключевым предметам — математике, языкам и логике.",
            },
            {
              q: "С какого возраста принимаются дети?",
              a: "Мы принимаем учеников с 6 лет — с 1 по 11 класс, в зависимости от уровня подготовки.",
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
              <div
                className={`${styles.faqAnswer} ${
                  openFAQ === index ? styles.open : ""
                }`}
              >
                {openFAQ === index && faq.a}
              </div>
            </div>
          ))}
        </div>
      </main>
    </Header>
  );
}
