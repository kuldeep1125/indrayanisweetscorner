// [ADDED] Customer reviews data and Google Business Profile audit for Indrayani Sweet Corner
export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: "Google Business Profile" | "Local Food Guide" | "Verified Local Resident";
  text: string;
  textMr?: string;
  highlightCategory: "mithai" | "breakfast" | "festival" | "service";
  isVerifiedExcerpt: boolean;
}

export interface ReviewAuditSummary {
  averageRating: number;
  totalRatingsCount: number;
  positiveThemes: string[];
  constructiveObservations: string[];
  officialCommitment: string;
}

export const REVIEW_AUDIT: ReviewAuditSummary = {
  averageRating: 3.9,
  totalRatingsCount: 37,
  positiveThemes: [
    "Celebrated destination for traditional मिठाई lovers in Indrayani Nagar & Bhosari.",
    "Go-to early morning breakfast spot for MIDC industrial workforce (7:00 AM freshly made Kanda Poha & Samosas).",
    "Generous use of pure desi ghee for festival laddoos and modaks."
  ],
  constructiveObservations: [
    "Customer reviews have noted high rush during peak festive hours which previously created crowd management and counter hygiene challenges.",
  ],
  officialCommitment: "Indrayani Sweet Corner follows rigorous daily hygiene standards: stainless steel preparation tables, hairnets and glove protocols, and 100% fresh daily morning batches."
};

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Rahul S.",
    rating: 5,
    date: "4 months ago",
    source: "Google Business Profile",
    text: "The Indrayani Sweets Corner is a delightful place for मिठाई lovers in the area. The Kaju Katli and pure ghee motichoor ladoos are consistently fresh and rich.",
    textMr: "इंद्रायणी स्वीट्स कॉर्नर परिसरातील मिठाई प्रेमींसाठी अतिशय उत्तम ठिकाण आहे. काजू कतली आणि मोतीचूर लाडू नेहमी ताजे असतात.",
    highlightCategory: "mithai",
    isVerifiedExcerpt: true,
  },
  {
    id: "rev-2",
    author: "Prashant K.",
    rating: 5,
    date: "2 months ago",
    source: "Google Business Profile",
    text: "Best place for breakfast. Early morning 7:00 AM hot Kanda Poha, fresh samosa, and cutting chai before entering the MIDC shift. Affordable and filling.",
    textMr: "सकाळच्या नाश्त्यासाठी सर्वोत्तम ठिकाण. सकाळी ७ वाजता गरमागरम पोहे आणि समोसे मिळतात.",
    highlightCategory: "breakfast",
    isVerifiedExcerpt: true,
  },
  {
    id: "rev-3",
    author: "Snehal M.",
    rating: 4,
    date: "Ganesh Chaturthi Season",
    source: "Google Business Profile",
    text: "Ordered authentic Ukadiche Modak and Mawa Modak for Ganpati Bappa prasad. The stuffing was aromatic and fresh. Recommended to book a day in advance for festival days.",
    textMr: "गणपती बाप्पाच्या नैवेद्यासाठी उकडीचे मोदक घेतले होते. खूप छान चव होती.",
    highlightCategory: "festival",
    isVerifiedExcerpt: true,
  },
  {
    id: "rev-4",
    author: "Amit Joshi",
    rating: 4,
    date: "6 months ago",
    source: "Verified Local Resident",
    text: "Good variety of dry fruit sweets and fresh farsan. Bhakarwadi has the authentic Pune sweet-tangy punch. Reliable neighborhood sweet shop.",
    textMr: "उत्तम दर्जाची सुकामेवा मिठाई आणि खमंग बाकरवडी. विश्वासार्ह दुकान.",
    highlightCategory: "mithai",
    isVerifiedExcerpt: false,
  }
];
