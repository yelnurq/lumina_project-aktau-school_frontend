// Gallery.jsx
import React, { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import styles from "./Gallery.module.css"; 

const images = [
  { src: "/images/achievements/3.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/4.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/2.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/6.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/11.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/8.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/7.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/1.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/12.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/5.jpg", alt: "Мероприятие" },
  { src: "/images/achievements/9.jpg", alt: "Мероприятие" },
];

export default function AchievementsGallery() {
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
