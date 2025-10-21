import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import styles from './Quiz.module.css';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaBrain, FaClock, FaBookOpen, FaCertificate } from 'react-icons/fa';
import SeoHelmet from '../../components/SeoHelmet';

export default function Quiz() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [result, setResult] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false); // Флаг, что викторина началась
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Индекс текущего вопроса
  const [isSubmitting, setIsSubmitting] = useState(false); // блокировка кнопки

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axiosInstance.get('/api/subjects');
        setSubjects(res.data);
      } catch (err) {
        console.error('Ошибка при получении предметов:', err);
      }
    };
    fetchSubjects();
  }, []);

const startQuiz = async () => {
  if (!firstname.trim() || !lastname.trim()) {
    alert('Пожалуйста, введите имя и фамилию');
    return;
  }

  if (!selectedSubject) {
    alert('Пожалуйста, выберите предмет');
    return;
  }

  // Проверка попытки по дате
  const lastAttempt = localStorage.getItem('quiz_last_attempt');
  const today = new Date().toISOString().split('T')[0];

  if (lastAttempt === today) {
    alert('Вы уже проходили тест сегодня. Попробуйте завтра.');
    return;
  }

  try {
    const res = await axiosInstance.get(`/api/quiz?subject_id=${selectedSubject}`);
    setQuestions(res.data);
    setAnswers({});
    setResult(null);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
  } catch (err) {
    console.error('Ошибка при загрузке вопросов:', err);
    alert('Ошибка при загрузке вопросов. Попробуйте позже.');
  }
};


  // Обработка выбора ответа на текущий вопрос
  const handleAnswerChange = (answerText) => {
    const questionId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: answerText }));
  };

  // Кнопка "Следующий вопрос"
  const nextQuestion = () => {
    if (!answers[questions[currentQuestionIndex].id]) {
      alert('Пожалуйста, выберите ответ');
      return;
    }
    setCurrentQuestionIndex(i => i + 1);
  };

  // Кнопка "Завершить тест" — отправка ответов
