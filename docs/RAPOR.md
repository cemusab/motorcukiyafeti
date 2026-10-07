# Motorcu Kıyafeti – Proje Raporu ve Yol Haritası

**Son güncelleme:** 7 Ekim 2026 · **Canlı site:** https://motorcukiyafeti.com · **Kod:** GitHub `cemusab/motorcukiyafeti` (`main` = canlı, `v2` = geliştirme)

---

## 1. Özet

Motorcu Kıyafeti, 6–7 Ekim 2026'da sıfırdan yeniden yazıldı ve **7 Ekim 2026'da yayına alındı**. Site; kaynaklı teknik bilgi, karşılaştırma, kask–interkom uyumluluğu ve satın alma rehberleri sunan bir motosiklet ekipmanı platformudur. Mağaza değildir; altyapı ileride online satışa uygundur.

| Gösterge | Değer |
|---|---|
| Ürün | **453** |
| Marka | **78** (yerli: Yaren Tekstil, Tex Motor / Forte GT / Sway, Scudo, Tech90 / Vecton, Riderdenim, LBC, Metanic, YDS) |
| Rehber / blog | **44** |
| Kask–interkom uyumluluk kaydı | **167** (117 üretici kaynağıyla doğrulanmış) |
| Motor modeli sayfası | **46** |
| Üretici görseli / YouTube videosu | ~1.000 / ~400 |
| Sitemap'teki adres | ~1.600 |
| Otomatik test | 23 test, 2.498 sayfa taraması — hepsi geçiyor |
| Lighthouse (mobil) | SEO **100**, Erişilebilirlik 97–100, En iyi uygulamalar 100, Performans 84–93 |

### Ürün dağılımı

| Kategori | Ürün | TR fiyatlı | Yerli |
|---|---|---|---|
| Kask | 103 | 62 | 7 |
| Mont | 105 | 53 | 16 |
| Pantolon | 39 | ~16 | 17 |
| Eldiven | 43 | ~19 | 9 |
| Bot | 43 | ~24 | 10 |
| Koruma (sırt, göğüs, dirseklik/dizlik, içgiyim, airbag) | 24 | 8 | 2 |
| İnterkom (evrensel + kaska özel) | 38 | ~15 | – |
| Yağmurluk | 12 | 7 | 5 |
| Termal giyim | 10 | 1 | – |
| Aksesuar (telefon tutucu, kilit, çanta, Pinlock, vizör, kulak tıkacı) | 36 | 12 | 4 |

---

## 2. Tamamlananlar ✅

### Site ve özellikler
- Motomax tarzı üst bar (duyuru şeridi, yardımcı satır, logo + arama, kırmızı kategori çubuğu), mega menü, mobil menü
- Türkçe karakter ve yazım hatası toleranslı arama ("sheoi", "neotek", "15 bin altı mont")
- Kategoriye özel filtreler, **ölçüye göre beden filtresi**, "Yerli marka" filtresi ve rozeti, yerli ürünler önerilerde önce
- 2–4 ürün karşılaştırma (tek kategori, "Karşılaştırmayı bitir"), editoryal rakip çiftleri için statik karşılaştırma sayfaları
- Kask + interkom uyumluluk motoru (doğrulanmış / teyit edilmedi ayrımı; kaska özel sistemler: Sena SRL, SMART HJC, N-Com, SC2/SC Edge, X-COM3, Sena for Shark, AWC, Spectrum EVO, Insyde…)
- "Yeni motor aldım" sihirbazı: önce **motor modeli** (46 model), türe göre süzülen kullanım, mevsim, bütçe, giyim kalıbı
- `/motor/{model}`, `/kadin`, `/erkek`, `/motosikletime-gore/{tur}` (kurye dahil), "Ne almalıyım?" listeleri
- Ürün sayfası: üretici görsel galerisi, YouTube videoları (tıklayınca yüklenir), teknik tablo, artı/eksi, kimler için, beden tablosu, TR fiyatları (satıcı + kontrol tarihi), kaynaklar, önceki/sonraki ürün
- Kullanıcı yorumları: "Yorum yaz" → motorcukiyafeti@gmail.com → onaydan sonra yayın (`src/data/reviews.json`)
- İletişim sayfası (öneri, şikâyet, yanlış bilgi, iş birliği)

