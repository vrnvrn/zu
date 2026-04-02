import type { Hub, Card, CardPosition, PopupCity } from '@/components/NewsletterContent'

export const hubs: Record<string, Hub> = {
  intro: {
    id: 'intro',
    title: 'Zuzone — March 2026',
    fullContent: 'Welcome to the March 2026 edition of the Zuzone community newsletter.\n\nThank you to everyone contributing to this ecosystem — builders, writers, organizers, and connectors. This month we spotlight ZuCity Japan\'s app launch, hear from Burns and V, share our first ecosystem poll, and recap ZuZone\'s first X Spaces co-hosting.\n\nWishing you a great April ahead.',
  },
  burns: {
    id: 'burns',
    title: 'Burns — March 2026',
    fullContent: `[Burns' March article will be added here once received.]

Reach out to Burns at 0xburns@proton.me or @privacyburns on X.`,
    links: [
      { url: 'mailto:0xburns@proton.me', text: '0xburns@proton.me' },
      { url: 'https://x.com/privacyburns', text: '@privacyburns' },
    ],
  },
  zucityjapan: {
    id: 'zucityjapan',
    title: 'ZuCity Japan: App Launch',
    fullContent: `ZuCity Japan has launched their new app — a coordination tool built for the pop-up city context, designed to help residents navigate, connect, and participate in the life of the city.

**What is ZuCity Japan?**

ZuCity Japan ran through March 2026, bringing together builders, thinkers, and community members in Japan in a month-long residency. Their new app emerged from the real friction of running the city — a tool designed by people living in it.

**Exploring Emerging Coordinations**

The app focuses on coordination at the neighborhood scale: who is working on what, where to find resources, how decisions get made. It's a live experiment in the kind of lightweight governance tooling that pop-up cities need.

**What's next?**

Kiba and the ZuCity Japan team are continuing to develop the app beyond the residency. If you're building a pop-up city and want to pilot it, reach out.`,
    link: { url: 'https://nootype.substack.com/p/exploring-emerging-coordinations', text: 'Read: Exploring Emerging Coordinations' },
  },
  dacc: {
    id: 'dacc',
    title: 'd/acc in Practice',
    fullContent: `[This month's d/acc in Practice builder spotlight will be added here.]

Are you an open source builder working on something that defends against centralization, surveillance, or infrastructure fragility? We'd love to feature you. Reach out at hi@zuzone.org`,
    link: { url: 'mailto:hi@zuzone.org', text: 'hi@zuzone.org' },
  },
  poll: {
    id: 'poll',
    title: 'Ecosystem Poll',
    fullContent: 'Where do you see the pop-up city ecosystem heading in the next 2 years? Cast your vote — results shared next month.',
  },
  nsvszu: {
    id: 'nsvszu',
    title: 'NS & Zu: Learning From Each Other',
    fullContent: `[Veronica's article on what Network State residencies and Zu pop-up cities can learn from each other will be added here once submitted.]

Reach out to Veronica at [Email]`,
  },
  xspaces: {
    id: 'xspaces',
    title: 'X Spaces: Roads to Devcon',
    fullContent: `On March 25th, ZuZone co-hosted an X Spaces with Invisible Garden, Valley of the Commons, and ProtoVille, a conversation about the road to Devcon rooted in d/acc and cosmolocalism.

**Who was there?**

- Invisible Garden — Koss and team, talking about their India residency and long-term vision
- Valley of the Commons — Felix, on their Valley pop-up and commons-based governance experiments
- ProtoVille — Gene, introducing their upcoming Korea pop-up in April
- ZuZone — Yami, connecting the ecosystem and hosting

**The thread**

The conversation followed the narrative of "touching grass at value-aligned spaces",the idea that Devcon and the pop-up city movement share a common purpose: building the social and technical infrastructure for a more decentralized, resilient world.

This is the first in what Koss is planning as a recurring series. ZuZone will co-host future conversations as the ecosystem grows.

Follow us on X @zuzones to catch future spaces.`,
    link: { url: 'https://x.com/zuzones', text: 'Follow @zuzones' },
  },
  crossword: {
    id: 'crossword',
    title: 'Crossword',
    fullContent: 'The March 2026 crossword is here! Test your knowledge of the Zuzalu ecosystem. February answers are now revealed on the crossword page.',
  },
  map: {
    id: 'map',
    title: 'Zuzalu 2026 Map',
    image: '/images/zumap-2026.svg',
    fullContent: 'Explore the global network of permanent hubs and pop-up cities for 2026. Now including ZuCity Japan.',
  },
}

