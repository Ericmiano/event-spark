export const WHY_ATTEND = [
  {
    title: "Earn CPD points",
    description:
      "Accredited sessions count toward your professional development requirements with structured learning across the programme.",
  },
  {
    title: "Connect with peers",
    description:
      "Meet architects, engineers, planners and policymakers from national government, county offices, academia and private practice.",
  },
  {
    title: "Shape the industry",
    description:
      "Engage on climate action, urban governance, community resilience and the future of construction across the built environment.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Who can attend the convention?",
    answer:
      "The convention is open to AAK members, students, fresh graduates and non-members. Some ticket tiers are reserved for members only — check the ticket list for eligibility.",
  },
  {
    question: "How do I prove AAK membership when booking?",
    answer:
      "Enter your AAK membership number during registration. Member-only tiers may be verified before your booking is confirmed.",
  },
  {
    question: "What is included in my ticket?",
    answer:
      "Tickets include access to convention sessions, the exhibition and meals for the dates indicated on your booking confirmation.",
  },
  {
    question: "Can I book accommodation at the venue?",
    answer:
      "Yes. The convention is hosted at Diamond Leisure Beach & Golf Resort in Diani. See the Accommodation & Tours page for venue details and tour sign-up.",
  },
  {
    question: "Are pre-convention technical tours included?",
    answer:
      "Technical tours are booked separately. Sign up via the link on the Accommodation & Tours page — spaces are limited.",
  },
  {
    question: "What is the refund or transfer policy?",
    answer:
      "Contact the AAK events team at events@aak.or.ke with your booking reference. Policy details are issued with your confirmation email.",
  },
] as const;

export const TRAVEL_INFO = {
  airport: "Ukunda Airstrip (Diani) · Moi International Airport (Mombasa, ~90 min drive)",
  gettingThere:
    "Delegates typically fly into Ukunda or Mombasa, then transfer by taxi or hotel shuttle to Diamond Leisure Beach & Golf Resort.",
  dressCode: "Smart casual for sessions; comfortable clothing for tours and beach activities.",
  mapUrl: "https://maps.google.com/?q=Diamond+Leisure+Beach+%26+Golf+Resort+Diani",
} as const;

export const PARTNERS = [
  { name: "Architectural Association of Kenya", label: "Organiser" },
  { name: "Diamond Leisure Beach & Golf Resort", label: "Venue partner" },
  { name: "AAK Biennale", label: "Programme partner" },
] as const;

export const SPEAKERS_COMING_SOON = {
  headline: "Speaker lineup coming soon",
  description:
    "We're confirming keynote speakers, panel chairs and session leads across climate action, policy, community resilience and construction innovation.",
  expectedBy: "July 2026",
  previewTopics: [
    "Climate action & sustainable design",
    "Urban governance & regulatory reform",
    "Community-centred resilience",
    "Construction technology & innovation",
  ],
} as const;
