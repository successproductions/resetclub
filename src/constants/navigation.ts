export interface NavItem {
  labelKey: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'about', href: '/notre-histoire' },
  { labelKey: 'team', href: '/team' },
  { labelKey: 'careers', href: '/recrutons' },
  { labelKey: 'contact', href: '/contact' },
];