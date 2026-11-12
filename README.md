# Pedalla Kayseri — Web Sitesi

Kayseri Valiliği ERVA Spor Okulları bünyesindeki Pedalla Kayseri bisiklet topluluğunun web sitesi.

**Teknoloji:** [Eleventy](https://www.11ty.dev/) (statik site) + [Decap CMS](https://decapcms.org/) (yönetim paneli) + Netlify (yayın, formlar, giriş).
Veritabanı yok; tüm içerik GitHub deposunda dosya olarak durur. Hızlı, ücretsiz ve güvenli.

---

## 1. Sitede neler var?

| Sayfa | Adres | İçerik nereden düzenlenir? |
|---|---|---|
| Ana sayfa | `/` | Otomatik (etkinlik, faaliyet, misyon/vizyon, rakamlar) |
| Hakkımızda | `/hakkimizda/` | Panel → Site Ayarları |
| Yaklaşan Etkinlikler | `/etkinlikler/` | Panel → Yaklaşan Etkinlikler |
| Geçmiş Faaliyetler | `/faaliyetler/` | Panel → Geçmiş Faaliyetler (foto galeri + video) |
| Üyelik Başvurusu | `/uyelik/` | Form → Netlify Forms |
| İletişim | `/iletisim/` | Form → Netlify Forms; bilgiler Site Ayarları'ndan |
| KVKK Aydınlatma Metni | `/kvkk/` | Panel → Site Ayarları ve Sayfalar |
| Yönetim Paneli | `/admin/` | Yalnızca davet edilen yöneticiler |

**Otomatik davranışlar**

- Tarihi geçen etkinlikler ziyaretçinin tarayıcısında otomatik gizlenir (siteyi yeniden yayınlamaya gerek yok).
- 18 yaşından küçük başvuranlar için üyelik formunda veli bilgileri ve veli onayı zorunlu hâle gelir.
- Formlarda spam koruması (honeypot) vardır.
- Faaliyetler yıla göre filtrelenebilir; galerideki fotoğraflar tam ekran açılır.

---

## 2. İlk yayın (yaklaşık 20 dakika)

### 2.1 GitHub'a yükleyin
1. [github.com](https://github.com) üzerinde ücretsiz hesap açın (topluluk adına bir hesap önerilir).
2. **New repository** → ad: `pedalla-kayseri` → **Private** seçebilirsiniz → Create.
3. Bu klasördeki tüm dosyaları depoya yükleyin:
   - En kolayı: depo sayfasında **"uploading an existing file"** bağlantısına tıklayıp klasörün **içindekileri** sürükleyin (`node_modules` ve `_site` klasörlerini yüklemeyin).
   - Ya da terminalden:
     ```bash
     git init && git add . && git commit -m "İlk sürüm"
     git branch -M main
     git remote add origin https://github.com/KULLANICI/pedalla-kayseri.git
     git push -u origin main
     ```

### 2.2 Netlify'a bağlayın
1. [app.netlify.com](https://app.netlify.com) → GitHub hesabınızla giriş.
2. **Add new site → Import an existing project → GitHub** → `pedalla-kayseri` deposunu seçin.
3. Ayarlar `netlify.toml` dosyasından otomatik gelir (Build: `npm run build`, Publish: `_site`). **Deploy**'a basın.
4. **Site configuration → Change site name** → `pedallakayseri` yaparsanız adres `https://pedallakayseri.netlify.app` olur.
   Farklı bir ad seçerseniz `src/admin/config.yml` içindeki `site_url` ve Panel → Site Ayarları → *Site Adresi*'ni güncelleyin.

### 2.3 Yönetim paneli girişini açın (Netlify Identity)
1. Netlify'da sitenizde **Project configuration → Identity → Enable Identity**.
2. **Registration preferences → Invite only** (dışarıdan kimse kayıt olamasın).
3. **Services → Git Gateway → Enable Git Gateway**.
4. **Identity → Invite users** → yönetici e-postalarını girin.
5. Gelen davet e-postasındaki bağlantıya tıklayın → şifre belirleyin → otomatik olarak `/admin/` paneline yönlenirsiniz.

> Not: Netlify Identity 2025'te kullanımdan kaldırılacağı duyurulmuş, Şubat 2026'da bu karar geri alınmıştır; şu an çalışmaktadır. İleride sorun çıkarsa `config.yml` içinde `backend: name: github` kullanılarak GitHub hesabıyla giriş yapılabilir.

### 2.4 Form bildirimlerini e-postaya yönlendirin
1. **Project configuration → Forms** → *Form detection* açık olmalı (ilk deploy'dan sonra `uyelik` ve `iletisim` formları listelenir).
2. **Forms → Form notifications → Add notification → Email notification** → form: `uyelik` → e-posta adresiniz. Aynısını `iletisim` için tekrarlayın.
3. Başvuruları Netlify'da **Forms** sekmesinden görebilir, **Download as CSV** ile Excel'e aktarabilirsiniz.

Ücretsiz plan: ayda 100 form gönderimi. Aşılırsa (ör. büyük bir kayıt kampanyası) ücretli plana geçilebilir veya formlar Google Sheets'e yönlendirilebilir.

---

## 3. Panelden içerik ekleme

`https://pedallakayseri.netlify.app/admin/` → giriş yapın.

**Yeni etkinlik duyurmak:** *Yaklaşan Etkinlikler → Yeni Etkinlik* → ad, tarih-saat, buluşma noktası, mesafe, kapak görseli → **Yayınla**. 1–2 dakika içinde sitede görünür.

**Geçmiş faaliyet eklemek:** *Geçmiş Faaliyetler → Yeni Faaliyet* → yazı, kapak, **Fotoğraf Galerisi**'ne fotoğrafları tek tek ekleyin, **Videolar**'a YouTube/Instagram bağlantısı yapıştırın → Yayınla.

**Misyon, vizyon, iletişim, rakamlar:** *Site Ayarları ve Sayfalar → Genel Bilgiler*.

**Görsel ve video ipuçları**
- Fotoğrafları yüklemeden önce 1600–2000 px genişliğe küçültün (telefon fotoğrafları 5–10 MB olabilir; site yavaşlar). Ücretsiz araç: [squoosh.app](https://squoosh.app).
- Videoları siteye doğrudan yüklemek yerine Instagram (Reels) veya YouTube'a yükleyip **bağlantısını** ekleyin. Depo boyutu küçük kalır, videolar hızlı oynar.
- "Taslak" kutucuğu işaretli içerikler sitede görünmez.

---

## 4. Örnek içerikleri temizleme

Gelen paket örnek içerikle gelir. Yayına almadan önce:
- `src/etkinlikler/` ve `src/faaliyetler/` içindeki örnek `.md` dosyalarını (veya panelden) silin.
- `src/assets/uploads/ornek-*.jpg` örnek görsellerini silin.
- Panel → Site Ayarları: **telefon, e-posta, adres, ana sayfa rakamları (150+ üye vb.)** şu an örnek değerlerdir — gerçekleriyle değiştirin.
- Misyon, vizyon, hakkımızda ve değerler metinleri taslaktır; ekibinizle gözden geçirin.
- KVKK metni genel bir şablondur; ERVA / Valilik hukuk birimine kontrol ettirmenizi öneririm.

---

## 5. Alan adı (ör. pedallakayseri.com)

1. Bir alan adı alın (Natro, İsimtescil, GoDaddy, Cloudflare vb.). `.com.tr` için belge gerekebilir; `.org` / `.com` hızlı alınır.
2. Netlify → **Domain management → Add a domain** → alan adınızı girin.
3. Netlify'ın gösterdiği DNS kayıtlarını alan adı firmanızın paneline girin (ya da nameserver'ları Netlify'a yönlendirin). SSL (https) otomatik ve ücretsiz gelir.
4. `src/admin/config.yml` → `site_url` ve Panel → Site Adresi'ni yeni adresle güncelleyin.

---

## 6. Daha sonra kendi sunucunuza / hosting'e taşıma

Sitenin kendisi saf HTML/CSS/JS'tir; `npm run build` komutunun ürettiği `_site` klasörü **herhangi bir hostinge** (cPanel, VPS, Nginx) yüklenebilir. Ancak iki parça Netlify'a özeldir:

| Özellik | Netlify'da | Başka sunucuda alternatif |
|---|---|---|
| Formlar | Netlify Forms | Formspree / Web3Forms (form `action` adresini değiştirmek yeterli) veya küçük bir PHP betiği |
| Panel girişi | Identity + Git Gateway | `backend: name: github` + bir OAuth sağlayıcı (ör. DecapBridge) |
| Otomatik yayın | GitHub'a her kayıtta otomatik | GitHub Actions ile sunucuya FTP/SSH deploy |

**Önerim:** Ücretli hosting almak yerine Netlify'da kalıp sadece alan adı bağlamanız. Bu ölçekte bir topluluk sitesi için Netlify ücretsiz planı yeterlidir; sunucu bakımı, güvenlik güncellemesi, SSL derdi olmaz. Kurum (Valilik / ERVA) kendi sunucusunda barındırmak isterse yukarıdaki tablo yol haritasıdır.

---

## 7. Bilgisayarda çalıştırma (geliştiriciler için)

```bash
npm install
npm start          # http://localhost:8080
npm run cms        # ayrı terminalde: paneli yerelde test etmek için → http://localhost:8080/admin/
npm run build      # _site klasörüne üretim çıktısı
```

**Klasör yapısı**
```
src/
  _data/site.json          → genel bilgiler, misyon/vizyon, iletişim (panelden düzenlenir)
  _includes/layouts/       → sayfa şablonları
  _includes/partials/      → üst menü, alt bilgi, kartlar
  etkinlikler/*.md         → yaklaşan etkinlikler
  faaliyetler/*.md         → geçmiş faaliyetler
  admin/config.yml         → yönetim paneli alanları
  assets/css/style.css     → tasarım (renkler en üstteki :root içinde)
  assets/uploads/          → panelden yüklenen görseller
```

**Renkleri değiştirmek:** `src/assets/css/style.css` en üstteki `--primary` (turuncu) ve `--ink` (lacivert) değerleri.
**Logo:** `src/assets/img/logo-mark.svg` ve `favicon.svg` dosyalarını kendi logonuzla değiştirin (aynı adla).
