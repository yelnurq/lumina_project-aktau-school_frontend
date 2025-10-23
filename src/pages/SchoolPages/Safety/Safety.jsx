import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Safety.module.css";

export default function Safety() {
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
                <h1 className={styles.pageTitle}>Борьба с терроризмом и безопасность школ</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.pdfSection}>
          <div className={styles.pdfWrapper}>
            <iframe
              src="./../pdf.pdf"
              className={styles.pdfFrame}
              title="Правила безопасности"
            ></iframe>
          </div>
        </section>
      </div>
    </Header>
  );
}
