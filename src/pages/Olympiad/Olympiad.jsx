import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './../Order/Order.module.css';
import SeoHelmet from '../../components/SeoHelmet';

export default function Olympiad() {



  return (
    <>
<SeoHelmet
  title="Онлайн-олимпиады для школьников и студентов | Lumina"
  description="Бесплатные онлайн-олимпиады по программированию, математике и IT. Участвуйте, получайте сертификаты, попадайте в рейтинги и развивайте свои навыки вместе с Lumina."
  keywords="онлайн олимпиада, олимпиада по программированию, олимпиада по математике, IT тесты, Lumina"
  url="https://lumina.kz/quiz"
  image="https://lumina.kz/preview-image.png"
  type="website"
  jsonLdType="Service"
  siteName="Lumina"
/>

    <Header>
      <div className={styles.olympMain}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <ol>
              <li><Link to="/">Главная</Link></li>
              <li>/</li>
              <li>Сервисы</li>
              <li>/</li>
              <li>Олимпиада</li>
            </ol>
          </nav>

          <div className={styles.main}>
            <div className={styles.text}>
              <p className={styles.title}>LUMINA.edu</p>
              <p className={styles.desc}>Бесплатные онлайн-олимпиады для школьников и студентов</p>
                <p className={styles.info}>
                  Участвуйте в интеллектуальных олимпиадах прямо с телефона или компьютера — быстро, удобно и бесплатно.
                  Мы предлагаем современные онлайн-платформы с автоматической проверкой, сертификатами и рейтингами.
                  Присоединяйтесь и проверьте свои знания в увлекательном формате.
                </p>
            </div>
<div className={`${styles.modalAction} ${styles.modalActionAlt}`}>

              <Link to='/quiz/start'  className={styles.modalBtn} style={{textDecoration:'none', color:'white'}}>Участвовать в олимпиаде</Link>
              <Link to='/quiz/document/verify' className={styles.modalBtn}  style={{textDecoration:'none', color:'white'}}>Проверить документ</Link>

            </div>
          </div>
        </div>
      </div>


    </Header>
    </>
  );
}
