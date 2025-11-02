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
<div className={styles.directorAbout}>
  <img
    src="/images/director1.jpg"
    alt="Директор школы"
    className={styles.directorPhotoLarge}
  />
  <div className={styles.directorInfo}>
    <h3 className={styles.directorName}>Туленова Айтолқын Джумабаевна</h3>
    <p className={styles.directorPosition}>
      Директор школы ИТ и иностранных языков
    </p>

    <p className={styles.directorBioText}>
      <strong>Туған күні:</strong> 07.12.1974  
      <br />
      <strong>Туған жері:</strong> Маңғыстау облысы, Жаңаөзен қаласы
      <br />
      <strong>Педагогикалық дәрежесі:</strong> Педагог–зерттеуші  
      <br />
      <strong>Еңбек өтілі:</strong> 31 жыл
    </p>

    <p className={styles.directorBioText}>
      Т. Әлиев атындағы №1 орта мектептің түлегі.  
      1991–1994 жылдары Ақтау қаласындағы педагогикалық гуманитарлық колледжінде,
      1994–1996 жылдары Ш. Есенов атындағы Каспий технологиялар және инжиниринг университетінде 
      педагогика – психология мамандығы бойынша білім алды.  
      2010–2012 жылдары Батыс Қазақстан инновациялық–технологиялық университетінде 
      «Бастауыш оқытудың педагогикасы мен әдістемесі» мамандығы бойынша білім бакалавры дәрежесін алды.
    </p>

    <p className={styles.directorBioText}>
      Еңбек жолын Жаңаөзен қаласындағы №4 «Айгүл» балабақшасында тәрбиеші болып бастады.  
      Кейін №17 және №19 жалпы білім беретін мектептерде бастауыш сынып мұғалімі болып қызмет етті.  
      Сондай-ақ №13 «Дарын» мектеп-лицейінде және №5 мектеп-гимназияда директордың оқу ісі жөніндегі 
      орынбасары қызметін атқарды.
    </p>

    <p className={styles.directorContact}>
      <strong>Байланыс:</strong><br />
      Телефон: <a href="tel:+77022519574">+7 702 251 9574</a><br />
      Email: <a href="mailto:Aitolkyn.tulenova74@mail.ru">Aitolkyn.tulenova74@mail.ru</a><br />
      Instagram:{" "}
      <a
        href="https://www.instagram.com/tulenovaaitolkyn?igsh=eG55eTJxOTY0ZXM2"
        target="_blank"
        rel="noopener noreferrer"
      >
        @tulenovaaitolkyn
      </a>
    </p>
  </div>
</div>

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
