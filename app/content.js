export const email = "info@mmalesayi.com";
export const whatsapp = "https://wa.me/966551420927";
export const instagram = "https://instagram.com/mmalesayi.est";
export const tiktok = "https://www.tiktok.com/@mmalesayi.est";

const locations = [
  {
    en: ["Jeddah", "Al Sharq Commercial Center 2", "Al Makarunah Street"],
    ar: ["جدة", "مجمع الشرق التجاري ٢", "شارع المكرونة"],
    phones: ["0501616588", "0126703014"],
  },
  {
    en: ["Jeddah", "Al Tahlia", "Prince Mohammed bin Abdulaziz Street"],
    ar: ["جدة", "التحلية", "شارع الأمير محمد بن عبدالعزيز"],
    phones: ["0501616713", "0126646644"],
  },
  {
    en: ["Riyadh", "Olaya Mall", "Al Olaya"],
    ar: ["الرياض", "العليا مول", "حي العليا"],
    phones: ["0501617193", "0114193982"],
  },
  {
    en: ["Madinah", "Al Hijrah Walkway", "Al Abbas bin Ubadah Street"],
    ar: ["المدينة المنورة", "ممشى الهجرة", "شارع العباس بن عبادة"],
    phones: ["0501616722"],
  },
  {
    en: ["Taif", "Al Obeikan Commercial Market", "Khalid bin Al Walid Street"],
    ar: ["الطائف", "سوق العبيكان التجاري", "شارع خالد بن الوليد"],
    phones: ["0501616687", "0127437712"],
  },
  {
    en: ["Al Khobar", "Al Suwaiket", "Prince Bandar Street, 6th intersection"],
    ar: ["الخبر", "السكويت", "شارع الأمير بندر، تقاطع ٦"],
    phones: ["0509175456", "0138952428"],
  },
];

export function getLocations(locale) {
  return locations.map((location) => {
    const [city, name, address] = location[locale];
    const query = encodeURIComponent(`محمد منصر العيسائي للأقمشة ${location.ar.join(" ")}`);
    return {
      city,
      name,
      address,
      phones: location.phones,
      map: `https://www.google.com/maps/search/?api=1&query=${query}`,
    };
  });
}

export function phoneLink(phone) {
  return `tel:+966${phone.slice(1)}`;
}

export const collectionMedia = [
  { image: "banner-12", position: "center 70%" },
  { image: "banner-8", position: "center 46%" },
  { image: "banner-13", position: "center" },
];

export const featuredProducts = [
  {
    image: "banner-8",
    position: "center 52%",
    en: ["Plum beaded mesh", "Sheer plum mesh with light-catching beads."],
    ar: ["شبك برقوقي بالخرز", "قماش شبكي شفاف بلون برقوقي، تزيّنه حبات خرز لامعة."],
  },
  {
    image: "banner-16",
    position: "center 48%",
    en: ["Bronze sheen", "Smooth folds with a warm bronze glow."],
    ar: ["لمعة برونزية", "ثنيات ناعمة بلمعة برونزية دافئة."],
  },
  {
    image: "banner-9",
    position: "center",
    en: ["Aubergine drape", "Deep purple with a fluid drape and a soft sheen."],
    ar: ["انسياب بنفسجي داكن", "لون بنفسجي عميق بانسياب ولمعة ناعمة."],
  },
];

