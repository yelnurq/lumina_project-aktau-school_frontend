import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Director.module.css";
import Header from "../../components/Header";
import axiosInstance from "../../axiosConfig";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const translations = {
  ru: {
    breadcrumbs: { home: "Главная", current: "Электронная приёмная" },
    pageTitle: "Обратная связь с директором",
    directorPos: "Директор школы ИТ и иностранных языков",
    bio: {
      birthday: "Дата рождения:",
      birthplace: "Место рождения:",
      region: "Мангистауская область, г. Жанаозен",
      degree: "Педагогическая степень:",
      degreeVal: "Педагог–исследователь",
      experience: "Стаж работы:",
      years: "31 год",
      text1: "Выпускница средней школы №1 имени Т. Алиева.",
      text2: "В 1991–1994 годах училась в педагогическом гуманитарном колледже г. Актау, в 1994–1996 годах — в Каспийском университете технологий и инжиниринга имени Ш. Есенова по специальности «Педагогика и психология». В 2010–2012 годах получила степень бакалавра образования по специальности «Педагогика и методика начального обучения» в Западно-Казахстанском инновационно-технологическом университете.",
      text3: "Трудовую деятельность начала воспитателем в детском саду №4 «Айгуль» г. Жанаозен. Позже работала учителем начальных классов в общеобразовательных школах №17 и №19. Также занимала должность заместителя директора по учебной работе в школе-лицее №13 «Дарын» и школе-гимназии №5.",
      contacts: "Контакты:",
    },
    form: {
      title: "Отправьте сообщение директору",
      desc: "Пожалуйста, заполните форму ниже. Ваше сообщение будет передано администрации школы.",
      nameLabel: "Ваше имя",
      namePlaceholder: "Введите ваше имя",
      emailLabel: "Электронная почта",
      subjectLabel: "Тема обращения",
      subjectPlaceholder: "Например: Вопрос по расписанию",
      messageLabel: "Сообщение",
      messagePlaceholder: "Введите текст сообщения...",
      submit: "Отправить сообщение",
      sending: "Отправка..."
    }
  },
  kk: {
    breadcrumbs: { home: "Басты бет", current: "Электронды қабылдау" },
    pageTitle: "Директормен кері байланыс",
    directorPos: "IT және шет тілдері мектебінің директоры",
    bio: {
      birthday: "Туған күні:",
      birthplace: "Туған жері:",
      region: "Маңғыстау облысы, Жаңаөзен қаласы",
      degree: "Педагогикалық дәрежесі:",
      degreeVal: "Педагог–зерттеуші",
      experience: "Еңбек өтілі:",
      years: "31 жыл",
      text1: "Т. Әлиев атындағы №1 орта мектептің түлегі.",
      text2: "1991–1994 жылдары Ақтау қаласындағы педагогикалық гуманитарлық колледжінде, 1994–1996 жылдары Ш. Есенов атындағы Каспий технологиялар және инжиниринг университетінде педагогика – психология мамандығы бойынша білім алды. 2010–2012 жылдары Батыс Қазақстан инновациялық–технологиялық университетінде «Бастауыш оқытудың педагогикасы мен әдістемесі» мамандығы бойынша білім бакалавры дәрежесін алды.",
      text3: "Еңбек жолын Жаңаөзен қаласындағы №4 «Айгүл» балабақшасында тәрбиеші болып бастады. Кейін №17 және №19 жалпы білім беретін мектептерде бастауыш сынып мұғалімі болып қызмет етті. Сондай-ақ №13 «Дарын» мектеп-лицейінде және №5 мектеп-гимназияда директордың оқу ісі жөніндегі орынбасары қызметін атқарды.",
      contacts: "Байланыс:",
    },
    form: {
      title: "Директорға хабарлама жіберіңіз",
      desc: "Төмендегі форманы толтырыңыз. Сіздің хабарламаңыз мектеп әкімшілігіне жіберіледі.",
      nameLabel: "Сіздің есіміңіз",
      namePlaceholder: "Есіміңізді енгізіңіз",
      emailLabel: "Электронды пошта",
      subjectLabel: "Өтініш тақырыбы",
      subjectPlaceholder: "Мысалы: Сабақ кестесі бойынша сұрақ",
      messageLabel: "Хабарлама",
      messagePlaceholder: "Хабарлама мәтінін енгізіңіз...",
      submit: "Хабарлама жіберу",
      sending: "Жіберілуде..."
    }
  }
};

export default function Director() {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('app_lang') || 'ru');
    };
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", title: "", text: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axiosInstance.post("/api/ticket", { ...formData, lang });
      setStatus("success");
      setFormData({ name: "", email: "", title: "", text: "" });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <Header>
      <div className={styles.container}>
        <section className={styles.pageHeader} style={{ backgroundImage: `url('/images/main.jpg')` }}>
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">{t.breadcrumbs.home}</Link></li>
                    <li>/</li>
                    <li>{t.breadcrumbs.current}</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.directorAbout}>
              <img src="/images/director1.jpg" alt="Director" className={styles.directorPhotoLarge} />
              <div className={styles.directorInfo}>
                <h3 className={styles.directorName}>Туленова Айтолқын Джумабаевна</h3>
                <p className={styles.directorPosition}>{t.directorPos}</p>

                <p className={styles.directorBioText}>
                  <strong>{t.bio.birthday}</strong> 07.12.1974 <br />
                  <strong>{t.bio.birthplace}</strong> {t.bio.region} <br />
                  <strong>{t.bio.degree}</strong> {t.bio.degreeVal} <br />
                  <strong>{t.bio.experience}</strong> {t.bio.years}
                </p>

                <p className={styles.directorBioText}>{t.bio.text1}</p>
                <p className={styles.directorBioText}>{t.bio.text2}</p>
                <p className={styles.directorBioText}>{t.bio.text3}</p>

                <p className={styles.directorContact}>
                  <strong>{t.bio.contacts}</strong><br />
                  Телефон: <a href="tel:+77022519574">+7 702 251 9574</a><br />
                  Email: <a href="mailto:Aitolkyn.tulenova74@mail.ru">Aitolkyn.tulenova74@mail.ru</a><br />
                  Instagram: <a href="https://www.instagram.com/tulenovaaitolkyn" target="_blank" rel="noopener noreferrer">@tulenovaaitolkyn</a>
                </p>
              </div>
            </div>

            <div className={styles.formContainer}>
              <h2 className={styles.sectionTitle}>{t.form.title}</h2>
              <p className={styles.description}>{t.form.desc}</p>

              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t.form.nameLabel}</label>
                  <input type="text" id="name" placeholder={t.form.namePlaceholder} value={formData.name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">{t.form.emailLabel}</label>
                  <input type="email" id="email" placeholder="example@mail.com" value={formData.email} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title">{t.form.subjectLabel}</label>
                  <input type="text" id="title" placeholder={t.form.subjectPlaceholder} value={formData.title} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="text">{t.form.messageLabel}</label>
                  <textarea id="text" rows="5" placeholder={t.form.messagePlaceholder} value={formData.text} onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                  {status === "loading" ? t.form.sending : t.form.submit}
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