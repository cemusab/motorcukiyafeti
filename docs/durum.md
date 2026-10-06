# Çalışma durumu (son güncelleme: 2026-10-06)

PR: https://github.com/cemusab/motorcukiyafeti/pull/1 (v2 → main). Birleştirince canlı site değişir — kullanıcı onayı olmadan birleştirme.

## Tamamlanan (v2 dalında)
- Site iskeleti, Motomax tarzı üst bar, mega menü, arama, filtreler (ölçüye göre beden dahil), karşılaştırma, kask+interkom, sihirbaz (motor modeli ile), /motor, /kadin, /erkek, kurye, KVKK/GDPR sayfaları, iletişim + e-postayla onaylı yorumlar
- Veri: 28 kask, 5 interkom, ~119 giyim (mont grupları g1/g2/g3/g5 + kadın), 45 marka (tarihçe + en güçlü kalem), 44 rehber
- Yerli marka: rozet, "Önerilen"de öne alma, "Yerli marka" filtresi, sihirbazda öncelik (commit bekliyor olabilir)
- Karşılaştırma çubuğu mobilde tek satır + ✕ ile sıfırlama

## Bekleyen (sıradaki adımlar)
1. ✅ Tüm ürün ekipleri bitti ve commit'lendi (103 kask, 105 mont).
2. Karşılaştırma sayfasına "Karşılaştırmayı bitir" düğmesi (listeyi sıfırla + geri dön) — src/components/CompareTool.tsx
3. Önceki/sonraki gezinme: ürün sayfası (aynı kategori) ve rehber (aynı konu)
4. Ana sayfaya "Yerli markalar" bölümü (Türk markaları + ürünleri)
5. Dev server yeniden başlat (yeni görsel alan adları next.config'e build/başlangıçta okunur)
6. `npm run qa` → yeşil ise push (PR güncellenir); Lighthouse mobil: SEO ≥95 zorunlu, Performance >90 hedef
7. Sonraki aşama: Postgres + admin paneli + site içi yorum formu (Resend), veri sorumlusu bilgisi netleşince legal-config güncelle
