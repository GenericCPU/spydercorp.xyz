export const site = {
  url: 'https://spydercorp.xyz',
  domain: 'spydercorp.xyz',
  brand: 'SpyderCorp',
  title: 'SpyderCorp — Web · Brand · Systems',
  description:
    'Web, brand, custom systems, and engineering for local businesses and product teams. Flexible engagement — project, retainer, or pro bono for qualifying local shops.',
  tagline: 'Web, brand, and systems — built to fit how you actually operate.',
  email: 'brandongcryderman@gmail.com',
  phone: '+1-902-441-1924',
  phoneTel: '+19024411924',
  location: 'Halifax, NS',
  announcementCallout: 'Systems built in days not weeks',
  announcementCta: 'Call me for inquiries',
  demoUrl: 'https://bringmebuds.vercel.app',
} as const;

export const services = [
  {
    id: 'brand',
    title: 'Brand & marketing',
    description:
      'Positioning, messaging, and visibility so the right people find you — walk-in shops, product launches, and local word of mouth.',
    highlights: ['Local SEO', 'Brand story', 'Campaign-ready assets'],
  },
  {
    id: 'design',
    title: 'Web design',
    description:
      'Clean, conversion-focused interfaces. Mobile-first layouts that feel premium without template bloat.',
    highlights: ['UI/UX systems', 'Landing & shop flows', 'Accessible components'],
  },
  {
    id: 'engineering',
    title: 'Full-stack engineering',
    description:
      'Fast frontends and APIs you own. Modern React stacks, integrations, checkout, and performance — shipped end to end.',
    highlights: ['React & TypeScript', 'APIs & integrations', 'Performance tuned'],
  },
  {
    id: 'systems',
    title: 'Custom backend & admin',
    description:
      'Inventory, ordering, support desks, internal tools — not limited to a template. If your business needs it, we can build it.',
    highlights: ['Admin dashboards', 'Inventory & orders', 'Support tooling', "Sky's the limit"],
  },
] as const;

export const studioCommitments = [
  {
    id: 'personal',
    title: 'Personalized service',
    description:
      'You work directly with the person designing and building your project — clear communication, no account-manager relay.',
  },
  {
    id: 'payment',
    title: 'Flexible payment',
    description:
      'Project rate, milestone billing, retainer, trade, or donation when it fits — we structure around your cash flow, not a rigid package.',
  },
  {
    id: 'probono',
    title: 'Pro bono for local small businesses',
    description:
      'Pro bono opportunities for qualifying local small businesses with a real community need — ask honestly; we’ll tell you if it’s a fit.',
  },
] as const;

export const process = [
  {
    step: '01',
    title: 'Listen',
    body: 'We map how you sell, fulfill, and support customers today — then define what “done” looks like.',
  },
  {
    step: '02',
    title: 'Design & build',
    body: 'Brand, UI, and code in one thread. No handoffs between a designer who doesn’t ship and a dev who never met you.',
  },
  {
    step: '03',
    title: 'Launch & tune',
    body: 'Go live, measure, refine. Your site and systems should work as hard as your team.',
  },
] as const;

export const projectTypes = [
  { label: 'New website', value: 'new' },
  { label: 'Redesign / refresh', value: 'redesign' },
  { label: 'E-commerce / shop', value: 'shop' },
  { label: 'Custom admin / systems', value: 'systems' },
  { label: 'Brand & marketing', value: 'brand' },
  { label: 'Not sure yet', value: 'unsure' },
] as const;

export const faq = [
  {
    id: 'cost',
    question: 'What does a project cost?',
    answer:
      'Depends on scope — a landing page is different from a full shop plus custom admin. Flexible arrangements: project rate, retainer, donation, or trade when it’s a fit.',
  },
  {
    id: 'systems',
    question: 'Can you build custom admin or inventory tools?',
    answer:
      'Yes. Ordering flows, inventory, support tickets, internal dashboards — we’re not limited to marketing sites. Tell us what you need to run the business; we’ll scope it honestly.',
  },
  {
    id: 'timeline',
    question: 'How long does it take?',
    answer:
      'Focused sites can ship in days. Larger builds (shop + admin + integrations) take longer. You get a straight timeline after a short call.',
  },
  {
    id: 'stack',
    question: 'What do I actually get?',
    answer:
      'A fast, maintainable stack (React, TypeScript, accessible UI primitives) plus the strategy behind it — and full ownership of what we build for you.',
  },
] as const;
