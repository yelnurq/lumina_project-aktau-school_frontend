import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './OrderAlt.module.css';
import { FaCheckCircle, FaTimesCircle,FaHandshake, FaUndoAlt, FaTools,FaArrowDown  } from 'react-icons/fa';
import axiosInstance from '../../axiosConfig';
import SeoHelmet from '../../components/SeoHelmet';

export default function Order() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [showFloating, setShowFloating] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowFloating(true);
    } else {
      setShowFloating(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  // Функция форматирования телефона
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    let result = '+7';

    if (digits.length > 1) result += ` (${digits.slice(1, 4)}`;
    if (digits.length >= 4) result += `) ${digits.slice(4, 7)}`;
    if (digits.length >= 7) result += `-${digits.slice(7, 9)}`;
    if (digits.length >= 9) result += `-${digits.slice(9, 11)}`;

    return result;
  };

  const siteTypes = [
    {
      type: 'Лендинг',
      price: 'от 80 000 ₸',
      desc: 'Одностраничный сайт для привлечения клиентов и презентации услуги, события или товара. Отлично подходит для рекламы, сбора заявок и повышения конверсии.'
    },
    {
      type: 'Корпоративный сайт',
      price: 'от 180 000 ₸',
      desc: 'Полноценный сайт для компании с разделами "О нас", услуги, новости, контакты, портфолио и форма обратной связи. Представляет бизнес в интернете и повышает доверие.'
    },
    {
      type: 'Сложная система',
      price: 'от 380 000 ₸',
      desc: 'Многофункциональные веб-приложения: личные кабинеты, панели управления, авторизация, интеграция с базами данных и внешними сервисами, API, расписания и аналитика.'
    },
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

const handleSendOrder = async () => {
  setIsSubmitting(true);
  setSubmissionResult(null);

  try {
    await axiosInstance.post('/api/orderticket', {
      type: selectedType?.type,
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
    });

    setTimeout(() => {
      setSubmissionResult('success');
      setSelectedType(null);
      setFormData({ name: '', phone: '', message: '' });
          setStep(4);
    }, 1000);
  } catch (err) {
    console.error('Ошибка при отправке:', err);
    setTimeout(() => setSubmissionResult('error'), 800);
  } finally {
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult(null);
    }, 2500);
  }
};


  return (
    <>
    <SeoHelmet
      title="Заказать сайт | Lumina"
      description="Разработка современных сайтов под ключ: лендинги, корпоративные сайты и сложные системы. Адаптивный дизайн, высокая скорость и поддержка."
      keywords="заказать сайт, лендинг, корпоративный сайт, веб-разработка, Lumina"
      url="https://lumina.kz/order"
      image="https://lumina.kz/preview-image.png"
      type="website"
      jsonLdType="Product"
      siteName="Lumina"
    />


    <Header>
      <div className={styles.orderMain}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <ol>
              <li><Link to="/">Главная</Link></li>
              <li>/</li>
              <li>Заказать сайт</li>
            </ol>
          </nav>

          <div className={styles.main}>
            <div className={styles.text}>
              <p className={styles.title}>LUMINA.<span className={styles.dev}>dev</span></p>
              <p className={styles.desc}>Разработка современных и эффективных сайтов под ключ</p>
              <p className={styles.info}>
                Мы создаём сайты и веб-приложения на заказ — от лендингов до сложных онлайн-систем.
                Адаптивный дизайн, высокая скорость загрузки, удобная админка и техническая поддержка.
                Расскажите нам о своём проекте — и мы предложим лучшее решение.
              </p>
            </div>
<div className={`${styles.modalAction} ${styles.modalActionAlt}`}>
            
            <button className={styles.modalBtn} onClick={() => setStep(1)}>
              Заказать сайт
            </button>
      </div>

          </div>
         
        </div>
                <div className={styles.arrowDown}>
        <FaArrowDown />
      </div>
      </div>
{step > 0 && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.progressBarWrapper}>
  <div
    className={styles.progressBar}
    style={{
      width: `${(step - 1) * 33.33}%`,
      transition: 'width 0.3s ease',
    }}
  ></div>
</div>

      {step === 1 && (
        <>
          <h2>Выберите тип сайта</h2>
          <ul className={styles.siteTypeList}>
            {siteTypes.map((item) => (
              <li
                key={item.type}
                className={`${styles.siteTypeItem} ${selectedType?.type === item.type ? styles.active : ''}`}
                onClick={() => setSelectedType(item)}
              >
                <strong>{item.type}</strong> — <span>{item.price}</span>
              </li>
            ))}
          </ul>
          {selectedType && (
            <div className={styles.siteDesc}>
              <p><strong>{selectedType.type}</strong></p>
              <p>{selectedType.desc}</p>
            </div>
          )}
          <div className={styles.modalActions}>
            <button onClick={() => setStep(2)} disabled={!selectedType} className={styles.nextBtn}>
              Начать оформление
            </button>
            <button onClick={() => setStep(0)} className={styles.closeBtn}>Отмена</button>
          </div>
        </>
      )}

{step === 2 && (
  <>
    <h2>Оформление заявки: {selectedType?.type}</h2>
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setStep(3); // переход к проверке
      }}
    >
<input
  type="text"
  placeholder="Ваше имя"
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  required
/>

<input
  type="tel"
  placeholder="+7 777 123 4567"
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: formatPhone(e.target.value),
    })
  }
  maxLength={18}
  required
