/**
 * Single source of truth for business facts, navigation, services, and towns.
 *
 * CONFIRMED values are used directly. UNCONFIRMED values are exported as
 * visible `[[PLACEHOLDER]]` tokens — never invent them. Every placeholder is
 * tracked in TODO-before-launch.md.
 */

// ---- Placeholder tokens (render visibly; resolve before launch) ----
export const PLACEHOLDER = {
  OWNER_NAME: '[[OWNER_NAME]]',
  OWNER_TITLE: '[[OWNER_TITLE]]',
  YEARS: '[[YEARS]]',
  LICENSE_NUMBER: '[[LICENSE_NUMBER]]',
  INSTAGRAM_URL: '[[INSTAGRAM_URL]]',
  FORM_ENDPOINT: '[[FORM_ENDPOINT]]',
} as const;

// ---- Confirmed business hours ----
export const hours = [
  { days: 'Mon – Fri', time: '8:30 AM – 5:00 PM' },
  { days: 'Saturday', time: '8:30 AM – 2:00 PM' },
  { days: 'Sunday', time: 'Closed' },
];
// Schema.org openingHoursSpecification source
export const hoursSchema = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:00' },
  { days: ['Saturday'], opens: '08:30', closes: '14:00' },
];

// ---- Confirmed business facts ----
export const business = {
  name: "Yurgin's Lawn Care",
  legalName: "Yurgin's Lawn Care LLC",
  tagline: 'Leave your lawn care to us.',
  description:
    'Family-owned lawn care & landscaping in Monroeville, NJ — serving Salem & Gloucester counties.',
  phoneDisplay: '(856) 538-1755',
  phoneHref: 'tel:+18565381755',
  email: 'info@yurginslawncare.com',
  address: {
    street: '449 Bridgeton Pike',
    city: 'Monroeville',
    region: 'NJ',
    postalCode: '08343',
    country: 'US',
  },
  geo: { lat: 39.6312, lng: -75.1746 }, // approx Monroeville, NJ — refine if needed
  serviceRadiusMiles: 20,
  areaServedLabel: 'Salem & Gloucester counties',
  rating: { value: '5.0', label: '5.0 on Yelp & Angi' },
  hours,
  social: {
    facebook: 'https://www.facebook.com/p/Yurgins-Lawn-Care-100091727316909/',
    instagram: PLACEHOLDER.INSTAGRAM_URL,
    yelp: 'https://www.yelp.com/biz/yurgins-lawn-care-monroeville',
  },
} as const;

// ---- Primary navigation ----
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasMenu: true },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// ---- Services (6 homepage/nav cards). 5 have dedicated detail pages;
//      Hedge & Bush Trimming is covered within Lawn Maintenance. ----
export type Service = {
  title: string;
  href: string;
  icon: IconKey;
  blurb: string;
  cta?: string;
};

export const services: Service[] = [
  {
    title: 'Lawn Maintenance & Mowing',
    href: '/services/lawn-maintenance',
    icon: 'mower',
    blurb: 'Sharp, even cuts, crisp edging, and a full blow-down every visit.',
  },
  {
    title: 'Property Cleanups',
    href: '/services/property-cleanups',
    icon: 'leaf',
    blurb: 'Spring & fall packages that clear the mess and bring beds back to life.',
  },
  {
    title: 'Mulch Installation',
    href: '/services/mulch-installation',
    icon: 'mulch',
    blurb: 'Fresh, even mulch that locks in moisture and makes beds pop.',
  },
  {
    title: 'Hedge & Bush Trimming',
    href: '/services/lawn-maintenance',
    icon: 'hedge',
    blurb: 'Clean, shaped, healthy shrubs that frame your home.',
  },
  {
    title: 'Snow Removal',
    href: '/services/snow-removal',
    icon: 'snow',
    blurb: 'Enrolled customers cleared within 24 hours after every storm.',
    cta: 'Reserve My Spot',
  },
  {
    title: 'Holiday Lighting',
    href: '/services/holiday-lighting',
    icon: 'lights',
    blurb: "We hang and take down your lights so you don't have to.",
    cta: 'Schedule Holiday Lighting',
  },
];

// ---- Why Yurgin's trust points ----
export const trustPoints = [
  { icon: 'badge', title: 'Experienced crew', body: 'Seasoned pros who know South Jersey lawns.' },
  { icon: 'shield', title: 'Licensed & insured', body: 'Fully covered, every job.' },
  { icon: 'clock', title: 'Fast & reliable', body: 'Quick quotes and a schedule you can count on.' },
  { icon: 'sparkle', title: 'Spotless finish', body: 'Complete clean-up after every visit.' },
  { icon: 'home', title: 'Family-owned', body: 'Local, accountable, and proud of it.' },
  { icon: 'chat', title: 'Real communication', body: 'We answer, we show up, we follow through.' },
];

// ---- Service-area towns (Salem & Gloucester counties; 20-mi radius) ----
export type Town = { name: string; slug: string };
export const towns: Town[] = [
  'Monroeville', 'Franklinville', 'Elmer', 'Glassboro', 'Clayton',
  'Mullica Hill', 'Pitman', 'Malaga', 'Woodstown', 'Sewell',
  'Newfield', 'Williamstown', 'Mantua', 'Wenonah', 'Mickleton',
  'Clarksboro', 'Alloway', 'Oak Valley', 'Swedesboro', 'Pilesgrove',
].map((name) => ({
  name,
  slug: `${name.toLowerCase().replace(/[^a-z]+/g, '-')}-nj`,
}));

// Icon keys available in the Icon component
export type IconKey =
  | 'mower' | 'leaf' | 'mulch' | 'hedge' | 'snow' | 'lights'
  | 'badge' | 'shield' | 'clock' | 'sparkle' | 'home' | 'chat'
  | 'phone' | 'star' | 'arrow' | 'pin' | 'check' | 'menu' | 'close'
  | 'facebook' | 'instagram' | 'mail';

export const siteTitleSuffix = "Yurgin's Lawn Care";
