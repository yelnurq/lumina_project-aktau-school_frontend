import { useState } from 'react';
import './DevTools.css';

export default function DevTools() {
  const [color, setColor] = useState('#3498db');
  const [uuid, setUUID] = useState('');
  const [qrText, setQrText] = useState('');
  const [randomList, setRandomList] = useState('apple, banana, cherry');
  const [randomItem, setRandomItem] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [binaryInput, setBinaryInput] = useState('');
  const [textFromBinary, setTextFromBinary] = useState('');
  const [textToBinary, setTextToBinary] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [faviconEmoji, setFaviconEmoji] = useState('🔥');

  const generateUUID = () => setUUID(crypto.randomUUID());

  const generateRandom = () => {
    const items = randomList.split(',').map(i => i.trim());
    const random = items[Math.floor(Math.random() * items.length)];
    setRandomItem(random);
  };

  const convertImageToBase64 = (e) => {
    const reader = new FileReader();
    reader.onload = () => setBase64Image(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const convertBinaryToText = () => {
    try {
      const chars = binaryInput.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2)));
      setTextFromBinary(chars.join(''));
    } catch {
      setTextFromBinary('Ошибка');
    }
  };

  const convertTextToBinary = () => {
    const binary = textToBinary.split('').map(c => c.charCodeAt(0).toString(2)).join(' ');
    setBinaryInput(binary);
  };

  const convertTimestampToDate = () => {
    const d = new Date(parseInt(timestamp) * 1000);
    setDate(d.toLocaleString());
  };

  const convertDateToTimestamp = () => {
    const t = Math.floor(new Date(date).getTime() / 1000);
    setTimestamp(t.toString());
  };

  const formatJson = () => {
    try {
      const obj = JSON.parse(jsonText);
      setFormattedJson(JSON.stringify(obj, null, 2));
    } catch {
      setFormattedJson('Ошибка в JSON');
    }
  };

  const faviconDataUrl = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' height='64' width='64'><text y='50%' x='50%' font-size='48' text-anchor='middle' dominant-baseline='central'>${faviconEmoji}</text></svg>`;

  return (
    <div className="dev-tools">
      <h2>🧰 DevTools — Инструменты разработчика</h2>

      <section>
        <h3>🎨 Color Picker</h3>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <p>{color}</p>
      </section>

      <section>
        <h3>🔑 UUID Generator</h3>
        <button onClick={generateUUID}>Генерировать UUID</button>
        <p>{uuid}</p>
      </section>

      <section>
        <h3>🖼️ Image to Base64</h3>
        <input type="file" accept="image/*" onChange={convertImageToBase64} />
        <textarea rows={3} value={base64Image} readOnly />
      </section>

      <section>
        <h3>📦 QR Code Generator</h3>
        <input value={qrText} onChange={e => setQrText(e.target.value)} placeholder="Текст для QR" />
        {qrText && <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrText)}&size=150x150`} alt="QR Code" />}
      </section>

      <section>
        <h3>🎲 Randomizer</h3>
        <input value={randomList} onChange={e => setRandomList(e.target.value)} />
        <button onClick={generateRandom}>Случайный элемент</button>
        <p>{randomItem}</p>
      </section>

      <section>
        <h3>🧠 Binary ⇄ Text</h3>
        <textarea value={binaryInput} onChange={e => setBinaryInput(e.target.value)} placeholder="01001000 01100101 01101100 01101100 01101111" />
        <button onClick={convertBinaryToText}>Binary → Text</button>
        <p>{textFromBinary}</p>

        <textarea value={textToBinary} onChange={e => setTextToBinary(e.target.value)} placeholder="Hello" />
        <button onClick={convertTextToBinary}>Text → Binary</button>
      </section>

      <section>
        <h3>⏱️ Timestamp ⇄ Date</h3>
        <input value={timestamp} onChange={e => setTimestamp(e.target.value)} placeholder="Unix Timestamp" />
        <button onClick={convertTimestampToDate}>→ Date</button>
        <p>{date}</p>

        <input value={date} onChange={e => setDate(e.target.value)} placeholder="Date" />
        <button onClick={convertDateToTimestamp}>→ Timestamp</button>
      </section>

      <section>
        <h3>📄 JSON Formatter</h3>
        <textarea value={jsonText} onChange={e => setJsonText(e.target.value)} placeholder="Вставьте JSON" rows={4} />
        <button onClick={formatJson}>Форматировать</button>
        <pre>{formattedJson}</pre>
      </section>

      <section>
        <h3>🧿 Favicon Generator (Emoji)</h3>
        <input value={faviconEmoji} onChange={e => setFaviconEmoji(e.target.value)} maxLength={2} />
        <p>Data URL:</p>
        <textarea value={faviconDataUrl} readOnly />
        <img src={faviconDataUrl} alt="favicon" width={32} height={32} />
      </section>
    </div>
  );
}
