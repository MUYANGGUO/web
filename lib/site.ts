export const site = {
  url: 'https://muyangguo.com',
  title: 'Muyang Guo',
  name: 'Muyang Guo',
  description:
    'Muyang acquired M.S. in Computational Science & Engineering and B.S./M.S. in Mechanical Engineering from Georgia Tech. Now a senior software engineer in the Bay Area.',
  bio: 'Ex-Uber ATG, ex-Siemens. Senior SWE, Bay Area.',
  author: 'Muyang Guo',
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
