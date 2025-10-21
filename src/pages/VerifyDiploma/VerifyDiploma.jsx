import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Header from '../../components/Header';
import axiosInstance from '../../axiosConfig';
import { Link } from 'react-router-dom';
import verifyStyles from './VerifyDiploma.module.css';
import styles from './../Order/Order.module.css';

export default function VerifyDiploma() {
  const [documentNumber, setDocumentNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await axiosInstance.get(`/api/verify-diploma/${documentNumber}`);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при проверке.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Header>
      <div className={styles.olympMain}>
        <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <ol>
            <li><Link to="/">Главная</Link></li>
            <li>/</li>
            <li><Link to="/quiz">Сервисы</Link></li>
            <li>/</li>
            <li><Link to="/quiz">Олимпиада</Link></li>
            <li>/</li>
            <li>Проверка диплома</li>
          </ol>
        </nav>

        <div className={verifyStyles.quizWrapper}>
          <p className={verifyStyles.description}>
            Введите номер диплома, чтобы проверить его подлинность. Вы увидите имя участника, предмет, баллы и дату участия.
          </p>

          <div className={verifyStyles.form}>
            <input
              type="number"
              placeholder="Введите номер документа"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className={verifyStyles.input}
            />
            <button onClick={handleCheck} className={verifyStyles.button} disabled={loading || !documentNumber.trim()}
>
              <FaSearch style={{ marginRight: 8 }} /> Проверить
            </button>
          </div>         
   
          {loading ? (
  <div className={verifyStyles.skeleton}>
    {/* Здесь можно добавить анимацию скелетона */}
  </div>
) : result ? (
  <div className={verifyStyles.result}>
    <p><strong>Имя:</strong> {result.firstname} {result.lastname}</p>
    <p><strong>Область знаний:</strong> {result.subject}</p>
    <p><strong>Баллы:</strong> {result.score}</p>
    <p><strong>Дата:</strong> {new Date(result.created_at).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}</p>
  </div>
) : error ? (
  <div className={verifyStyles.result}>
    <p className={verifyStyles.error}>{error}</p>
  </div>
) : (
  <div className={verifyStyles.skeleton}>
  </div>
)}


        </div>
      </div>
      </div>
    </Header>
  );
}
