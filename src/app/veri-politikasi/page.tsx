import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, PageHead } from "@/components/ui";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Veri ve Kaynak Politikası: Bilgileri Nasıl Doğruluyoruz?",
  description: "Motorcu Kıyafeti'nde teknik bilgiler, fiyatlar ve interkom uyumlulukları hangi kaynaklardan, nasıl doğrulanıyor; doğrulanamayan bilgi nasıl gösteriliyor.",
  path: "/veri-politikasi",
});

const SECTIONS = [
  {
    h: "Kaynak önceliğimiz",
    p: ["Bir ürünün teknik bilgisini şu sırayla doğrularız. İki kaynak çeliştiğinde üreticinin bilgisi geçerlidir."],
    l: ["Üreticinin resmi web sitesi", "Resmi teknik doküman ve homologasyon kayıtları", "Resmi Türkiye distribütörü", "Yetkili satıcılar (fiyat, stok, beden, renk için)", "Güvenilir bağımsız testler ve incelemeler"],
  },
  {
    h: "Doğrulanamayan bilgi",
    p: [
      "Güvenilir bir kaynakta bulamadığımız değeri tahminle doldurmayız. Bu alanlar ürün sayfasında “Doğrulanıyor” olarak işaretlenir ve kaynak bulunduğunda güncellenir.",
      "Puan, yıldız veya kullanıcı yorumu uydurmayız. Ürün sayfalarındaki “Motorcu Kıyafeti yorumu” editoryal bir değerlendirmedir ve sayısal puan içermez.",
    ],
  },
  {
    h: "Fiyatlar",
    p: [
      "Gösterilen fiyatlar, belirtilen tarihte satıcının sayfasında gördüğümüz değerlerdir; canlı fiyat değildir. Her fiyatın yanında satıcı, kontrol tarihi ve stok durumu yazar. Yetkili satıcıda doğrulayamadığımız fiyatları göstermeyiz.",
    ],
  },
  {
    h: "Kask + interkom uyumluluğu",
    p: [
      "“Doğrulandı” etiketi yalnızca kask veya interkom üreticisinin uyumluluk listesine dayanan kayıtlarda kullanılır. Diğer kayıtlar genel beklentidir ve satın almadan önce teyit edilmesi gerektiği açıkça belirtilir.",
    ],
  },
  {
    h: "Metin ve görseller",
    p: [
      "Ürün açıklamalarını kendimiz yazarız; üretici veya satıcı metinlerini kopyalamayız. Kullanım hakkımız olmayan ürün fotoğraflarını yayınlamayız; bu yüzden ürünler şimdilik kendi çizimlerimizle gösterilir. Marka adları ve logoları sahiplerine aittir.",
    ],
  },
  {
    h: "Hata bildirimi",
    p: ["Her ürün sayfasının altında kullandığımız kaynakların listesi ve son kontrol tarihi bulunur. Bir bilginin yanlış veya eskimiş olduğunu düşünüyorsan kaynağıyla birlikte bize ilet; kontrol edip güncelleriz."],
  },
];

export default function DataPolicyPage() {
  return (
    <>
      <PageHead title="Veri ve kaynak politikası" intro="Motosiklet ekipmanı güvenlikle ilgili bir karar. Bu yüzden her bilginin nereden geldiğini gösteriyor, doğrulayamadığımız bilgiyi açıkça belirtiyoruz.">
        <Breadcrumbs items={[{ name: "Veri Politikası", href: "/veri-politikasi" }]} />
      </PageHead>
      <Container className="mt-8 max-w-3xl">
        <div className="prose-mk">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((x) => (
                <p key={x}>{x}</p>
              ))}
              {s.l && (
                <ul>
                  {s.l.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
