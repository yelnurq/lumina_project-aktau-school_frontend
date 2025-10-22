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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Заявка отправлена:", formData);
    setSubmitted(true);
    setFormData({ fullName: "", email: "", grade: "", message: "" });
  };

  return (
    <>
      <Header>
      <section className={styles.committeeContainer}>
        <div className={styles.committeeHeader}>
          <h1>Приёмная комиссия</h1>
          <p>
            Здесь вы можете подать заявку на поступление, ознакомиться с
            требованиями и правилами приёма.
          </p>
        </div>

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
              <li>Фотографии 3x4 — 2 шт.</li>
            </ul>
          </div>

          <div className={styles.committeeCard}>
            <h2>Контакты</h2>
            <p><strong>Email:</strong> info@lumina.kz</p>
            <p><strong>Телефон:</strong> +7 (700) 123-45-67</p>
            <p><strong>График работы:</strong> Пн–Пт, 09:00–18:00</p>
          </div>
        </div>

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
            <p className={styles.successMessage}>
              ✅ Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
            </p>
          )}
        </div>
      </section>
      </Header>
    </>
  );
}