export const cards: Card[] = [
  // Row 1
  { id: 'intro', hubId: 'intro', title: 'Zuzone', subtitle: 'March 2026', isIntro: true },
  { id: 'burns', hubId: 'burns', title: 'Burns — March 2026', isCenterText: true },
  { id: 'zucityjapan', hubId: 'zucityjapan', title: 'ZuCity Japan: App Launch', isCenterText: true },
  // Row 2
  { id: 'dacc', hubId: 'dacc', title: 'd/acc in Practice', isDacc: true },
  { id: 'poll', hubId: 'poll', title: 'Ecosystem Poll', subtitle: 'Where is the ecosystem headed?', isPoll: true },
  { id: 'nsvszu', hubId: 'nsvszu', title: 'NS & Zu: Learning From Each Other', subtitle: 'by Vrn.eth', isCenterText: true },
  // Row 3
  { id: 'xspaces', hubId: 'xspaces', title: 'X Spaces: Roads to Devcon', isCenterText: true },
  { id: 'map', hubId: 'map', title: '2026 Map', image: '/images/zumap-2026.svg', isFullImage: true },
  { id: 'crossword', hubId: 'crossword', title: 'March Crossword', isCrossword: true, image: '/images/mar26crossword.svg' },
]

// Standard 3×3 scrapbook grid — same positions as February
export const cardPositions: CardPosition[] = [
  // Row 1
  { top: '2%', left: '2%', rotate: -2, width: '28%', height: '28%', zIndex: 10 },
  { top: '0%', left: '32%', rotate: 3, width: '32%', height: '28%', zIndex: 11 },
  { top: '2%', left: '66%', rotate: -1, width: '30%', height: '28%', zIndex: 10 },
  // Row 2
  { top: '32%', left: '2%', rotate: 2, width: '26%', height: '28%', zIndex: 12 },
  { top: '30%', left: '30%', rotate: -1, width: '38%', height: '30%', zIndex: 13 },
  { top: '32%', left: '70%', rotate: 1, width: '26%', height: '28%', zIndex: 12 },
  // Row 3
  { top: '62%', left: '2%', rotate: -2, width: '26%', height: '28%', zIndex: 11 },
  { top: '62%', left: '30%', rotate: 1, width: '28%', height: '28%', zIndex: 10 },
  { top: '62%', left: '60%', rotate: -1, width: '36%', height: '28%', zIndex: 11 },
]

export const popupCities: PopupCity[] = [
  { name: 'Infinita City', date: 'Feb 1 – Mar 31', url: 'https://infinita.city/' },
  { name: 'ZuCity Japan', date: 'Mar 1 – 30', url: 'https://zucity.org/' },
  { name: 'Ipê Village', date: 'Apr 6 – May 1', url: 'https://ipe.city/' },
  { name: 'Ârc Montenegro', date: 'Apr 3 – May 29', url: 'https://luma.com/montenegro' },
  { name: 'ZuAfrique', date: 'Apr 12 – May 3', url: 'https://zuafrique.com/' },
  { name: 'ZuKas Turkey', date: 'Apr 10 – May 10', url: 'https://zukas.city/' },
  { name: 'ProtoVille Korea', date: 'April', url: 'https://x.com/zuzones' },
  { name: 'muShanghai', date: 'May 10 – Jun 6', url: 'https://www.mushanghai.xyz/' },
  { name: 'Edge Esmeralda', date: 'May 30 – Jun 27', url: 'https://www.edgecity.live/' },
  { name: 'Zanzalu', date: 'Jul 25 – Aug 14', url: 'https://zanzalu.org/' },
  { name: 'Valley of the Commons', date: 'Aug 24 – Sep 20', url: 'https://www.valleyofthecommons.com/' },
  { name: 'ShanHaiWoo', date: 'H2 2026', url: 'https://www.shanhaiwoo.com/' },
  { name: 'Invisible Garden', date: 'October', url: 'https://invisible.garden/' },
  { name: 'Edge City India', date: 'Q4', url: 'https://www.edgecity.live/' },
  { name: 'ZuGrama India', date: 'From Feb 2026', url: 'https://zugrama.org/' },
]
