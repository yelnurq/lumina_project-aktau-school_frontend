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

  // Полный список учителей и их должностей
  const teachersData = [
    { name: "Туленова Айтолкын Джумабаевна", position: "Директор", group: "Администрация" },
    { name: "Турсунгалиева Дана Турдыбекқызы", position: "Заместитель директора по воспитательной работе (ТЖО)", group: "Администрация" },
    
    // Начальные классы
    { name: "Алиева Ақмарал Базарбайқызы", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Ескалиева Айгуль Есенжановна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Ерсултанова Жансулу Довлетовна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Исаева Мейрамгул Турганбаевна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Иса Мадина Серикқызы", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Конирова Сауле Тынышлыковна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Лұқпан Наурызгүл Қуатқызы", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Мусрепова Нурбике Санатуллаевна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Нарембаева Жарқын Беркбаевна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Нуржанова Карлыгаш Бахтияровна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Сойунбаева Акзер Базарбаевна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Утесинова Айгул Оринбаевна", position: "Учитель начальных классов", group: "Учителя начальных классов" },
    { name: "Ускинбаева Назгуль Бакытжанкызы", position: "Учитель начальных классов", group: "Учителя начальных классов" },

    // Предметники
    { name: "Байгулова Жамила Конарбаевна", position: "Учитель физической культуры", group: "Учителя-предметники" },
    { name: "Мейрова Майра Хамидовна", position: "Учитель физической культуры", group: "Учителя-предметники" },
    { name: "Ізімберген Данияр Мамбетұлы", position: "Учитель физической культуры", group: "Учителя-предметники" },

    { name: "Нұрғалиева Гүлназ Бақтыбайқызы", position: "Учитель английского языка", group: "Учителя-предметники" },
    { name: "Туркменбаева Арайлым Жеңісбайқызы", position: "Учитель иностранного языка", group: "Учителя-предметники" },
    
    { name: "Утегенова Гульнара Айтжановна", position: "Учитель русского языка", group: "Учителя-предметники" },
    { name: "Іляс Гүлдана Саматқызы", position: "Учитель русского языка", group: "Учителя-предметники" },

    { name: "Конысбаева Марзия Сапарбаевна", position: "Учитель информатики", group: "Учителя-предметники" },
    { name: "Конисбаева Валя Ишановна", position: "Учитель художественного труда", group: "Учителя-предметники" },
    { name: "Худайбергенова Шара Мамонтовна", position: "Учитель музыки", group: "Учителя-предметники" },
  ];

  // Группируем данные по группам
  const groupedTeachers = teachersData.reduce((acc, teacher) => {
    (acc[teacher.group] = acc[teacher.group] || []).push(teacher);
    return acc;
  }, {});

  // Функции для определения соответствующей иконки на основе должности
  const getIconForPosition = (position) => {
    if (position.includes("Директор") || position.includes("Заместитель")) return <FaUserTie className={styles.icon} />;
    if (position.includes("начальных классов")) return <FaBookReader className={styles.icon} />;
    if (position.includes("физической культуры")) return <FaDumbbell className={styles.icon} />;
    if (position.includes("английского языка") || position.includes("иностранного языка")) return <FaGlobe className={styles.icon} />;
    if (position.includes("информатики")) return <FaLaptop className={styles.icon} />;
    if (position.includes("музыки") || position.includes("художественного труда")) return <FaStar className={styles.icon} />;
    return <FaChalkboardTeacher className={styles.icon} />;
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
                    <li>Состав учителей</li>
                  </ol>
                </nav>
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

        {/* Секция с карточками учителей, сгруппированными по ролям */}
        <section className={styles.cardsSection}>
          <h2>Список педагогов школы по категориям</h2>
          
          {Object.keys(groupedTeachers).map((groupName, groupIndex) => (
            <div key={groupIndex} className={styles.teacherGroup}>
              <h3 className={styles.groupTitle}>{groupName} ({groupedTeachers[groupName].length})</h3>
              <div className={styles.cardsGrid}>
                {groupedTeachers[groupName].map((teacher, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.iconWrapper}>
                      {getIconForPosition(teacher.position)}
                    </div>
                    <h4>{teacher.name}</h4>
                    <p>{teacher.position}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </section>

      </div>
    </Header>
  );
}