# Çalışma durumu (son güncelleme: 2026-10-07)

PR: https://github.com/cemusab/motorcukiyafeti/pull/1 (v2 → main). Birleştirince canlı site değişir — kullanıcı onayı olmadan birleştirme.

## Tamamlanan (v2 dalında)
- Site iskeleti, Motomax tarzı üst bar, mega menü, arama, filtreler (ölçüye göre beden dahil), karşılaştırma, kask+interkom, sihirbaz (motor modeli ile), /motor, /kadin, /erkek, kurye, KVKK/GDPR sayfaları, iletişim + e-postayla onaylı yorumlar
- Veri: 28 kask, 5 interkom, ~119 giyim (mont grupları g1/g2/g3/g5 + kadın), 45 marka (tarihçe + en güçlü kalem), 44 rehber
- Yerli marka: rozet, "Önerilen"de öne alma, "Yerli marka" filtresi, sihirbazda öncelik (commit bekliyor olabilir)
- Karşılaştırma çubuğu mobilde tek satır + ✕ ile sıfırlama

## Bekleyen (sıradaki adımlar)
1. ✅ Tüm ürün ekipleri bitti ve commit'lendi (103 kask, 105 mont).
2. ✅ Karşılaştırmayı bitir düğmesi
3. ✅ Önceki/sonraki gezinme
4. ✅ Yerli markalar bölümü + eski URL 301 yönlendirmeleri (next.config.ts)
5. ✅ Dev server / tip dosyaları yenilendi (yeni görsel alan adları next.config'e build/başlangıçta okunur)
6. ✅ QA yeşil (1356 URL taraması dahil), Lighthouse mobil SEO 100 her sayfada; Performance 85–93 (ürün sayfaları 85: üretici görseli ilk optimizasyonu). Push edildi (PR güncellenir); Lighthouse mobil: SEO ≥95 zorunlu, Performance >90 hedef
7. Sonraki aşama: Postgres + admin paneli + site içi yorum formu (Resend), veri sorumlusu bilgisi netleşince legal-config güncelle

## 2026-10-07 veri turu (tamamlandı)
436 ürün: 103 kask, 105 mont, 39 pantolon, 43 eldiven, 43 bot, 24 koruma, 21 interkom, 12 yağmurluk, 10 termal, 36 aksesuar · 78 marka · 44 rehber
Yeni kategoriler: yağmurluk, termal, aksesuar; koruma alt grupları. Görsel optimizasyonu en çok kullanılan 49 alan adıyla sınırlı (Next.js 50 limit), diğerleri unoptimized.
✅ Uyumluluk genişletildi: 17 kaska özel interkom, 167 kayıt (doğrulanmış 108+9), interkoma hazır tüm kasklara otomatik "teyit edilmedi" satırları.
Sıradaki: yayına alma (kullanıcı onayı); admin/DB; Search Console.
