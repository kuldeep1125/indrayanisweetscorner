// [ADDED] Multilingual translations dictionary supporting English, Marathi, and Hindi
export type Language = "en" | "mr" | "hi";

export interface Translations {
  nav: {
    home: string;
    menu: string;
    customBox: string;
    story: string;
    festivals: string;
    gallery: string;
    reviews: string;
    visitUs: string;
    orderWhatsApp: string;
    dossier: string;
    cart: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    exploreMenu: string;
    buildBox: string;
    breakfastAlert: string;
    openNow: string;
    googleRating: string;
  };
  features: {
    pureGhee: {
      title: string;
      desc: string;
    };
    morningFresh: {
      title: string;
      desc: string;
    };
    artisanMithai: {
      title: string;
      desc: string;
    };
    communityTrust: {
      title: string;
      desc: string;
    };
  };
  categories: {
    all: string;
    traditional_mithai: string;
    dry_fruit_specials: string;
    bengali_delights: string;
    breakfast_snacks: string;
    namkeen_savouries: string;
    festive_hampers: string;
  };
  customBox: {
    title: string;
    subtitle: string;
    chooseSize: string;
    size4: string;
    size6: string;
    size9: string;
    selectSweets: string;
    estimatedWeight: string;
    estimatedPrice: string;
    orderBoxWhatsApp: string;
    resetBox: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    verifiedScore: string;
    openGoogleReviews: string;
    submitFeedback: string;
    hygieneCommitment: string;
  };
  contact: {
    title: string;
    subtitle: string;
    addressHeader: string;
    hoursHeader: string;
    callNow: string;
    getDirections: string;
    chatWhatsApp: string;
    sendEnquiry: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      customBox: "Custom Box",
      story: "Our Story",
      festivals: "Festivals",
      gallery: "Gallery",
      reviews: "Reviews",
      visitUs: "Contact",
      orderWhatsApp: "WhatsApp",
      dossier: "Verified Dossier",
      cart: "Cart",
    },
    hero: {
      badge: "Artisan Confectionery • Bhosari, Pune",
      headline: "The Royal Symphony of",
      headlineHighlight: "Authentic Indian Mithai",
      subheadline: "Crafted in pure cow ghee and slow-cooked mawa in Indrayani Nagar, Bhosari. Fresh morning breakfast from 7:00 AM & exquisite celebration hampers.",
      exploreMenu: "Explore Royal Menu",
      buildBox: "Build 3D Sweet Box",
      breakfastAlert: "Fresh Hot Poha & Samosas ready from 7:00 AM daily",
      openNow: "Open Today: 7:00 AM – 10:00 PM",
      googleRating: "3.9 / 5 on Google Business (37 Reviews)",
    },
    features: {
      pureGhee: {
        title: "100% Pure Cow Ghee",
        desc: "Our motichoor laddoos and traditional sweets are prepared in golden, fragrant desi ghee without artificial adulterants.",
      },
      morningFresh: {
        title: "7:00 AM Morning Batches",
        desc: "Steaming hot Puneri Kanda Poha, samosas, and jalebis freshly prepared every dawn for MIDC commuters and families.",
      },
      artisanMithai: {
        title: "Master Halwai Craft",
        desc: "Time-honored recipes for diamond Kaju Katli, saffron-infused pedas, and celebratory modaks.",
      },
      communityTrust: {
        title: "Indrayani Nagar Landmark",
        desc: "Proudly serving the families, engineers, and sweet lovers of Bhosari MIDC with genuine Maharashtrian warmth.",
      },
    },
    categories: {
      all: "All Offerings",
      traditional_mithai: "Traditional Mithai",
      dry_fruit_specials: "Dry Fruit Specials",
      bengali_delights: "Bengali Delights",
      breakfast_snacks: "Breakfast & Snacks",
      namkeen_savouries: "Namkeen & Farsan",
      festive_hampers: "Festive Hampers",
    },
    customBox: {
      title: "Interactive 3D Sweet Box Builder",
      subtitle: "Curate your personal assortment of handcrafted mithai in an embossed royal gift box.",
      chooseSize: "1. Select Gift Box Size",
      size4: "4 Compartments (~500g)",
      size6: "6 Compartments (~750g)",
      size9: "9 Compartments (~1kg Royal)",
      selectSweets: "2. Choose Sweets to Fill Your Box",
      estimatedWeight: "Estimated Net Weight",
      estimatedPrice: "Estimated Price",
      orderBoxWhatsApp: "Order This Custom Box on WhatsApp",
      resetBox: "Reset Box",
    },
    reviews: {
      title: "Customer Reviews & Community Voice",
      subtitle: "Real, transparent feedback from our Google Business Profile and patrons in Bhosari.",
      verifiedScore: "Verified Google Rating",
      openGoogleReviews: "View on Google Maps",
      submitFeedback: "Share Your Feedback",
      hygieneCommitment: "Our Daily Hygiene Commitment: Stainless steel preparation, mandatory food-handling standards, and daily fresh morning batches.",
    },
    contact: {
      title: "Visit Us in Indrayani Nagar",
      subtitle: "Stop by for breakfast at 7 AM or pick up fresh sweets for your celebrations in Bhosari MIDC.",
      addressHeader: "Shop Location",
      hoursHeader: "Opening Hours",
      callNow: "Call Shop",
      getDirections: "Get Directions on Google Maps",
      chatWhatsApp: "Message on WhatsApp",
      sendEnquiry: "Send Sweet Enquiry",
    },
  },
  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      menu: "मेन्यू",
      customBox: "स्वीट बॉक्स",
      story: "आमची गोष्ट",
      festivals: "उत्सव",
      gallery: "छायाचित्रे",
      reviews: "अभिप्राय",
      visitUs: "संपर्क",
      orderWhatsApp: "व्हॉट्सॲप",
      dossier: "माहिती",
      cart: "पेटी",
    },
    hero: {
      badge: "पारंपरिक मिठाई • भोसरी, पुणे",
      headline: "शुद्ध तुपातील आणि चवदार",
      headlineHighlight: "अस्सल भारतीय मिठाई",
      subheadline: "इंद्रायणी नगर, भोसरी येथे शुद्ध गाईच्या तुपात आणि अस्सल खव्यात बनवलेली मिठाई. सकाळी ७ पासून गरमागरम नाश्ता आणि सणासुदीचे हॅम्पर.",
      exploreMenu: "मेन्यू पहा",
      buildBox: "३D मिठाई बॉक्स बनवा",
      breakfastAlert: "दररोज सकाळी ७ वाजता गरमागरम पोहे व समोसे तयार!",
      openNow: "आजची वेळ: सकाळी ७:०० ते रात्री १०:००",
      googleRating: "गुगल रेटिंग: ३.९ / ५ (३७ अभिप्राय)",
    },
    features: {
      pureGhee: {
        title: "१००% शुद्ध गाईचे तूप",
        desc: "आमचे मोतीचूर लाडू आणि सर्व पारंपरिक मिठाई अस्सल गाईच्या तुपात बनवली जाते.",
      },
      morningFresh: {
        title: "सकाळी ७:०० वा. ताजा नाश्ता",
        desc: "गरमागरम पुणेरी कांदे पोहे, खमंग समोसे आणि कटिंग चहा दररोज सकाळी तयार.",
      },
      artisanMithai: {
        title: "पारंपरिक कारागिरी",
        desc: "काजू कतली, केशर पेढा आणि गणपती बाप्पासाठी अस्सल उकडीचे मोदक.",
      },
      communityTrust: {
        title: "भोसरीकरांचा विश्वास",
        desc: "इंद्रायणी नगर आणि एमआयडीसी भोसरी परिसरातील नागरिकांची हक्काची गोड जागा.",
      },
    },
    categories: {
      all: "सर्व पदार्थ",
      traditional_mithai: "पारंपरिक मिठाई",
      dry_fruit_specials: "सुकामेवा मिठाई",
      bengali_delights: "बंगाली मिठाई",
      breakfast_snacks: "सकाळचा नाश्ता",
      namkeen_savouries: "खमंग फरसाण",
      festive_hampers: "उत्सव हॅम्पर",
    },
    customBox: {
      title: "३D मिठाई बॉक्स कस्टमायझर",
      subtitle: "तुमच्या आवडीच्या मिठाई निवडून शाही भेट बॉक्स तयार करा.",
      chooseSize: "१. बॉक्सचा आकार निवडा",
      size4: "४ कप्पे (सुमारे ५०० ग्रॅम)",
      size6: "६ कप्पे (सुमारे ७५० ग्रॅम)",
      size9: "९ कप्पे (सुमारे १ किलो)",
      selectSweets: "२. बॉक्समध्ये मिठाई भरा",
      estimatedWeight: "अंदाजे वजन",
      estimatedPrice: "अंदाजे किंमत",
      orderBoxWhatsApp: "हा बॉक्स व्हॉट्सॲपवर ऑर्डर करा",
      resetBox: "पुन्हा सुरू करा",
    },
    reviews: {
      title: "ग्राहकांचे अभिप्राय",
      subtitle: "गुगल बिझनेस प्रोफाइल आणि भोसरीकरांचे खरे मत.",
      verifiedScore: "गुगल रेटिंग",
      openGoogleReviews: "गुगल मॅप्सवर पहा",
      submitFeedback: "तुमचा अभिप्राय द्या",
      hygieneCommitment: "स्वच्छतेची खात्री: स्टेनलेस स्टीलची तयारी, दररोज ताजी तयारी आणि सुरक्षित हाताळणी.",
    },
    contact: {
      title: "इंद्रायणी नगर येथे भेट द्या",
      subtitle: "सकाळी ७ च्या ताज्या नाश्त्यासाठी किंवा सणांच्या मिठाईसाठी अवश्य या.",
      addressHeader: "पत्ता",
      hoursHeader: "वेळ",
      callNow: "फोन करा",
      getDirections: "गुगल मॅप्स दिशा",
      chatWhatsApp: "व्हॉट्सॲप मेसेज",
      sendEnquiry: "चौकशी पाठवा",
    },
  },
  hi: {
    nav: {
      home: "होम",
      menu: "मेन्यू",
      customBox: "स्वीट बॉक्स",
      story: "हमारी कहानी",
      festivals: "त्योहार",
      gallery: "गैलरी",
      reviews: "समीक्षाएं",
      visitUs: "संपर्क",
      orderWhatsApp: "व्हाट्सएप",
      dossier: "विवरण",
      cart: "कार्ट",
    },
    hero: {
      badge: "पारंपरिक मिठाई • भोसरी, पुणे",
      headline: "शुद्ध देसी घी और प्यार से बनी",
      headlineHighlight: "स्वादिष्ट भारतीय मिठाई",
      subheadline: "इंद्रायणी नगर, भोसरी में शुद्ध गाय के घी और ताजे मावे से बनी पारंपरिक मिठाई। सुबह 7 बजे से ताजा नाश्ता और त्योहारों के विशेष गिफ्ट बॉक्स।",
      exploreMenu: "मेन्यू देखें",
      buildBox: "3D मिठाई बॉक्स बनाएं",
      breakfastAlert: "सुबह 7:00 बजे से गरमा-गरम पोहा एवं समोसा उपलब्ध",
      openNow: "खुला है: सुबह 7:00 से रात 10:00 तक",
      googleRating: "गूगल रेटिंग: 3.9 / 5 (37 समीक्षाएं)",
    },
    features: {
      pureGhee: {
        title: "100% शुद्ध देसी घी",
        desc: "हमारे मोतीचूर लड्डू और पारंपरिक मिठाइयां असली गाय के घी में तैयार की जाती हैं।",
      },
      morningFresh: {
        title: "सुबह 7:00 बजे ताजा नाश्ता",
        desc: "गरमा-गरम कांदा पोहा, खस्ता समोसा और जलेबी हर सुबह तैयार।",
      },
      artisanMithai: {
        title: "हलवाई की महारत",
        desc: "काजू कतली, केसर पेड़ा और मोदक की प्रामाणिक रेसिपी।",
      },
      communityTrust: {
        title: "भोसरी का भरोसेमंद स्थान",
        desc: "इंद्रायणी नगर और एमआईडीसी के परिवारों और मिठाई प्रेमियों का पसंदीदा ठिकाना।",
      },
    },
    categories: {
      all: "सभी आइटम",
      traditional_mithai: "पारंपरिक मिठाई",
      dry_fruit_specials: "ड्राई फ्रूट मिठाई",
      bengali_delights: "बंगाली मिठाई",
      breakfast_snacks: "सुबह का नाश्ता",
      namkeen_savouries: "नमकीन एवं फरसाण",
      festive_hampers: "त्योहारी गिफ्ट बॉक्स",
    },
    customBox: {
      title: "3D कस्टमाइज्ड मिठाई बॉक्स",
      subtitle: "अपनी मनपसंद मिठाइयां चुनकर सुंदर शाही गिफ्ट बॉक्स तैयार करें।",
      chooseSize: "1. बॉक्स का आकार चुनें",
      size4: "4 खाने (~500 ग्राम)",
      size6: "6 खाने (~750 ग्राम)",
      size9: "9 खाने (~1 किलो)",
      selectSweets: "2. मिठाइयां चुनें",
      estimatedWeight: "अनुमानित वजन",
      estimatedPrice: "अनुमानित कीमत",
      orderBoxWhatsApp: "व्हाट्सएप पर ऑर्डर भेजें",
      resetBox: "रीसेट करें",
    },
    reviews: {
      title: "ग्राहकों के विचार",
      subtitle: "गूगल बिजनेस प्रोफाइल और स्थानीय ग्राहकों की समीक्षाएं।",
      verifiedScore: "सत्यापित गूगल स्कोर",
      openGoogleReviews: "गूगल मैप्स पर देखें",
      submitFeedback: "अपनी राय दें",
      hygieneCommitment: "स्वच्छता की प्रतिबद्धता: स्टेनलेस स्टील काउंटर, हर सुबह ताजा निर्माण और स्वच्छता नियम।",
    },
    contact: {
      title: "इंद्रायणी नगर में पधारें",
      subtitle: "सुबह के नाश्ते या त्योहारों की मिठाई के लिए भोसरी में आएं।",
      addressHeader: "दुकान का पता",
      hoursHeader: "समय",
      callNow: "कॉल करें",
      getDirections: "रास्ता देखें",
      chatWhatsApp: "व्हाट्सएप चैट",
      sendEnquiry: "पूछताछ भेजें",
    },
  },
};
