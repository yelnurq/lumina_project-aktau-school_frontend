import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import styles from "./Admin.module.css";
import AdminHeader from "../../components/AdminHeader";
import { FaEnvelope, FaTicketAlt, FaClipboardList } from "react-icons/fa";

const AdminMessages = () => {
  const [tickets, setTickets] = useState([]);
  const [orderTickets, setOrderTickets] = useState([]);
  const [emails, setEmails] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // модалка
  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (text) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalText("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    axiosInstance
      .get("/api/admin/messages")
      .then((res) => {
        setTickets(res.data.tickets ?? []);
        setOrderTickets(res.data.orderTickets ?? []);
        setEmails(res.data.emails ?? []);
      })
      .catch(() => setError("Ошибка загрузки сообщений"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.adminNews}>
          {/* Итоговые блоки */} <div className={styles.summary}> <div className={styles.summaryBlock}> <p className={styles.summaryTitle}> <FaTicketAlt className={styles.icon} /> {tickets?.length ?? 0} </p> <p className={styles.summaryDesc}>Тикетов</p> </div>
          
            </div>
          {loading ? (
            <>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
            </>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.tables}>

              <h3>Таблица тикетов (Поддержка)</h3>
                  <div className={styles.tableWrapper}>
              <table className={styles.ticketsTable}>
                                    <thead>
                  <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Сообщение</th>
                    <th>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          className={styles.showBtn}
                          onClick={() => openModal(item.text)}
                        >
                          👁️
                        </button>
                      </td>
                      <td>
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                  </div>



            </div>
          )}

          {/* ✅ Модальное окно */}
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Сообщение</h3>
                <p>{modalText}</p>
                <button className={styles.closeBtn} onClick={closeModal}>
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMessages;
