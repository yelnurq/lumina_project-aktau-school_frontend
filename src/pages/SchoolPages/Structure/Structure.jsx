import { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Circles.module.css";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaRobot, FaDumbbell, FaChess, FaBook, FaLanguage, FaHome, FaStar } from "react-icons/fa"; // Добавлены новые иконки для разнообразия

// Переименован компонент в Circles (Кружки)
export default function Circles() {

  const [openFAQ, setOpenFAQ] = useState(null);



  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Список кружков (на русском языке)
  const circlesList = [
    { name: "IT (Программирование)", icon: <FaLaptopCode className={styles.icon} />, description: "Освоение основ кодирования, создание простых игр и приложений." },
    { name: "Робототехника", icon: <FaRobot className={styles.icon} />, description: "Конструирование, программирование и управление роботами." },
    { name: "Гимнастика", icon: <FaDumbbell className={styles.icon} />, description: "Развитие гибкости, координации и силы, формирование правильной осанки." },
    { name: "Каратэ", icon: <FaStar className={styles.icon} />, description: "Обучение боевым искусствам, развитие дисциплины и самоконтроля." },
    { name: "Шахматы", icon: <FaChess className={styles.icon} />, description: "Тренировка логического мышления, стратегического планирования и памяти." },
    { name: "Английский язык", icon: <FaLanguage className={styles.icon} />, description: "Углубленное изучение лексики и грамматики, практика разговорной речи." },
    { name: "Русский язык", icon: <FaBook className={styles.icon} />, description: "Повышение грамотности, развитие навыков письма и анализа текста." },
    { name: "Выполнение домашнего задания", icon: <FaHome className={styles.icon} />, description: "Организованная помощь и контроль при подготовке домашних заданий." },
  ];

  // Информация о кружках для отображения в секции CardsSection
  // activityCards теперь соответствует полному списку circlesList
  const activityCards = circlesList.map(circle => ({
    icon: circle.icon,
    title: circle.name,
    description: circle.description,
  }));


  return (
    <Header>
      <div className={styles.container}>
        <section
          className={styles.pageHeader}
          style={{ backgroundImage: `url('/images/elementary-school-classroom-design.jpg')` }} // Рекомендуется заменить фоновое изображение на более подходящее теме
        >
          <div className={styles.overlay}>
            <div className={styles.main}>
              <div className={styles.inner}>
                <nav className={styles.breadcrumbs}>
                  <ol>
                    <li><Link to="/">Главная</Link></li>
                    <li>/</li>
                    {/* Обновлено: "Приёмная комиссия" заменено на "Кружки" */}
                    <li>Кружки</li>
                  </ol>
                </nav>
                {/* Обновлено: "Приёмная комиссия" заменено на "Кружки" */}
                <h1 className={styles.pageTitle}>Кружки</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Секция о кружках */}
        <section className={styles.committeeSection}>
          <div className={styles.sectionContent}>
            <h2>Дополнительное образование и кружки</h2>
            <p>
            Наша школа предлагает широкий спектр дополнительных занятий и кружков, 
            направленных на всестороннее развитие учеников. Мы помогаем детям 
            раскрыть творческий, спортивный и интеллектуальный потенциал за рамками 
            основной учебной программы.
          </p>

          <p>
            Внеклассные занятия развивают важные социальные навыки, такие как работа 
            в команде, дисциплина и самоорганизация. Регулярные занятия в кружках 
            помогают формировать полезные привычки и интересы, которые могут стать 
            основой для будущей профессии.
          </p>

          <p>
            Ученики могут выбрать занятия по интересам:
          </p>

          {/* Список кружков */}
          <ul className={styles.circlesList}>
            {circlesList.map((item, index) => (
                <li key={index}>{item.name}</li>
            ))}
          </ul>
          {/* Конец списка кружков */}


          <p>
            Запишите вашего ребёнка на пробное занятие, чтобы он мог выбрать 
            направление по душе!
          </p>

          </div>

        </section>

    {/* Секция с карточками всех кружков */}
    <section className={styles.cardsSection}>
      <h2>Подробный список кружков</h2>
      <div className={styles.cardsGrid}>
        {/* Используем полный список activityCards, который теперь содержит все 8 кружков */}
        {activityCards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

    </section>

        {/* Секция вопросов-ответов по теме "Кружки" */}
        <section className={styles.faqSection} style={{marginTop:50}}>
          <h2>Часто задаваемые вопросы о кружках</h2>
          <div className={styles.faqList}>
  {[
    {
      question: "Как записаться в кружок?",
      answer: "Запись производится через классного руководителя или напрямую у руководителя кружка. Заявление от родителей обязательно.",
    },
    {
      question: "Со скольки лет можно посещать кружки?",
      answer: "Большинство кружков доступны для учеников с 1-го класса. Некоторые спортивные и технические секции могут иметь ограничения по возрасту.",
    },
    {
      question: "Какова продолжительность занятий?",
      answer:
        "Продолжительность одного занятия обычно составляет 45 или 60 минут, в зависимости от направления и возраста учеников.",
    },
    {
      question: "Можно ли посещать несколько кружков одновременно?",
      answer:
        "Да, ученик может посещать любое количество кружков, если расписание не пересекается и нагрузка не вредит основной учёбе.",
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