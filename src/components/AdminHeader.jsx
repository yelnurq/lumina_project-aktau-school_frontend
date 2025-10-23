import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminHeader.module.css';
import axiosInstance from '../axiosConfig';
import { FiLogOut } from 'react-icons/fi';

export default function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/api/logout');
            localStorage.removeItem('token'); 
            navigate('/'); 
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/admin/dashboard">Администрация</Link>
                </div>
                <div className={styles.nav}>
                    <Link to="/admin/dashboard" className={styles.navItem}>Панель</Link>
                    <Link to="/admin/messages" className={styles.navItem}>Обращения</Link>
                    <Link to="/admin/articles/create" className={styles.navItem}>Создать статью</Link>
                    <button onClick={handleLogout} className={styles.navItem}>
                        <FiLogOut /> Выйти
                    </button>

                </div>
            </div>
        </div>
    );
}
