import { useState } from 'react';
import styles from './Editor.module.css';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

export default function Editor() {
  const [html, setHtml] = useState('<h1>Hello World</h1>');
  const [css, setCss] = useState('body {background:#2e2e2e; color:white}');
  const [js, setJs] = useState('console.log("Hello from JS")');
  const [srcDoc, setSrcDoc] = useState('');

  const handleRun = () => {
    const safeJs = `
      try {
        ${js}
      } catch (e) {
        console.error("Runtime error:", e);
        document.body.innerHTML += '<pre style="color:red;">' + e + '</pre>';
      }
    `;

    const doc = `
      <html>
        <head>
          <style>
            body {
                padding:0.5rem;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>${safeJs.replace(/<\/script/gi, '<\\/script')}<\/script>
        </body>
      </html>
    `;

    setSrcDoc(doc);
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.editors}>
        <textarea
          className={styles.textarea}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="HTML"
        />
        <textarea
          className={styles.textarea}
          value={css}
          onChange={(e) => setCss(e.target.value)}
          placeholder="CSS"
        />
        <textarea
          className={styles.textarea}
          value={js}
          onChange={(e) => setJs(e.target.value)}
          placeholder="JavaScript"
        />
      </div>

        <div className={styles.buttonGroup}>
        <Link to="/" className={styles.runButton}> 
            ⬅ Домой
        </Link>

        <button onClick={handleRun} className={styles.runButton}>
            ▶ Запустить
        </button>
        </div>

      <div className={styles.preview}>
        <iframe
          srcDoc={srcDoc}
          title="Live Preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
