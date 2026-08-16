export type TicketTier = {
  id: string;
  name: string;
  audience: string;
  amount: number;
  daysLeft: number | null;
};

export type AakEvent = {
  eid: string;
  slug: string;
  title: string;
  organizer: string;
  venue: string;
  city: string;
  startISO: string;
  endISO: string;
  dateLabel: string;
  timeLabel: string;
  priceFrom: number;
  cpdPoints: number;
  category: string;
  type: string;
  logo: string;
  poster: string;
  tagline: string;
  tickets: TicketTier[];
  about: string[];
  theme: { title: string; subtitle: string; body: string[] };
  topics: string[];
  tours: { intro: string; items: string[]; signupUrl: string; image: string };
  programme: { name: string; url: string };
  speakers: { name: string; role: string }[];
};

export const CONVENTION: AakEvent = {
  eid: "baM8JnQ3+AaNamasUK2rTg==",
  slug: "annual-convention-2026",
  title: "AAK Annual Convention 2026",
  organizer: "Members of the Architectural Association of Kenya",
  venue: "Diamond Leisure Beach & Golf Resort",
  city: "Diani, Kenya",
  startISO: "2026-09-16T09:00:00+03:00",
  endISO: "2026-09-19T16:00:00+03:00",
  dateLabel: "16 Sep — 19 Sep, 2026",
  timeLabel: "09:00 — 16:00 EAT",
  priceFrom: 18000,
  cpdPoints: 10,
  category: "AAK Annual Convention",
  type: "Physical",
  logo: "https://members.aak.or.ke/uploads/event/12_202605131704189835_Convention2026Logo.png",
  poster:
    "https://members.aak.or.ke/uploads/event/12_202608131103581601_MainconventionPoster.jpeg",
  tagline: "Shifting the Built Environment from Fragility to Resilience",
  tickets: [
    {
      id: "grp5-member",
      name: "Group of 5 AAK Members",
      audience: "Members only",
      amount: 157500,
      daysLeft: 31,
    },
    { id: "member", name: "AAK Member", audience: "Members only", amount: 35000, daysLeft: 31 },
    {
      id: "fresh-grad",
      name: "Fresh Graduates (3 years & below)",
      audience: "Members only",
      amount: 18000,
      daysLeft: 31,
    },
    { id: "student", name: "Student", audience: "Members only", amount: 18000, daysLeft: 31 },
    {
      id: "non-member",
      name: "Non-Members",
      audience: "Members and non-members",
      amount: 45000,
      daysLeft: 31,
    },
    { id: "grp5", name: "Group of 5", audience: "Members only", amount: 135000, daysLeft: null },
    { id: "regular", name: "Regular", audience: "Members only", amount: 30000, daysLeft: null },
    { id: "early-bird", name: "Early Bird", audience: "Members only", amount: 25000, daysLeft: null },
  ],
  about: [
    "The AAK Annual Convention is AAK's premier event, bringing together professionals from National and County Governments, the private sector and academia to discuss pertinent issues in the industry for the greater benefit of the built environment.",
    "This year's convention takes place 17–19 September 2026 at the Diamond Leisure Beach & Golf Resort, Diani.",
  ],
  theme: {
    title: "Shifting the Built Environment",
    subtitle: "From Fragility to Resilience",
    body: [
      "This theme calls for a fundamental rethinking of how we design, build and sustain our spaces.",
      "Much of the fragility evident in today's built environment stems from imported models that disregard local climate, context and indigenous knowledge systems, resulting in spaces that are vulnerable, inefficient and disconnected from the communities they serve.",
      "Yet within Kenya and across Africa lies a deep reservoir of spatial intelligence — rooted in adaptive design, material efficiency and collective living — that has long enabled resilience.",
      "Practitioners and policymakers are challenged to move beyond imposed approaches and re-anchor the built environment in locally grounded, ecologically responsive and socially attuned practices, positioning resilience not as a future goal but as an existing foundation to be recognised, restored and advanced.",
    ],
  },
  topics: [
    "Climate Action and Sustainability",
    "Policy, Urban Governance and Regulatory Reform",
    "People, Place and Community Resilience",
    "Innovation, Technology and the Future of Construction",
  ],
  tours: {
    intro:
      "Take your experience beyond the conference room. Around the convention we take you to some of the Kenyan Coast's most exciting projects and places on pre-convention technical tours.",
    items: [
      "Mwache Dam Project",
      "Ukunda Airport Terminal Expansion",
      "Kisite Mpunguti Marine Park & Wasini Island",
    ],
    signupUrl: "https://forms.cloud.microsoft/r/sBC1RcB0ww",
    image:
      "https://firebasestorage.googleapis.com/v0/b/membership-docs.appspot.com/o/email_content%2Ff373c358-ecc0-441c-a91c-2c90cc7caf81%2Fb4698c08-be11-461b-8f4f-8da5585dd383?alt=media&token=51bf8881-3f41-4178-ae2b-78024e5bc38e",
  },
  programme: {
    name: "AAK Convention x Biennale Programme 2026.pdf",
    url: "https://members.aak.or.ke/uploads/event/12_202608161506324419_AAKConventionxBiennaleProgramme2026.pdf",
  },
  speakers: [],
};

export const EVENTS: AakEvent[] = [CONVENTION];

export function findEvent(slug: string): AakEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export const KES = (n: number) =>
  `KES ${n.toLocaleString("en-KE", { minimumFractionDigits: 0 })}`;
