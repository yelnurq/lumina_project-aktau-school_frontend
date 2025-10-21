// components/SeoHelmet.jsx
import { Helmet } from "react-helmet";

export default function SeoHelmet({
  title,
  description,
  keywords = "",
  url,
  image = "https://lumina.kz/preview-image.png",
  type = "website",
  jsonLdType = "WebPage",
  siteName = "Lumina"
}) {
  // Безопасно получаем текущий URL
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": jsonLdType,
    name: title,
    url: currentUrl,
    description,
    image: image,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: "https://lumina.kz/favicon-96x96.png",
      },
    },
  };

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Helmet>
  );
}
