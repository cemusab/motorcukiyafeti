import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    title: "Kışlık Motosiklet Ekipmanı Tercihi: Gerçekten Üşümemek Mümkün mü?",
    slug: "kislik-motosiklet-ekipmani-tercihi",
    excerpt: "Havalar soğuduğunda motora binmek eziyet olmasın. Doğru kışlık katman dizilimi ve rüzgar kesici mantığını anlatıyoruz.",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    content: `
Kışın motora biniyorsanız en büyük düşmanınız soğuk değil, rüzgardır. Birçok arkadaşımız üst üste 5 kat kazak giyerek çözümü bulacağını sanıyor ama 100 km/h hızda o kazakların içinden geçen rüzgar sizi dondurur.

Olayın mantığı katman sisteminde bitiyor. Motosiklet montunuzun (tercihen Gore-Tex veya türevi membranlı bir ürün) içine rüzgar kesici (windstopper) bir ara katman ve en alta da teri dışarı atan bir termal içlik giymelisiniz. Pamuklu ürünlerden kışın kesinlikle uzak durun, terlerseniz o ter pamukta kalır ve sizi üşütür.

Kışlık eldivenlerde ise durum biraz daha karışık. Çok kalın eldivenler manet hissini yok ediyor. Şehir içindeyseniz elcik ısıtma + orta kalınlıkta bir Gore-Tex eldiven en iyi kombindir. Uzun yola çıkıyorsanız muffs (elcik koruyucu kılıf) takmaktan utanmayın, kurye işi gibi görünebilir ama elleriniz sıcacık kalır.
    `
  },
  {
    title: "Kuryeler Hangi Tarz Ürünleri Seçiyor? (Ve Neden Haklılar?)",
    slug: "kuryeler-hangi-tarz-urunleri-seciyor",
    excerpt: "Günde 12 saat motor üstünde olan profesyonellerin ekipman tercihleri bize çok şey anlatıyor.",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1616428773950-e837f47ebdbb?w=800&q=80",
    content: `
Kurye arkadaşlarımız bu işin gerçek savaşçıları. Günde ortalama 10-12 saat sele tepesinde, yağmur, çamur, kar demeden motosiklet kullanıyorlar. Bizim hafta sonu 2 saat giyip "çok rahatmış" dediğimiz bir mont, onlar için 3. saatte işkenceye dönüşebiliyor.

Kuryelerin en çok tercih ettiği ürün tipleri genelde fiyat/performans odaklı, ancak dayanıklılığı kanıtlanmış ürünler oluyor. Özellikle pantolonlarda diz koruması dışarıdan fermuarla takılıp çıkarılabilen modeller çok revaçta. Çünkü kurye bir mekana veya eve teslimat yaparken o koca korumalarla yürümek istemiyor.

Montlarda ise durum tamamen su geçirmezlik üzerine kurulu. Prosev, Prohel veya Forte GT gibi yerli pazarın uygun fiyatlı ama yağmura dayanıklı ürünleri çok satıyor. Kask tarafında ise genellikle çene açılır (modüler) kasklar tercih ediliyor. Sebebi çok basit: Müşteriyle konuşurken, adres sorarken veya bir yudum su içerken kaskı kafadan çıkarmak büyük vakit kaybı. LS2 Valiant veya MT Atom gibi çenesi tam arkaya katlanan kasklar bu yüzden kuryelerin favorisi.
    `
  },
  {
    title: "Kadın Motorcular Mont Seçerken Nelere Dikkat Etmeli?",
    slug: "kadin-motorcular-mont-secerken-nelere-dikkat-etmeli",
    excerpt: "Unisex mont yalanı ve kadın anatomisine uygun motosiklet montu seçmenin püf noktaları.",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1596700547743-f1165a6c0fa1?w=800&q=80",
    content: `
Motosiklet dünyasında en büyük yalanlardan biri "unisex" kalıptır. Piyasada unisex diye satılan montların %90'ı aslında erkek kalıbıdır, sadece XS veya S bedenleri kadınlara satılmaya çalışılır. Ancak kadın anatomisi omuz, göğüs ve bel kıvrımları açısından erkeklerden farklıdır.

Kadın motorcular mont alırken mutlaka "Lady" veya "Stella" (Alpinestars'ın kadın serisi) ibareli, kadın kalıbı için özel üretilmiş ürünleri aramalı. Erkek kalıbı bir montu bedeninize uydurmaya çalıştığınızda, korumalar (dirsek ve omuz) doğru yere oturmaz. Kaza anında dirsek korumasının kayması, korumasız bir mont giymekle aynı şeydir.

Ayrıca belden ayarlanabilir çıtçıt veya cırt cırtlı modelleri tercih edin. Montun belinize tam oturması, sürüş esnasında içeri rüzgar girmesini engeller. Bel kesimi kısa olan supersport tarzı montlar scooter veya touring kullanırken belinizi açıkta bırakabilir, biniş pozisyonunuza göre arka kısmı uzun kesimli montları değerlendirin.
    `
  },
  {
    title: "Türkiye'de Motosiklet Sayısındaki İnanılmaz Artış",
    slug: "turkiyede-motosiklet-sayisi-artisi",
    excerpt: "Trafik çilesi, yakıt fiyatları ve pandemi sonrası değişen ulaşım alışkanlıklarımız motosiklet satışlarını nasıl patlattı?",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    content: `
Geçtiğimiz son birkaç yılda trafikteki motor sayısının ne kadar arttığını fark etmemek imkansız. Eskiden trafikte tek tük gördüğümüz motosikletler, şimdi ışıklarda adeta bir sürü halinde bekliyor. İstatistikler de bunu doğruluyor, trafiğe kaydı yapılan araçlar içinde motosikletlerin payı inanılmaz bir hızla otomobilleri yakalıyor.

Bu artışın temel sebepleri çok net: İstanbul gibi metropollerdeki içinden çıkılmaz trafik, yakıt fiyatlarındaki artış ve özellikle 125cc yasası. B sınıfı ehliyetle belirli şartları sağlayarak 125cc'ye kadar motor kullanabilme hakkının getirilmesi, sektöre devasa bir ivme kazandırdı.

Tabii bu artış beraberinde güvenlik sorunlarını da getiriyor. Motosiklete yeni başlayan binlerce insan, ekipman bilinci olmadan yollara çıkıyor. 50cc veya 125cc scooter kullananların "nasıl olsa yavaş gidiyorum, kaska veya monta gerek yok" yanılgısı maalesef acı tecrübelerle sonuçlanıyor. Asfaltın 30 km/h hızda bile insan derisini nasıl zımparaladığını unutmamak lazım.
    `
  },
  {
    title: "Motosiklet Ekipmanlarında Güvenlik Unsurları: CE Etiketlerini Okuma Rehberi",
    slug: "guvenlik-unsurlari-ce-standartlari",
    excerpt: "CE, EN 17092, Level 1, Level 2... Bu terimler ne anlama geliyor? Hangi koruma seviyesi size uygun?",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1598284534720-333d452fb3d1?w=800&q=80",
    content: `
Mont alıyorsunuz ve üzerinde "CE Onaylı Korumalar" yazıyor. Peki bu yeterli mi? Cevap hayır. CE sadece Avrupa standartlarına uygunluğu belirtir, önemli olan o standardın derecesidir.

Öncelikle kumaşın sürtünme standardına (EN 17092) bakalım:
- C: Sadece darbe koruması, sürtünme dayanımı yok (Genelde arazi içlikleri).
- A: Düşük hızlı şehir içi kullanım. Kumaş sürtünmeye kısmen dayanır.
- AA: Touring ve otoyol kullanımı. Deri veya kalın tekstiller bu sınıftadır.
- AAA: Pist kullanımı veya premium tulumlar. Asfaltta metrelerce sürüklenmeye dayanır.

İç korumalar (Omuz, dirsek, diz, sırt) ise EN 1621 standardına tabidir:
- Level 1: Standart darbe emilimi. Hafiftir ve rahattır.
- Level 2: Daha yüksek darbe emilimi. Genelde biraz daha kalın veya ağırdır ama güvenliği çok daha yüksektir.

Bütçeniz elveriyorsa, en az AA sertifikalı bir mont ve Level 2 korumaları hedefleyin. Özellikle sırt koruması çoğu montta kutudan çıkmaz (sadece sünger çıkar). O süngeri söküp atın ve mutlaka Level 2 sertifikalı gerçek bir sırt koruması (insert) alın.
    `
  },
  {
    title: "Motosiklette Yeni Kanunlar ve Reflektörlü Yelek Zorunluluğu",
    slug: "yeni-kanunlar-reflektorlu-yelek",
    excerpt: "Gece sürüşlerinde reflektör zorunluluğu ve trafik cezaları hakkında bilmeniz gereken her şey.",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1541336032412-2048a678540d?w=800&q=80",
    content: `
Karayolları Trafik Yönetmeliğinde yapılan değişiklikle birlikte, motosiklet sürücülerinin ve yolcularının akşam gün batımından sabah gün doğumuna kadar olan sürede reflektif (yansıtıcı) giysi giymesi zorunlu hale getirildi. 

Çoğu motorcu bunu sadece "sarı fosforlu yelek giymek zorundayım" olarak anlıyor ama durum tam olarak öyle değil. Kanun, görünürlüğünüzü artıracak reflektif şeritleri olan ceketleri veya aparatları da kabul ediyor. Yani motosiklet montunuzun üzerinde zaten yeterli miktarda yansıtıcı şerit varsa, ekstra bir inşaat yeleği giymenize gerek kalmayabiliyor (bu durum polis memurunun inisiyatifine de kalabiliyor, o yüzden yanınızda ince bir yelek taşımakta fayda var).

Görünür olmak hayat kurtarır. Siyah kask, siyah mont, siyah motor kombinasyonu maalesef gece karanlığında sizi otomobil sürücüleri için adeta bir hayalete çeviriyor. 
    `
  },
  {
    title: "ECE 22.06 Standardı Nedir? Eski Kaskımı Çöpe mi Atmalıyım?",
    slug: "ece-22-06-standardi-nedir",
    excerpt: "Avrupa'nın yeni kask güvenlik standardı 22.06 neleri değiştirdi? 22.05 kasklar artık güvensiz mi?",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1583071299210-c6c113f4cb17?w=800&q=80",
    content: `
Kask dünyasında son 20 yılın en büyük değişikliği ECE 22.06 standardı oldu. Eski 22.05 standardı artık rafa kalktı ve firmalar 22.06 testlerinden geçemeyen kaskları Avrupa pazarında satamıyor.

Peki ne değişti? 22.06 testleri çok daha acımasız. Eski testlerde kask hep belli, bilindik noktalardan darbeye maruz bırakılıyordu. Firmalar da kaskın sadece o noktalarını güçlendirip testi geçebiliyordu. 22.06 ile birlikte darbe noktaları rastgele seçiliyor. Ayrıca "dönme ivmesi" (rotational acceleration) denilen, beyin sarsıntılarına en çok yol açan açılı çarpma testleri zorunlu hale geldi. İnterkom takılıyken, güneş vizörü açık ve kapalıyken ayrı ayrı test ediliyorlar.

Peki elinizdeki ECE 22.05 kaskı çöpe mi atmalısınız? Hayır. 22.05 hala geçerli ve güvenli bir standarttır (kaskınızın 5 yıllık raf/kullanım ömrü dolmadıysa). Sadece 22.06 kasklar *çok daha güvenli* olarak tescillenmiştir. Yeni bir kask alacaksanız kesinlikle 22.06 standartlı modellere yönelin.
    `
  },
  {
    title: "Yeni Başlayanlar İçin İlk Ekipman Seti Nasıl Dizilmeli?",
    slug: "yeni-baslayanlar-icin-ilk-ekipman-seti",
    excerpt: "Motora ilk defa bineceklere bütçe dostu, kazık yemeden ekipman dizme tüyoları.",
    imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&q=80",
    content: `
Motosiklet hevesine kapılıp motoru aldıktan sonra elde kalan 3-5 bin lirayla "idareten" ekipman dizmeye çalışan yüzlerce arkadaşımız var. Baştan söyleyelim: O iş öyle olmaz. Motor bütçenizi hesaplarken toplam paranın en az %20'sini ekipmana ayırmanız gerekiyor.

Peki sıfırdan dizilirken parayı nereye gömmek lazım? 
1. Kask: Bütçenizin en büyük kalemini buraya ayırın. Fiber veya iyi kalite polikarbon, ECE sertifikalı (tercihen 22.06) tam kapalı bir kask alın. Çene açılır kasklar yeni başlayanlar için ağır olabilir.
2. Mont: Yeni başlayanların en çok yaptığı hata gidip simsiyah deri racing mont almaktır. Eğer scooter veya naked biniyorsanız, dört mevsimlik tekstil bir mont çok daha işinize yarar.
3. Eldiven: Refleksleriniz henüz oturmadığı için düştüğünüzde ilk yere değecek yeriniz avuç içlerinizdir. Avuç içi slider'ı olan deri/tekstil karışımı bir eldiven şart.
4. Ayakkabı: En azından bilek koruması olan sert bir motosiklet sneaker'ı alın. Normal spor ayakkabıyla vites atmak hem ayakkabıyı parçalar hem de kaza anında bileğinizi korumaz.

Bunları ucuza getirmek için ikinci el kask almayın. Kaskın içindeki köpük kullanıcının kafasına göre şekil alır ve daha önceki düşüşlerini bilemezsiniz. Mont veya pantolonu ikinci el alabilirsiniz ama kask daima sıfır olmalıdır.
    `
  }
];

async function main() {
  console.log("Rehberler/Blog yazıları ekleniyor...");
  
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article
    });
    console.log(`Eklendi: ${article.title}`);
  }

  console.log("Tüm makaleler başarıyla veritabanına eklendi!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
