export const site = {
  url: 'https://muyangguo.xyz',
  title: 'Muyang Guo',
  name: 'Muyang Guo',
  description:
    'Muyang acquired M.S. in Computational Science & Engineering and B.S./M.S. in Mechanical Engineering from Georgia Tech.',
  bio: 'M.S. CSE & ME, B.S. ME — Georgia Tech',
  author: 'Muyang Guo',
  email: 'terry.trxue@gmail.com',
  avatar: '/img/avatar.png',
  social: {
    github: 'MUYANGGUO',
    linkedin: 'muyang-guo-445a3465',
    youtubeChannel: 'UCmPARI6b-xWY4gSdo1XFoog',
  },
  analytics: {
    gtagId: 'UA-157817052-1',
    adsenseClient: 'ca-pub-1032547897605308',
  },
  disqus: {
    shortname: 'muyangguo',
  },
} as const;

export type Site = typeof site;
