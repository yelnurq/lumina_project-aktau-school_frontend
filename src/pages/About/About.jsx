import { Link } from "react-router-dom";
import styles from "./About.module.css";
import Header from "../../components/Header";

export default function About() {
  return (
    <Header>
      <div className={styles.container}>
        <section
          className={styles.pageHeader}
          style={{
            backgroundImage: `url('/images/_gluster_2024_9_1_e1cefa2375f4156782ca3fc06d7219bb_original.199626.jpeg')`,
          }}
        >
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">Главная</Link></li>
                    <li>/</li>
                    <li>Контакты</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>Контактная информация</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.infoWrapper}>

          <div className={styles.schoolInfo}>

  <p style={{fontWeight:500}}>
    <strong>Полное название:</strong><br />
    «Школа информационных технологий и иностранных языков города Жаңаөзен»
  </p>

  <p>
    <strong>Описание:</strong><br />
    Современное образовательное учреждение, где сочетаются классическое обучение и современные цифровые технологии.
    Здесь учащиеся получают качественные знания по основным школьным предметам, а также углублённо изучают
    программирование, робототехнику и иностранные языки.
  </p>

  <p>
    Коллектив школы состоит из профессиональных педагогов, которые используют инновационные методики преподавания,
    активно внедряют ИКТ в учебный процесс и развивают у обучающихся критическое мышление, креативность и коммуникативные навыки.
    Ученики школы принимают участие в городских и республиканских олимпиадах, проектах и конкурсах,
    занимают призовые места и прославляют город Жаңаөзен.
  </p>


</div>

            <table className={styles.contactTable}>
              <tbody>
                <tr>
                  <th>Телефон</th>
                  <td>+7 (7292) 45-67-89</td>
                </tr>
                <tr>
                  <th>Мобильный</th>
                  <td>+7 777 123 45 67</td>
                </tr>
                <tr>
                  <th>Электронная почта</th>
                  <td>zhanaozen_it_school@mail.ru</td>
                </tr>
                <tr>
                  <th>Адрес</th>
                  <td>Мангистауская область, Жанаозен, улица Нургисы Тилендиева</td>
                </tr>
                <tr>
                  <th>Время работы</th>
                  <td>Пн–Пт: 09:00 – 18:00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 🔹 Карта */}
          <section className={styles.map}>
            <div className={styles.mapContainer}>
              <iframe
                src="https://yandex.kz/map-widget/v1/?ll=52.875394%2C43.343706&mode=search&oid=219058251761&ol=biz&z=16.53"
                width="560"
                height="400"
                frameBorder="0"
                allowFullScreen
                className={styles.mapFrame}
                title="Школа ИТ и иностранных языков"
              ></iframe>
            </div>
          </section>
        </section>
      </div>
    </Header>
  );
}
