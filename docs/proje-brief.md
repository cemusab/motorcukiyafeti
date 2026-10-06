# Proje Brief'i – MotorcuKiyafeti.com (özet)

Kaynak: site sahibinin 31 başlıklı proje tanımı (6 Ekim 2026) ve sohbet sırasındaki ek talepleri. Bu dosya o tanımın maddeler halinde özetidir.

**Hedef:** Türkiye'nin en kapsamlı motosiklet kıyafeti, kask, interkom ve koruyucu ekipman bilgi, karşılaştırma ve alışveriş rehberi. Ansiklopedi + ürün keşif motoru + karşılaştırma platformu + satın alma rehberi + SEO içerik platformu + ileride e-ticarete bağlanabilir altyapı.

1. **Çalışmayan hiçbir şey olmayacak.** Tıklanabilir görünen her öğe çalışır; `#`, boş href, placeholder yok. Merkezi route manifest; deploy öncesi iç link tarayıcı (200, 404, redirect loop, kırık anchor, eksik görsel); Playwright ile desktop ve mobil navigasyon testi. Testler kırmızıyken iş bitmiş sayılmaz.
2. **Site mimarisi:** Kask, Mont, Pantolon, Eldiven, Bot, İnterkom, Koruma, Yağmurluk, Termal, Aksesuar, Markalar, Karşılaştır, Rehberler, Motosikletime Göre, Yeni Başlayanlar. Gerçek alt kategoriler (kask tipleri, malzeme, kullanım; mont/eldiven/bot için mevsim, malzeme, koruma). Türk perakendecilerin kategori mantığı araştırılır, tasarım/metin kopyalanmaz.
3. **"Yeni motor aldım" sihirbazı:** motor türü, kullanım, mevsim, bütçe → kişisel set; her parça için neden gerekli, bütçe payı, nasıl seçilir, güvenlik seviyesi.
4. **Kask veri tabanı:** öncelikli markalar (AGV, Arai, Shoei, Schuberth, HJC, Shark, Scorpion, Nolan, X-lite, LS2, Bell, Airoh, Caberg, Icon, Sena, KYT, Suomy, MT…). Teknik veri öncelikle üreticiden; perakendeci yalnızca fiyat/stok/beden için. Görsel telifine uyulur. Her kayıtta kaynak ve son doğrulama tarihi.
5. **Kask ürün sayfası:** `/kask/marka/model`; tüm teknik alanlar (malzeme, kabuk sayısı, ECE 22.06/DOT/Snell/FIM, ağırlık + beden, vizör, Pinlock, güneş vizörü, bağlantı, interkom hazırlığı…), editoryal bölümler (kimler için, kullanım senaryoları, artı/eksi, rakipler, MotorcuKiyafeti yorumu). Doğrulanamayan bilgi gerçekmiş gibi yazılmaz.
6. **Kask karşılaştırma motoru:** 2–4 ürün, farklar vurgulu, "şehir/uzun yol/sessizlik/interkom/hafiflik/fiyat-performans için hangisi?" sonuçları; `/karsilastir/a-vs-b` SEO sayfaları, doğru canonical, kombinasyon patlaması yok.
7. **İnterkom veri tabanı:** Cardo, Sena, Midland, Interphone, UClear… Bluetooth, Mesh, grup, menzil, batarya, ses, IP, uygulama vb.
8. **Kask + interkom uyumluluk motoru:** kaskını seç → özel / entegre / standart / adaptörlü; her uyumluluk kaynaklı, doğrulanmamışı kesin gösterme.
9. **Diğer ekipman sayfaları:** mont, pantolon, eldiven, bot, koruma, airbag, yağmurluk, termal; EN 17092 (AAA/AA/A), EN 1621 (Level 1/2) yapılandırılmış veri ve rehberler.
10. **Marka sayfaları:** hakkında, ülke, güçlü olduğu ürünler, ürün aileleri, Türkiye'deki ürünler, alternatifler, rehberler, karşılaştırmalar. *(Ek talep: her marka resmi siteye ve en güçlü ürününe yönlendirmeli; menşe ülkeye göre gruplama; yerli markalar – Yaren Tekstil, Tex Motor vb. – ve global markalar – Büse, iXS, Clover…)*
11. **Rehber merkezi:** ilk ekipmanlar, kask seçimi/beden, ECE 22.06, 22.05–22.06 farkı, kask ömrü, düşen kask, karbon/fiber, Pinlock, Double-D, interkom seçimi, Cardo–Sena, Mesh, mont seçimi, AA/AAA, Level 1/2, yazlık/kışlık/yağmur, adventure, scooter, yeni başlayan listesi. Boş/şişirilmiş içerik yok.
12. **"Ne almalıyım?" içerik motoru:** gerçek sorulardan sayfalar; seçilmiş ürün, teknik gerekçe ve kaynakla. SEO çöplüğü yok.
13. **Filtreleme:** kategoriye özel akıllı filtreler; filtre kombinasyonları indekslenmez.
14. **Arama:** autocomplete, gruplu sonuç (ürün, marka, kategori, rehber, karşılaştırma), yazım hatası toleransı, "10 bin altı kask" gibi sorgular.
15. **Tasarım:** premium, teknik, motorcu karakteri; özgün tasarım sistemi; mobile-first; güçlü mega menü.
16. **SEO:** semantic HTML, unique title/description, canonical, OG, Twitter, robots, Schema.org (Product, Offer, Brand, Article, BreadcrumbList, FAQPage, ItemList), ayrı sitemap'li sitemap index, robots.txt, zorunlu breadcrumb, Türkçe karaktersiz kısa URL. *(Ek talep: GEO – yapay zekâ arama motorları için de optimize.)*
17. **Internal linking:** kümeler halinde bağlantı, yetim sayfa yok.
18. **Etik veri toplama:** kaynak önceliği üretici → resmi doküman → distribütör → yetkili satıcı → bağımsız inceleme; robots.txt/kullanım koşullarına uyum; `source_url, source_type, last_checked_at, data_confidence, manufacturer_url`.
19. **Fiyat karşılaştırma altyapısı:** satıcı, fiyat, kampanya, stok, beden, renk, URL, kontrol zamanı; güncellenmeyen fiyat "canlı" gösterilmez.
20. **Admin paneli:** ürün, marka, kategori, teknik özellik, kaynak, fiyat, rehber, öne çıkan ürün, SEO alanlarını kodsuz yönetme.
21. **Teknoloji:** Next.js, TypeScript, React, Tailwind, PostgreSQL, Prisma; Shopify/headless'a hazır.
22. **Performans:** Core Web Vitals; mobil Lighthouse Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 95.
23. **Erişilebilirlik:** WCAG temel kuralları, klavye, focus, alt, label, kontrast.
24. **404 ve hata durumları:** profesyonel 404; üretimi biten ürün silinmez, "Üretimi sona erdi" + yerine çıkan model.
25. **Bağımsız QA agent**, 26. **Data-quality agent**, 27. **Content agent** (özgün, uzman, kanıtsız iddiasız Türkçe; artı kadar eksi).
28. **Önce temel sistem:** çalışan shell, sonra gerçek veri: 10 kask, 5 interkom, 5 mont, 5 eldiven, 5 bot.
29. **Uzman sub-agent'larla çalışma:** architect, data, frontend, SEO, content, QA.
30. **Tamamlandı kriterleri:** menüler, linkler, mobil menü, arama, filtre, karşılaştırma, breadcrumb, ürün route'ları, kaynak sistemi, responsive, console hatasız, testler yeşil.
31. **Hızlı tamamlama:** paralel çalış, dev server'ı bekleme (arka planda), takılan süreci teşhis et; doğrulanamayan küçük bilgi projeyi durdurmaz (`verification_required`).

**Sohbette eklenen talepler:** kuryelerin ihtiyaçları ve ergonomi; Motomax tarzı kask beden tabloları; Trendyol çok satanlarının yorumlarından Türk kullanıcıya göre beden/olumlu-olumsuz eğilim çıkarımı.
