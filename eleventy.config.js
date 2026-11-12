// Pedalla Kayseri — Eleventy yapılandırması
const TZ = "Europe/Istanbul";

function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d) ? null : d;
}

export default function (eleventyConfig) {
  // Statik dosyalar
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // ---- Koleksiyonlar ----
  // Geçmiş faaliyetler: en yeni en üstte
  eleventyConfig.addCollection("faaliyetler", (api) =>
    api
      .getFilteredByGlob("src/faaliyetler/*.md")
      .filter((p) => !p.data.taslak)
      .sort((a, b) => toDate(b.data.tarih) - toDate(a.data.tarih))
  );

  // Etkinlikler: en yakın tarih en üstte (geçmiş olanlar tarayıcıda gizlenir)
  eleventyConfig.addCollection("etkinlikler", (api) =>
    api
      .getFilteredByGlob("src/etkinlikler/*.md")
      .filter((p) => !p.data.taslak)
      .sort((a, b) => toDate(a.data.tarih) - toDate(b.data.tarih))
  );

  // ---- Filtreler ----
  eleventyConfig.addFilter("tarihUzun", (v) => {
    const d = toDate(v);
    return d
      ? d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: TZ })
      : "";
  });
  eleventyConfig.addFilter("tarihGun", (v) => {
    const d = toDate(v);
    return d ? d.toLocaleDateString("tr-TR", { day: "2-digit", timeZone: TZ }) : "";
  });
  eleventyConfig.addFilter("tarihAy", (v) => {
    const d = toDate(v);
    return d ? d.toLocaleDateString("tr-TR", { month: "short", timeZone: TZ }) : "";
  });
  eleventyConfig.addFilter("gunAdi", (v) => {
    const d = toDate(v);
    return d ? d.toLocaleDateString("tr-TR", { weekday: "long", timeZone: TZ }) : "";
  });
  eleventyConfig.addFilter("saat", (v) => {
    const d = toDate(v);
    return d ? d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: TZ }) : "";
  });
  eleventyConfig.addFilter("isoTarih", (v) => {
    const d = toDate(v);
    return d ? d.toISOString() : "";
  });
  eleventyConfig.addFilter("yilOf", (v) => {
    const d = toDate(v);
    return d ? d.toLocaleDateString("tr-TR", { year: "numeric", timeZone: TZ }) : "";
  });
  eleventyConfig.addFilter("yillar", (items) => [
    ...new Set((items || []).map((i) => {
      const d = toDate(i.data.tarih);
      return d ? d.toLocaleDateString("tr-TR", { year: "numeric", timeZone: TZ }) : null;
    }).filter(Boolean)),
  ]);
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // YouTube / Instagram bağlantısını gömülebilir adrese çevirir
  eleventyConfig.addFilter("videoEmbed", (url) => {
    if (!url) return null;
    let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (m) return { tur: "youtube", src: `https://www.youtube-nocookie.com/embed/${m[1]}` };
    m = url.match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|tv)\/([\w-]+)/);
    if (m) return { tur: "instagram", src: `https://www.instagram.com/${m[1]}/${m[2]}/embed` };
    if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return { tur: "dosya", src: url };
    return null;
  });

  eleventyConfig.addFilter("yil", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md"],
  };
}
