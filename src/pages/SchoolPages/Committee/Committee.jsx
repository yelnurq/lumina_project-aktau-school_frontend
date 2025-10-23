import { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Committee.module.css";
import { Link } from "react-router-dom";

export default function Committee() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    grade: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Заявка отправлена:", formData);
    setSubmitted(true);
    setFormData({ fullName: "", email: "", grade: "", message: "" });
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
                    <li>Приёмная комиссия</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>Обучение</h1>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.committeeSection}>
        </section>
      </div>
    </Header>
  );
}
