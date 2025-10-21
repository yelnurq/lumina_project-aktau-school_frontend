import { useState } from 'react';
import html2canvas from 'html2canvas';
import styles from './CodeToImage.module.css';

const themes = {
  dark: {
    background: '#1e1e1e',
    color: '#dcdcdc',
    name: 'Dark'
  },
  light: {
    background: '#f5f5f5',
    color: '#333',
    name: 'Light'
  },
  ocean: {
    background: '#2e3440',
    color: '#88c0d0',
    name: 'Ocean'
  },
  dracula: {
    background: '#282a36',
    color: '#f8f8f2',
    name: 'Dracula'
  },
  solarizedDark: {
    background: '#002b36',
    color: '#839496',
    name: 'Solarized Dark'
  },
  solarizedLight: {
    background: '#fdf6e3',
    color: '#657b83',
    name: 'Solarized Light'
  },
  monokai: {
    background: '#272822',
    color: '#f8f8f2',
    name: 'Monokai'
  },
  gruvboxDark: {
    background: '#282828',
    color: '#ebdbb2',
    name: 'Gruvbox Dark'
  },
  gruvboxLight: {
    background: '#fbf1c7',
    color: '#3c3836',
    name: 'Gruvbox Light'
  },
    lumina: {
    background: 'linear-gradient(135deg, #4f46e5, #9333ea, #0ea5e9)',
    color: '#f9fafb',
    name: 'Lumina'
  }
};


export default function CodeToImage() {
  const [code, setCode] = useState('// Type your code here');
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(16);

  const handleDownload = async () => {
    const element = document.getElementById('code-box');
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = 'code-snippet.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>🖼 Code to Image Generator</p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={styles.codeInput}
        placeholder="Enter your code here..."
      />

<div className={styles.controls}>
  <label>Theme:</label>
  <div className={styles.themePalette}>
    {Object.entries(themes).map(([key, value]) => (
      <button
        key={key}
        onClick={() => setTheme(key)}
        className={`${styles.themeButton} ${theme === key ? styles.active : ''}`}
        style={{
          background: value.background,
          color: value.color
        }}
        title={value.name}
      >
        {value.name}
      </button>
    ))}
  </div>

  <label>
    Font Size:
    <input
      type="number"
      value={fontSize}
      onChange={(e) => setFontSize(Number(e.target.value))}
      min={10}
      max={32}
    /> px
  </label>

  <button onClick={handleDownload}>📥 Download PNG</button>
</div>


<div
  id="code-box"
  className={`${styles.previewBox} ${theme === 'lumina' ? styles.luminaGlow : ''}`}
  style={{
    background: themes[theme].background,
    color: themes[theme].color,
    fontSize: fontSize,
    fontFamily: 'Fira Code, monospace'
  }}
>
  <div className={styles.dots}>
    <span className={`${styles.dot} ${styles.red}`}></span>
    <span className={`${styles.dot} ${styles.yellow}`}></span>
    <span className={`${styles.dot} ${styles.green}`}></span>
  </div>
  <pre>{code}</pre>
</div>

    </div>
  );
}
