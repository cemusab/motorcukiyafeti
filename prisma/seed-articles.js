"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var articles = [
    {
        title: "Kışlık Motosiklet Ekipmanı Tercihi: Gerçekten Üşümemek Mümkün mü?",
        slug: "kislik-motosiklet-ekipmani-tercihi",
        excerpt: "Havalar soğuduğunda motora binmek eziyet olmasın. Doğru kışlık katman dizilimi ve rüzgar kesici mantığını anlatıyoruz.",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
        content: "\nK\u0131\u015F\u0131n motora biniyorsan\u0131z en b\u00FCy\u00FCk d\u00FC\u015Fman\u0131n\u0131z so\u011Fuk de\u011Fil, r\u00FCzgard\u0131r. Bir\u00E7ok arkada\u015F\u0131m\u0131z \u00FCst \u00FCste 5 kat kazak giyerek \u00E7\u00F6z\u00FCm\u00FC bulaca\u011F\u0131n\u0131 san\u0131yor ama 100 km/h h\u0131zda o kazaklar\u0131n i\u00E7inden ge\u00E7en r\u00FCzgar sizi dondurur.\n\nOlay\u0131n mant\u0131\u011F\u0131 katman sisteminde bitiyor. Motosiklet montunuzun (tercihen Gore-Tex veya t\u00FCrevi membranl\u0131 bir \u00FCr\u00FCn) i\u00E7ine r\u00FCzgar kesici (windstopper) bir ara katman ve en alta da teri d\u0131\u015Far\u0131 atan bir termal i\u00E7lik giymelisiniz. Pamuklu \u00FCr\u00FCnlerden k\u0131\u015F\u0131n kesinlikle uzak durun, terlerseniz o ter pamukta kal\u0131r ve sizi \u00FC\u015F\u00FCt\u00FCr.\n\nK\u0131\u015Fl\u0131k eldivenlerde ise durum biraz daha kar\u0131\u015F\u0131k. \u00C7ok kal\u0131n eldivenler manet hissini yok ediyor. \u015Eehir i\u00E7indeyseniz elcik \u0131s\u0131tma + orta kal\u0131nl\u0131kta bir Gore-Tex eldiven en iyi kombindir. Uzun yola \u00E7\u0131k\u0131yorsan\u0131z muffs (elcik koruyucu k\u0131l\u0131f) takmaktan utanmay\u0131n, kurye i\u015Fi gibi g\u00F6r\u00FCnebilir ama elleriniz s\u0131cac\u0131k kal\u0131r.\n    "
    },
    {
        title: "Kuryeler Hangi Tarz Ürünleri Seçiyor? (Ve Neden Haklılar?)",
        slug: "kuryeler-hangi-tarz-urunleri-seciyor",
        excerpt: "Günde 12 saat motor üstünde olan profesyonellerin ekipman tercihleri bize çok şey anlatıyor.",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1616428773950-e837f47ebdbb?w=800&q=80",
        content: "\nKurye arkada\u015Flar\u0131m\u0131z bu i\u015Fin ger\u00E7ek sava\u015F\u00E7\u0131lar\u0131. G\u00FCnde ortalama 10-12 saat sele tepesinde, ya\u011Fmur, \u00E7amur, kar demeden motosiklet kullan\u0131yorlar. Bizim hafta sonu 2 saat giyip \"\u00E7ok rahatm\u0131\u015F\" dedi\u011Fimiz bir mont, onlar i\u00E7in 3. saatte i\u015Fkenceye d\u00F6n\u00FC\u015Febiliyor.\n\nKuryelerin en \u00E7ok tercih etti\u011Fi \u00FCr\u00FCn tipleri genelde fiyat/performans odakl\u0131, ancak dayan\u0131kl\u0131l\u0131\u011F\u0131 kan\u0131tlanm\u0131\u015F \u00FCr\u00FCnler oluyor. \u00D6zellikle pantolonlarda diz korumas\u0131 d\u0131\u015Far\u0131dan fermuarla tak\u0131l\u0131p \u00E7\u0131kar\u0131labilen modeller \u00E7ok reva\u00E7ta. \u00C7\u00FCnk\u00FC kurye bir mekana veya eve teslimat yaparken o koca korumalarla y\u00FCr\u00FCmek istemiyor.\n\nMontlarda ise durum tamamen su ge\u00E7irmezlik \u00FCzerine kurulu. Prosev, Prohel veya Forte GT gibi yerli pazar\u0131n uygun fiyatl\u0131 ama ya\u011Fmura dayan\u0131kl\u0131 \u00FCr\u00FCnleri \u00E7ok sat\u0131yor. Kask taraf\u0131nda ise genellikle \u00E7ene a\u00E7\u0131l\u0131r (mod\u00FCler) kasklar tercih ediliyor. Sebebi \u00E7ok basit: M\u00FC\u015Fteriyle konu\u015Furken, adres sorarken veya bir yudum su i\u00E7erken kask\u0131 kafadan \u00E7\u0131karmak b\u00FCy\u00FCk vakit kayb\u0131. LS2 Valiant veya MT Atom gibi \u00E7enesi tam arkaya katlanan kasklar bu y\u00FCzden kuryelerin favorisi.\n    "
    },
    {
        title: "Kadın Motorcular Mont Seçerken Nelere Dikkat Etmeli?",
        slug: "kadin-motorcular-mont-secerken-nelere-dikkat-etmeli",
        excerpt: "Unisex mont yalanı ve kadın anatomisine uygun motosiklet montu seçmenin püf noktaları.",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1596700547743-f1165a6c0fa1?w=800&q=80",
        content: "\nMotosiklet d\u00FCnyas\u0131nda en b\u00FCy\u00FCk yalanlardan biri \"unisex\" kal\u0131pt\u0131r. Piyasada unisex diye sat\u0131lan montlar\u0131n %90'\u0131 asl\u0131nda erkek kal\u0131b\u0131d\u0131r, sadece XS veya S bedenleri kad\u0131nlara sat\u0131lmaya \u00E7al\u0131\u015F\u0131l\u0131r. Ancak kad\u0131n anatomisi omuz, g\u00F6\u011F\u00FCs ve bel k\u0131vr\u0131mlar\u0131 a\u00E7\u0131s\u0131ndan erkeklerden farkl\u0131d\u0131r.\n\nKad\u0131n motorcular mont al\u0131rken mutlaka \"Lady\" veya \"Stella\" (Alpinestars'\u0131n kad\u0131n serisi) ibareli, kad\u0131n kal\u0131b\u0131 i\u00E7in \u00F6zel \u00FCretilmi\u015F \u00FCr\u00FCnleri aramal\u0131. Erkek kal\u0131b\u0131 bir montu bedeninize uydurmaya \u00E7al\u0131\u015Ft\u0131\u011F\u0131n\u0131zda, korumalar (dirsek ve omuz) do\u011Fru yere oturmaz. Kaza an\u0131nda dirsek korumas\u0131n\u0131n kaymas\u0131, korumas\u0131z bir mont giymekle ayn\u0131 \u015Feydir.\n\nAyr\u0131ca belden ayarlanabilir \u00E7\u0131t\u00E7\u0131t veya c\u0131rt c\u0131rtl\u0131 modelleri tercih edin. Montun belinize tam oturmas\u0131, s\u00FCr\u00FC\u015F esnas\u0131nda i\u00E7eri r\u00FCzgar girmesini engeller. Bel kesimi k\u0131sa olan supersport tarz\u0131 montlar scooter veya touring kullan\u0131rken belinizi a\u00E7\u0131kta b\u0131rakabilir, bini\u015F pozisyonunuza g\u00F6re arka k\u0131sm\u0131 uzun kesimli montlar\u0131 de\u011Ferlendirin.\n    "
    },
    {
        title: "Türkiye'de Motosiklet Sayısındaki İnanılmaz Artış",
        slug: "turkiyede-motosiklet-sayisi-artisi",
        excerpt: "Trafik çilesi, yakıt fiyatları ve pandemi sonrası değişen ulaşım alışkanlıklarımız motosiklet satışlarını nasıl patlattı?",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
        content: "\nGe\u00E7ti\u011Fimiz son birka\u00E7 y\u0131lda trafikteki motor say\u0131s\u0131n\u0131n ne kadar artt\u0131\u011F\u0131n\u0131 fark etmemek imkans\u0131z. Eskiden trafikte tek t\u00FCk g\u00F6rd\u00FC\u011F\u00FCm\u00FCz motosikletler, \u015Fimdi \u0131\u015F\u0131klarda adeta bir s\u00FCr\u00FC halinde bekliyor. \u0130statistikler de bunu do\u011Fruluyor, trafi\u011Fe kayd\u0131 yap\u0131lan ara\u00E7lar i\u00E7inde motosikletlerin pay\u0131 inan\u0131lmaz bir h\u0131zla otomobilleri yakal\u0131yor.\n\nBu art\u0131\u015F\u0131n temel sebepleri \u00E7ok net: \u0130stanbul gibi metropollerdeki i\u00E7inden \u00E7\u0131k\u0131lmaz trafik, yak\u0131t fiyatlar\u0131ndaki art\u0131\u015F ve \u00F6zellikle 125cc yasas\u0131. B s\u0131n\u0131f\u0131 ehliyetle belirli \u015Fartlar\u0131 sa\u011Flayarak 125cc'ye kadar motor kullanabilme hakk\u0131n\u0131n getirilmesi, sekt\u00F6re devasa bir ivme kazand\u0131rd\u0131.\n\nTabii bu art\u0131\u015F beraberinde g\u00FCvenlik sorunlar\u0131n\u0131 da getiriyor. Motosiklete yeni ba\u015Flayan binlerce insan, ekipman bilinci olmadan yollara \u00E7\u0131k\u0131yor. 50cc veya 125cc scooter kullananlar\u0131n \"nas\u0131l olsa yava\u015F gidiyorum, kaska veya monta gerek yok\" yan\u0131lg\u0131s\u0131 maalesef ac\u0131 tecr\u00FCbelerle sonu\u00E7lan\u0131yor. Asfalt\u0131n 30 km/h h\u0131zda bile insan derisini nas\u0131l z\u0131mparalad\u0131\u011F\u0131n\u0131 unutmamak laz\u0131m.\n    "
    },
    {
        title: "Motosiklet Ekipmanlarında Güvenlik Unsurları: CE Etiketlerini Okuma Rehberi",
        slug: "guvenlik-unsurlari-ce-standartlari",
        excerpt: "CE, EN 17092, Level 1, Level 2... Bu terimler ne anlama geliyor? Hangi koruma seviyesi size uygun?",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1598284534720-333d452fb3d1?w=800&q=80",
        content: "\nMont al\u0131yorsunuz ve \u00FCzerinde \"CE Onayl\u0131 Korumalar\" yaz\u0131yor. Peki bu yeterli mi? Cevap hay\u0131r. CE sadece Avrupa standartlar\u0131na uygunlu\u011Fu belirtir, \u00F6nemli olan o standard\u0131n derecesidir.\n\n\u00D6ncelikle kuma\u015F\u0131n s\u00FCrt\u00FCnme standard\u0131na (EN 17092) bakal\u0131m:\n- C: Sadece darbe korumas\u0131, s\u00FCrt\u00FCnme dayan\u0131m\u0131 yok (Genelde arazi i\u00E7likleri).\n- A: D\u00FC\u015F\u00FCk h\u0131zl\u0131 \u015Fehir i\u00E7i kullan\u0131m. Kuma\u015F s\u00FCrt\u00FCnmeye k\u0131smen dayan\u0131r.\n- AA: Touring ve otoyol kullan\u0131m\u0131. Deri veya kal\u0131n tekstiller bu s\u0131n\u0131ftad\u0131r.\n- AAA: Pist kullan\u0131m\u0131 veya premium tulumlar. Asfaltta metrelerce s\u00FCr\u00FCklenmeye dayan\u0131r.\n\n\u0130\u00E7 korumalar (Omuz, dirsek, diz, s\u0131rt) ise EN 1621 standard\u0131na tabidir:\n- Level 1: Standart darbe emilimi. Hafiftir ve rahatt\u0131r.\n- Level 2: Daha y\u00FCksek darbe emilimi. Genelde biraz daha kal\u0131n veya a\u011F\u0131rd\u0131r ama g\u00FCvenli\u011Fi \u00E7ok daha y\u00FCksektir.\n\nB\u00FCt\u00E7eniz elveriyorsa, en az AA sertifikal\u0131 bir mont ve Level 2 korumalar\u0131 hedefleyin. \u00D6zellikle s\u0131rt korumas\u0131 \u00E7o\u011Fu montta kutudan \u00E7\u0131kmaz (sadece s\u00FCnger \u00E7\u0131kar). O s\u00FCngeri s\u00F6k\u00FCp at\u0131n ve mutlaka Level 2 sertifikal\u0131 ger\u00E7ek bir s\u0131rt korumas\u0131 (insert) al\u0131n.\n    "
    },
    {
        title: "Motosiklette Yeni Kanunlar ve Reflektörlü Yelek Zorunluluğu",
        slug: "yeni-kanunlar-reflektorlu-yelek",
        excerpt: "Gece sürüşlerinde reflektör zorunluluğu ve trafik cezaları hakkında bilmeniz gereken her şey.",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1541336032412-2048a678540d?w=800&q=80",
        content: "\nKarayollar\u0131 Trafik Y\u00F6netmeli\u011Finde yap\u0131lan de\u011Fi\u015Fiklikle birlikte, motosiklet s\u00FCr\u00FCc\u00FClerinin ve yolcular\u0131n\u0131n ak\u015Fam g\u00FCn bat\u0131m\u0131ndan sabah g\u00FCn do\u011Fumuna kadar olan s\u00FCrede reflektif (yans\u0131t\u0131c\u0131) giysi giymesi zorunlu hale getirildi. \n\n\u00C7o\u011Fu motorcu bunu sadece \"sar\u0131 fosforlu yelek giymek zorunday\u0131m\" olarak anl\u0131yor ama durum tam olarak \u00F6yle de\u011Fil. Kanun, g\u00F6r\u00FCn\u00FCrl\u00FC\u011F\u00FCn\u00FCz\u00FC art\u0131racak reflektif \u015Feritleri olan ceketleri veya aparatlar\u0131 da kabul ediyor. Yani motosiklet montunuzun \u00FCzerinde zaten yeterli miktarda yans\u0131t\u0131c\u0131 \u015Ferit varsa, ekstra bir in\u015Faat yele\u011Fi giymenize gerek kalmayabiliyor (bu durum polis memurunun inisiyatifine de kalabiliyor, o y\u00FCzden yan\u0131n\u0131zda ince bir yelek ta\u015F\u0131makta fayda var).\n\nG\u00F6r\u00FCn\u00FCr olmak hayat kurtar\u0131r. Siyah kask, siyah mont, siyah motor kombinasyonu maalesef gece karanl\u0131\u011F\u0131nda sizi otomobil s\u00FCr\u00FCc\u00FCleri i\u00E7in adeta bir hayalete \u00E7eviriyor. \n    "
    },
    {
        title: "ECE 22.06 Standardı Nedir? Eski Kaskımı Çöpe mi Atmalıyım?",
        slug: "ece-22-06-standardi-nedir",
        excerpt: "Avrupa'nın yeni kask güvenlik standardı 22.06 neleri değiştirdi? 22.05 kasklar artık güvensiz mi?",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1583071299210-c6c113f4cb17?w=800&q=80",
        content: "\nKask d\u00FCnyas\u0131nda son 20 y\u0131l\u0131n en b\u00FCy\u00FCk de\u011Fi\u015Fikli\u011Fi ECE 22.06 standard\u0131 oldu. Eski 22.05 standard\u0131 art\u0131k rafa kalkt\u0131 ve firmalar 22.06 testlerinden ge\u00E7emeyen kasklar\u0131 Avrupa pazar\u0131nda satam\u0131yor.\n\nPeki ne de\u011Fi\u015Fti? 22.06 testleri \u00E7ok daha ac\u0131mas\u0131z. Eski testlerde kask hep belli, bilindik noktalardan darbeye maruz b\u0131rak\u0131l\u0131yordu. Firmalar da kask\u0131n sadece o noktalar\u0131n\u0131 g\u00FC\u00E7lendirip testi ge\u00E7ebiliyordu. 22.06 ile birlikte darbe noktalar\u0131 rastgele se\u00E7iliyor. Ayr\u0131ca \"d\u00F6nme ivmesi\" (rotational acceleration) denilen, beyin sars\u0131nt\u0131lar\u0131na en \u00E7ok yol a\u00E7an a\u00E7\u0131l\u0131 \u00E7arpma testleri zorunlu hale geldi. \u0130nterkom tak\u0131l\u0131yken, g\u00FCne\u015F viz\u00F6r\u00FC a\u00E7\u0131k ve kapal\u0131yken ayr\u0131 ayr\u0131 test ediliyorlar.\n\nPeki elinizdeki ECE 22.05 kask\u0131 \u00E7\u00F6pe mi atmal\u0131s\u0131n\u0131z? Hay\u0131r. 22.05 hala ge\u00E7erli ve g\u00FCvenli bir standartt\u0131r (kask\u0131n\u0131z\u0131n 5 y\u0131ll\u0131k raf/kullan\u0131m \u00F6mr\u00FC dolmad\u0131ysa). Sadece 22.06 kasklar *\u00E7ok daha g\u00FCvenli* olarak tescillenmi\u015Ftir. Yeni bir kask alacaksan\u0131z kesinlikle 22.06 standartl\u0131 modellere y\u00F6nelin.\n    "
    },
    {
        title: "Yeni Başlayanlar İçin İlk Ekipman Seti Nasıl Dizilmeli?",
        slug: "yeni-baslayanlar-icin-ilk-ekipman-seti",
        excerpt: "Motora ilk defa bineceklere bütçe dostu, kazık yemeden ekipman dizme tüyoları.",
        imageUrl: "https://wsrv.nl/?url=https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&q=80",
        content: "\nMotosiklet hevesine kap\u0131l\u0131p motoru ald\u0131ktan sonra elde kalan 3-5 bin lirayla \"idareten\" ekipman dizmeye \u00E7al\u0131\u015Fan y\u00FCzlerce arkada\u015F\u0131m\u0131z var. Ba\u015Ftan s\u00F6yleyelim: O i\u015F \u00F6yle olmaz. Motor b\u00FCt\u00E7enizi hesaplarken toplam paran\u0131n en az %20'sini ekipmana ay\u0131rman\u0131z gerekiyor.\n\nPeki s\u0131f\u0131rdan dizilirken paray\u0131 nereye g\u00F6mmek laz\u0131m? \n1. Kask: B\u00FCt\u00E7enizin en b\u00FCy\u00FCk kalemini buraya ay\u0131r\u0131n. Fiber veya iyi kalite polikarbon, ECE sertifikal\u0131 (tercihen 22.06) tam kapal\u0131 bir kask al\u0131n. \u00C7ene a\u00E7\u0131l\u0131r kasklar yeni ba\u015Flayanlar i\u00E7in a\u011F\u0131r olabilir.\n2. Mont: Yeni ba\u015Flayanlar\u0131n en \u00E7ok yapt\u0131\u011F\u0131 hata gidip simsiyah deri racing mont almakt\u0131r. E\u011Fer scooter veya naked biniyorsan\u0131z, d\u00F6rt mevsimlik tekstil bir mont \u00E7ok daha i\u015Finize yarar.\n3. Eldiven: Refleksleriniz hen\u00FCz oturmad\u0131\u011F\u0131 i\u00E7in d\u00FC\u015Ft\u00FC\u011F\u00FCn\u00FCzde ilk yere de\u011Fecek yeriniz avu\u00E7 i\u00E7lerinizdir. Avu\u00E7 i\u00E7i slider'\u0131 olan deri/tekstil kar\u0131\u015F\u0131m\u0131 bir eldiven \u015Fart.\n4. Ayakkab\u0131: En az\u0131ndan bilek korumas\u0131 olan sert bir motosiklet sneaker'\u0131 al\u0131n. Normal spor ayakkab\u0131yla vites atmak hem ayakkab\u0131y\u0131 par\u00E7alar hem de kaza an\u0131nda bile\u011Finizi korumaz.\n\nBunlar\u0131 ucuza getirmek i\u00E7in ikinci el kask almay\u0131n. Kask\u0131n i\u00E7indeki k\u00F6p\u00FCk kullan\u0131c\u0131n\u0131n kafas\u0131na g\u00F6re \u015Fekil al\u0131r ve daha \u00F6nceki d\u00FC\u015F\u00FC\u015Flerini bilemezsiniz. Mont veya pantolonu ikinci el alabilirsiniz ama kask daima s\u0131f\u0131r olmal\u0131d\u0131r.\n    "
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, articles_1, article;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Rehberler/Blog yazıları ekleniyor...");
                    _i = 0, articles_1 = articles;
                    _a.label = 1;
                case 1:
                    if (!(_i < articles_1.length)) return [3 /*break*/, 4];
                    article = articles_1[_i];
                    return [4 /*yield*/, prisma.article.upsert({
                            where: { slug: article.slug },
                            update: {},
                            create: article
                        })];
                case 2:
                    _a.sent();
                    console.log("Eklendi: ".concat(article.title));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Tüm makaleler başarıyla veritabanına eklendi!");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.error(e);
    process.exit(1);
});