const finishQuiz = async () => {
  if (isSubmitting) return; // если уже нажали — ничего не делаем

  if (!answers[questions[currentQuestionIndex].id]) {
    alert('Пожалуйста, выберите ответ');
    return;
  }

  setIsSubmitting(true); // блокируем кнопку

  const formattedAnswers = Object.entries(answers).map(([questionId, answerText]) => ({
    question_id: parseInt(questionId),
    answer: answerText,
  }));

  const payload = {
    firstname,
    lastname,
    subject_id: selectedSubject,
    answers: formattedAnswers,
  };

  try {
    const response = await axiosInstance.post('/api/quiz/submit', payload);

    setResult(response.data);
    setQuizStarted(false);  // скрываем вопросы, показываем результат
    localStorage.setItem('quiz_last_attempt', new Date().toISOString().split('T')[0]);
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    alert('Произошла ошибка. Попробуйте позже.');
  } finally {
    setIsSubmitting(false); // если нужно снова включить кнопку после ошибки
  }
};
  return (
        <>
        <SeoHelmet
      title="Онлайн-олимпиады | Lumina"
      description="Участвуйте в онлайн-олимпиадах по программированию, математике и IT. Проверяйте знания, получайте сертификаты и улучшайте навыки."
      keywords="олимпиада, онлайн-олимпиада, тесты, программирование, IT, Lumina"
    />
    
    <Header>
        <div className={styles.olympMain} style={{height:'auto'}}>
                    <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
          <ol>
            <li><Link to="/">Главная</Link></li>
            <li>/</li>
            <li><Link to="/quiz">Сервисы</Link></li>
            <li>/</li>
            <li><Link to="/quiz">Олимпиада</Link></li>
            <li>/</li>
            <li>Участие</li>
          </ol>
            </nav>
          <div className={styles.quizWrapper}>

            <p className={styles.heading}>Проверка знаний по программированию</p>

            {!quizStarted && !result && (
              <>
                <div className={styles.filters}>
                  <div className={styles.filterGroup}>
                    <label>Имя:</label>
                    <input
                      type="text"
                      value={firstname}
                      onChange={e => setFirstname(e.target.value)}
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div className={styles.filterGroup}>
                    <label>Фамилия:</label>
                    <input
                      type="text"
                      value={lastname}
                      onChange={e => setLastname(e.target.value)}
                      placeholder="Введите вашу фамилию"
                    />
                  </div>


                  <div className={styles.filterGroup}>
                    <label>Направление:</label>
                    <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                      <option value="">-- Выберите --</option>
                      {subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={startQuiz}
                    disabled={!selectedSubject}
                    className={styles.filterButton}
                  >
                    <FaPlay style={{ marginRight: 8 }} /> 
                    Начать тест
                  </button>
                </div>
<div className={styles.quizStartedBlocks}>
  <div className={styles.rulesGrid}>
    <div className={styles.ruleCard}>
        <FaBrain className={styles.icon}/>
      <div className={styles.label}>20 случайных вопросов</div>
    </div>
    <div className={styles.ruleCard}>
        <FaClock className={styles.icon}/>
      <div className={styles.label}>1 попытка в день</div>
    </div>
    <div className={styles.ruleCard}>
        <FaBookOpen className={styles.icon}/>
      <div className={styles.label}>600+ вопросов в системе</div>
    </div>
    <div className={styles.ruleCard}>
        <FaCertificate className={styles.icon}/>
      <div className={styles.label}>Выдаётся сертификат</div>
    </div>

  </div>
<div className={styles.ruleCard} style={{ marginTop: 20, width:'auto'}}>
  <div className={styles.icon} style={{ fontSize: 36, color: '#16a34a' }}>₸</div>
  <div className={styles.label}>
    <strong>абсолютно бесплатно</strong>
  </div>
</div>


  <div className={styles.cert}>
      <div className={styles.label}>Пример сертификата</div>

      <img src="/images/diploma.jpg" alt="" />
  </div>
</div>


              </>
            )}

            {quizStarted && questions.length > 0 && (
              <div className={styles.quizBlock}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Показываем один вопрос */}
                <div className={styles.card}>
                  <h3 className={styles.title}>{questions[currentQuestionIndex].question}</h3>
                  <div className={styles.cardContent}>
                    {questions[currentQuestionIndex].answers.map(a => (
                      <label key={a.text} className={styles.answer}>
                        <input
                          type="radio"
                          name={`question-${questions[currentQuestionIndex].id}`}
                          value={a.text}
                          checked={answers[questions[currentQuestionIndex].id] === a.text}
                          onChange={() => handleAnswerChange(a.text)}
                        />
                        {a.text}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.filterBtns}>
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={() => setCurrentQuestionIndex(i => i - 1)}
                      className={styles.prevButton}
                      style={{ marginRight: 10 }}
                    >
                      Назад
                    </button>
                  )}

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={nextQuestion} className={styles.filterButton}>
                      Следующий вопрос
                    </button>
                  ) : (
                  <button
                    onClick={finishQuiz}
                    className={styles.filterButton}
                    disabled={isSubmitting} // делает кнопку визуально неактивной
                  >
                    {isSubmitting ? 'Отправка...' : 'Завершить тест'}
                  </button>

                  )}
                </div>
              </div>
            )}

            {result && (
              <div className={styles.resultBlock}>
                <div className={styles.buttonBackBlock}>
                  <button
                    onClick={() => {
                      setFirstname('');
                      setLastname('');
                      setSelectedSubject('');
                      setQuestions([]);
                      setAnswers({});
                      setResult(null);
                      setQuizStarted(false);
                    }}
                    className={styles.backButton}
                  >
                        <FaArrowLeft className={styles.icon} />
                  </button>

                </div>
                <div className={styles.resultBlocks}>

                <div className={styles.leftResultBlock}>
                    <p className={styles.text}><strong>Баллы:</strong> {result.score} из 20</p>
                    <p className={styles.text}><strong>Документ №:</strong> {result.document_number}</p>
                {result.diploma_base64 && (
                    
                    <div className={styles.resultButtons}>
                      <a
                      href={result.diploma_base64}
                      download={`diploma-${result.document_number}.png`}
                      className={styles.filterButton}
                      style={{marginTop:10, textAlign:'center'}}
                    >
                      Скачать диплом
                    </a>

                    </div>
                )}

                </div>

                {result.diploma_base64 && (
                  <div className={styles.rightResultBlock}>
                    <img src={result.diploma_base64} alt="Диплом" className={styles.diplomaImage} />
                  </div>
                )}
                </div>

              </div>
            )}
          </div>

    </div>
        </div>
    </Header>
    </>
  );
}
