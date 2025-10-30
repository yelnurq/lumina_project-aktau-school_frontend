// Gallery.jsx
import React, { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import styles from "./Gallery.module.css"; // ваш CSS module

const images = [
  { src: "/images/gallery/g1.jpeg", alt: "Мероприятие" },
  { src: "/images/gallery/g2.jpeg", alt: "Мероприятие" },
  { src: "/images/gallery/g3.jpeg", alt: "Мероприятие" },
  { src: "/images/gallery/g4.jpeg", alt: "Мероприятие" },
  { src: "/images/gallery/g5.jpeg", alt: "Мероприятие" },
  { src: "/images/gallery/g6.jpeg", alt: "Мероприятие" },
];

export default function Gallery() {
useEffect(() => {
  import("@fancyapps/ui").then(({ Fancybox }) => {
    Fancybox.bind('[data-fancybox="school-gallery"]', {
      Thumbs: false, // отключаем миниатюры
      Toolbar: false, // убираем верхнюю панель
      Carousel: {
        infinite: false, // не нужно бесконечное перелистывание
      },
    });
  });

  return () => {
    try {
      window.Fancybox?.destroy();
    } catch {}
  };
}, []);


  return (
    <div className={styles.categoryGrid}>
      {images.map((img, idx) => (
        <div className={styles.imageWrapper} key={idx}>
          <a
            href={img.src}
            data-fancybox="school-gallery"
            data-caption={img.alt}
            aria-label={`Открыть изображение: ${img.alt}`}
          >
            <img
              className={styles.schoolImage}
              src={img.src}
              alt={img.alt}
              loading="lazy"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
