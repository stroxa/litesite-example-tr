Not: Update.sh dosyası programın generate(oluşturucu) dosyasıdır. Updates.sh dosyasının oluşturduğu dosyalar manuel olarak müdahele edilmemeli sadece kaynak update.sh'ın kullandığı kaynak dosyada düzenlemeler yapılmalıdır. Kaynak dosya ve oluşturulan dosya adımlar içerisinde belirtilmiştir.


1 - Logo.png dosyasının düzenlenmesi : ( logo.png -> logo.webp )
    - Eğer işletmenin logosu var ise logo dosya boyutu küçültülerek logo.png şeklinde adlandırılarak kullanılması. Eğer logo yoksa kullanıcı tarafından ai yada farklı bir şekilde logo oluşturulup tekrar aynı adımlar izlenmelidir.( logo.webp dosyası update.sh tarafından oluşturulmaktadır)

2 - Favicon'ların eklenmesi : ( favicon.png ve favicon.ico )
    - Favicon'lar kullanıcı tarafından 1 KB'dan küçük olacak şekilde manuel olarak eklenmesi gereken dosyalar arasındadır. Eğer favicon dosyanız yoksa kendiniz manuel olarak ya da Yapay Zeka aracılığıyla oluşturabilirsiniz. Dosya formatlarından birisi .png diğeri de .ico olmalıdır. İnternetten bu süreç hakkında daha ayrıntılı bilgi alabilirsiniz.
    - Bu iki dosya update.sh tarafından oluşturulmaz, doğrudan kök dizine eklenmelidir.

3 - settings : (klasör)
    3.1 - site.json ( kaynak dosya: settings/site.json )
    - Site içerisinde kullanılan genel bilgilerin tutulduğu dosyadır. İşletmenin alan adı, dil, ürün kategorileri (productSections), sepet ve kargo uyarı mesajları, header hero görseli ve metni, arayüzde görünen tüm Türkçe etiketler bu dosyada tutulmaktadır.
    - isCategoryCollapsable : Ürün listesinin görünüm biçimini belirler.
        true  → Kategoriler tıklanarak açılıp kapanabilir bölümler (`<details>`) olarak gösterilir.
        false → Tüm ürünler kategorisiz, tek bir düz liste halinde gösterilir.

    3.2 - company.json ( kaynak dosya: settings/company.json )
    - İşletme bilgilerinin tutulduğu dosyadır. Şirket adı, yasal unvan, adres, telefon, e-posta, WhatsApp, Telegram, Instagram, Facebook ve LinkedIn bilgileri bu dosyada tutulmaktadır.

    3.3 - shipping.js ( kaynak dosya: settings/shipping.js )
    - Siparişin teslimat ücretinin hesaplanmasını sağlayan fonksiyonu içeren dosyadır. Teslimat ücretiniz yoksa herhangi bir düzenleme yapmadan bırakabilirsiniz. Eğer düzenleme yaparsanız site.json içindeki shippingWarning mesajını güncellemeyi unutmayınız.
    - settings/shipping.js kaynağından -> site.js içine dahil edilerek oluşturulmaktadır.

    --- Bu üç dosyanın manuel olarak düzenlenmesi gerekmektedir. ---

