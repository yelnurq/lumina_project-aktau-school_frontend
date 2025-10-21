import { useState } from 'react';
import tinycolor from 'tinycolor2';
import styles from './ColorPicker.module.css';

export default function ColorPicker() {
  const [baseColor, setBaseColor] = useState('#3498db');
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(null);

  const shades = Array.from({ length: 7 }, (_, i) =>
    tinycolor(baseColor).lighten(i * 10 - 30).toHexString()
  );

  const gradientColors = [
    tinycolor(baseColor).lighten(20).toHexString(),
    baseColor,
    tinycolor(baseColor).darken(20).toHexString(),
  ];

  const gradients = {
    linear: `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`,
    radial: `radial-gradient(circle, ${gradientColors.join(', ')})`,
    conic: `conic-gradient(from ${angle}deg at center, ${gradientColors.join(', ')})`,
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>Color Picker + Shades + Gradients</h2>

      <label>
        Выбери цвет:
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className={styles.colorInput}
        />
      </label>

      <label>
        📐 Угол (для Linear & Conic):
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          className={styles.rangeInput}
        />
        <span>{angle}°</span>
      </label>

      <div className={styles.shades}>
        {shades.map((shade, index) => (
          <div
            key={index}
            className={styles.shadeBox}
            style={{ backgroundColor: shade }}
            title={shade}
          >
            <span>{shade}</span>
          </div>
        ))}
      </div>

      <div className={styles.gradients}>
        {Object.entries(gradients).map(([type, css], index) => (
          <div key={index} className={styles.gradientBlock}>
            <div className={styles.gradientPreview} style={{ background: css }} />
            <div className={styles.codeBlock}>
              <code>{css}</code>
              <button
                onClick={() => copyToClipboard(css, type)}
                className={styles.copyBtn}
              >
                {copied === type ? '✅ Скопировано!' : '📋 Копировать'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
