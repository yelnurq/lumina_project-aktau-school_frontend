import { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Committee.module.css";
import { Link } from "react-router-dom";
import { FaFileAlt, FaComments, FaCheckCircle } from "react-icons/fa";

export default function Committee() {

  const [openFAQ, setOpenFAQ] = useState(null);



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
                <h1 className={styles.pageTitle}>Приёмная комиссия</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.committeeSection}>
          <div className={styles.sectionContent}>
            <h2>Добро пожаловать в приёмную комиссию</h2>
            <p>
            Мы рады приветствовать будущих учеников и их родителей! 
            Наша приёмная комиссия поможет вам пройти все этапы поступления, 
            ответит на вопросы и предоставит подробную информацию об обучении. 
            Мы стремимся сделать процесс поступления максимально удобным, прозрачным и дружелюбным, 
            чтобы каждая семья чувствовала поддержку и внимание с первых шагов.
          </p>

          <p>
            Поступление в нашу школу — это первый шаг к успешному образовательному пути.
            Мы создаём условия, где каждый ребёнок может раскрыть свой потенциал, 
            проявить свои способности и интерес к обучению. 
            Особое внимание уделяется индивидуальному подходу, развитию критического мышления, 
            цифровой грамотности и навыков общения.
          </p>

          <p>
            Образовательная программа школы сочетает в себе лучшие традиции классического образования 
            и современные инновационные методики. Мы уделяем большое внимание изучению иностранных языков, 
            информационных технологий и развитию творческого мышления. 
            Благодаря этому наши ученики успешно участвуют в олимпиадах, конкурсах и научных проектах.
          </p>


          <p>
            Мы уверены, что выбор школы — это важный шаг для каждой семьи. 
            Поэтому мы готовы помочь вам принять правильное решение и сделать первые шаги 
            к успешному будущему вашего ребёнка вместе с нами.
          </p>

          </div>

        </section>

    <section className={styles.cardsSection}>
      <h2>Этапы поступления</h2>
      <div className={styles.cardsGrid}>
  <div className={styles.card}>
    <div className={styles.iconWrapper}>
      <FaFileAlt className={styles.icon} />
    </div>
    <h3>1. Подача заявки</h3>
    <p>
      Подайте заявление в приёмную комиссию школы и предоставьте необходимые документы лично.
    </p>
  </div>

  <div className={styles.card}>
    <div className={styles.iconWrapper}>
      <FaComments className={styles.icon} />
    </div>
    <h3>2. Собеседование</h3>
    <p>
      Проводится краткое интервью с родителями и ребёнком, чтобы познакомиться и определить уровень готовности.
    </p>
  </div>

  <div className={styles.card}>
    <div className={styles.iconWrapper}>
      <FaCheckCircle className={styles.icon} />
    </div>
    <h3>3. Решение комиссии</h3>
    <p>
      После рассмотрения документов и результатов собеседования комиссия принимает решение о зачислении.
    </p>
  </div>
      </div>

    </section>




        <section className={styles.faqSection} style={{marginTop:50}}>
          <h2>Часто задаваемые вопросы</h2>
          <div className={styles.faqList}>
  {[
    {
      question: "С какого возраста принимаются дети?",
      answer: "Мы принимаем учеников начиная с 1-го класса — обычно с 6,5–7 лет.",
    },
    {
      question: "Какие документы нужны для поступления?",
      answer:
        "Необходимо предоставить заявление родителей, свидетельство о рождении ребёнка, медицинскую карту и две фотографии 3×4.",
    },
    {
      question: "Когда начинается приём документов?",
      answer:
        "Приём документов в первый класс начинается с 1 апреля и продолжается до конца мая. Для других классов — при наличии свободных мест.",
    },
    {
      question: "Проводится ли вступительное собеседование?",
      answer:
        "Да, для всех поступающих проводится краткое собеседование с педагогом и психологом, чтобы определить уровень подготовки ребёнка.",
    },
    {
      question: "Есть ли подготовительные курсы для будущих первоклассников?",
      answer:
        "Да, при школе работают подготовительные группы, где дети знакомятся с основами чтения, письма и математики в игровой форме.",
    },
    {
      question: "Как формируются классы?",
      answer:
        "Классы формируются с учётом возраста, уровня знаний и индивидуальных особенностей детей. Мы стараемся обеспечить равномерное распределение учеников.",
    },
    {
      question: "Можно ли выбрать профиль или углублённое направление обучения?",
      answer:
        "Да, начиная с 5-го класса, ученики могут выбирать углублённое изучение предметов — английского языка, информатики или математики.",
    },
  ].map((item, index) => (
    <div
      key={index}
      className={`${styles.faqItem} ${openFAQ === index ? styles.open : ""}`}
      onClick={() => toggleFAQ(index)}
    >
      <h3>{item.question}</h3>
      {openFAQ === index && <p>{item.answer}</p>}
    </div>
  ))}
          </div>

        </section>
      </div>
    </Header>
  );
}
