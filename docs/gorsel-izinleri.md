# Ürün görselleri – kullanım durumu ve izin planı

**Durum (7 Ekim 2026):** Ürün sayfalarındaki ~1.010 görsel, üreticilerin kendi sitelerinden/CDN'lerinden doğrudan yükleniyor ve her görselin altında kaynak ("Görsel: Marka") yazıyor. Bu, site sahibinin bilinçli kararıdır. Telif hakkı görsel sahibinde kalır; açık izin alınmadıkça hukuki risk tamamen sıfır değildir.

## Teknik güvenceler (yapıldı)
- Görsel yüklenemezse (adres değişti, sunucu yanıt vermiyor) ürün otomatik olarak kategori çizimiyle gösterilir; sayfa bozulmaz.
- `npm run images` (scripts/check-images.ts) tüm görsel adreslerini kontrol eder; ayda en az bir kez çalıştırılmalı. 7 Ekim 2026: 1.010 görsel, 0 kırık.
- Bir marka itiraz ederse o markanın görselleri `src/data/media*.json` içinden kaldırılır; site çizim gösterir.

## Önerilen izin süreci (öncelik sırasıyla)
1. **Yerli markalar** (Yaren Tekstil, Tex Motor, Scudo, Tech90/Vecton, Riderdenim, YDS, LBC): iletişimleri kolay, tanıtıma açıklar. Yazılı (e-posta) izin + mümkünse yüksek çözünürlüklü görsel paketi iste.
2. **Türkiye distribütörleri** (ör. Tex Motor → Pinlock/Sway, Mototaş → Midland): distribütörler çoğu zaman bayi/medya görsel paketi verir.
3. **Global markaların basın/medya portalları:** Birçok üretici bayilere ve basına medya kiti sunar; erişim genelde kayıt ve onay ister. Her marka için koşullar farklıdır; "yalnız yetkili satıcılar" şartı olabilir.
4. İzin alınan markaların görselleri ileride kendi sunucumuza alınabilir (daha hızlı, kırılmaz).

## İzin e-postası şablonu
> Konu: Motorcu Kıyafeti – ürün görsellerinin kaynak gösterilerek kullanımı
>
> Merhaba, motorcukiyafeti.com motosiklet ekipmanları için bağımsız, kaynaklı bir bilgi ve karşılaştırma sitesidir (satış yapmıyoruz). [Marka] ürünlerini teknik özellikleri ve üretici sayfanıza bağlantı vererek tanıtıyoruz. Ürün sayfalarımızda resmi ürün görsellerinizi, kaynak ("Görsel: [Marka]") ve ürün sayfanıza bağlantı göstererek kullanmak için yazılı izninizi rica ediyoruz. Varsa medya/basın kitinize erişim de memnuniyetle kullanırız. Talep etmeniz halinde görselleri derhal kaldırırız.
> İletişim: motorcukiyafeti@gmail.com

## Kayıt
| Marka | İzin istendi | Yanıt | Not |
|---|---|---|---|
| – | – | – | – |