### İçerik
- 44 rehber: kask, interkom, mont/giyim, **kumaş ve malzeme** (Dyneema, Kevlar, Cordura, deri, Gore-Tex, D3O/SAS-TEC, tek katman), koruma, eldiven, bot, **kurye sektörü** (kurye sayısı, Uber–Trendyol Go, yasal düzenlemeler, kazalar), **MotoGP** (pilot ekipmanları, pistten sokağa), **bakım** (mont/kask/motosiklet yıkama, zincir, motor yağı, dokunmatik eldiven, dirseklik/dizlik)
- 78 marka sayfası: tarihçe, en güçlü kalemi, resmi siteye ve öne çıkan ürüne derin linkler, menşe ülkeye göre gruplama

### SEO / GEO
- Her sayfada benzersiz title/description, canonical, OpenGraph, Twitter kartı, varsayılan OG görseli
- JSON-LD: Product, Brand, Article, BreadcrumbList, FAQPage, ItemList, WebSite/SearchAction
- Sitemap index + 6 alt sitemap, robots.txt; boş/tekrarlayan sayfalar noindex
- Eski sitenin indekslenmiş adreslerinden **301 yönlendirmeler** (44 ürün adresi + bölüm adresleri)
- **www.motorcukiyafeti.com → motorcukiyafeti.com** kalıcı yönlendirme (Vercel)

### Google
- **Search Console:** `motorcukiyafeti.com` alan adı mülkü doğrulandı (GoDaddy DNS TXT), sitemap gönderildi
- **Google Analytics 4:** `G-87K77J3RWV`, **çerez onayıyla** (onay yoksa hiç yüklenmez), Consent Mode, reklam/Google sinyalleri kapalı, yalnız canlı alan adında; canlıda test edildi — veri ulaşıyor

### Yasal
- KVKK Aydınlatma Metni, Gizlilik Politikası (GDPR), Çerez Politikası, İlgili Kişi Başvuru Rehberi (2024 KVKK değişiklikleri, 2025 VERBİS eşikleri, Analytics ve e-posta işleme dahil)
- Footer'da "Çerez tercihleri" ile onay geri alınabiliyor

---

## 3. Açık kalanlar / bilinen eksikler ⚠️

1. **Veri sorumlusu** KVKK metinlerinde geçici olarak "Motorcu Kıyafeti" — şirket/şahıs bilgisi netleşince `src/data/legal-config.ts` güncellenmeli (adres, gerekirse KEP/MERSİS).
2. **Türkiye fiyatı:** ürünlerin yaklaşık yarısında yetkili satıcıda doğrulanmış fiyat yok ("doğrulanmadı" yazıyor).
3. **Doğrulanamayan teknik alanlar** ("Doğrulanıyor"): bazı ağırlık, beden tablosu, CE sınıfı bilgileri — üretici yayınlamadığı için boş.
4. **Search Console sitemap** ilk gönderimde "Getirilemedi" — genelde birkaç saatte "Başarılı" olur; olmazsa kaldırıp yeniden gönder.
5. **Admin paneli ve veritabanı yok** — içerik şimdilik `src/data/*.json` dosyalarından yönetiliyor.
6. **Site içi yorum formu yok** — yorumlar e-postayla geliyor.
7. **Performans:** bazı ürün sayfaları mobilde 84–89 (hedef >90); üretici görsellerinin ilk optimizasyonundan. 68 görsel alan adının en çok kullanılan 49'u optimize ediliyor (Next.js sınırı 50).
8. Arai ve Scorpion için kaska özel güncel interkom sistemi bulunamadı.
9. Bazı küçük markalar (Knox, UClear, FreedConn, Lexin, Clover, Vanucci, Midland Europe vb.) resmi siteleri erişilemediği için eksik/kısmi.

---

## 4. Adım adım yol haritası

### AŞAMA 1 — İndeksleme ve ilk veriler (şimdi → 2 hafta) 🔍
Amaç: Google siteyi tarasın, indekslesin; ilk trafik verileri gelsin. **Bu aşamada büyük değişiklik yapmıyoruz.**

1. **Gün 1–2:** Search Console → Site Haritaları: durum "Başarılı" mı? Değilse sitemap'i kaldırıp `https://motorcukiyafeti.com/sitemap.xml` olarak yeniden gönder.
2. **Gün 1–3:** URL denetimi → şu sayfalar için "Dizine eklenmesini iste" (günde ~10):
   - `/`, `/kask`, `/mont`, `/yeni-baslayanlar`, `/interkom-uyumlulugu`, `/markalar`, `/rehber`, `/motosikletime-gore/kurye`, `/kadin`, `/pantolon`
