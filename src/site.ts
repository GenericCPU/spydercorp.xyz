export const site = {
  url: 'https://spidercorp.xyz',
  domain: 'spidercorp.xyz',
  brand: 'SpiderCorp',
  title: 'SpiderCorp — Web · Systems',
  description:
    'Web, custom systems, and engineering for local businesses and product teams. Flexible engagement — project, retainer, or pro bono for qualifying local shops.',
  heroTitle: 'Premium web & custom architecture, built for your business.',
  heroLeadLines: [
    'Turnkey systems that last.',
    'No full-time developer required.',
  ] as const,
  heroLead: 'Turnkey systems that last. No full-time developer required.',
  email: 'brandongcryderman@gmail.com',
  phone: '+1-902-441-1924',
  phoneTel: '+19024411924',
  location: 'Halifax, NS',
  announcementCta: 'Call me for inquiries',
  demoUrl: 'https://bringmebuds.vercel.app',
  servicesSectionLead:
    'Design and engineering in one thread — one partner for your site, your tools, and the systems that run your business.',
  workSectionLabel: 'Work',
  workSectionTitle: 'Recent projects',
  contactSectionLead: 'I look forward to helping you grow your business.',
  heroStats: [
    {
      label: 'Front of house',
      detail: 'Product UI and storefronts your customers depend on',
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
    id: 'design',
    title: 'Web design',
    description:
      'Premium interfaces that are accessible and dependable on every screen.',
    highlights: [
      'UI & component systems',
      'Shops, carts, checkout & product flows',
      'State-driven forms, dialogs & menus',
      'Dependable keyboard and screen-reader support',
    ],
  },
  {
    id: 'engineering',
    title: 'Full-stack engineering',
    description: 'React, TypeScript, and APIs shipped end to end.',
    highlights: [
      'React & TypeScript',
      'APIs & third-party integrations',
      'Databases & auth',
      'Performance & deployment',
    ],
  },
  {
    id: 'systems',
    title: 'Custom backend & admin',
    description: 'Admin, inventory, and internal tools beyond templates.',
    highlights: [
      'Admin dashboards',
      'Inventory & ordering',
      'Support & ticketing',
      'Workflow automation',
    ],
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
    body: 'UI and code in one thread. No handoffs between a designer who doesn’t ship and a dev who never met you.',
  },
  {
    step: '03',
    title: 'Launch & tune',
    body: 'Go live, measure, refine. Your site and systems should work as hard as your team.',
  },
  {
    step: '04',
    title: 'Host it yourself',
    body: 'When you are ready, we help you run it on your own infrastructure — no ongoing fees to us. You stay in control of what we delivered.',
  },
] as const;

export const projectTypes = [
  { label: 'New website', value: 'new' },
  { label: 'Redesign / refresh', value: 'redesign' },
  { label: 'E-commerce / shop', value: 'shop' },
  { label: 'Custom admin / systems', value: 'systems' },
  { label: 'Not sure yet', value: 'unsure' },
] as const;

export const faq = [
  {
    id: 'cost',
    question: 'What does a project cost?',
    answer:
      'It depends on what you need — from a focused landing page to a shop with custom ordering behind the scenes. We quote after a short conversation. Payment can be per project, month to month, trade, or another arrangement that fits how you run things.',
  },
  {
    id: 'systems',
    question: 'Can you build more than a website?',
    answer:
      'Yes. Shops, ordering, inventory, admin panels, support tools — if it helps you run the business online, we can talk it through. We scope honestly up front so you know what is included before we start.',
  },
  {
    id: 'timeline',
    question: 'How long does it take?',
    answer:
      'A focused site can go live quickly. Bigger builds take longer. After one call you get a clear timeline with real dates.',
  },
  {
    id: 'ownership',
    question: 'What do I actually get?',
    answer:
      'A site or system built for your business. You own what we deliver. When you are ready, we help you host it yourself — you stay in control of the code and your ongoing costs.',
  },
] as const;
