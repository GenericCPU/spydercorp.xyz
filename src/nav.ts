export type NavLink = {
  href: string;
  label: string;
  sectionId: string;
};

export const navLinks: NavLink[] = [
  { href: '#services', label: 'Services', sectionId: 'services' },
  { href: '#work', label: 'Work', sectionId: 'work' },
  { href: '#process', label: 'Process', sectionId: 'process' },
  { href: '#faq', label: 'FAQ', sectionId: 'faq' },
  { href: '#contact', label: 'Contact', sectionId: 'contact' },
];

export const navSectionIds = navLinks.map((l) => l.sectionId);
