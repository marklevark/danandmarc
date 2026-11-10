export const site = {
  name: 'Dan and Marc',
  /**
   * Adobe Fonts (Typekit) project ID for Degular, the original site's typeface, e.g. 'abc1def'.
   * fonts.adobe.com → Web Projects → add "degular-display" + "degular-text", domain danandmarc.ca.
   * Leave empty to use the bundled fallback (Inter Tight).
   */
  adobeFontsKit: '',
  description: 'Dan Cantelon and Marc Levesque: an award-winning freelance creative team based out of Toronto.',
  email: 'marcanddan@danandmarc.ca',
  people: [
    {
      first: 'Dan',
      name: 'Dan Cantelon',
      email: 'dan@danandmarc.ca',
      linkedin: 'https://www.linkedin.com/in/dan-cantelon-31980a131/',
    },
    {
      first: 'Marc',
      name: 'Marc Levesque',
      email: 'marc@danandmarc.ca',
      linkedin: 'https://www.linkedin.com/in/marchlevesque/',
    },
  ],
  nav: [
    { label: 'Work', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Awards', href: '/awards' },
  ],
};

/** Agencies and clients, "in absolutely no order at all". */
export const roster = [
  'BBDO', 'Heinz', 'American Express', 'Rethink', 'VW', 'Ogilvy', 'Tim Hortons', 'TAXI', 'OLG',
  'Kraft Dinner', 'United Way', 'Draft FCB', 'Winners', 'Tangerine', 'Dove', 'Mercedes Benz',
  'john st.', 'Rogers', 'SiriusXM', 'TAXI2', 'Nabob', 'Canadian Tire', 'Sid Lee', 'Enercare',
  'MiO', 'Telus', 'Giants & Gentlemen',
];
