import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Achievements.module.css";
import AchievementsGallery from "../../../components/Achievements/AchievementsGallery";

export default function Achievements() {
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
                    <li>Новости</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>Достижения наших учеников</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.achievementsSection}>
          <AchievementsGallery/>
        </section>
      </div>
    </Header>
  );
}
