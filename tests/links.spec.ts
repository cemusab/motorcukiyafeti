import { test, expect } from '@playwright/test';

const urlsToCheck = [
  '/',
  '/kask', '/mont', '/pantolon', '/eldiven', '/bot', '/interkom', '/koruma', '/aksesuar', '/markalar', '/rehberler',
  '/yeni-baslayanlar', '/karsilastir', '/uyumluluk',
  '/hakkimizda', '/iletisim', '/gizlilik', '/kullanim-sartlari',
  '/favoriler', '/hesabim'
];

test.describe('Tüm Navigasyon ve Footer Linkleri 200 Durum Kodu Testi', () => {
  for (const url of urlsToCheck) {
    test(`HTTP 200 Kontrolü: ${url}`, async ({ page }) => {
      const response = await page.goto(`http://localhost:3000${url}`);
      expect(response?.status()).toBe(200);
      
      // Sayfada 404 veya hata kelimeleri geçmemeli
      const content = await page.content();
      expect(content.toLowerCase()).not.toContain('404 - bu sayfa bulunamadı');
    });
  }
});