export const copy = {
  en: {
    brand: "Alesayi",
    company: "Alesayi Textiles",
    language: "العربية",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    nav: [["top", "Home"], ["collections", "Collections"], ["story", "Our story"], ["showrooms", "Showrooms"], ["contact", "Contact"]],
    visit: "Visit a showroom",
    heroLabel: "EST. 1975  /  JEDDAH, SAUDI ARABIA",
    hero: ["Fine fabrics for", "special occasions."],
    scroll: "Scroll to explore",
    playVideo: "Play background video",
    pauseVideo: "Pause background video",
    introLabel: "01 / THE FABRIC HOUSE",
    intro: "Since 1975, we’ve brought fabrics from around the world to Saudi Arabia, chosen for the way they look, feel and move.",
    collectionLabel: "02 / THE TEXTILE EDIT",
    collectionTitle: "Collections",
    collectionTag: "Fabric collection",
    view: "Explore collection",
    featuredTitle: "Featured products",
    productPreview: "Preview",
    productInquiry: "Ask about this fabric",
    productMessage: "Hello, I’d like to ask about this fabric:",
    collections: [
      ["Bridal", "Luminous textures and delicate details for the wedding day.", "Explore fabrics for wedding gowns, from softly draped finishes to fabrics with intricate surface details. Visit a showroom to compare shades and see how each fabric falls."],
      ["Evening", "Rich color, embroidery and beading for celebrations after dark.", "Discover expressive fabrics for evening and occasion wear. See how the color, embellishment and texture catch the light in person at an Alesayi showroom."],
      ["Occasion", "Elegant drapes and versatile tones for your next occasion.", "Explore a range of fabrics for special occasions, from understated solids to richly textured finishes. Our showrooms let you feel the weight and compare the colors side by side."],
    ],
    storyLabel: "03 / OUR STORY",
    storyTitle: "A love of fabric, since 1975.",
    storyBody: "Alesayi began in Jeddah with a focus on fabrics for weddings and eveningwear. We work with selected suppliers in Europe and around the world, bringing those fabrics to our showrooms across Saudi Arabia.",
    facts: [["1975", "The year we began"], ["06", "Showrooms"], ["05", "Saudi cities"]],
    featureLabel: "04 / IN EVERY THREAD",
    featureTitle: ["Look closer.", "Feel the difference."],
    featureLink: "Find your fabric",
    qualityLabel: "THE DETAILS",
    qualityTitle: "The things you can only see up close.",
    qualityBody: "The way an embroidered detail catches the light. The weight of a fabric in your hands. Visit us to compare textures, shades and drape for yourself.",
    showroomLabel: "05 / FIND US",
    showroomTitle: "Our showrooms",
    showroomBody: "See the collections in person at one of our six showrooms across Saudi Arabia.",
    locationList: "Choose a showroom",
    directions: "Get directions",
    contactLabel: "06 / GET IN TOUCH",
    contactTitle: ["Let’s find", "your fabric."],
    emailUs: "Email us",
    hq: "Head office",
    hqAddress: "Corniche Commercial Center, 8th floor, office 854, Al Balad, Jeddah",
    hqPost: "P.O. Box 2900, Jeddah 21461",
    social: "Follow us",
    back: "Back to top",
    copyright: "All rights reserved",
  },
  ar: {
    brand: "العيسائي",
    company: "محمد منصر العيسائي للأقمشة",
    language: "English",
    skip: "انتقل إلى المحتوى",
    menu: "القائمة",
    close: "إغلاق",
    nav: [["top", "الرئيسية"], ["collections", "المجموعات"], ["story", "قصتنا"], ["showrooms", "المعارض"], ["contact", "تواصل معنا"]],
    visit: "زوري أحد معارضنا",
    heroLabel: "منذ ١٩٧٥  /  جدة، المملكة العربية السعودية",
    hero: ["أقمشة راقية", "لمناسباتك الخاصة"],
    scroll: "مرّري للاستكشاف",
    playVideo: "تشغيل فيديو الخلفية",
    pauseVideo: "إيقاف فيديو الخلفية مؤقتًا",
    introLabel: "٠١ / دار الأقمشة",
    intro: "منذ عام ١٩٧٥، نختار الأقمشة من حول العالم ونقدّمها في المملكة العربية السعودية، بعناية تشمل الملمس واللون وانسياب القماش.",
    collectionLabel: "٠٢ / مختارات الأقمشة",
    collectionTitle: "المجموعات",
    collectionTag: "مجموعة الأقمشة",
    view: "استكشفي المجموعة",
    featuredTitle: "منتجات مختارة",
    productPreview: "معاينة",
    productInquiry: "استفسري عن القماش",
    productMessage: "مرحبًا، أود الاستفسار عن هذا القماش:",
    collections: [
      ["الأعراس", "أقمشة بتفاصيل ناعمة ولمسات مضيئة ليوم الزفاف.", "اكتشفي أقمشة فساتين الزفاف، من الأقمشة الناعمة والمنسدلة إلى الخامات ذات التفاصيل الدقيقة. زوري أحد معارضنا لمقارنة الدرجات ومشاهدة انسياب كل قماش."],
      ["السهرات", "ألوان غنيّة وتطريز وتفاصيل برّاقة لإطلالات السهرات.", "اكتشفي أقمشة مميّزة للسهرات والمناسبات، وشاهدي كيف تتفاعل الألوان والتفاصيل والملمس مع الضوء في أحد معارض العيسائي."],
      ["المناسبات", "خامات أنيقة ودرجات متنوعة لمناسباتك الخاصة.", "استكشفي أقمشة المناسبات بتدرجاتها ولمساتها المختلفة. في معارضنا، يمكنك لمس الأقمشة ومقارنة الألوان عن قرب."],
    ],
    storyLabel: "٠٣ / قصتنا",
    storyTitle: "شغف بالأقمشة منذ ١٩٧٥",
    storyBody: "بدأ العيسائي رحلته في جدة، متخصصًا في أقمشة الأعراس والسهرات. نتعاون مع موردين مختارين من أوروبا ومختلف أنحاء العالم، لنقدّم هذه الأقمشة في معارضنا بالمملكة.",
    facts: [["١٩٧٥", "عام التأسيس"], ["٠٦", "معارض"], ["٠٥", "مدن سعودية"]],
    featureLabel: "٠٤ / في كل خيط",
    featureTitle: ["انظري عن قرب", "واشعري بالفرق"],
    featureLink: "اختاري قماشك",
    qualityLabel: "التفاصيل",
    qualityTitle: "تفاصيل لا تُرى إلا عن قرب",
    qualityBody: "لمعة التطريز وملمس القماش وانسيابه. زوري أحد معارضنا وقارني الخامات والدرجات بنفسك.",
    showroomLabel: "٠٥ / عناويننا",
    showroomTitle: "معارضنا",
    showroomBody: "اكتشفي مجموعاتنا عن قرب في أحد معارضنا الستة في المملكة العربية السعودية.",
    locationList: "اختاري المعرض",
    directions: "الاتجاهات",
    contactLabel: "٠٦ / تواصلي معنا",
    contactTitle: ["لنجد القماش", "الذي يناسبك"],
    emailUs: "راسلينا",
    hq: "الإدارة العامة",
    hqAddress: "جدة، البلد، مركز الكورنيش التجاري، الدور الثامن، مكتب ٨٥٤",
    hqPost: "ص.ب ٢٩٠٠ جدة ٢١٤٦١",
    social: "تابعينا",
    back: "العودة إلى الأعلى",
    copyright: "جميع الحقوق محفوظة",
  },
};
