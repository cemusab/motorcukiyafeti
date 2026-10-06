/**
 * Veri sorumlusu bilgileri (KVKK m. 10, Aydınlatma Tebliği m. 4). Site sahibi doldurur.
 * Zorunlu alanlar (veriSorumlusu, adres, eposta) dolmadan yasal sayfalar yayınlanmaz ve linklenmez.
 * KEP/MERSİS boş bırakılırsa bu bilgileri içeren satırlar metinden çıkarılır.
 */
export const LEGAL_CONFIG: { veriSorumlusu: string | null; adres: string | null; eposta: string | null; kep: string | null; mersis: string | null } = {
  veriSorumlusu: null,
  adres: null,
  eposta: null,
  kep: null,
  mersis: null,
};
