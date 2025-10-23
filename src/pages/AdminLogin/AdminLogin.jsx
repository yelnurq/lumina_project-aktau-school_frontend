import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axiosInstance.post('/api/login', {
        name,
        password
      });

      if (response.data.status === 'success') {
        const userToken = response.data.token;
        setToken(userToken);
        localStorage.setItem('token', userToken);
        setMessage('✅ Успешный вход!');
        setTimeout(() => {
          navigate('/admin/dashboard'); 
        }, 1000);
      } else {
        setMessage('❌ Неизвестная ошибка.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ Ошибка подключения к серверу.');
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <p className={styles.loginTitle}>ШКОЛА ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ И ИНОСТРАННЫХ ЯЗЫКОВ</p>
        <label className={styles.label}>Имя:</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className={styles.label}>Пароль:</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Входим...' : 'Войти'}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
