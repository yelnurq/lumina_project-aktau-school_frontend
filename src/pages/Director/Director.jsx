import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Director.module.css";
import Header from "../../components/Header";
import axiosInstance from "../../axiosConfig";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function Director() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    text: "",
  });

  const [status, setStatus] = useState(null); // null | loading | success | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await axiosInstance.post("/api/ticket", formData);
      setStatus("success");
      setFormData({ name: "", email: "", title: "", text: "" });
      console.log(response.data);

      // скрыть сообщение через 3 сек
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    }
  };

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

              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Ваше имя</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Электронная почта</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title">Тема обращения</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Например: Вопрос по расписанию"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="text">Сообщение</label>
                  <textarea
                    id="text"
                    rows="5"
                    placeholder="Введите текст сообщения..."
                    value={formData.text}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                  {status === "loading" ? "Отправка..." : "Отправить сообщение"}
                </button>
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

      {status && (
        <div className={styles.overlayLoader}>
          {status === "loading" && <FaSpinner className={`${styles.icon} ${styles.spin}`} />}
          {status === "success" && <FaCheckCircle className={`${styles.icon} ${styles.success}`} />}
          {status === "error" && <FaTimesCircle className={`${styles.icon} ${styles.error}`} />}
        </div>
      )}
    </Header>
  );
}
