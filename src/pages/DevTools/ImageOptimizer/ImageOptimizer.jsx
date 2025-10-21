import { useState, useEffect } from "react";
import styles from "./ImageOptimizer.module.css";
import { Link } from "react-router-dom";

export default function ImageOptimizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [fileName, setFileName] = useState("optimized-image.jpg");
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [format, setFormat] = useState("image/jpeg");

  const calcBase64Size = (base64) => {
    if (!base64) return 0;
    let padding = 0;
    if (base64.endsWith("==")) padding = 2;
    else if (base64.endsWith("=")) padding = 1;
    const base64Length = base64.length;
    return (base64Length * 3) / 4 - padding;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 KB";
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  const optimizeImage = () => {
    if (!imageObj) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxWidth = 1200;
    const scale = Math.min(1, maxWidth / imageObj.width);

    canvas.width = imageObj.width * scale;
    canvas.height = imageObj.height * scale;

    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

    const quality = format === "image/jpeg" || format === "image/webp" ? 0.7 : undefined;
    const compressedData = canvas.toDataURL(format, quality);

    setOptimizedImage(compressedData);
    setOptimizedSize(calcBase64Size(compressedData));
  };

  useEffect(() => {
    if (imageObj) {
      optimizeImage();
      const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
      setFileName((prev) => prev.replace(/\.[^.]+$/, `.${ext}`));
    }
  }, [imageObj]);

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      // Автоматически определяем формат по исходному файлу
      const lowerName = file.name.toLowerCase();
      if (lowerName.endsWith(".png")) setFormat("image/png");
      else if (lowerName.endsWith(".webp")) setFormat("image/webp");
      else setFormat("image/jpeg"); // JPG по умолчанию

      setFileName(`${baseName}-optimized.${file.name.split('.').pop()}`);

      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setOriginalSize(file.size);

        const img = new Image();
        img.src = event.target.result;
        img.onload = () => setImageObj(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!optimizedImage) return;
    const link = document.createElement("a");
    link.href = optimizedImage;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSavingsColor = () => {
    const percent = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    if (percent > 50) return "green";
    if (percent < 10) return "red";
    return "orange";
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Link to="/" className={styles.actionButton}>
          ⬅ Домой
        </Link>
        {optimizedImage && (
          <button onClick={handleDownload} className={styles.actionButton}>
            ⬇ Скачать оптимизированную
          </button>
        )}
      </div>

      <div className={styles.preview}>
        {originalImage ? (
          <>
            <p>📷 Оригинал ({formatBytes(originalSize)}):</p>
            <img src={originalImage} alt="Original Preview" className={styles.image} />

            <p>
              ✨ Оптимизированная ({formatBytes(optimizedSize)}) — экономия{" "}
              <span style={{ color: getSavingsColor(), fontWeight: "bold" }}>
                {((1 - optimizedSize / originalSize) * 100).toFixed(1)}%
              </span>
            </p>
            <img src={optimizedImage} alt="Optimized Preview" className={styles.image} />
          </>
        ) : (
          <p className={styles.placeholder}>Загрузите изображение...</p>
        )}
      </div>
    </div>
  );
}
