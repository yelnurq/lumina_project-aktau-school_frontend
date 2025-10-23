import { Link } from "react-router-dom";
import styles from "./Director.module.css";
import Header from "../../components/Header";

export default function Director() {
  return (
    <Header>
      <div className={styles.container}>
        <section
          className={styles.pageHeader}
          style={{
            backgroundImage: `url('/images/main.jpg')`,
          }}
        >
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">Главная</Link></li>
                    <li>/</li>
                    <li>Электронная приёмная</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>Обратная связь с директором</h1>
              </div>
            </div>
          </div>
        </section>

      <section className={styles.aboutSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.formContainer}>
              <h2 className={styles.sectionTitle}>Отправьте сообщение директору</h2>
              <p className={styles.description}>
                Пожалуйста, заполните форму ниже. Ваше сообщение будет передано администрации школы.
              </p>

              <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Ваше имя</label>
                  <input type="text" id="name" placeholder="Введите ваше имя" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Электронная почта</label>
                  <input type="email" id="email" placeholder="example@mail.com" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Тема обращения</label>
                  <input type="text" id="subject" placeholder="Например: Вопрос по расписанию" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Сообщение</label>
                  <textarea id="message" rows="5" placeholder="Введите текст сообщения..." required></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>Отправить сообщение</button>
              </form>
            </div>

            <aside className={styles.directorCard}>
              <img
                src="/images/director.jpg"
                alt="Директор школы"
                className={styles.directorPhoto}
              />
              <h3 className={styles.directorName}>Асхат Куанышбеков</h3>
              <p className={styles.directorPosition}>Директор школы ИТ и иностранных языков</p>
              <p className={styles.directorContact}>
                Телефон: <a href="tel:+77015554433">+7 (701) 555-44-33</a><br />
                Email: <a href="mailto:director@school.kz">director@school.kz</a>
              </p>
            </aside>
          </div>
        </section>
      </div>
    </Header>
  );
}