/>


<textarea
  placeholder="Кратко опишите проект: цели, сроки, функции..."
  rows="4"
  value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
/>

                <div className={styles.modalActions} style={{marginTop:10}}>

      <button type="submit" className={styles.nextBtn}>Продолжить</button>
      <button type="button" className={styles.closeBtn} onClick={() => setStep(1)}>
        Назад
      </button>
        </div>
    </form>
  </>
)}


      {step === 3 && (
  <>
    <h2>Проверьте данные</h2>
    <div className={styles.review}>
      <p><strong>Тип сайта:</strong> {selectedType?.type}</p>
      <p><strong>Имя:</strong> {formData.name}</p>
      <p><strong>Телефон:</strong> {formData.phone}</p>
      <p><strong>Описание:</strong> {formData.message || '—'}</p>
    </div>
    <div className={styles.modalActions}>
     <button
      className={styles.nextBtn}
      onClick={handleSendOrder}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Отправка...' : 'Подтвердить'}
    </button>

      <button className={styles.closeBtn} onClick={() => setStep(2)}>
        Назад
      </button>
    </div>
  </>
)}
{step === 4 && (
  <div className={styles.success}>
    <h2>Спасибо за обращение!</h2>
    <p>Мы свяжемся с вами в ближайшее время.</p>
    <button
      className={styles.closeBtn}
      
      onClick={() => {
        setStep(0);
        setSelectedType(null);
        setFormData({ name: '', phone: '', message: '' });
      }}
    >
      Закрыть
    </button>
  </div>
)}

    </div>
  </div>
)}
{isSubmitting && (
  <div className={styles.overlay}>
    {!submissionResult ? (
      <div className={styles.loader}></div>
    ) : submissionResult === 'success' ? (
      <FaCheckCircle className={styles.checkmark} />
    ) : (
      <FaTimesCircle className={styles.errorIcon} />
    )}
  </div>
)}
<div className={styles.whyImpContainer}>
  <div className={styles.whyImportant}>
  <h2 className={styles.sectionTitle}>Почему вашему бизнесу нужен сайт?</h2>
  
  <div className={styles.reasons}>
    <div className={styles.reasonCard}>
      <span className={styles.icon}><FaTimesCircle className={styles.icon}/></span>
      <p className={styles.reasonText}>
        Вы теряете клиентов — без сайта ваш бизнес недоступен в поиске, и до 60% людей уходят к конкурентам.
      </p>
    </div>

    <div className={styles.reasonCard}>
      <span className={styles.icon}><FaTimesCircle className={styles.icon}/></span>
      <p className={styles.reasonText}>
        Вы зависите от соцсетей — Instagram и TikTok зависят от алгоритмов, сегодня есть охваты, завтра их нет.
      </p>
    </div>

    <div className={styles.reasonCard}>
      <span className={styles.icon}><FaTimesCircle className={styles.icon}/></span>
      <p className={styles.reasonText}>
        Нет доверия — клиенты хотят видеть официальный сайт, а не только страницу в соцсетях.
      </p>
    </div>

    <div className={styles.reasonCard}>
      <span className={styles.icon}><FaTimesCircle className={styles.icon}/></span>
      <p className={styles.reasonText}>
        Вы ограничены — сайт работает 24/7 и принимает заказы, соцсети этого не дадут.
      </p>
    </div>
  </div>

  <div className={styles.cta}>
    <p className={styles.ctaText}>
      Сайт — это <span>ваша собственная</span> площадка, которая всегда работает на вас.
    </p>
  </div>
</div>
</div>



  <h2 className={styles.guaranteeTitle}>От идеи до результата</h2>


  
    <div className={styles.stats}>
      <img src="./images/line2.png" alt="" className={styles.lineImg} />

    </div>
  <div className={styles.guaranteeContainer}>

 <section className={styles.guaranteeSection}>
      <div className={styles.guaranteeLeft}>
        <h2 className={styles.verticalText}>ГАРАНТИЯ</h2>
      </div>

      <div className={styles.guaranteeRight}>
       <div className={styles.guaranteeItem}>
  <FaUndoAlt className={styles.guaranteeIcon} />
  <p>
    Возврат предоплаты, если результат не соответствует ожиданиям или условиям договора.  
  </p>
</div>

<div className={styles.guaranteeItem}>
  <FaTools className={styles.guaranteeIcon} />
  <p>
    Доработка проекта без доплат — все правки в рамках ТЗ вносим до полного соответствия.  
  </p>
</div>

<div className={styles.guaranteeItem}>
  <FaHandshake className={styles.guaranteeIcon} />
  <p>
    Сопровождение в течение 1 месяца: помощь, ответы на вопросы и мелкие корректировки.  
  </p>
</div>

    </div>
  </section>
  </div>
<button 
  className={`${styles.floatingBtn} ${showFloating ? styles.fadeIn : styles.fadeOut}`} 
  onClick={() => setStep(1)}
>
  Заказать сайт
</button>



    </Header>
    </>
  );
}
