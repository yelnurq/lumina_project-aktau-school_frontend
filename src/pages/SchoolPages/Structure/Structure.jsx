import { useState } from "react";
import Header from "../../../components/Header";
// Убедитесь, что файл стилей называется Structure.module.css
import styles from "./Structure.module.css"; 
import { Link } from "react-router-dom";
// Используем иконки, подходящие для отображения персонала и их ролей
import { FaUserTie, FaChalkboardTeacher, FaBookReader, FaGlobe, FaDumbbell, FaLaptop, FaMusic, FaStar } from "react-icons/fa"; 

// Компонент теперь отображает структуру/состав
export default function Structure() {

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Список учителей и их должностей (на русском языке)
  const teachersData = [
    { name: "Туленова Айтолкын Джумабаевна", position: "Директор", icon: <FaUserTie className={styles.icon} /> },
    { name: "Турсунгалиева Дана Турдыбекқызы", position: "Заместитель директора по воспитательной работе (ТЖО)", icon: <FaChalkboardTeacher className={styles.icon} /> },
    { name: "Алиева Ақмарал Базарбайқызы", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Байгулова Жамила Конарбаевна", position: "Учитель физической культуры", icon: <FaDumbbell className={styles.icon} /> },
    { name: "Ескалиева Айгуль Есенжановна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Ерсултанова Жансулу Довлетовна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Исаева Мейрамгул Турганбаевна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Иса Мадина Серикқызы", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Конирова Сауле Тынышлыковна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Конисбаева Валя Ишановна", position: "Учитель художественного труда", icon: <FaStar className={styles.icon} /> },
    { name: "Конысбаева Марзия Сапарбаевна", position: "Учитель информатики", icon: <FaLaptop className={styles.icon} /> },
    { name: "Лұқпан Наурызгүл Қуатқызы", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Мейрова Майра Хамидовна", position: "Учитель физической культуры", icon: <FaDumbbell className={styles.icon} /> },
    { name: "Мусрепова Нурбике Санатуллаевна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Нарембаева Жарқын Беркбаевна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Нұрғалиева Гүлназ Бақтыбайқызы", position: "Учитель английского языка", icon: <FaGlobe className={styles.icon} /> },
    { name: "Нуржанова Карлыгаш Бахтияровна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Сойунбаева Акзер Базарбаевна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Туркменбаева Арайлым Жеңісбайқызы", position: "Учитель иностранного языка", icon: <FaGlobe className={styles.icon} /> },
    { name: "Утегенова Гульнара Айтжановна", position: "Учитель русского языка", icon: <FaBookReader className={styles.icon} /> },
    { name: "Утесинова Айгул Оринбаевна", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Ускинбаева Назгуль Бакытжанкызы", position: "Учитель начальных классов", icon: <FaBookReader className={styles.icon} /> },
    { name: "Худайбергенова Шара Мамонтовна", position: "Учитель музыки", icon: <FaMusic className={styles.icon} /> },
    { name: "Ізімберген Данияр Мамбетұлы", position: "Учитель физической культуры", icon: <FaDumbbell className={styles.icon} /> },
    { name: "Іляс Гүлдана Саматқызы", position: "Учитель русского языка", icon: <FaBookReader className={styles.icon} /> },
  ];


  // Функции для определения соответствующей иконки на основе должности
  const getIconForPosition = (position) => {
    if (position.includes("Директор") || position.includes("Заместитель")) return <FaUserTie className={styles.icon} />;
    if (position.includes("начальных классов")) return <FaBookReader className={styles.icon} />;
    if (position.includes("физической культуры")) return <FaDumbbell className={styles.icon} />;
    if (position.includes("английского языка") || position.includes("иностранного языка")) return <FaGlobe className={styles.icon} />;
    if (position.includes("информатики")) return <FaLaptop className={styles.icon} />;
    if (position.includes("музыки")) return <FaMusic className={styles.icon} />;
    return <FaChalkboardTeacher className={styles.icon} />; // Иконка по умолчанию
  };


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
                    {/* Обновлено: "Кружки" заменено на "Состав учителей" */}
                    <li>Состав учителей</li>
                  </ol>
                </nav>
                {/* Обновлено: "Кружки" заменено на "Состав учителей" */}
                <h1 className={styles.pageTitle}>Состав учителей</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Секция о составе */}
        <section className={styles.committeeSection}>
          <div className={styles.sectionContent}>
            <h2>Администрация и педагогический коллектив</h2>
            <p>
            Наш педагогический коллектив — это команда высококвалифицированных и преданных своему делу 
            профессионалов. Мы создаем благоприятную атмосферу для обучения и развития, 
            используя современные методики и индивидуальный подход к каждому ученику.
          </p>

          <p>
            Учителя регулярно проходят курсы повышения квалификации и активно участвуют в 
            научных и методических разработках, чтобы обеспечить высокое качество образования 
            в соответствии с современными стандартами.
          </p>
          </div>

        </section>

    {/* Секция с карточками всех учителей */}
    <section className={styles.cardsSection}>
      <h2>Список педагогов школы</h2>
      <div className={styles.cardsGrid}>
        {/* Отображаем список учителей */}
        {teachersData.map((teacher, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>
              {/* Используем функцию для определения иконки */}
              {getIconForPosition(teacher.position)}
            </div>
            <h3>{teacher.name}</h3>
            <p>{teacher.position}</p>
          </div>
        ))}
      </div>

    </section>

        {/* Секция FAQ удалена или заменена на краткую информацию */}
        <section className={styles.faqSection} style={{marginTop:50}}>
          <h2>Обратная связь</h2>
          <div className={styles.faqList}>
             <p>Если у вас есть вопросы к конкретному педагогу, вы можете обратиться через классного руководителя или администрацию школы.</p>
             <p>Мы ценим сотрудничество с родителями и всегда готовы к диалогу!</p>
          </div>
        </section>
      </div>
    </Header>
  );
}