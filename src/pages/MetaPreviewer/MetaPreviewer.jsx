import { useState } from 'react';
import styles from './MetaPreviewer.module.css';

const demoHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="og:title" content="Yoda — Your Own Data Access">
  <meta property="og:description" content="Платформа с уникальными dev-инструментами: редакторы, генераторы, конвертеры. Всё в одном месте.">
  <meta property="og:image" content="https://via.placeholder.com/600x300.png?text=Yoda+Preview">
  <meta property="og:url" content="https://yoda.tools">
  
  <meta name="twitter:title" content="Yoda — Dev Tools для разработчиков">
  <meta name="twitter:description" content="Редактор кода, color picker, генератор дипломов, превью meta и многое другое.">
  <meta name="twitter:image" content="https://via.placeholder.com/600x300.png?text=Yoda+Twitter">
</head>
</html>
`;

export default function MetaPreviewer() {
  const [htmlInput, setHtmlInput] = useState('');
  const [metaData, setMetaData] = useState(null);

  const parseMetaTags = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const metaTags = Array.from(doc.getElementsByTagName('meta'));

    const data = {};
    metaTags.forEach(tag => {
      const property = tag.getAttribute('property') || tag.getAttribute('name');
      const content = tag.getAttribute('content');
      if (property && content) {
        data[property] = content;
      }
    });

    setMetaData(data);
  };

  const loadDemo = () => {
    setHtmlInput(demoHTML);
    setMetaData(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <button onClick={parseMetaTags} className={styles.button}>
          🔍 Парсить и показать превью
        </button>
        <button onClick={loadDemo} className={styles.buttonSecondary}>
          🧪 Загрузить пример
        </button>
      </div>

      <textarea
        placeholder="Вставь HTML с <meta> тегами..."
        className={styles.textarea}
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
      />

      {metaData && (
        <div className={styles.previewCard}>
          <img src={metaData['og:image'] || metaData['twitter:image']} alt="" />
          <div className={styles.texts}>
            <div className={styles.domain}>
              {metaData['og:url'] || 'example.com'}
            </div>
            <div className={styles.title}>
              {metaData['og:title'] || metaData['twitter:title'] || 'Заголовок'}
            </div>
            <div className={styles.desc}>
              {metaData['og:description'] || metaData['twitter:description'] || 'Описание'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
