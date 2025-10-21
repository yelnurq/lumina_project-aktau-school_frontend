import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './Hub.module.css';

export default function Hub() {
  const navigate = useNavigate();

  return (
    <Header>  
      <div className={styles.orderMain}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <ol>
              <li><Link to="/">Главная</Link></li>
              <li>/</li>
              <li>Сервисы</li>
              <li>/</li>
              <li>Инструменты</li>
            </ol>
          </nav>

          <div className={styles.main}>
            <div className={styles.text}>
              <p className={styles.title}>LUMINA.<span className={styles.dev}>one</span></p>
              <p className={styles.desc}>Онлайн-инструменты для учёбы, разработки и практики</p>
              <p className={styles.info}>
                Всё в одном месте: HTML/CSS редактор, Python- и SQL-консоли, песочницы для JavaScript и другие инструменты. Бесплатно и без регистрации.
              </p>
            </div>


            <div className={styles.modalAction}>

              <Link to='/hub/tools' className={styles.modalBtn}  style={{textDecoration:'none', color:'white'}}>
                  Открыть инструменты
              </Link>

            </div>

          </div>
          
        </div>
      </div>
    </Header>
  );
}
