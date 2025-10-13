export interface NavItem {
  id: number;
  name: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { id: 1, name: "প্রার্থী", href: "/candidate" },
  { id: 2, name: "ইশতেহার", href: "/manifesto" },
  { id: 3, name: "কার্যক্রম", href: "/activities" },
  { id: 4, name: "গ্যালারী", href: "/gallery" },
];


export const LOGO_LINKS = {
  jaksue: 'https://i.ibb.co/jZy1vR3r/Logo.png',
  election: '/images/election_title.png',
};