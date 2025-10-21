import { useState } from "react";
import styles from "./LoremIpsumGenerator.module.css";
import { Link } from "react-router-dom";

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState("paragraphs"); // paragraphs | chars | words
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [noLimit, setNoLimit] = useState(false);

  const MAX_CHARS = 50000; 
  const MAX_WORDS = 10000; 
  const MAX_PARAGRAPHS = 100;

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
    "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
    "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam",
    "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
    "aliquip", "ex", "ea", "commodo", "consequat", "lumina", "dev", "blogs", "edu"
  ];

  // лимиты для разных режимов
  const getLimit = () => {
    if (mode === "chars") return MAX_CHARS;
    if (mode === "words") return MAX_WORDS;
    return MAX_PARAGRAPHS;
  };

  // проверка превышения лимита
  const limitExceeded = !noLimit && count > getLimit();

  // Генерация случайного предложения
  const generateSentence = () => {
    const wordsCount = 6 + Math.floor(Math.random() * 8);
    let words = [];
    for (let i = 0; i < wordsCount; i++) {
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
      words.push(randomWord);
    }
    let sentence = words.join(" ");
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  };

  const handleGenerate = () => {
    if (limitExceeded) return; // защита
    let result = "";

    if (mode === "paragraphs") {
      const numParagraphs = Math.max(
        1,
        noLimit ? Number(count) : Math.min(Number(count), MAX_PARAGRAPHS)
      );
      result = Array.from({ length: numParagraphs }, () => {
        const numSentences = 3 + Math.floor(Math.random() * 4); 
        return Array.from({ length: numSentences }, () => generateSentence()).join(" ");
      }).join("\n\n");
    } 
    else if (mode === "chars") {
      const numChars = Math.max(
        10,
        noLimit ? Number(count) : Math.min(Number(count), MAX_CHARS)
      );
      let text = "";
      while (text.length < numChars) {
        text += generateSentence() + " ";
      }
      result = text.slice(0, numChars);
    } 
    else if (mode === "words") {
      const numWords = Math.max(
        1,
        noLimit ? Number(count) : Math.min(Number(count), MAX_WORDS)
      );
      let words = [];
      for (let i = 0; i < numWords; i++) {
        const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
        words.push(randomWord);
      }
      result = words.join(" ");
    }

    setOutput(result);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert("✅ Текст скопирован!");
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lorem-ipsum.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📄 Lorem Ipsum Генератор</h2>

      <div className={styles.controls}>
        <label className={styles.label}>
          Режим:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={styles.input}
          >
            <option value="paragraphs">Абзацы</option>
            <option value="chars">Символы</option>
            <option value="words">Слова</option>
          </select>
        </label>

        <label className={styles.label}>
          Количество:
          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className={styles.input}
          />
        </label>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={noLimit}
            onChange={() => setNoLimit(!noLimit)}
          />
          Без ограничений
        </label>
      </div>

      {limitExceeded && (
        <p style={{ color: "red", marginTop: "5px" }}>
          ⚠ Введено {count}, а лимит для режима «{mode}» — {getLimit()}. 
          Чтобы сгенерировать больше — снимите ограничение.
        </p>
      )}

      <div className={styles.buttonGroup}>
        <Link to="/" className={styles.actionButton}>⬅ Домой</Link>
        <button
          onClick={handleGenerate}
          className={styles.actionButton}
          disabled={limitExceeded}
        >
          ▶ Сгенерировать
        </button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!output}>
          📋 Копировать
        </button>
        <button onClick={handleDownload} className={styles.actionButton} disabled={!output}>
          💾 Скачать
        </button>
      </div>

      <div className={styles.preview}>
        <textarea
          className={styles.textarea}
          value={output}
          readOnly
          rows={12}
          placeholder="Здесь появится сгенерированный текст..."
        />
      </div>
    </div>
  );
}
