import { useState } from "react";
import styles from "./ReportGenerator.module.css";
import { Link } from "react-router-dom";

export default function ReportGenerator() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState("");

  const handleGenerate = async () => {
    if (!url) {
      setReport("❌ Укажите адрес сайта!");
      return;
    }

    try {
      const start = performance.now();
      const response = await fetch(url);
      const text = await response.text();
      const loadTime = ((performance.now() - start) / 1000).toFixed(2);

      const sizeKB = Math.round(new Blob([text]).size / 1024);
      const images = (text.match(/<img /g) || []).length;
      const metas = (text.match(/<meta /g) || []).length;

      const generated = `📊 Отчёт по сайту: ${url}

✅ Время загрузки: ${loadTime}s
✅ Размер HTML: ${sizeKB} KB
🖼️ Кол-во картинок: ${images}
🔖 Кол-во метатегов: ${metas}

SEO: ${metas > 3 ? "Хорошо" : "Нужно улучшить"}
      `;

      setReport(generated);
    } catch (e) {
      setReport("⚠ Ошибка: не удалось загрузить сайт");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.txt";
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Введите адрес сайта (https://...)"
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Link to="/" className={styles.actionButton}>⬅ Домой</Link>
        <button onClick={handleGenerate} className={styles.actionButton}>
          ▶ Сгенерировать
        </button>
        {report && (
          <button onClick={handleDownload} className={styles.actionButton}>
            ⬇ Скачать TXT
          </button>
        )}
      </div>

      <div className={styles.preview}>
        <pre className={styles.textarea}>{report || "Отчёт появится здесь..."}</pre>
      </div>
    </div>
  );
}
