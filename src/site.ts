export const site = {
  url: 'https://spidercorp.xyz',
  domain: 'spidercorp.xyz',
  brand: 'SpiderCorp',
  title: 'SpiderCorp — Web · Brand · Systems',
  description:
    'Web, brand, custom systems, and engineering for local businesses and product teams. Flexible engagement — project, retainer, or pro bono for qualifying local shops.',
  heroTitle: 'Premium web & custom architecture, built for your business.',
  tagline: 'Web, brand, and systems, built around how you work.',
  heroSub: 'Turnkey systems that last. No full-time developer required.',
  email: 'brandongcryderman@gmail.com',
  phone: '+1-902-441-1924',
  phoneTel: '+19024411924',
  location: 'Halifax, NS',
  announcementCta: 'Call me for inquiries',
  demoUrl: 'https://bringmebuds.vercel.app',
  servicesSectionLead:
    'Marketing, design, engineering, and custom systems from one partner. We work with you one-on-one, with payment that fits your business, including pro bono opportunities for qualifying local small businesses.',
  workSectionLabel: 'Work',
  workSectionTitle: 'Recent projects',
  workSectionLead:
    'Product UI and full-stack builds for shops, wallets, games, and tools.',
  heroStats: [
    {
      label: 'Front of house',
      detail: 'Brand, product UI, and storefronts your customers touch',
    },
    {
      label: 'Back of house',
      detail: 'Databases, integrations, and admin — one cohesive, lightweight architecture',
    },
    {
      label: 'Engagement',
      detail: 'Flexible pay · pro bono for local small businesses',
    },
  ],
} as const;

export const services = [
  {
    id: 'brand',
    title: 'Brand & marketing',
    description: 'Positioning and visibility so the right people find you.',
    highlights: ['Brand & messaging', 'Local SEO'],
  },
  {
    id: 'design',
    title: 'Web design',
    description: 'Premium interfaces that work on every screen.',
    highlights: ['UI systems', 'Shops & landing pages'],
  },
  {
    id: 'engineering',
    title: 'Full-stack engineering',
    description: 'React, TypeScript, and APIs shipped end to end.',
    highlights: ['Frontends & APIs', 'Integrations'],
  },
  {
    id: 'systems',
    title: 'Custom backend & admin',
    description: 'Admin, inventory, and internal tools beyond templates.',
    highlights: ['Dashboards', 'Inventory & orders'],
  },
] as const;

export const studioCommitments = [
  {
    id: 'personal',
    title: 'Personalized service',
    description: 'You work directly with who designs and builds it.',
  },
  {
    id: 'payment',
    title: 'Flexible payment',
    description: 'Project, retainer, trade, or milestones that fit your cash flow.',
  },
  {
    id: 'probono',
    title: 'Pro bono for local small businesses',
    description: 'Ask honestly — we will tell you if it is a fit.',
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
