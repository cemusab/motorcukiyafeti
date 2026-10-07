# MotorcuKiyafeti.com – Proje Kuralları

Bu dosya her oturumun başında okunmalıdır. Tam proje tanımı `docs/proje-brief.md` içindedir. Çelişki olursa brief geçerlidir.

## Amaç
Türkiye'nin kapsamlı motosiklet ekipmanı rehberi: ürün keşfi, karşılaştırma, satın alma rehberi, SEO içerik platformu. Sıradan e-ticaret sitesi değil. Yeni motorcu "ne almalıyım?" sorusunun, deneyimli motorcu "bu iki kasktan hangisi?" sorusunun cevabını bulmalı.

## Teknoloji
Next.js (App Router), TypeScript, Tailwind, PostgreSQL, Prisma. İleride Shopify/headless commerce'e bağlanabilecek mimari. Daha iyi bir tercih varsa gerekçesini yazıp öner.

## Değişmez kurallar
1. Çalışmayan link, buton veya boş href olmayacak. Hedef sayfası olmayan link verme. Merkezi route manifest tut.
2. Uydurma veri yok. Puan, yorum, fiyat, ağırlık, ECE/EN standardı ve interkom uyumluluğu kaynaksız yazılmaz. Doğrulanamayan alan `verification_required` veya `unknown` olur.
3. Her veri kaydında `source_url`, `source_type`, `last_checked_at`, `data_confidence`, `manufacturer_url` alanları bulunur. Kaynak önceliği: üretici sitesi, resmi doküman, resmi distribütör, yetkili perakendeci, bağımsız inceleme.
4. Rakip sitelerden metin veya fotoğraf kopyalanmaz. Hakkımız olmayan görseller kullanılmaz. Marka logoları izin alınana kadar metin olarak gösterilir. Veri çekerken robots.txt ve kullanım koşullarına uyulur.
5. Sahte "MotorcuKiyafeti puanı" gösterilmez. Puanlama gösterilecekse kriterleri şeffaf olur.
6. Mevcut çalışan özellikler silinmez, kapsam daraltılmaz. Her değişiklikten sonra testler çalıştırılır, kırılanlar düzeltilir.
7. Çalışmayan özellik gizlenmez veya mock bırakılmaz: ya tamamlanır ya arayüzden kaldırılır.

## Tamamlandı sayılma
Menüler, linkler, mobil menü, arama, filtre, karşılaştırma, breadcrumb çalışıyor; 404 ve console error yok; responsive düzgün; otomatik testler (Playwright) geçiyor.

## Aşamalar (sırayla, her aşama ayrı oturum)
1. Temel: proje kurulumu, tasarım sistemi, header, mega menü, footer, route manifest, link crawler testi.
2. Sayfa şablonları: ana sayfa, kategori, ürün, marka, rehber.
3. Veri modeli (Prisma) ve admin paneli.
4. Arama, filtre, karşılaştırma, kask-interkom uyumluluk motoru.
5. İlk gerçek veri: 10 kask, 5 interkom, 5 mont, 5 eldiven, 5 bot (kaynaklı, elle doğrulanmış).
6. SEO (schema.org, sitemap, canonical) ve bağımsız QA.

Başlamadan önce: bilgi mimarisi, DB şeması, route haritası, bileşen mimarisi, veri toplama planı, SEO ve test planı çıkarılır ve `docs/` altına yazılır.

## Tasarım yönü
Siyah/koyu ve kırmızı vurgu, teknik ve premium his, mobile-first. Başlıkta Barlow Condensed, gövdede Barlow. Referans: `docs/design/reference.png` (taslak, içindeki puan, fiyat ve yorumlar örnektir, gerçek veri değildir; "Nootec" yazım hatası ve "2025" ibaresi düzeltilmeli). Çalışan ana sayfa prototipi: `docs/design/prototype.html`.

## Prototipten alınacak kararlar
- Ana sayfada "Yeni motor aldım" sihirbazı: motor türü, kullanım, mevsim, bütçe, sonuçta ekipman seti ve yaklaşık bütçe payı.
- Arama kategori, alt tür ve rehberleri bulur; Türkçe karakter toleranslıdır.
- Kategori ve alt tür yapısı prototipteki `CATS` nesnesinden başlanabilir.

## Çalışma düzeni
- Küçük kararlar için onay istenmez; hedeflere göre en iyi profesyonel karar verilir.
- Kullanım limitini korumak için: rutin işler hızlı modelle, mimari kararlar güçlü modelle yapılır. Gereksiz agent çoğaltılmaz.
- Gizli bilgi (token, API anahtarı) repoya yazılmaz, `.env` ve Vercel ortam değişkenlerinde tutulur.
