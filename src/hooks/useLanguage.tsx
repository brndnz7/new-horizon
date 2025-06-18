'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    fr: 'Accueil',
    en: 'Home',
    tr: 'Ana Sayfa'
  },
  'nav.about': {
    fr: 'À propos',
    en: 'About',
    tr: 'Hakkımızda'
  },
  'nav.projects': {
    fr: 'Projets',
    en: 'Projects',
    tr: 'Projeler'
  },
  'nav.team': {
    fr: 'Équipe',
    en: 'Team',
    tr: 'Ekip'
  },
  'nav.blog': {
    fr: 'Blog',
    en: 'Blog',
    tr: 'Blog'
  },
  'nav.contact': {
    fr: 'Contact',
    en: 'Contact',
    tr: 'İletişim'
  },
  'nav.join': {
    fr: 'Nous rejoindre',
    en: 'Join us',
    tr: 'Bize katılın'
  },

  // Titles and Common
  'site.title': {
    fr: 'New Horizon - Nouveaux horizons pour tous',
    en: 'New Horizon - New horizons for everyone',
    tr: 'New Horizon - Herkes için yeni ufuklar'
  },
  'site.description': {
    fr: 'Association à but non lucratif basée à Strasbourg, œuvrant pour une société plus inclusive, solidaire et ouverte sur le monde.',
    en: 'Non-profit organization based in Strasbourg, working for a more inclusive, caring and open society.',
    tr: 'Strasbourg merkezli kar amacı gütmeyen kuruluş, daha kapsayıcı, dayanışmacı ve dünyaya açık bir toplum için çalışıyor.'
  },

  // Home page
  'home.hero.badge': {
    fr: 'Basée à Strasbourg • Agréée Erasmus+',
    en: 'Based in Strasbourg • Erasmus+ Approved',
    tr: 'Strasbourg merkezli • Erasmus+ Onaylı'
  },
  'home.hero.title.new': {
    fr: 'Nouveaux',
    en: 'New',
    tr: 'Yeni'
  },
  'home.hero.title.for_all': {
    fr: 'pour tous',
    en: 'for everyone',
    tr: 'herkes için'
  },
  'home.hero.description': {
    fr: 'New Horizon œuvre pour une société plus inclusive, solidaire et ouverte sur le monde. Nous ouvrons de nouveaux horizons aux jeunes de 14 à 35 ans à travers la mobilité européenne, l\'éducation non formelle et l\'accompagnement personnalisé.',
    en: 'New Horizon works for a more inclusive, caring and open society. We open new horizons for young people aged 14 to 35 through European mobility, non-formal education and personalized support.',
    tr: 'New Horizon daha kapsayıcı, dayanışmacı ve dünyaya açık bir toplum için çalışır. 14-35 yaş arası gençlere Avrupa hareketliliği, yaygın eğitim ve kişiselleştirilmiş destek aracılığıyla yeni ufuklar açıyoruz.'
  },
  'home.hero.cta.join': {
    fr: 'Rejoindre l\'aventure',
    en: 'Join the adventure',
    tr: 'Maceraya katıl'
  },
  'home.hero.cta.discover': {
    fr: 'Découvrir nos projets',
    en: 'Discover our projects',
    tr: 'Projelerimizi keşfet'
  },
  'home.stats.young_people': {
    fr: 'Jeunes accompagnés',
    en: 'Young people supported',
    tr: 'Desteklenen gençler'
  },
  'home.stats.beneficiaries': {
    fr: 'Bénéficiaires',
    en: 'Beneficiaries',
    tr: 'Yararlanıcılar'
  },
  'home.stats.years': {
    fr: 'Années d\'impact',
    en: 'Years of impact',
    tr: 'Etki yılları'
  },

  // Impact section
  'home.impact.title': {
    fr: 'Notre impact en temps réel',
    en: 'Our real-time impact',
    tr: 'Gerçek zamanlı etkimiz'
  },
  'home.impact.subtitle': {
    fr: 'Des résultats concrets qui transforment la vie des jeunes et des adultes que nous accompagnons',
    en: 'Concrete results that transform the lives of young people and adults we support',
    tr: 'Desteklediğimiz gençlerin ve yetişkinlerin hayatlarını dönüştüren somut sonuçlar'
  },
  'home.impact.european_mobility': {
    fr: 'Jeunes en mobilité européenne',
    en: 'Young people in European mobility',
    tr: 'Avrupa hareketliliğindeki gençler'
  },
  'home.impact.training_participants': {
    fr: 'Participants aux formations',
    en: 'Training participants',
    tr: 'Eğitim katılımcıları'
  },
  'home.impact.successful_insertions': {
    fr: 'Insertions réussies',
    en: 'Successful insertions',
    tr: 'Başarılı entegrasyonlar'
  },
  'home.impact.satisfaction': {
    fr: 'Satisfaction bénéficiaires',
    en: 'Beneficiary satisfaction',
    tr: 'Yararlanıcı memnuniyeti'
  },
  'home.impact.why_choose.title': {
    fr: 'Pourquoi choisir New Horizon ?',
    en: 'Why choose New Horizon?',
    tr: 'Neden New Horizon\'u seçmelisiniz?'
  },
  'home.impact.why_choose.support': {
    fr: 'Accompagnement personnalisé',
    en: 'Personalized support',
    tr: 'Kişiselleştirilmiş destek'
  },
  'home.impact.why_choose.support_desc': {
    fr: 'Chaque parcours est adapté aux besoins et objectifs individuels',
    en: 'Each journey is adapted to individual needs and goals',
    tr: 'Her yolculuk bireysel ihtiyaç ve hedeflere uyarlanır'
  },
  'home.impact.why_choose.programs': {
    fr: 'Programmes européens',
    en: 'European programs',
    tr: 'Avrupa programları'
  },
  'home.impact.why_choose.programs_desc': {
    fr: 'Expertise reconnue en Erasmus+ et Corps Européen de Solidarité',
    en: 'Recognized expertise in Erasmus+ and European Solidarity Corps',
    tr: 'Erasmus+ ve Avrupa Dayanışma Gönüllü Hizmeti\'nde tanınmış uzmanlık'
  },
  'home.impact.why_choose.inclusion': {
    fr: 'Inclusion et accessibilité',
    en: 'Inclusion and accessibility',
    tr: 'Kapsayıcılık ve erişilebilirlik'
  },
  'home.impact.why_choose.inclusion_desc': {
    fr: 'Engagement fort pour l\'égalité des chances et la dignité humaine',
    en: 'Strong commitment to equal opportunities and human dignity',
    tr: 'Fırsat eşitliği ve insan onuru için güçlü taahhüt'
  },

  // History section
  'home.history.title': {
    fr: 'Notre histoire',
    en: 'Our story',
    tr: 'Hikayemiz'
  },
  'home.history.subtitle': {
    fr: '6 années d\'engagement pour ouvrir de nouveaux horizons aux jeunes et adultes',
    en: '6 years of commitment to opening new horizons for young people and adults',
    tr: 'Gençler ve yetişkinler için yeni ufuklar açma konusunda 6 yıllık taahhüt'
  },

  // Projects section
  'home.projects.title': {
    fr: 'Nos projets phares',
    en: 'Our flagship projects',
    tr: 'Amiral gemisi projelerimiz'
  },
  'home.projects.subtitle': {
    fr: 'Découvrez nos initiatives qui transforment concrètement la vie des jeunes et adultes que nous accompagnons',
    en: 'Discover our initiatives that concretely transform the lives of young people and adults we support',
    tr: 'Desteklediğimiz gençlerin ve yetişkinlerin hayatlarını somut olarak dönüştüren girişimlerimizi keşfedin'
  },
  'home.projects.discover_all': {
    fr: 'Découvrir tous nos projets',
    en: 'Discover all our projects',
    tr: 'Tüm projelerimizi keşfedin'
  },

  // Testimonials
  'home.testimonials.title': {
    fr: 'Ils témoignent de notre impact',
    en: 'They testify to our impact',
    tr: 'Etkimize tanıklık ediyorlar'
  },
  'home.testimonials.subtitle': {
    fr: 'Les mots de ceux qui vivent notre mission au quotidien',
    en: 'Words from those who live our mission daily',
    tr: 'Misyonumuzu her gün yaşayanların sözleri'
  },

  // CTA section
  'home.cta.title': {
    fr: 'Prêt à découvrir de nouveaux horizons ?',
    en: 'Ready to discover new horizons?',
    tr: 'Yeni ufukları keşfetmeye hazır mısınız?'
  },
  'home.cta.description': {
    fr: 'Rejoignez une communauté engagée pour l\'inclusion sociale, la mobilité européenne et l\'émancipation. Ensemble, construisons une société plus solidaire et ouverte sur le monde.',
    en: 'Join a community committed to social inclusion, European mobility and emancipation. Together, let\'s build a more caring and open society.',
    tr: 'Sosyal kapsayıcılık, Avrupa hareketliliği ve özgürleşme için taahhüt eden bir topluluğa katılın. Birlikte daha dayanışmacı ve açık bir toplum inşa edelim.'
  },
  'home.cta.join_us': {
    fr: 'Nous rejoindre',
    en: 'Join us',
    tr: 'Bize katılın'
  },


  // Common actions
  'common.read_more': {
    fr: 'Lire la suite',
    en: 'Read more',
    tr: 'Devamını oku'
  },
  'common.learn_more': {
    fr: 'En savoir plus',
    en: 'Learn more',
    tr: 'Daha fazla bilgi'
  },
  'common.contact_us': {
    fr: 'Nous contacter',
    en: 'Contact us',
    tr: 'Bize ulaşın'
  },

  // Language names
  'language.french': {
    fr: 'Français',
    en: 'French',
    tr: 'Fransızca'
  },
  'language.english': {
    fr: 'Anglais',
    en: 'English',
    tr: 'İngilizce'
  },
  'language.turkish': {
    fr: 'Turc',
    en: 'Turkish',
    tr: 'Türkçe'
  },

  // Typewriter words for hero section
  'home.hero.typewriter.words': {
    fr: 'inclusion,mobilité,émancipation,horizons,solidarité',
    en: 'inclusion,mobility,empowerment,horizons,solidarity',
    tr: 'kapsayıcılık,hareketlilik,güçlendirme,ufuklar,dayanışma'
  },

  // About page
  'about.title': {
    fr: 'À propos de New Horizon',
    en: 'About New Horizon',
    tr: 'New Horizon Hakkında'
  },
  'about.subtitle': {
    fr: 'Découvrez notre mission d\'inclusion sociale, nos valeurs européennes et les personnes qui œuvrent chaque jour pour ouvrir de nouveaux horizons.',
    en: 'Discover our social inclusion mission, our European values and the people who work every day to open new horizons.',
    tr: 'Sosyal kapsayıcılık misyonumuzu, Avrupa değerlerimizi ve her gün yeni ufuklar açmak için çalışan insanları keşfedin.'
  },
  'about.mission.title': {
    fr: 'Notre Mission',
    en: 'Our Mission',
    tr: 'Misyonumuz'
  },
  'about.mission.description1': {
    fr: 'New Horizon est une association à but non lucratif, basée à Strasbourg, qui œuvre pour une société plus inclusive, solidaire et ouverte sur le monde. Nous proposons de nouvelles perspectives aux personnes les plus éloignées des dispositifs classiques.',
    en: 'New Horizon is a non-profit organization based in Strasbourg, working for a more inclusive, caring and open society. We offer new perspectives to people most distant from traditional systems.',
    tr: 'New Horizon, Strasbourg merkezli kar amacı gütmeyen bir kuruluş olup, daha kapsayıcı, dayanışmacı ve dünyaya açık bir toplum için çalışmaktadır. Geleneksel sistemlerden en uzak kişilere yeni perspektifler sunuyoruz.'
  },
  'about.mission.description2': {
    fr: 'Nous nous adressons principalement aux jeunes de 14 à 35 ans, mais aussi aux adultes en démarche d\'insertion ou de reconversion, en particulier ceux issus de quartiers prioritaires, de zones rurales, ou confrontés à des obstacles économiques, sociaux, culturels ou éducatifs.',
    en: 'We primarily target young people aged 14 to 35, but also adults seeking integration or career change, particularly those from priority neighborhoods, rural areas, or facing economic, social, cultural or educational barriers.',
    tr: 'Öncelikle 14-35 yaş arası gençleri hedefliyoruz, aynı zamanda entegrasyon veya kariyer değişikliği arayan yetişkinleri, özellikle öncelikli mahallelerden, kırsal alanlardan gelen veya ekonomik, sosyal, kültürel veya eğitimsel engellerle karşılaşan kişileri.'
  },
  'about.stats.years': {
    fr: 'Années d\'engagement',
    en: 'Years of commitment',
    tr: 'Taahhüt yılları'
  },
  'about.stats.countries': {
    fr: 'Pays partenaires',
    en: 'Partner countries',
    tr: 'Ortak ülkeler'
  },
  'about.vision.title': {
    fr: 'Notre Vision',
    en: 'Our Vision',
    tr: 'Vizyonumuz'
  },
  'about.vision.description': {
    fr: 'New Horizon porte une vision ambitieuse et humaniste : celle d\'une société dans laquelle chaque jeune et chaque adulte, quel que soit son parcours, ses origines ou ses conditions sociales, a les moyens concrets d\'imaginer et de construire son avenir.',
    en: 'New Horizon carries an ambitious and humanistic vision: that of a society in which every young person and adult, regardless of their background, origins or social conditions, has the concrete means to imagine and build their future.',
    tr: 'New Horizon iddialı ve hümanist bir vizyona sahiptir: Her genç ve yetişkinin, geçmişi, kökenleri veya sosyal koşulları ne olursa olsun, geleceğini hayal etmek ve inşa etmek için somut araçlara sahip olduğu bir toplum vizyonu.'
  },
  'about.vision.inclusive_society': {
    fr: 'Société inclusive',
    en: 'Inclusive society',
    tr: 'Kapsayıcı toplum'
  },
  'about.vision.inclusive_society_desc': {
    fr: 'Une société solidaire où chacun trouve sa place',
    en: 'A caring society where everyone finds their place',
    tr: 'Herkesin yerini bulduğu dayanışmacı bir toplum'
  },
  'about.vision.accessible_europe': {
    fr: 'Europe accessible',
    en: 'Accessible Europe',
    tr: 'Erişilebilir Avrupa'
  },
  'about.vision.accessible_europe_desc': {
    fr: 'L\'Europe comme espace d\'opportunités pour tous',
    en: 'Europe as a space of opportunities for everyone',
    tr: 'Herkes için fırsat alanı olarak Avrupa'
  },
  'about.vision.autonomy': {
    fr: 'Autonomie',
    en: 'Autonomy',
    tr: 'Özerklik'
  },
  'about.vision.autonomy_desc': {
    fr: 'Développer l\'autonomie et l\'esprit d\'initiative',
    en: 'Develop autonomy and initiative',
    tr: 'Özerklik ve girişim ruhunu geliştirmek'
  },
  'about.vision.solidarity_youth': {
    fr: 'Jeunesse solidaire',
    en: 'Solidarity youth',
    tr: 'Dayanışmacı gençlik'
  },
  'about.vision.solidarity_youth_desc': {
    fr: 'Une jeunesse moteur de transformation sociale',
    en: 'A youth driving social transformation',
    tr: 'Sosyal dönüşümün itici gücü olan gençlik'
  },
  'about.history.title': {
    fr: 'Notre Histoire',
    en: 'Our Story',
    tr: 'Hikayemiz'
  },
  'about.history.subtitle': {
    fr: 'Un parcours né de la passion pour l\'Europe et l\'inclusion',
    en: 'A journey born from passion for Europe and inclusion',
    tr: 'Avrupa ve kapsayıcılık tutkusundan doğan bir yolculuk'
  },
  'about.history.2018': {
    fr: '2018 - Création à Strasbourg',
    en: '2018 - Creation in Strasbourg',
    tr: '2018 - Strasbourg\'da Kuruluş'
  },
  'about.history.2018_desc': {
    fr: 'Fondation de New Horizon par un groupe de jeunes européens passionnés par la mobilité et l\'inclusion sociale, avec le soutien du programme Erasmus+ pour structurer nos premières actions.',
    en: 'Foundation of New Horizon by a group of young Europeans passionate about mobility and social inclusion, with the support of the Erasmus+ program to structure our first actions.',
    tr: 'Hareketlilik ve sosyal kapsayıcılık konusunda tutkulu genç Avrupalılardan oluşan bir grup tarafından New Horizon\'un kuruluşu, ilk eylemlerimizi yapılandırmak için Erasmus+ programının desteğiyle.'
  },
  'about.history.2019': {
    fr: '2019 - Premier programme Erasmus+',
    en: '2019 - First Erasmus+ program',
    tr: '2019 - İlk Erasmus+ programı'
  },
  'about.history.2019_desc': {
    fr: 'Lancement de notre premier projet Erasmus+ permettant à 20 jeunes de quartiers prioritaires de vivre une expérience européenne transformatrice en Allemagne et en Italie.',
    en: 'Launch of our first Erasmus+ project allowing 20 young people from priority neighborhoods to experience a transformative European experience in Germany and Italy.',
    tr: '20 genç öncelikli mahallelerden gelen gençlerin Almanya ve İtalya\'da dönüştürücü bir Avrupa deneyimi yaşamasına olanak tanıyan ilk Erasmus+ projemizin başlatılması.'
  },
  'about.history.2020': {
    fr: '2020 - Adaptation et innovation',
    en: '2020 - Adaptation and innovation',
    tr: '2020 - Uyum ve yenilik'
  },
  'about.history.2020_desc': {
    fr: 'Développement de formats hybrides pendant la pandémie, maintenant le lien avec nos bénéficiaires grâce au numérique et aux méthodes d\'éducation non formelle adaptées.',
    en: 'Development of hybrid formats during the pandemic, maintaining the link with our beneficiaries through digital and adapted non-formal education methods.',
    tr: 'Pandemi sırasında hibrit formatların geliştirilmesi, dijital ve uyarlanmış yaygın eğitim yöntemleri aracılığıyla yararlanıcılarımızla bağlantının sürdürülmesi.'
  },
  'about.history.2021': {
    fr: '2021 - Corps Européen de Solidarité',
    en: '2021 - European Solidarity Corps',
    tr: '2021 - Avrupa Dayanışma Gönüllü Hizmeti'
  },
  'about.history.2021_desc': {
    fr: 'Devenir organisation d\'accueil CES, accueillant nos premiers volontaires européens pour renforcer nos actions locales et développer la dimension interculturelle.',
    en: 'Becoming a CES host organization, welcoming our first European volunteers to strengthen our local actions and develop the intercultural dimension.',
    tr: 'CES ev sahibi organizasyonu olmak, yerel eylemlerimizi güçlendirmek ve kültürlerarası boyutu geliştirmek için ilk Avrupa gönüllülerimizi karşılamak.'
  },
  'about.history.2022': {
    fr: '2022 - Expansion des services',
    en: '2022 - Service expansion',
    tr: '2022 - Hizmet genişletmesi'
  },
  'about.history.2022_desc': {
    fr: 'Ouverture du programme d\'insertion professionnelle et des formations non formelles pour diversifier notre offre et répondre aux besoins spécifiques de nos bénéficiaires.',
    en: 'Opening of the professional integration program and non-formal training to diversify our offer and meet the specific needs of our beneficiaries.',
    tr: 'Teklifimizi çeşitlendirmek ve yararlanıcılarımızın özel ihtiyaçlarını karşılamak için mesleki entegrasyon programı ve yaygın eğitim programının açılması.'
  },
  'about.history.2024': {
    fr: '2024 - Nouveaux horizons',
    en: '2024 - New horizons',
    tr: '2024 - Yeni ufuklar'
  },
  'about.history.2024_desc': {
    fr: 'Lancement de nos programmes d\'autonomisation des femmes et d\'échanges interculturels renforcés. Nous accompagnons désormais plus de 650 bénéficiaires avec 85+ jeunes en mobilité européenne.',
    en: 'Launch of our women\'s empowerment programs and enhanced intercultural exchanges. We now support more than 650 beneficiaries with 85+ young people in European mobility.',
    tr: 'Kadın güçlendirme programlarımızın ve geliştirilmiş kültürlerarası değişimlerin başlatılması. Artık 85+ genç Avrupa hareketliliğinde 650\'den fazla yararlanıcıya destek veriyoruz.'
  },
  'about.team.title': {
    fr: 'Notre Équipe de Direction',
    en: 'Our Leadership Team',
    tr: 'Yönetim Ekibimiz'
  },
  'about.team.subtitle': {
    fr: 'Les personnes qui portent notre vision européenne et inclusive',
    en: 'The people who carry our European and inclusive vision',
    tr: 'Avrupa ve kapsayıcı vizyonumuzu taşıyan kişiler'
  },
  'about.team.lea.name': {
    fr: 'Léa Schneider',
    en: 'Léa Schneider',
    tr: 'Léa Schneider'
  },
  'about.team.lea.role': {
    fr: 'Présidente & Fondatrice',
    en: 'President & Founder',
    tr: 'Başkan & Kurucu'
  },
  'about.team.lea.bio': {
    fr: 'Diplômée en relations internationales, Léa a créé New Horizon en 2018 après son expérience Erasmus en Italie qui a transformé sa vision de l\'Europe.',
    en: 'Graduated in international relations, Léa created New Horizon in 2018 after her Erasmus experience in Italy which transformed her vision of Europe.',
    tr: 'Uluslararası ilişkiler mezunu Léa, Avrupa vizyonunu dönüştüren İtalya\'daki Erasmus deneyiminden sonra 2018\'de New Horizon\'u kurdu.'
  },
  'about.team.karim.name': {
    fr: 'Karim Benali',
    en: 'Karim Benali',
    tr: 'Karim Benali'
  },
  'about.team.karim.role': {
    fr: 'Coordinateur mobilité européenne',
    en: 'European mobility coordinator',
    tr: 'Avrupa hareketliliği koordinatörü'
  },
  'about.team.karim.bio': {
    fr: 'Ancien participant Erasmus+ devenu coordinateur, Karim accompagne les jeunes dans leurs projets de mobilité européenne avec passion et expertise.',
    en: 'Former Erasmus+ participant turned coordinator, Karim supports young people in their European mobility projects with passion and expertise.',
    tr: 'Eski Erasmus+ katılımcısı olan koordinatör Karim, gençleri Avrupa hareketliliği projelerinde tutku ve uzmanlıkla destekliyor.'
  },
  'about.team.elena.name': {
    fr: 'Elena Popescu',
    en: 'Elena Popescu',
    tr: 'Elena Popescu'
  },
  'about.team.elena.role': {
    fr: 'Coordinatrice inclusion sociale',
    en: 'Social inclusion coordinator',
    tr: 'Sosyal kapsayıcılık koordinatörü'
  },
  'about.team.elena.bio': {
    fr: 'Travailleuse sociale spécialisée dans l\'accompagnement des publics vulnérables, Elena veille à l\'accessibilité et l\'inclusion de tous nos programmes.',
    en: 'Social worker specialized in supporting vulnerable populations, Elena ensures the accessibility and inclusion of all our programs.',
    tr: 'Savunmasız nüfusları destekleme konusunda uzmanlaşmış sosyal hizmet uzmanı Elena, tüm programlarımızın erişilebilirliğini ve kapsayıcılığını sağlar.'
  },
  'about.values.title': {
    fr: 'Nos 12 Valeurs Fondamentales',
    en: 'Our 12 Core Values',
    tr: '12 Temel Değerimiz'
  },
  'about.values.subtitle': {
    fr: 'Les principes qui structurent notre identité et inspirent chacun de nos projets',
    en: 'The principles that structure our identity and inspire each of our projects',
    tr: 'Kimliğimizi yapılandıran ve her projemize ilham veren ilkeler'
  },
  'about.values.dignity.title': {
    fr: 'Dignité humaine',
    en: 'Human dignity',
    tr: 'İnsan onuru'
  },
  'about.values.dignity.desc': {
    fr: 'Nous considérons que chaque individu mérite d\'être traité avec respect, humanité et bienveillance, quelles que soient ses origines ou sa situation.',
    en: 'We believe that every individual deserves to be treated with respect, humanity and kindness, regardless of their origins or situation.',
    tr: 'Her bireyin, kökeni veya durumu ne olursa olsun, saygı, insanlık ve nezaketle muamele görmeyi hak ettiğine inanıyoruz.'
  },
  'about.values.equality.title': {
    fr: 'Égalité des chances',
    en: 'Equal opportunities',
    tr: 'Fırsat eşitliği'
  },
  'about.values.equality.desc': {
    fr: 'Nous nous efforçons de briser les barrières invisibles en mettant en place des accompagnements personnalisés accessibles à tous.',
    en: 'We strive to break down invisible barriers by implementing personalized support accessible to everyone.',
    tr: 'Herkes için erişilebilir kişiselleştirilmiş destek uygulayarak görünmez engelleri kırmaya çalışıyoruz.'
  },
  'about.values.solidarity.title': {
    fr: 'Solidarité',
    en: 'Solidarity',
    tr: 'Dayanışma'
  },
  'about.values.solidarity.desc': {
    fr: 'La solidarité s\'exprime dans notre travail d\'équipe, nos partenariats et notre manière de tisser des liens entre les participants.',
    en: 'Solidarity is expressed in our teamwork, our partnerships and our way of building connections between participants.',
    tr: 'Dayanışma, takım çalışmamızda, ortaklıklarımızda ve katılımcılar arasında bağlantı kurma şeklimizde ifade edilir.'
  },
  'about.values.diversity.title': {
    fr: 'Diversité et interculturalité',
    en: 'Diversity and interculturality',
    tr: 'Çeşitlilik ve kültürlerarasılık'
  },
  'about.values.diversity.desc': {
    fr: 'Nous construisons des ponts entre les cultures, les identités et les trajectoires de vie pour un vivre-ensemble renouvelé.',
    en: 'We build bridges between cultures, identities and life trajectories for a renewed living together.',
    tr: 'Yenilenmiş bir birlikte yaşam için kültürler, kimlikler ve yaşam yörüngeleri arasında köprüler kuruyoruz.'
  },
  'about.values.citizenship.title': {
    fr: 'Citoyenneté active',
    en: 'Active citizenship',
    tr: 'Aktif vatandaşlık'
  },
  'about.values.citizenship.desc': {
    fr: 'Nous favorisons l\'engagement civique, la prise de parole et donnons aux jeunes les outils pour exercer pleinement leur citoyenneté.',
    en: 'We promote civic engagement, speaking out and give young people the tools to fully exercise their citizenship.',
    tr: 'Sivil katılımı, konuşmayı teşvik ediyor ve gençlere vatandaşlıklarını tam olarak kullanmaları için araçlar veriyoruz.'
  },
  'about.values.environment.title': {
    fr: 'Responsabilité environnementale',
    en: 'Environmental responsibility',
    tr: 'Çevresel sorumluluk'
  },
  'about.values.environment.desc': {
    fr: 'Nous intégrons la transition écologique dans nos pratiques et éduquons aux enjeux environnementaux.',
    en: 'We integrate ecological transition into our practices and educate about environmental issues.',
    tr: 'Ekolojik geçişi uygulamalarımıza enteg ediyor ve çevresel konularda eğitim veriyoruz.'
  },
  'about.values.innovation.title': {
    fr: 'Innovation sociale',
    en: 'Social innovation',
    tr: 'Sosyal yenilik'
  },
  'about.values.innovation.desc': {
    fr: 'Nous encourageons les jeunes à proposer de nouvelles solutions aux défis sociaux et à expérimenter des alternatives.',
    en: 'We encourage young people to propose new solutions to social challenges and experiment with alternatives.',
    tr: 'Gençleri sosyal zorluklara yeni çözümler önermeye ve alternatifler denemeye teşvik ediyoruz.'
  },
  'about.values.education.title': {
    fr: 'Éducation non formelle',
    en: 'Non-formal education',
    tr: 'Yaygın eğitim'
  },
  'about.values.education.desc': {
    fr: 'Nous utilisons des méthodes actives pour favoriser l\'apprentissage, l\'autonomie et le développement de compétences.',
    en: 'We use active methods to promote learning, autonomy and skill development.',
    tr: 'Öğrenmeyi, özerkliği ve beceri gelişimini teşvik etmek için aktif yöntemler kullanıyoruz.'
  },
  'about.values.empowerment.title': {
    fr: 'Autonomisation',
    en: 'Empowerment',
    tr: 'Güçlendirme'
  },
  'about.values.empowerment.desc': {
    fr: 'Nous construisons des parcours qui permettent à chacun de devenir acteur de sa vie avec confiance et responsabilité.',
    en: 'We build pathways that allow everyone to become an actor in their life with confidence and responsibility.',
    tr: 'Herkesin güven ve sorumlulukla hayatının aktörü olmasını sağlayan yollar inşa ediyoruz.'
  },
  'about.values.accessibility.title': {
    fr: 'Accessibilité',
    en: 'Accessibility',
    tr: 'Erişilebilirlik'
  },
  'about.values.accessibility.desc': {
    fr: 'Nous repensons nos projets pour qu\'aucun jeune ne soit mis de côté, indépendamment de ses capacités ou moyens.',
    en: 'We rethink our projects so that no young person is left behind, regardless of their abilities or means.',
    tr: 'Hiçbir gencin, yetenekleri veya araçları ne olursa olsun geride kalmaması için projelerimizi yeniden düşünüyoruz.'
  },
  'about.values.european.title': {
    fr: 'Engagement européen',
    en: 'European commitment',
    tr: 'Avrupa taahhüdü'
  },
  'about.values.european.desc': {
    fr: 'Nous faisons de l\'Europe un espace de possibilités concrètes en mobilisant les programmes européens.',
    en: 'We make Europe a space of concrete possibilities by mobilizing European programs.',
    tr: 'Avrupa programlarını harekete geçirerek Avrupa\'yı somut fırsatlar alanı haline getiriyoruz.'
  },
  'about.values.transmission.title': {
    fr: 'Transmission et durabilité',
    en: 'Transmission and sustainability',
    tr: 'Aktarım ve sürdürülebilirlik'
  },
  'about.values.transmission.desc': {
    fr: 'Chaque projet est pensé pour son impact à long terme et ce qu\'il transmet aux participants et à leur entourage.',
    en: 'Each project is designed for its long-term impact and what it transmits to participants and their environment.',
    tr: 'Her proje, uzun vadeli etkisi ve katılımcılara ve çevrelerine aktardıkları için tasarlanmıştır.'
  },
  'about.cta.title': {
    fr: 'Prêt à découvrir de nouveaux horizons ?',
    en: 'Ready to discover new horizons?',
    tr: 'Yeni ufukları keşfetmeye hazır mısınız?'
  },
  'about.cta.description': {
    fr: 'Que vous souhaitiez participer à nos programmes, devenir bénévole, ou simplement en savoir plus sur nos actions, nous serions ravis d\'échanger avec vous.',
    en: 'Whether you want to participate in our programs, become a volunteer, or simply learn more about our actions, we would be delighted to talk with you.',
    tr: 'Programlarımıza katılmak, gönüllü olmak veya sadece faaliyetlerimizi öğrenmek istiyorsanız, sizinle konuşmaktan memnuniyet duyarız.'
  },

  // Projects page
  'projects.title': {
    fr: 'Nos Projets',
    en: 'Our Projects',
    tr: 'Projelerimiz'
  },
  'projects.subtitle': {
    fr: 'Découvrez nos initiatives concrètes pour l\'inclusion sociale, la mobilité européenne et l\'émancipation',
    en: 'Discover our concrete initiatives for social inclusion, European mobility and empowerment',
    tr: 'Sosyal kapsayıcılık, Avrupa hareketliliği ve güçlendirme için somut girişimlerimizi keşfedin'
  },
  'projects.stats.active_projects': {
    fr: 'Projets actifs',
    en: 'Active projects',
    tr: 'Aktif projeler'
  },
  'projects.stats.volunteers': {
    fr: 'Bénévoles mobilisés',
    en: 'Mobilized volunteers',
    tr: 'Seferber edilen gönüllüler'
  },
  'projects.stats.beneficiaries': {
    fr: 'Bénéficiaires',
    en: 'Beneficiaries',
    tr: 'Yararlanıcılar'
  },
  'projects.stats.years_experience': {
    fr: 'Années d\'expérience',
    en: 'Years of experience',
    tr: 'Deneyim yılları'
  },
  'projects.list.title': {
    fr: 'Tous nos projets',
    en: 'All our projects',
    tr: 'Tüm projelerimiz'
  },
  'projects.list.subtitle': {
    fr: 'Des actions concrètes pour un impact durable',
    en: 'Concrete actions for lasting impact',
    tr: 'Kalıcı etki için somut eylemler'
  },
  'projects.status.active': {
    fr: 'Actif',
    en: 'Active',
    tr: 'Aktif'
  },
  'projects.status.paused': {
    fr: 'En pause',
    en: 'Paused',
    tr: 'Duraklatıldı'
  },
  'projects.since': {
    fr: 'Depuis',
    en: 'Since',
    tr: 'Den beri'
  },
  'projects.info.volunteers': {
    fr: 'bénévoles',
    en: 'volunteers',
    tr: 'gönüllü'
  },
  'projects.info.beneficiaries': {
    fr: 'bénéficiaires',
    en: 'beneficiaries',
    tr: 'yararlanıcı'
  },
  'projects.info.budget': {
    fr: 'Budget',
    en: 'Budget',
    tr: 'Bütçe'
  },
  'projects.info.raised': {
    fr: 'Collecté',
    en: 'Raised',
    tr: 'Toplanan'
  },
  'projects.domains.title': {
    fr: 'Nos domaines d\'action',
    en: 'Our areas of action',
    tr: 'Eylem alanlarımız'
  },
  'projects.domains.subtitle': {
    fr: 'Des interventions variées pour répondre aux besoins du territoire',
    en: 'Varied interventions to meet the needs of the territory',
    tr: 'Bölgenin ihtiyaçlarını karşılamak için çeşitli müdahaleler'
  },
  'projects.domains.solidarity.title': {
    fr: 'Solidarité',
    en: 'Solidarity',
    tr: 'Dayanışma'
  },
  'projects.domains.solidarity.description': {
    fr: 'Aide alimentaire, accompagnement social et soutien aux familles en difficulté.',
    en: 'Food aid, social support and assistance to families in difficulty.',
    tr: 'Gıda yardımı, sosyal destek ve zor durumdaki ailelere yardım.'
  },
  'projects.domains.education.title': {
    fr: 'Éducation',
    en: 'Education',
    tr: 'Eğitim'
  },
  'projects.domains.education.description': {
    fr: 'Formation numérique, ateliers pédagogiques et accompagnement scolaire.',
    en: 'Digital training, educational workshops and school support.',
    tr: 'Dijital eğitim, eğitim atölyeleri ve okul desteği.'
  },
  'projects.domains.environment.title': {
    fr: 'Environnement',
    en: 'Environment',
    tr: 'Çevre'
  },
  'projects.domains.environment.description': {
    fr: 'Jardins partagés, sensibilisation écologique et protection de la biodiversité.',
    en: 'Shared gardens, ecological awareness and biodiversity protection.',
    tr: 'Paylaşımlı bahçeler, ekolojik farkındalık ve biyolojik çeşitlilik koruması.'
  },
  'projects.support.title': {
    fr: 'Soutenez nos projets',
    en: 'Support our projects',
    tr: 'Projelerimizi destekleyin'
  },
  'projects.support.description': {
    fr: 'Votre engagement fait la différence. Rejoignez-nous comme bénévole ou soutenez financièrement nos actions.',
    en: 'Your commitment makes a difference. Join us as a volunteer or financially support our actions.',
    tr: 'Taahhüdünüz fark yaratır. Gönüllü olarak bize katılın veya eylemlerimizi mali olarak destekleyin.'
  },
  'projects.support.become_volunteer': {
    fr: 'Devenir bénévole',
    en: 'Become a volunteer',
    tr: 'Gönüllü ol'
  },
  'projects.support.make_donation': {
    fr: 'Faire un don',
    en: 'Make a donation',
    tr: 'Bağış yap'
  },

  // Team page
  'team.title': {
    fr: 'Notre Équipe',
    en: 'Our Team',
    tr: 'Ekibimiz'
  },
  'team.subtitle': {
    fr: 'Rencontrez les personnes passionnées qui font vivre New Horizon au quotidien',
    en: 'Meet the passionate people who bring New Horizon to life every day',
    tr: 'Her gün New Horizon\'u hayata geçiren tutkulu insanlarla tanışın'
  },
  'team.joined': {
    fr: 'Membre depuis',
    en: 'Member since',
    tr: 'Üye'
  },
  'team.specialties': {
    fr: 'Spécialités',
    en: 'Specialties',
    tr: 'Uzmanlık Alanları'
  },

  // Blog page
  'blog.title': {
    fr: 'Notre Blog',
    en: 'Our Blog',
    tr: 'Bloğumuz'
  },
  'blog.subtitle': {
    fr: 'Suivez nos actualités, découvrez nos projets et témoignages',
    en: 'Follow our news, discover our projects and testimonials',
    tr: 'Haberlerimizi takip edin, projelerimizi ve tanıklıklarımızı keşfedin'
  },
  'blog.no_articles': {
    fr: 'Aucun article publié.',
    en: 'No published articles.',
    tr: 'Yayınlanmış makale yok.'
  },
  'blog.featured': {
    fr: 'À la une',
    en: 'Featured',
    tr: 'Öne çıkan'
  },
  'blog.all_articles': {
    fr: 'Tous nos articles',
    en: 'All our articles',
    tr: 'Tüm makalelerimiz'
  },
  'blog.read_time': {
    fr: 'min de lecture',
    en: 'min read',
    tr: 'dk okuma'
  },
  'blog.read_time_short': {
    fr: 'min',
    en: 'min',
    tr: 'dk'
  },
  'blog.read_article': {
    fr: 'Lire l\'article',
    en: 'Read article',
    tr: 'Makaleyi oku'
  },
  'blog.read_more': {
    fr: 'Lire',
    en: 'Read',
    tr: 'Oku'
  },
  'blog.newsletter.title': {
    fr: 'Restez informé(e)',
    en: 'Stay informed',
    tr: 'Bilgili kalın'
  },
  'blog.newsletter.description': {
    fr: 'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités',
    en: 'Subscribe to our newsletter to receive our latest news',
    tr: 'En son haberlerimizi almak için bültenimize abone olun'
  },
  'blog.newsletter.subscribe': {
    fr: 'S\'inscrire à la newsletter',
    en: 'Subscribe to newsletter',
    tr: 'Bültene abone ol'
  },

  // Contact page
  'contact.title': {
    fr: 'Contactez-nous',
    en: 'Contact Us',
    tr: 'Bize Ulaşın'
  },
  'contact.subtitle': {
    fr: 'Une question ? Un projet ? Envie de nous rejoindre ? N\'hésitez pas à nous écrire !',
    en: 'A question? A project? Want to join us? Don\'t hesitate to write to us!',
    tr: 'Bir sorunuz mu var? Bir proje mi? Bize katılmak mı istiyorsunuz? Bize yazmaktan çekinmeyin!'
  },
  'contact.form.title': {
    fr: 'Envoyez-nous un message',
    en: 'Send us a message',
    tr: 'Bize mesaj gönderin'
  },
  'contact.form.success_message': {
    fr: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
    en: 'Your message has been sent successfully! We will respond as soon as possible.',
    tr: 'Mesajınız başarıyla gönderildi! En kısa sürede size yanıt vereceğiz.'
  },
  'contact.form.name': {
    fr: 'Nom complet',
    en: 'Full name',
    tr: 'Ad soyad'
  },
  'contact.form.name_placeholder': {
    fr: 'Votre nom et prénom',
    en: 'Your first and last name',
    tr: 'Adınız ve soyadınız'
  },
  'contact.form.email': {
    fr: 'Adresse email',
    en: 'Email address',
    tr: 'E-posta adresi'
  },
  'contact.form.email_placeholder': {
    fr: 'votre.email@exemple.com',
    en: 'your.email@example.com',
    tr: 'emailiniz@ornek.com'
  },
  'contact.form.message': {
    fr: 'Votre message',
    en: 'Your message',
    tr: 'Mesajınız'
  },
  'contact.form.message_placeholder': {
    fr: 'Décrivez votre demande, votre question ou votre souhait de participation...',
    en: 'Describe your request, your question or your wish to participate...',
    tr: 'İsteğinizi, sorunuzu veya katılım arzunuzu açıklayın...'
  },
  'contact.form.send': {
    fr: 'Envoyer le message',
    en: 'Send message',
    tr: 'Mesaj gönder'
  },
  'contact.form.sending': {
    fr: 'Envoi en cours...',
    en: 'Sending...',
    tr: 'Gönderiliyor...'
  },
  'contact.info.coordinates': {
    fr: 'Nos coordonnées',
    en: 'Our contact details',
    tr: 'İletişim bilgilerimiz'
  },
  'contact.info.address': {
    fr: 'Adresse',
    en: 'Address',
    tr: 'Adres'
  },
  'contact.info.address_value': {
    fr: '123 Rue de la Solidarité\n75001 Paris, France',
    en: '123 Solidarity Street\n75001 Paris, France',
    tr: '123 Dayanışma Caddesi\n75001 Paris, Fransa'
  },
  'contact.info.email': {
    fr: 'Email',
    en: 'Email',
    tr: 'E-posta'
  },
  'contact.info.email_value': {
    fr: 'contact@newhorizon.fr',
    en: 'contact@newhorizon.fr',
    tr: 'contact@newhorizon.fr'
  },
  'contact.info.phone': {
    fr: 'Téléphone',
    en: 'Phone',
    tr: 'Telefon'
  },
  'contact.info.phone_value': {
    fr: '01 23 45 67 89',
    en: '01 23 45 67 89',
    tr: '01 23 45 67 89'
  },
  'contact.info.hours': {
    fr: 'Horaires d\'accueil',
    en: 'Opening hours',
    tr: 'Açılış saatleri'
  },
  'contact.info.hours.monday_friday': {
    fr: 'Lundi - Vendredi',
    en: 'Monday - Friday',
    tr: 'Pazartesi - Cuma'
  },
  'contact.info.hours.monday_friday_time': {
    fr: '9h - 18h',
    en: '9am - 6pm',
    tr: '09:00 - 18:00'
  },
  'contact.info.hours.saturday': {
    fr: 'Samedi',
    en: 'Saturday',
    tr: 'Cumartesi'
  },
  'contact.info.hours.saturday_time': {
    fr: '10h - 16h',
    en: '10am - 4pm',
    tr: '10:00 - 16:00'
  },
  'contact.info.hours.sunday': {
    fr: 'Dimanche',
    en: 'Sunday',
    tr: 'Pazar'
  },
  'contact.info.hours.sunday_time': {
    fr: 'Fermé',
    en: 'Closed',
    tr: 'Kapalı'
  },
  'contact.info.drop_in.title': {
    fr: 'Permanence',
    en: 'Drop-in service',
    tr: 'Danışma hizmeti'
  },
  'contact.info.drop_in.description': {
    fr: 'Tous les mardis de 14h à 17h pour les demandes d\'aide et d\'information.',
    en: 'Every Tuesday from 2pm to 5pm for help and information requests.',
    tr: 'Yardım ve bilgi talepleri için her Salı 14:00-17:00 arası.'
  },
  'contact.join.title': {
    fr: 'Vous souhaitez nous rejoindre ?',
    en: 'Want to join us?',
    tr: 'Bize katılmak ister misiniz?'
  },
  'contact.join.description': {
    fr: 'Nous sommes toujours à la recherche de nouveaux bénévoles motivés pour renforcer nos équipes et développer nos actions.',
    en: 'We are always looking for new motivated volunteers to strengthen our teams and develop our actions.',
    tr: 'Ekiplerimizi güçlendirmek ve eylemlerimizi geliştirmek için her zaman yeni motivasyonlu gönüllüler arıyoruz.'
  },
  'contact.join.learn_more': {
    fr: 'En savoir plus sur l\'association',
    en: 'Learn more about the association',
    tr: 'Dernek hakkında daha fazla bilgi edinin'
  },
  'contact.faq.title': {
    fr: 'Questions fréquentes',
    en: 'Frequently asked questions',
    tr: 'Sık sorulan sorular'
  },
  'contact.faq.subtitle': {
    fr: 'Trouvez rapidement la réponse à vos questions',
    en: 'Quickly find answers to your questions',
    tr: 'Sorularınızın cevaplarını hızlıca bulun'
  },
  'contact.faq.volunteer.question': {
    fr: 'Comment devenir bénévole ?',
    en: 'How to become a volunteer?',
    tr: 'Gönüllü nasıl olunur?'
  },
  'contact.faq.volunteer.answer': {
    fr: 'Il suffit de nous contacter via ce formulaire ou par téléphone. Nous organisons des réunions d\'information chaque premier samedi du mois.',
    en: 'Simply contact us via this form or by phone. We organize information meetings every first Saturday of the month.',
    tr: 'Bu form veya telefon ile bizimle iletişime geçmeniz yeterli. Her ayın ilk cumartesi günü bilgilendirme toplantıları düzenliyoruz.'
  },
  'contact.faq.european.question': {
    fr: 'Comment participer aux programmes européens ?',
    en: 'How to participate in European programs?',
    tr: 'Avrupa programlarına nasıl katılınır?'
  },
  'contact.faq.european.answer': {
    fr: 'Nos programmes Erasmus+ et CES sont gratuits et financés par l\'Union Européenne. Contactez-nous pour connaître les critères d\'éligibilité.',
    en: 'Our Erasmus+ and ESC programs are free and funded by the European Union. Contact us to learn about eligibility criteria.',
    tr: 'Erasmus+ ve ESC programlarımız ücretsizdir ve Avrupa Birliği tarafından finanse edilir. Uygunluk kriterleri hakkında bilgi almak için bizimle iletişime geçin.'
  },
  'contact.faq.services.question': {
    fr: 'Comment bénéficier de vos services ?',
    en: 'How to benefit from your services?',
    tr: 'Hizmetlerinizden nasıl yararlanılır?'
  },
  'contact.faq.services.answer': {
    fr: 'Nos services sont gratuits et ouverts à tous. Contactez-nous pour connaître les modalités d\'accès à nos différents projets.',
    en: 'Our services are free and open to everyone. Contact us to learn about access procedures to our various projects.',
    tr: 'Hizmetlerimiz ücretsizdir ve herkese açıktır. Çeşitli projelerimize erişim prosedürleri hakkında bilgi almak için bizimle iletişime geçin.'
  },
  'contact.faq.events.question': {
    fr: 'Organisez-vous des événements ?',
    en: 'Do you organize events?',
    tr: 'Etkinlik düzenliyor musunuz?'
  },
  'contact.faq.events.answer': {
    fr: 'Nous organisons régulièrement des événements ouverts au public : portes ouvertes, ateliers, conférences, fêtes de quartier...',
    en: 'We regularly organize public events: open houses, workshops, conferences, neighborhood parties...',
    tr: 'Düzenli olarak halka açık etkinlikler düzenliyoruz: açık evler, atölyeler, konferanslar, mahalle partileri...'
  },

  // Footer
  'footer.tagline': {
    fr: 'Ouvrir de nouveaux horizons ensemble',
    en: 'Opening new horizons together',
    tr: 'Birlikte yeni ufuklar açmak'
  },
  'footer.about.title': {
    fr: 'À propos',
    en: 'About',
    tr: 'Hakkımızda'
  },
  'footer.about.description': {
    fr: 'New Horizon est une association strasbourgeoise dédiée à l\'inclusion sociale et à la mobilité européenne.',
    en: 'New Horizon is a Strasbourg association dedicated to social inclusion and European mobility.',
    tr: 'New Horizon, sosyal kapsayıcılık ve Avrupa hareketliliğine adanmış bir Strasbourg derneğidir.'
  },
  'footer.links.title': {
    fr: 'Liens utiles',
    en: 'Useful links',
    tr: 'Yararlı bağlantılar'
  },
  'footer.programs.title': {
    fr: 'Nos programmes',
    en: 'Our programs',
    tr: 'Programlarımız'
  },
  'footer.programs.erasmus': {
    fr: 'Erasmus+',
    en: 'Erasmus+',
    tr: 'Erasmus+'
  },
  'footer.programs.esc': {
    fr: 'Corps Européen de Solidarité',
    en: 'European Solidarity Corps',
    tr: 'Avrupa Dayanışma Gönüllü Hizmeti'
  },
  'footer.programs.training': {
    fr: 'Formations non formelles',
    en: 'Non-formal training',
    tr: 'Yaygın eğitim'
  },
  'footer.contact.title': {
    fr: 'Contact',
    en: 'Contact',
    tr: 'İletişim'
  },
  'footer.social.title': {
    fr: 'Suivez-nous',
    en: 'Follow us',
    tr: 'Bizi takip edin'
  },
  'footer.copyright': {
    fr: 'Tous droits réservés.',
    en: 'All rights reserved.',
    tr: 'Tüm hakları saklıdır.'
  },
  'footer.legal': {
    fr: 'Mentions légales',
    en: 'Legal notice',
    tr: 'Yasal uyarı'
  },
  'footer.newsletter': {
    fr: 'Newsletter',
    en: 'Newsletter',
    tr: 'Bülten'
  },
  'footer.legal_info': {
    fr: 'Association loi 1901 - RNA: W751234567',
    en: '1901 Law Association - RNA: W751234567',
    tr: '1901 Dernek Yasası - RNA: W751234567'
  },
  'common.loading': {
    fr: 'Chargement…',
    en: 'Loading…',
    tr: 'Yükleniyor…'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    // Charger la langue depuis localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['fr', 'en', 'tr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 