3. **Gün 2–7:** Search Console → **Sayfa sayısı (Dizin oluşturma)** raporu: indekslenen sayfa sayısı artıyor mu? "Yönlendirmeli sayfa" (eski adresler) ve "noindex" sayıları normaldir.
4. **Gün 3–7:** Analytics → Yönetici → Ürün bağlantıları → **Search Console bağlantısı** kur.
5. **Hafta 1–2:** Search Console → **Performans**: ilk gösterim ve tıklamalar; hangi sorgularla bulunuyoruz?
6. **Hafta 2:** Search Console → **Önemli Web Verileri** ve **Deneyim** raporlarında hata var mı? Varsa düzelt.
7. **Hafta 2:** Analytics'te en çok ziyaret edilen sayfalar ve çıkış sayfaları → içerik önceliklerini belirle.

> Kontrol listesi bu aşama bitince: indekslenen sayfa sayısı > 300, sitemap "Başarılı", Search Console'da kritik hata yok.

### AŞAMA 2 — Veri kalitesi ve fiyatlar (hafta 2–4) 💰
1. Fiyatı olmayan ürünler için ikinci fiyat turu (yetkili TR satıcıları, resmi distribütörler; gerekirse Trendyol/Hepsiburada resmi mağazaları).
2. "Doğrulanıyor" alanları için üretici destek / distribütörlerden bilgi; beden tablolarını tamamla.
3. Fiyatların ayda bir otomatik yeniden kontrolü (eskiyen fiyat uyarısı).
4. Trendyol/Hepsiburada alıcı yorumlarından beden-kalıp eğilimleri (popüler ürünler).
5. Yerli markalarla iletişim: ürün listesi, görsel izni, resmi bilgi (Yaren, Tex Motor, Scudo, Tech90, YDS, Riderdenim, LBC).

### AŞAMA 3 — Admin paneli, veritabanı, yorum formu (hafta 3–6) 🛠
1. Vercel Marketplace'ten Postgres (Neon) veritabanı oluştur (sahibin onayıyla, birkaç tıklama).
2. Prisma şemasını `src/data/schema.ts` ile birebir kur; JSON verilerini veritabanına taşı (`src/lib/data.ts` tek değişen dosya).
3. Şifreli admin paneli: ürün/marka/rehber/fiyat/kaynak ekleme-düzenleme, SEO alanları, öne çıkan ürün.
4. Site içi yorum formu (e-posta servisi: Resend) + panelden tek tıkla onay/red; KVKK metnine yorum formu eklenir.
5. Testler ve QA; canlıya alma.

### AŞAMA 4 — İçerik ve SEO büyümesi (sürekli) 📈
1. Search Console sorgularına göre yeni rehberler ve "Ne almalıyım?" listeleri (gerçek arama talebi olan konular).
2. Kurye ve yerli üretici içeriklerini genişlet (kurye kiti, şirket bazlı ekipman gereksinimleri).
3. MotoGP haftalık/aylık yarış ve ekipman notları (isteğe bağlı otomatik görev).
4. Yeni ürünler: popüler modellerin yeni nesilleri, eksik markalar.
5. Uyumluluk tablosunu yeni kask/interkomlarla güncel tut.
6. Performans: ürün görsellerini optimize edilmiş kopyalarla sunma (izin/lisans netleşirse), mobil performansı tüm sayfalarda >90.

### AŞAMA 5 — Online satışa hazırlık (karar sonrası) 🛒
1. İş modeli kararı: kendi satış (Shopify/headless) mı, satıcı yönlendirme/affiliate mı?
2. Gerekirse Google Etiket Yöneticisi, reklam pikselleri ve dönüşüm takibi (çerez onayına bağlı).
3. Sepet, hesap, ödeme; KVKK/mesafeli satış metinleri.

---

## 5. Sık kullanılan bilgiler

| Konu | Bilgi |
|---|---|
| Canlı site | https://motorcukiyafeti.com |
| GitHub | cemusab/motorcukiyafeti (`main` canlı) |
| Hosting | Vercel – proje `motorcukiyafeti.com` (cemusabs-projects) |
| DNS | GoDaddy (A kaydı 76.76.21.21 → Vercel; Google TXT doğrulama kaydı) |
| Search Console | `sc-domain:motorcukiyafeti.com` |
| Analytics | Mülk 557922904, Ölçüm Kimliği `G-87K77J3RWV` |
| İletişim / yorum e-postası | motorcukiyafeti@gmail.com |
| Veri ekleme | `src/data/products/{kategori}-*.json` → `npm run validate` → `npm run qa` |
| Kurallar | `CLAUDE.md` · Mimari: `docs/mimari.md` · Brief: `docs/proje-brief.md` · Durum: `docs/durum.md` |
