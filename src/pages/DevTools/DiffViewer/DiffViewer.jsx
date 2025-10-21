import { useState, useRef } from 'react';
import { diffChars, diffWords } from 'diff';
import html2pdf from 'html2pdf.js';
import styles from './DiffViewer.module.css';

export default function DiffViewer() {
  const [original, setOriginal] = useState('');
  const [changed, setChanged] = useState('');
  const [diffResult, setDiffResult] = useState([]);
  const [stats, setStats] = useState({ addedChars: 0, removedChars: 0, addedWords: 0, removedWords: 0 });
  const reportRef = useRef(null);

  const handleCompare = () => {
    const wordDiff = diffWords(original, changed);
    const charDiff = diffChars(original, changed);
    setDiffResult(wordDiff);

    // Подсчёт символов
    let addedChars = 0;
    let removedChars = 0;
    charDiff.forEach(part => {
      if (part.added) addedChars += part.value.length;
      if (part.removed) removedChars += part.value.length;
    });

    // Подсчёт слов
    let addedWords = 0;
    let removedWords = 0;
    wordDiff.forEach(part => {
      const words = part.value.trim().split(/\s+/).filter(Boolean);
      if (part.added) addedWords += words.length;
      if (part.removed) removedWords += words.length;
    });

    setStats({ addedChars, removedChars, addedWords, removedWords });
  };

  const handleExportPDF = () => {
    if (reportRef.current) {
      html2pdf().from(reportRef.current).save('diff-report.pdf');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <button onClick={handleCompare} className={styles.button}>Сравнить</button>
        <button onClick={handleExportPDF} className={styles.button}>Сохранить как PDF</button>
      </div>

      <div className={styles.textareas}>
        <textarea
          placeholder="Оригинальный текст"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          className={styles.textarea}
        />
        <textarea
          placeholder="Изменённый текст"
          value={changed}
          onChange={(e) => setChanged(e.target.value)}
          className={styles.textarea}
        />
      </div>

      {diffResult.length > 0 && (
        <div className={styles.resultBlock} ref={reportRef}>
          <h3>📊 Отчёт о различиях</h3>
          <p>➕ Добавлено: {stats.addedChars} символов, {stats.addedWords} слов</p>
          <p>➖ Удалено: {stats.removedChars} символов, {stats.removedWords} слов</p>

          <div className={styles.diffOutput}>
            {diffResult.map((part, i) => (
              <span
                key={i}
                className={
                  part.added ? styles.added :
                  part.removed ? styles.removed : styles.same
                }
              >
                {part.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
