import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './About.module.css';
import axiosInstance from '../../axiosConfig';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import SeoHelmet from '../../components/SeoHelmet';

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


const [submissionResult, setSubmissionResult] = useState(null);
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true);
  setSubmissionResult(null);

  try {
    await axiosInstance.post('/api/ticket', formData);
    setTimeout(() => {
      setSubmissionResult('success');
      setFormData({ name: '', email: '', text: '' });
    }, 800);
  } catch (error) {
    setTimeout(() => {
      setSubmissionResult('error');
    }, 800);
  } finally {
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult(null);
    }, 2500); // Hide overlay after 2.5s
  }
};




  return (
    <>
<SeoHelmet
  title="О нас | Lumina"
  description="Узнайте о команде Lumina, нашей миссии и проектах в сфере IT, онлайн-образования и веб-разработки."
  url="https://lumina.kz/about"

/>

    <Header>
      <main>
        <section className={styles.aboutSection}>

          <div className={styles.mainBlock}>
            
            <div className={styles.main}>
                                    <nav className={styles.breadcrumbs}>
              <ol>
                <li><Link to="/">Главная</Link></li>
                <li>/</li>
                <li>О проекте</li>
              </ol>
            </nav>
              <div className={styles.text}>
                <p className={styles.title}>LUMINA</p>
                <p className={styles.desc}>Youth Innovation & Knowledge Exchange Platform</p>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.info}>
              <p className={styles.descInfo}>
                  LUMINA — платформа для доступа к актуальным IT-ресурсам, разработке решений и образовательным возможностям.              </p>
            </div>
            <div className={styles.mission}>
              <div className={styles.leftBlock}>
                <p className={styles.descMission}>Наша цель</p>
              </div>
              <div className={styles.rightBlock}>
                <p className={styles.descInfo}>
Дать удобный доступ к IT-ресурсам в одном месте.
Мы собрали статьи, олимпиады и услуги по созданию сайтов, чтобы пользователям было проще развиваться, учиться и запускать свои проекты.                </p>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={styles.statCard}>
                <p className={styles.statNumber}>200+</p>
                <p className={styles.statLabel}>Выдано дипломов</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statNumber}>600+</p>
                <p className={styles.statLabel}>IT-вопросов в базе</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statNumber}>20</p>
                <p className={styles.statLabel}>Статей в неделю</p>
              </div>
            </div>
            <div className={`${styles.mission} ${styles.missionAlt}`}>
              <div className={styles.leftBlock}>
                <p className={styles.descMission}>Наш путь</p>
              </div>
              <div className={styles.rightBlock}>
                <p className={styles.descInfo}>
Мы растем вместе с вами.
Мы делаем первые шаги, развиваем сервисы и открыты к новым идеям. Все, что мы создаем — с расчетом на пользу и простоту.
                </p>
              </div>
            </div>
          
    <div className={styles.contactForm}>
              <div className={styles.formBlock}>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>Напишите нам</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  maxLength={50}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Ваш email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  maxLength={100}
                />

                <textarea
                  name="text"
                  placeholder="Сообщение..."
                  value={formData.text}
                  onChange={handleChange}
                  className={styles.textarea}
                  required
                  maxLength={5000}
                />


                  <button type="submit" className={styles.submitBtn}>Отправить</button>
                </form>
              </div>
            </div>

          </div>
        </section>
  {isSubmitting && (
    <div className={styles.overlay}>
      {!submissionResult ? (
        <div className={styles.loader}></div>
      ) : submissionResult === 'success' ? (
        <FaCheckCircle className={styles.checkmark} />
      ) : (
        <FaTimesCircle className={styles.errorIcon} />
      )}
    </div>
  )}


      </main>
    </Header>
    </>
  );
}