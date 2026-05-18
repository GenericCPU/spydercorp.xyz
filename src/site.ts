export const site = {
  domain: 'spidercorp.xyz',
  brand: 'spydercorp',
  tagline: 'We spin digital presence into foot traffic.',
  email: 'hello@spidercorp.xyz',
  location: 'Halifax, NS',
  demoUrl: 'https://bringmebuds.vercel.app',
} as const;

export const services = [
  {
    id: 'brand',
    title: 'Brand & marketing',
    description:
      'Positioning, messaging, and search visibility so the right people discover you — before they ever walk in.',
    highlights: ['Local SEO', 'Brand story', 'Social-ready assets'],
  },
  {
    id: 'design',
    title: 'Web design',
    description:
      'Premium, mobile-first interfaces that feel trustworthy at a glance. No template fluff — built for your business.',
    highlights: ['UI/UX systems', 'Photography-led layouts', 'Conversion-focused flows'],
  },
  {
    id: 'engineering',
    title: 'Full-stack engineering',
    description:
      'Fast, reliable sites you own end-to-end. One partner from concept to launch — no agency handoffs.',
    highlights: ['React & modern stack', 'Performance tuned', 'Checkout & integrations'],
  },
] as const;

export const process = [
  {
    step: '01',
    title: 'Listen',
    body: 'We learn how customers find you today and what “premium” means for your brand.',
  },
  {
    step: '02',
    title: 'Design & build',
    body: 'Strategy, visuals, and code in one thread — no disconnected mockups that never ship.',
  },
  {
    step: '03',
    title: 'Launch & tune',
    body: 'Go live, measure, refine. Your site should work as hard as your storefront.',
  },
] as const;

export const projectTypes = [
  { label: 'New website', value: 'new' },
  { label: 'Redesign / refresh', value: 'redesign' },
  { label: 'Brand & marketing', value: 'brand' },
  { label: 'E-commerce / shop', value: 'shop' },
  { label: 'Not sure yet', value: 'unsure' },
] as const;

export const faq = [
  {
    id: 'cost',
    question: 'What does a project cost?',
    answer:
      'Depends on scope. Local shops often start with a focused landing + contact flow; full shops cost more. I offer flexible arrangements — project rate, retainer, donation, or trade for the right fit.',
  },
  {
    id: 'timeline',
    question: 'How long does it take?',
    answer:
      'A simple brand site can ship in days. Larger builds (full shop, integrations) take longer. You get a straight timeline after a short call — no endless agency cycles.',
  },
  {
    id: 'local',
    question: 'Do you only work with Halifax businesses?',
    answer:
      'Halifax is home base and I love local walk-in brands, but remote projects work too as long as we can communicate clearly.',
  },
  {
    id: 'stack',
    question: 'What do I actually get?',
    answer:
      'A fast, mobile-first site you can point customers to — plus the strategy and design behind it. Built with modern tools (React, accessible UI components) so it stays maintainable.',
  },
] as const;
