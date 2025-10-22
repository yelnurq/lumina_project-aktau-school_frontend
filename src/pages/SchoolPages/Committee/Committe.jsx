import React from "react";
import Header from "../../../components/Header";
import styles from "./Committee.module.css";

export default function Committee() {
  return (
    <>
      <Header />
      <section className={styles.committeeContainer}>
        <div className={styles.committeeHeader}>
          <h1>Приёмная комиссия</h1>
          <p>
            Здесь вы можете узнать всё о правилах поступления, необходимых
            документах и этапах зачисления в нашу школу.
          </p>
        </div>

        <div className={styles.committeeContent}>
          <div className={styles.committeeCard}>
            <h2>📋 Этапы поступления</h2>
            <ul>
              <li>Подача онлайн-заявки</li>
              <li>Собеседование с приёмной комиссией</li>
              <li>Проверка знаний и способностей</li>
              <li>Подписание договора и начало обучения</li>
            </ul>
          </div>

          <div className={styles.committeeCard}>
            <h2>📁 Необходимые документы</h2>
            <ul>
              <li>Заявление на поступление</li>
              <li>
                Копия удостоверения личности (или свидетельства о рождении)
              </li>
              <li>Документ об образовании</li>
              <li>Фото 3x4 — 2 штуки</li>
            </ul>
          </div>

          <div className={styles.committeeCard}>
            <h2>📞 Контакты приёмной комиссии</h2>
            <p>📧 info@lumina.kz</p>
            <p>☎ +7 (700) 123-45-67</p>
            <p>⏰ Пн–Пт: 9:00 – 18:00</p>
          </div>
        </div>
      </section>
    </>
  );
}
