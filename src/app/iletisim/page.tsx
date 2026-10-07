import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { Container, PageHead } from "@/components/ui";
import { meta } from "@/lib/seo";
import { SITE, mailto } from "@/lib/site";

export const metadata = meta({
  title: "İletişim: Şikâyet, Öneri ve Hata Bildirimi",
  description: "Motorcu Kıyafeti'ne öneri, şikâyet, yanlış bilgi düzeltmesi veya iş birliği talebi için e-posta ile ulaşın.",
  path: "/iletisim",
});

const TOPICS = [
  { t: "Öneri", d: "Siteye eklenmesini istediğin ürün, marka, rehber veya özellik.", s: "Öneri" },
  { t: "Şikâyet", d: "Sitede yaşadığın bir sorun veya memnuniyetsizlik.", s: "Şikâyet" },
  { t: "Yanlış bilgi bildir", d: "Bir üründe hatalı teknik bilgi, fiyat veya uyumluluk gördüysen kaynağıyla birlikte ilet.", s: "Yanlış bilgi bildirimi" },
  { t: "Marka / iş birliği", d: "Üretici, distribütör veya satıcıysan; veri, görsel veya iş birliği talepleri.", s: "Marka / iş birliği" },
];

export default function ContactPage() {
  return (
    <>
      <PageHead title="İletişim" intro={`Şikâyet, öneri ve bildirimlerin doğrudan ${SITE.email} adresine gelir. Mümkün olan en kısa sürede dönüş yaparız.`}>
        <Breadcrumbs items={[{ name: "İletişim", href: "/iletisim" }]} />
      </PageHead>
      <Container className="mt-8 grid gap-3 sm:grid-cols-2">
        {TOPICS.map((x) => (
          <a key={x.t} href={mailto(`[${x.s}] `)} className="group flex gap-3 rounded-lg border border-line bg-white p-5 hover:border-ink">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-paper text-red">
              <Icon name="info" className="size-6" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold group-hover:text-red">{x.t}</span>
              <span className="mt-1 block text-sm text-mute">{x.d}</span>
            </span>
          </a>
        ))}
      </Container>
      <Container className="mt-8">
        <p className="text-mute">
          E-posta: <a href={mailto("Motorcu Kıyafeti")} className="font-semibold text-red underline">{SITE.email}</a>. Ürün yorumunu ilgili ürün sayfasındaki “Yorum yaz” düğmesiyle gönderebilirsin; yorumlar onaydan sonra yayınlanır.
        </p>
      </Container>
    </>
  );
}
