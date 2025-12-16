import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import styles from "./Structure.module.css"; 
import { Link } from "react-router-dom";
import { FaUserTie, FaChalkboardTeacher, FaBookReader, FaGlobe, FaDumbbell, FaLaptop, FaStar } from "react-icons/fa"; 

const translations = {
  ru: {
    breadcrumbs: { home: "Главная", current: "Состав учителей" },
    pageTitle: "Состав учителей",
    sectionTitle: "Администрация и педагогический коллектив",
    description1: "Наш педагогический коллектив — это команда высококвалифицированных и преданных своему делу профессионалов. Мы создаем благоприятную атмосферу для обучения и развития, используя современные методики и индивидуальный подход к каждому ученику.",
    description2: "Учителя регулярно проходят курсы повышения квалификации и активно участвуют в научных и методических разработках, чтобы обеспечить высокое качество образования в соответствии с современными стандартами.",
    listTitle: "Список педагогов школы по категориям",
    groups: {
      admin: "Администрация",
      elementary: "Учителя начальных классов",
      subject: "Учителя-предметники"
    },
    positions: {
      director: "Директор",
      deputy: "Заместитель директора по воспитательной работе (ТЖО)",
      elemTeacher: "Учитель начальных классов",
      physEd: "Учитель физической культуры",
      english: "Учитель английского языка",
      foreign: "Учитель иностранного языка",
      russian: "Учитель русского языка",
      informatics: "Учитель информатики",
      art: "Учитель художественного труда",
      music: "Учитель музыки"
    }
  },
  kk: {
    breadcrumbs: { home: "Басты бет", current: "Мұғалімдер құрамы" },
    pageTitle: "Мұғалімдер құрамы",
    sectionTitle: "Әкімшілік және педагогикалық ұжым",
    description1: "Біздің педагогикалық ұжым — өз ісіне берілген жоғары білікті мамандар командасы. Біз заманауи әдістемелерді және әрбір оқушыға жеке тәсілді қолдана отырып, оқу мен даму үшін қолайлы жағдай жасаймыз.",
    description2: "Мұғалімдер білім берудің жоғары сапасын қамтамасыз ету үшін үнемі біліктілікті арттыру курстарынан өтіп, ғылыми-әдістемелік жұмыстарға белсенді қатысады.",
    listTitle: "Мектеп педагогтарының санаттар бойынша тізімі",
    groups: {
      admin: "Әкімшілік",
      elementary: "Бастауыш сынып мұғалімдері",
      subject: "Пән мұғалімдері"
    },
    positions: {
      director: "Директор",
      deputy: "Директордың тәрбие ісі жөніндегі орынбасары (ТЖО)",
      elemTeacher: "Бастауыш сынып мұғалімі",
      physEd: "Дене шынықтыру пәнінің мұғалімі",
      english: "Ағылшын тілі мұғалімі",
      foreign: "Шет тілі мұғалімі",
      russian: "Орыс тілі мұғалімі",
      informatics: "Информатика пәнінің мұғалімі",
      art: "Көркем еңбек мұғалімі",
      music: "Музыка пәнінің мұғалімі"
    }
  }
};

export default function Structure() {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'ru');
  const t = translations[lang];

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('app_lang') || 'ru');
    };
    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

  // Формируем список учителей, используя ключи перевода для должностей и групп
  const teachersData = [
    { name: "Туленова Айтолкын Джумабаевна", posKey: "director", groupKey: "admin" },
    { name: "Турсунгалиева Дана Турдыбекқызы", posKey: "deputy", groupKey: "admin" },
    
    { name: "Алиева Ақмарал Базарбайқызы", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Ескалиева Айгуль Есенжановна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Ерсултанова Жансулу Довлетовна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Исаева Мейрамгул Турганбаевна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Иса Мадина Серикқызы", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Конирова Сауле Тынышлыковна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Лұқпан Наурызгүл Қуатқызы", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Мусрепова Нурбике Санатуллаевна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Нарембаева Жарқын Беркбаевна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Нуржанова Карлыгаш Бахтияровна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Сойунбаева Акзер Базарбаевна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Утесинова Айгул Оринбаевна", posKey: "elemTeacher", groupKey: "elementary" },
    { name: "Ускинбаева Назгуль Бакытжанкызы", posKey: "elemTeacher", groupKey: "elementary" },

    { name: "Байгулова Жамила Конарбаевна", posKey: "physEd", groupKey: "subject" },
    { name: "Мейрова Майра Хамидовна", posKey: "physEd", groupKey: "subject" },
    { name: "Ізімберген Данияр Мамбетұлы", posKey: "physEd", groupKey: "subject" },
    { name: "Нұрғалиева Гүлназ Бақтыбайқызы", posKey: "english", groupKey: "subject" },
    { name: "Туркменбаева Арайлым Жеңісбайқызы", posKey: "foreign", groupKey: "subject" },
    { name: "Утегенова Гульнара Айтжановна", posKey: "russian", groupKey: "subject" },
    { name: "Іляс Гүлдана Саматқызы", posKey: "russian", groupKey: "subject" },
    { name: "Конысбаева Марзия Сапарбаевна", posKey: "informatics", groupKey: "subject" },
    { name: "Конисбаева Валя Ишановна", posKey: "art", groupKey: "subject" },
    { name: "Худайбергенова Шара Мамонтовна", posKey: "music", groupKey: "subject" },
  ];

  const groupedTeachers = teachersData.reduce((acc, teacher) => {
    const groupName = t.groups[teacher.groupKey];
    (acc[groupName] = acc[groupName] || []).push(teacher);
    return acc;
  }, {});

  const getIconForPosition = (posKey) => {
    if (posKey === "director" || posKey === "deputy") return <FaUserTie className={styles.icon} />;
    if (posKey === "elemTeacher") return <FaBookReader className={styles.icon} />;
    if (posKey === "physEd") return <FaDumbbell className={styles.icon} />;
    if (posKey === "english" || posKey === "foreign") return <FaGlobe className={styles.icon} />;
    if (posKey === "informatics") return <FaLaptop className={styles.icon} />;
    if (posKey === "music" || posKey === "art") return <FaStar className={styles.icon} />;
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
                    <li><Link to="/">{t.breadcrumbs.home}</Link></li>
                    <li>/</li>
                    <li>{t.breadcrumbs.current}</li>
                  </ol>
                </nav>
                <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.committeeSection}>
          <div className={styles.sectionContent}>
            <h2>{t.sectionTitle}</h2>
            <p>{t.description1}</p>
            <p>{t.description2}</p>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <h2>{t.listTitle}</h2>
          
          {Object.keys(groupedTeachers).map((groupName, groupIndex) => (
            <div key={groupIndex} className={styles.teacherGroup}>
              <h3 className={styles.groupTitle}>{groupName} ({groupedTeachers[groupName].length})</h3>
              <div className={styles.cardsGrid}>
                {groupedTeachers[groupName].map((teacher, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.iconWrapper}>
                      {getIconForPosition(teacher.posKey)}
                    </div>
                    <h4>{teacher.name}</h4>
                    <p>{t.positions[teacher.posKey]}</p>
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