4 - settings/pages : (klasör) ( settings/pages/*.json -> pages/*.html , index.html , 404.html )
    - Her sayfa için ayrı bir JSON dosyası bulunmaktadır. Bu JSON dosyaları update.sh tarafından okunarak ilgili HTML sayfası oluşturulur.

    Her JSON dosyasında şu alanlar bulunur:
    - title        : Sayfanın sekme başlığı ve SEO başlığı
    - description  : Sayfanın SEO açıklaması
    - keywords     : Arama motoru anahtar kelimeleri
    - showOnHeaderMenu : true ise sayfanın header menüsünde görünmesini sağlar
    - priority     : Sitemap için sayfa önceliği (0.0 - 1.0)
    - partials     : Sayfada kullanılacak HTML parçaları (örn. hero, page-image, parts)
    - parts        : Sayfanın metin içeriği (başlıklar ve paragraflar)

    Kaynak -> Oluşturulan dosya eşleşmeleri:
    settings/pages/index.json              -> index.html
    settings/pages/404.json               -> 404.html
    settings/pages/hakkimizda.json        -> pages/hakkimizda.html
    settings/pages/urunlerimiz.json       -> pages/urunlerimiz.html
    settings/pages/site-haritasi.json     -> pages/site-haritasi.html
    settings/pages/gizlilik-politikasi.json -> pages/gizlilik-politikasi.html
    settings/pages/satis-sozlesmesi.json  -> pages/satis-sozlesmesi.html

    showOnHeaderMenu alanı true olan sayfalar header menüsünde otomatik olarak görünür.
    showOnFooter alanı true olan sayfalar footer'daki link bölümünde görünür.

    Yeni sayfa eklemek için:
    - settings/pages/ klasörüne yeni bir .json dosyası oluşturun (örn. yeni-sayfa.json)
    - Dosya adı URL'i belirler: yeni-sayfa.json -> pages/yeni-sayfa.html
    - ./update.sh çalıştırın — sayfa otomatik olarak oluşturulur, menü ve sitemap güncellenir.

    Sayfa kaldırmak için:
    - settings/pages/ içindeki ilgili .json dosyasını silin.
    - ./update.sh çalıştırın — menü ve sitemap otomatik güncellenir.
    - NOT: pages/ klasöründeki eski .html dosyası otomatik silinmez, manuel olarak silinmesi gerekir.

5 - settings/products : (klasör) ( settings/products/*.json -> products/*.html )
    - Her ürün için ayrı bir JSON dosyası bulunmaktadır. Bu JSON dosyaları update.sh tarafından okunarak her ürüne özel bir HTML sayfası oluşturulur.

    Her JSON dosyasında şu alanlar bulunur:
    - id           : Ürün benzersiz kimliği (örn. ts1)
    - name         : Ürün adı
    - url          : Ürünün sayfa URL'si (örn. kasarli-tost -> /products/kasarli-tost.html)
    - images       : Ürün görsel dosya adı (.webp uzantılı)
    - price        : Ürün fiyatı
    - category     : Ürünün ait olduğu kategori (name ve url)
    - weight       : Ürün ağırlığı
    - shortDesc    : Ürün listesinde görünen kısa açıklama
    - metaDesc     : SEO meta açıklaması
    - keywords     : Arama motoru anahtar kelimeleri
    - longDesc     : Ürün detay sayfasındaki uzun açıklama (paragraf dizisi)
    - otherDesc    : Teknik özellikler tablosu (örn. net miktar)
    - aggregateRating : SEO için ürün puanı bilgisi

    Her settings/products/urun-adi.json kaynağından -> products/urun-adi.html dosyası oluşturulmaktadır.

6 - img/pages : (klasör) ( img/pages/*.jpg -> img/pages/*.webp ve img/pages/*-k.webp )
    - Sayfalarda kullanılan hero ve içerik görsellerinin bulunduğu klasördür. Görseller .jpg formatında bu klasöre eklenmelidir.
    - update.sh çalıştırıldığında FFmpeg kullanılarak her .jpg dosyasından iki dosya otomatik olarak oluşturulur:

    img/pages/gorseli.jpg -> img/pages/gorseli.webp      (optimize edilmiş web görseli)
    img/pages/gorseli.jpg -> img/pages/gorseli-k.webp    (sayfa yüklenirken gösterilen bulanık/blur küçük görsel)

7 - img/products : (klasör) ( img/products/*.jpg -> img/products/*.webp ve img/products/*-k.webp )
    - Ürün sayfalarında kullanılan görsellerin bulunduğu klasördür. Görseller .jpg formatında bu klasöre, settings/products/*.json içindeki images alanında yazılan isimle (.jpg uzantısıyla) eklenmelidir.
    - update.sh çalıştırıldığında her .jpg dosyasından iki dosya otomatik olarak oluşturulur:

    img/products/kasarli-tost.jpg -> img/products/kasarli-tost.webp    (800px genişliğinde optimize edilmiş ürün görseli)
    img/products/kasarli-tost.jpg -> img/products/kasarli-tost-k.webp  (lazy loading için bulanık/blur ön yükleme görseli)

8 - img/ ikonlar : ( manuel eklenir, update.sh tarafından oluşturulmaz )
    - img/ klasörünün kök dizininde sitenin arayüzünde kullanılan PNG ikon dosyaları yer almaktadır. Bu dosyalar manuel olarak eklenmiş olup update.sh tarafından oluşturulmaz. Değiştirmek isterseniz aynı isimde ve .png formatında dosyaları bu klasöre kopyalamanız yeterlidir.

    basket.png              -> Sepet ikonu
    menu-open.png           -> Mobil menü açma ikonu
    menu-close.png          -> Mobil menü kapama ikonu
    plus.png                -> Sepette ürün adedi artırma
    minus.png               -> Sepette ürün adedi azaltma
    delete.png              -> Sepetten ürün silme
    address.png             -> Adres bilgisi ikonu
    phone.png               -> Telefon bilgisi ikonu
    email.png               -> E-posta bilgisi ikonu
    map.png                 -> Haritada göster ikonu
    whatsapp.png            -> WhatsApp sipariş butonu ikonu
    telegram.png            -> Telegram sipariş butonu ikonu
    instagram.png           -> Instagram sosyal medya ikonu
    facebook.png            -> Facebook sosyal medya ikonu
    linkedin.png            -> LinkedIn sosyal medya ikonu
    youtube.png             -> YouTube sosyal medya ikonu

9 - template : (klasör)
    - template/ klasörü sitenin görsel tasarımını ve HTML yapısını belirleyen kaynak dosyaları içerir. Bu klasördeki dosyalar ister manuel ister AI yardımıyla düzenlenebilir.

    Düzenlenebilecek dosyalar:
    template/layout.html              -> Tüm sayfaların sarmalandığı master HTML şablonu. {{title}}, {{main}}, {{brand}} gibi yer tutucuları içerir.
    template/partials/footer.html     -> Footer HTML parçası
    template/partials/hero.html       -> Hero banner HTML parçası
    template/partials/product.html    -> Ürün kartı HTML parçası
    template/partials/page-image.html -> Sayfa içi görsel HTML parçası
    template/css/base.css             -> Renk, font ve spacing token'ları (CSS değişkenleri)
    template/css/layout.css           -> Header, footer ve genel layout stilleri
    template/css/page.css             -> Sayfa içerik stilleri
    template/css/product.css          -> Ürün kartı ve detay sayfası stilleri
    template/css/basket.css           -> Sepet sidebar stilleri
    template/js/lazy.js               -> Lazy image loading
    template/js/off.js                -> Offline algılama
    template/js/menu.js               -> Mobil menü
    template/js/helper.js             -> DOM yardımcıları
    template/js/basket.js             -> Sepet mantığı

    Bu kaynak dosyalardan update.sh çalıştırıldığında şunlar oluşturulur:
    template/css/*.css (5 dosya)                          -> site.css
    template/js/*.js + settings/shipping.js               -> site.js
    template/layout.html + settings/pages/*.json          -> index.html , pages/*.html , 404.html
    template/partials/ + settings/products/*.json         -> products/*.html

    --- NOT: template/helper.sh ve template/process-template.sh dosyaları update.sh'ın çalışmasını sağlayan build araçlarıdır. Bu .sh dosyalarına kesinlikle dokunulmamalıdır. ---

10 - update.sh nasıl çalıştırılır :
    - Tüm düzenlemeler tamamlandıktan sonra projenin kök dizininde aşağıdaki komut çalıştırılır:

    ./update.sh

    Bu komut çalıştırıldığında sırasıyla şunlar gerçekleşir:
    1. template/css/*.css dosyaları birleştirilerek ve küçültülerek     -> site.css oluşturulur
    2. settings/shipping.js + template/js/*.js dosyaları birleştirilerek -> site.js oluşturulur
    3. img/pages/*.jpg                                                  -> img/pages/*.webp ve img/pages/*-k.webp oluşturulur
    4. img/products/*.jpg                                               -> img/products/*.webp ve img/products/*-k.webp oluşturulur
    5. logo.png                                                         -> logo.webp oluşturulur
    6. settings/pages/*.json + template/layout.html                     -> tüm sayfa HTML dosyaları oluşturulur
    7. settings/products/*.json + template/layout.html                  -> tüm ürün HTML dosyaları oluşturulur
    8. site.json + tüm sayfalar                                         -> sitemap.xml oluşturulur
    9. site.json + tüm dosya listesi                                    -> sw.js (Service Worker) oluşturulur

    Görsel dönüşümleri için sistemde FFmpeg kurulu olması gerekmektedir. Kurulu değilse update.sh çalışma sırasında kurulum yapmak isteyip istemediğinizi soracaktır.
