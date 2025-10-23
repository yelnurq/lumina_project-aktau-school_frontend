import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <Header>
      <div className={styles.container}>
        <section
          className={styles.pageHeader}
          style={{ backgroundImage: `url('/images/elementary-school-classroom-design.jpg')` }}
        >
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">Главная</Link></li>
                    <li>/</li>
                    <li>Обучение</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>Обучение</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.eduSection}>
          <div className={styles.sectionContent}>
            <h2>Современный подход к обучению</h2>
            <p>
              В нашей школе реализуются инновационные программы, объединяющие классические методы и современные технологии.
              Каждый ученик вовлечён в процесс обучения через интерактив, проектную деятельность и командную работу.
            </p>
            <p>
              Мы стремимся сделать образование не просто обязательным процессом, а увлекательным путешествием,
              где знания — это инструмент для будущих свершений.
            </p>
          </div>
          <img src="/images/main.jpg" alt="Современный класс" className={styles.sectionImage} />
        </section>

        <section className={styles.cardsSection}>
          <h2>Основные направления обучения</h2>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <img src="/images/main.jpg" alt="IT" />
              <h3>Информационные технологии</h3>
              <p>Кодинг, робототехника, веб-разработка и цифровая грамотность с ранних классов.</p>
            </div>
            <div className={styles.card}>
              <img src="/images/main.jpg" alt="Languages" />
              <h3>Иностранные языки</h3>
              <p>Английский, турецкий, казахский и другие языки с применением разговорных методик.</p>
            </div>

          </div>
        </section>

        <section className={`${styles.eduSection} ${styles.reverse}`}>
          <img src="/images/main.jpg" alt="Внеурочная жизнь" className={styles.sectionImage} />
          <div className={styles.sectionContent}>
            <h2>Внеурочная жизнь школы</h2>
            <p>
              Мы верим, что личность формируется не только на уроках. 
              Поэтому в школе активно развиваются спортивные секции, клубы программирования, театральная студия и дебаты.
            </p>
            <blockquote className={styles.quote}>
              “Образование — это не подготовка к жизни. Образование — это сама жизнь.”  
              <span>— Джон Дьюи</span>
            </blockquote>
          </div>
        </section>

        <section className={styles.digitalSection}>
          <div className={styles.textBlock}>
            <h2>Цифровая школа</h2>
            <p>
              Мы внедряем электронные дневники, онлайн-олимпиады, индивидуальные цифровые профили учеников.  
              Все образовательные ресурсы доступны родителям и ученикам в один клик.
            </p>
          </div>
          <div className={styles.stats}>
            <div>
              <h3>+25</h3>
              <p>онлайн-платформ</p>
            </div>
            <div>
              <h3>100%</h3>
              <p>учеников используют цифровые ресурсы</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>доступ к материалам</p>
            </div>
          </div>
        </section>


      </div>
    </Header>
  );
}
