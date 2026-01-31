'use client'

import Nav from '@/components/Nav'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Hub {
  id: string
  title: string
  date?: string
  fullContent: string
  link?: { url: string; text: string }
  links?: { url: string; text: string }[]
  image?: string
}

interface Card {
  id: string
  hubId: string
  title?: string
  subtitle?: string
  description?: string
  image?: string
  link?: { url: string; text: string }
  isIntro?: boolean
  isCrossword?: boolean
  isCongrats?: boolean
  isFiller?: boolean
}

const hubs: Record<string, Hub> = {
  intro: {
    id: 'intro',
    title: 'Zuzalu Newsletter — January 2026',
    fullContent: 'Welcome to the January 2026 edition of the Zuzalu community newsletter! \n\n This month brings exciting updates from across our global network of pop-up cities, hubs, and communities.\n\n Also, We\'re starting a monthly crossword next month! Submit your Q&A at \nzuletter.vercel.app/crossword\n\n to help build the first puzzle.',
  },
  arc: {
    id: 'arc',
    title: 'Ârc: Montenegro',
    date: 'April 3 – May 29, 2026',
    fullContent: 'Ârc is building a Charter City. We are hosting a pop-up city at Lustica Bay, Montenegro (April 3 - May 29, 2026) as part of our continued journey to this goal.\n\nMontenegro will have a fully immersive live/work experience for founders, builders, researchers, investors & more. There will be three festivals, daily community programming, co-working spaces and three communal meals a day.\n\nMeanwhile, you can join us at our permanent hub at Network School, where we\'ve now run over 200 events and helped transform a ghost city to a thriving city.\n\nÂrc aims to show that with new approaches to governance we can flourish on every axis simultaneously. Let\'s have our cake and eat it.',
    links: [
      { url: 'https://luma.com/montenegro', text: 'Apply' },
      { url: 'https://x.com/James_of_Arc/status/2011528030154596579', text: 'Announcement' },
    ],
  },
  edgecity: {
    id: 'edgecity',
    title: 'Edge City',
    date: 'May 30 – June 27 (CA) · Q4 (India)',
    fullContent: 'In 2026, Edge City is shifting from being a "container" for serendipity to a "catalyst" for startups, research, and new movements.\n\nWe\'re tracking 182+ projects that have emerged from our villages, from neurotech startup Constellation to the d/acc Residency we ran in Patagonia with Vitalik and Protocol Labs.\n\nWe recently hired Katherine Jones, who helped launch Merge Labs, to lead ecosystem building and better support what emerges.\n\nNext up: Edge Esmeralda 2026 (May 30 – June 27, Healdsburg, CA) and Edge City India in Q4.',
    image: '/newsletters/images/2026-01/edgecity1.png',
    link: { url: 'https://www.edgecity.live/', text: 'Know more' },
  },
  invisiblegarden: {
    id: 'invisiblegarden',
    title: 'Invisible Garden',
    date: 'October 2026 · India',
    fullContent: 'Invisible Garden is a short, intense builder residency designed for deep learning, uninterrupted build time, and living together long enough for real community (not just "event vibes") to form.\n\nAfter seeding the model in Chiang Mai (Nov 2024), the Buenos Aires chapter (Oct 2025) refined the rhythm—tighter, clearer, and focused on work that gets harder in an AI-saturated world: security, privacy, truth-seeking, and protocol design.\n\nBy the numbers: 1,038 applications, 379 accepted, 45 builders on-site for 3 weeks, running 69 workshops across Ethereum, ZK, AI, and cybersecurity with 40+ mentors.\n\nBuilders shipped 27 open-source projects and research outputs, including Stylus + ZK verification pipelines, privacy-first applications, zkML experiments, and specs/docs treated as infrastructure.\n\nThe takeaway: focus still beats frenzy, and the residency format is becoming a repeatable bridge between local ecosystems (like LatAm) and Ethereum\'s global roadmap.\n\nStay tuned for our upcoming residency in India in October!',
    image: '/newsletters/images/2026-01/invisiblegarden1.jpeg',
    link: { url: 'https://invisible.garden/', text: 'Know more' },
  },
  ipe: {
    id: 'ipe',
    title: 'Ipê Village',
    date: 'April 6 – May 1, 2026 · Florianópolis, Brazil',
    fullContent: 'Ipê Village 2026 is coming to Florianópolis, Brazil. This edition will feature more Hacker Houses — including AI House, Privacy House, and Onchain House — hosting workshops, experiences, and a big buildathon to prototype a new city using crypto and AI tools.\n\nWe\'re partnering with Balaji\'s Network School to offer a free one-month residency as a prize for the best builder.\n\nThis is part of our long-term plan to establish physical spaces for techno-optimists and grow the Ipê ecosystem of governance and social apps on top of our onchain platform.',
    link: { url: 'https://ipe.city/village2026', text: 'Apply now' },
  },
  infinita: {
    id: 'infinita',
    title: 'Infinita City',
    date: 'February 1 – March 31, 2026',
    fullContent: 'The Infinita Games 2026 are kicking off! A season of events, conferences, and community gatherings across the city:\nhttps://www.infinita.city/games/landing\n\nFeb 6–9: Longevity Biomarker Conference hosted by Rejuve.AI, bringing together researchers and practitioners at the frontier of longevity science:\nhttps://www.rejuve.ai/longevitybiomarkersconference\n\n Towards the end of March, we\'re hosting a BioHub Demo Day and a major governance summit with Patri Friedman. We\'d love to have key Ethereum leaders join us for these.\n\n• BioHub Demo Day:\nhttps://luma.com/BioHub2026\n• Governance Summit:\nhttps://luma.com/lib_acc2026\n\nPatri and a few VCs will also be running a private, founder-focused sub-event for startup city and network city leaders:\nhttps://luma.com/founders_acc2026\nIf you have great founders to recommend, let them know.\n\nWe\'re also relocating the Dome to the central territory, more on that soon.',
    link: { url: 'https://www.infinita.city/games/landing', text: 'Infinita Games' },
  },
  crecimiento: {
    id: 'crecimiento',
    title: 'Crecimiento',
    fullContent: 'Big things ahead for Crecimiento in 2026.\n\nOur new office is opening in March, and we\'re kicking off the Aleph Hub from March 4 to 26 in Buenos Aires.\n\nFrom March through July, we\'re running a full Buildathon Season with several programs for builders across the region.\n\nIn June/July we\'ll be hosting the Startup World Cup, and a second pop-up is planned for August. Stay tuned for more details.',
    image: '/newsletters/images/2026-01/crecimento.png',
    link: { url: 'https://crecimiento.build/', text: 'Know more' },
  },
  mushanghai: {
    id: 'mushanghai',
    title: 'muShanghai',
    date: 'April 26 – May 23, 2026 · China',
    fullContent: 'Be a Chinese Builder for a month.\n\nThis May, we\'re bringing global builders to Shanghai to experience China\'s innovation landscape firsthand: dark factories, frontier AI, and founders shipping at China speed.\n\nChina dominates headlines, but most builders outside China still don\'t understand how it actually works on the ground. muShanghai changes that: live here, build here, and learn how to plug into China\'s ecosystem to level up your project.\n\nApplications are live. Partnerships are open.\n\nSee you in muShanghai.',
    link: { url: 'https://www.mushanghai.city/', text: 'Know more' },
  },
  nomadlayer: {
    id: 'nomadlayer',
    title: 'Nomad Layer',
    fullContent: 'Nomad Layer has officially launched and is building a remote-first tax residency and legal home base for digital nomads and globally mobile founders, operating on top of Próspera in Honduras.\n\nThe focus is on simplifying tax residency into a clear lump-sum framework that works without relocation, lifestyle disruption, or complex offshore structures. Over the past months, we\'ve completed the legal and regulatory groundwork to make residency setup fully remote and operational.\n\nWe\'re now onboarding early participants and engaging with aligned communities interested in practical jurisdictional infrastructure for network states and pop-up cities.',
    link: { url: 'https://nomadlayer.com/', text: 'Know more' },
  },
  shanhaiwoo: {
    id: 'shanhaiwoo',
    title: 'ShanHaiWoo',
    date: 'H2 2026 · Early Planning',
    fullContent: 'The next ShanHaiWoo is expected to take place in the second half of 2026, likely just before Devcon.\n\nThe residency will continue to focus on accelerating Ethereum-native applications and real-world use cases.\n\nLocations under consideration include Hong Kong and India (Mumbai or Bangalore), and the team would love to hear your thoughts and ideas as planning unfolds!',
    link: { url: 'https://www.shanhaiwoo.com/', text: 'Learn more' },
  },
  valley: {
    id: 'valley',
    title: 'Valley of the Commons',
    date: 'August 24 – September 20, 2026 · Austria',
    fullContent: 'Valley of the Commons is a four-week pop-up village by a nascent network society envisioning life beyond extractive systems.\n\nRooted at The Commons Hub and held by the forests, mountains, and open skies of the Austrian Alps, this gathering is a living commons shared in work and study, in making and care, in governance and everyday life.\n\nWe begin with a five‑day course led by Michel Bauwens and Adam Arvidsson, two of the most insightful and engaging contemporary thinkers on the commons.\n\nNext, we shift from macro-narratives to the mechanics of how a village economy could actually function.\n\nWeek three turns toward how we might actually live together – architecturally, legally, ecologically, and socially. We explore cooperative housing concepts, map local resources and unused buildings, and examine the ecological potentials of the valley as a site for long-term habitation.\n\nThe fourth week brings everything into the domain of stewardship: how we organize, decide, invest, and protect what we build together. We explore participatory governance frameworks, cooperative legal structures, long-term investment models, and mechanisms for holding shared assets in trust.',
    link: { url: 'https://www.valleyofthecommons.com/', text: 'Apply now' },
  },
  frontiertower: {
    id: 'frontiertower',
    title: 'Viva.city and Frontier Tower',
    fullContent: 'Building viva.city — a permanent city to accelerate innovation, starting with a focus on longevity biotech, AI & crypto.\n\nWe\'re looking for a new host country to establish a Special Economic Zone. Meanwhile, we\'re bringing people together IRL to self-govern and self-experiment, with a first hub in San Francisco, in a 16-floor vertical village: the Frontier Tower.',
    link: { url: 'http://frontiertower.io/', text: 'Frontier Tower' },
  },
  crossword: {
    id: 'crossword',
    title: 'Crossword',
    fullContent: 'Submit your Q&A for the monthly crossword!',
  },
  zanzalu: {
    id: 'zanzalu',
    title: 'Zanzalu',
    date: 'July 25 – August 14, 2026 · Zanzibar',
    fullContent: 'Zanzalu 2026 is happening!\n\nHosted in Fumba Town, Zanzibar — a walkable waterfront community built around permaculture design principles.\n\nThemes centered on leapfrog tech, cities, and industry.\n\nNew residency tracks for builders and creatives.',
    link: { url: 'https://zanzalu.com/', text: 'Know more' },
  },
  zuafrique: {
    id: 'zuafrique',
    title: 'ZuAfrique',
    date: 'April 12 – May 3, 2026 · Kenya',
    fullContent: 'Below are the highlights from the ZuAfrique ecosystem:\n\n• 3 days workshop for developer community, using the Hub residence and event halls as the venue. A total of 25 builders were hosted at our Accra hub.\n\n• A 3-day end-of-year Web3 experience was hosted at the Kilifi Hub, between 11-13 December 2025. The event brought together residents, local builders, founders, and university talent to learn, connect, and celebrate the close of the year.\n\n• We also hosted post Devconnect batch at both Ghana and Kenya Hub.\n\nSharing some of the pictures with you to get you into the spirit of what went on here. Thank you, Vitalik and the entire Zuzalu community for keeping human hope alive.',
    link: { url: 'https://zuafrique.com/', text: 'Know more' },
  },
  zuberlin: {
    id: 'zuberlin',
    title: 'ZuBerlin',
    fullContent: 'The ZuBerlin team is working on two permanent hubs in Berlin, a smaller one in the city center and a larger one as a more ambitious, large-scale co-living project at the river in Berlin.\n\nThe small one is in the middle of Kreuzberg, combines cozy co-working, a cafe and a health area including a sauna & gym. We are very actively working on this one and planning to open in March.\n\nThe larger location will be initiated with a first residency in June, more details to be announced.\n\nWe are excited to soon go more public with our new, exciting projects.\n\nIf you are interested to contribute (and ideally located in Berlin), feel free to reach out to chris@ephema.io.',
    link: { url: 'mailto:chris@ephema.io', text: 'Get involved' },
  },
  zuitzerland: {
    id: 'zuitzerland',
    title: 'Zuitzerland',
    fullContent: 'Our focus: d/accelerator — We\'re making progress on a fund-of-funds approach to channel capital into the best hub funds and community operators. We aim to host the first d/acc accelerator cohort in Switzerland later this year, piloting the hub/accelerator model.\n\nd/acc a day: get featured! We\'re looking for ambitious d/acc builders to feature in live interviews, showcasing your work to our community of builders and investors.\n\nJoin us at Ethereum Zuri April 10–12, with a hackathon co-hosted by the ETH Blockchain Club. Build, learn, and connect.',
    link: { url: 'https://ethereumzuri.ch/', text: 'Ethereum Zuri' },
  },
  zukas: {
    id: 'zukas',
    title: 'ZuKas',
    date: 'April 10 – May 10, 2026 · Turkey',
    fullContent: 'ZuGov development is almost complete, and we now support multiple option ranked voting.\n\nCurrent confirmed speakers include E. Glen Weyl, Michel Bauwens from the P2P Foundation, Vit Jedlicka from Liberland, Martinet Lee from Zircuit, Xiao Wu from EthRiyadh and Chainide, Isa Sertkaya from Tubitak, and Ramazan Agirtas from Nethermind.\n\nAdditionally, several Turkish foundations and government organizations have provided soft commitments. We are targeting 150+ residents for a meaningful alpha test, with a primary focus on privacy, governance, d/acc, and Phygital commons coordination.',
    link: { url: 'https://www.zukas.city/', text: 'Know more' },
  },
  zugrama: {
    id: 'zugrama',
    title: 'ZuGrama',
    date: 'Feb 2026 — Onwards · India',
    fullContent: 'At ZuGrama, we have been busy prepping for our permanent hubs.\n\n• We wrote about why we are building ZuGrama:\nhttps://yeshdoteth.substack.com/p/why-we-are-building-zugrama\n\n• Grama Founding citizen SBT passport will be live and invite only starting Feb 4, 2026.\n\n• ZuGrama Bangalore will go live from Feb, with access to co-working spaces, hardware and biotech labs, office spaces. It will be a place for our d/acc incubator. RFPs will be out soon and you can apply to become a citizen on our website.\n\n• v1 Grama OS launching on Wednesday, Feb 4, 2026.\n\n• Grama dAI Agents powered by Ethereum & EigenAI (ERC 8004) launching on Wednesday, Feb 4, 2026.\n\n• New Grama Website launching Friday, Feb 6, 2026.\n\n• Closing partnership with 500 acre land stewardship for establishing Grama permanent hub. More details on location will be revealed in a few weeks.',
    link: { url: 'https://yeshdoteth.substack.com/p/why-we-are-building-zugrama', text: 'Read why we\'re building ZuGrama' },
  },
  
  congrats: {
    id: 'congrats',
    title: 'Congratulations',
    fullContent: 'Warm congratulations on your lovely personal milestones; \n\nJanine (Edge City)\n\nAudrey Tang (ShanHaiWoo)\n\nSanti Cristobal (Crecimento)',
  },
}

// One card per hub + photo-only fillers to complete the row
const cards: Card[] = [
  { id: 'intro', hubId: 'intro', title: 'Zuzalu Newsletter', subtitle: 'January 2026', isIntro: true },
  { id: 'arc', hubId: 'arc', image: '/newsletters/images/2026-01/arc1.png' },
  { id: 'crecimiento', hubId: 'crecimiento' },
  { id: 'edgecity', hubId: 'edgecity', image: '/newsletters/images/2026-01/edgecity.jpeg' },
  { id: 'invisiblegarden', hubId: 'invisiblegarden', image: '/newsletters/images/2026-01/Invisiblegarden.jpeg' },
  { id: 'ipe', hubId: 'ipe' },
  { id: 'infinita', hubId: 'infinita', image: '/newsletters/images/2026-01/infinita1.jpeg' },
  { id: 'mushanghai', hubId: 'mushanghai', image: '/newsletters/images/2026-01/muShanghai.jpg' },
  { id: 'nomadlayer', hubId: 'nomadlayer' },
  { id: 'shanhaiwoo', hubId: 'shanhaiwoo', image: '/newsletters/images/2026-01/Shanhaiwoo.jpeg' },
  { id: 'valley', hubId: 'valley', image: '/newsletters/images/2026-01/valley1.jpg' },
  { id: 'frontiertower', hubId: 'frontiertower', image: '/newsletters/images/2026-01/frontiertower.jpg' },
  { id: 'zanzalu', hubId: 'zanzalu', image: '/newsletters/images/2026-01/zanzalu.jpeg' },
  { id: 'zuafrique', hubId: 'zuafrique', image: '/newsletters/images/2026-01/zuafrique1.jpg' },
  { id: 'zuberlin', hubId: 'zuberlin', image: '/newsletters/images/2026-01/zuberlin.jpeg' },
  { id: 'crossword', hubId: 'crossword', isCrossword: true, image: '/images/crossword-blank.svg' },
  { id: 'zuitzerland', hubId: 'zuitzerland', image: '/newsletters/images/2026-01/Zuitz.jpeg' },
  { id: 'zukas', hubId: 'zukas', image: '/newsletters/images/2026-01/ZuKas.webp' },
  { id: 'zugrama', hubId: 'zugrama', image: '/newsletters/images/2026-01/zugrama1.jpeg' },
  { id: 'congrats', hubId: 'congrats', title: 'Congratulations', description: 'Janine (Edge City)\nAudrey Tang (ShanHaiWoo)\nSanti Cristobal (Crecimento)', isCongrats: true },
  // Photo-only fillers (no hub info overlay) when grid incomplete
  //{ id: 'filler-1', hubId: 'arc', image: '/newsletters/images/2026-01/arc2.JPG', isFiller: true },
]

const popupCities = [
  { name: 'ETH Chiang Mai', date: 'Dec 8 – Feb 3', url: 'https://www.ethchiangmai.com/' },
  { name: 'Infinita City', date: 'Feb 1 – Mar 31', url: 'https://infinita.city/' },
  { name: 'ZuCity Japan', date: 'Mar 1 – 30', url: 'https://zuzalu.city/' },
  { name: 'Ipê Village', date: 'Apr 6 – May 1', url: 'https://ipevillage.com/' },
  { name: 'Ârc Montenegro', date: 'Apr 3 – May 29', url: 'https://luma.com/montenegro' },
  { name: 'ZuAfrique', date: 'Apr 12 – May 3', url: 'https://zuafrique.com/' },
  { name: 'ZuKas Turkey', date: 'Apr 10 – May 10', url: 'https://zukas.org/' },
  { name: 'muShanghai', date: 'Apr 26 – May 23', url: 'https://www.mushanghai.city/' },
  { name: 'Edge Esmeralda', date: 'May 30 – Jun 27', url: 'https://www.edgecity.live/' },
  { name: 'Zanzalu', date: 'Jul 25 – Aug 14', url: 'https://zanzalu.com/' },
  { name: 'Valley of the Commons', date: 'Aug 24 – Sep 20', url: 'https://www.valleyofthecommons.com/' },
  { name: 'ShanHaiWoo', date: 'H2 2026', url: 'https://www.shanhaiwoo.com/' },
  { name: 'Invisible Garden', date: 'October', url: 'https://invisible.garden/' },
  { name: 'Edge City India', date: 'Q4', url: 'https://www.edgecity.live/' },
  { name: 'ZuGrama India', date: 'Feb –', url: 'https://yeshdoteth.substack.com/p/why-we-are-building-zugrama' },
]

function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s,)]+)/g
  const parts = text.split(urlRegex)
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#d97706', wordBreak: 'break-all' }}>
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function January2026Page() {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null)
  const router = useRouter()

  const handleCardClick = (card: Card) => {
    if (card.isCrossword) {
      router.push('/crossword')
    } else {
      setSelectedHub(hubs[card.hubId])
    }
  }

  const closeModal = () => {
    setSelectedHub(null)
  }

  return (
    <>
      <Nav />
      <div className="newsletter-fullpage">
        <div className="newsletter-grid">
          {cards.map((card) => {
            const hub = hubs[card.hubId]
            const title = card.title || hub.title
            const subtitle = card.subtitle || hub.date?.replace(/,?\s*\d{4}/g, '').toUpperCase()

            return (
              <div
                key={card.id}
                className={`card ${card.isIntro ? 'intro' : ''} ${card.isCrossword ? 'crossword' : ''} ${card.isCongrats ? 'congrats' : ''} ${card.image ? 'has-image' : ''} ${card.isFiller ? 'filler' : ''}`}
                onClick={() => !card.isFiller && handleCardClick(card)}
              >
                {card.image && (
                  <img className="card-image" src={card.image} alt={card.isFiller ? '' : title} />
                )}
                {!card.isFiller && (
                  <div className={`card-content ${card.image ? 'overlay' : ''}`}>
                    <h3 className="card-title">{title}</h3>
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                    {card.isCongrats && card.description && (
                      <p className="card-congrats-names">
                        {card.description.split('\n').map((line, i) => (
                          <span key={i}>{i > 0 && <br />}{line}</span>
                        ))}
                      </p>
                    )}
                    {card.isCrossword && (
                      <p className="card-link">Submit crossword Q&amp;A →</p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="popup-cities-bar">
          <h3 className="popup-cities-title">2026 Pop-up Cities</h3>
          <div className="popup-cities-list">
            {popupCities.map((city) => (
              <a key={city.name} href={city.url} target="_blank" rel="noopener noreferrer" className="popup-city">
                <strong>{city.name}</strong> {city.date}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedHub && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedHub.image && (
              <img src={selectedHub.image} alt={selectedHub.title} className="modal-image" />
            )}
            <h2 className="modal-title">{selectedHub.title}</h2>
            {selectedHub.date && <p className="modal-date">{selectedHub.date}</p>}
            <div className="modal-body">
              {selectedHub.fullContent.split('\n\n').map((para, i) => (
                <p key={i}>
                  {para.split('\n').map((line, j) => (
                    <span key={j}>
                      {j > 0 && <br />}
                      {linkifyText(line)}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            {(selectedHub.link || selectedHub.links) && (
              <div className="modal-links">
                {selectedHub.link && (
                  <a href={selectedHub.link.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                    {selectedHub.link.text}
                  </a>
                )}
                {selectedHub.links?.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                    {l.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .newsletter-fullpage {
          padding: 0;
          margin: 0;
          background: #fafaf9;
        }

        .newsletter-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          margin: 0;
          padding: 0;
        }

        .card {
          background: #fafaf9;
          padding: 1rem;
          cursor: pointer;
          transition: background 0.15s;
          display: flex;
          flex-direction: column;
          min-height: 140px;
          position: relative;
          overflow: hidden;
          margin: 0;
          border: none;
          box-sizing: border-box;
        }

        .card:hover {
          background: #f5f5f4;
        }

        .card.has-image {
          padding: 0;
          min-height: 160px;
        }

        .card.has-image:hover {
          background: transparent;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-content.overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%);
          padding: 1rem;
          justify-content: flex-end;
          height: 100%;
        }

        .card-content.overlay .card-title,
        .card-content.overlay .card-subtitle {
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .card-subtitle {
          font-size: 0.6875rem;
          color: #d97706;
          margin: 0 0 0.375rem 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .card-link {
          font-size: 0.8125rem;
          color: #d97706;
          font-weight: 600;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .card.intro {
          background: #1c1917;
        }

        .card.intro:hover {
          background: #292524;
        }

        .card.intro .card-title {
          color: white;
          font-size: 1.5rem;
          margin-bottom: 0.125rem;
        }

        .card.intro .card-subtitle {
          color: #fbbf24;
          font-size: 1rem;
          text-transform: none;
          font-weight: 400;
        }

        .card.congrats {
          background: #fef3c7;
          border-left: 3px solid #f59e0b;
        }

        .card.congrats:hover {
          background: #fde68a;
        }

        .card.congrats .card-title {
          color: #92400e;
        }

        .card-congrats-names {
          font-size: 0.75rem;
          color: #78350f;
          line-height: 1.6;
          margin: 0.25rem 0 0 0;
        }

        .card.filler {
          cursor: default;
        }

        .card.filler:hover {
          background: transparent;
        }

        .card.crossword {
          background: #fef3c7;
        }

        .card.crossword .card-image {
          opacity: 0.1;
        }

        .card.crossword .card-content.overlay {
          background: transparent;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .card.crossword .card-link {
          color: #d97706;
          font-size: 0.9375rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          perspective: 1000px;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes twistIn {
          0% {
            opacity: 0;
            transform: rotateY(-90deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: rotateY(10deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
          }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: twistIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.1);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: rgba(0,0,0,0.2);
        }

        .modal-image {
          width: 100%;
          max-height: 300px;
          object-fit: contain;
          border-radius: 12px 12px 0 0;
          background: #f5f5f4;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 1.5rem 1.5rem 0.5rem;
          color: #1c1917;
        }

        .modal-date {
          font-size: 0.875rem;
          color: #d97706;
          margin: 0 1.5rem 1rem;
          font-weight: 600;
        }

        .modal-body {
          padding: 0 1.5rem 1.5rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #44403c;
        }

        .modal-body p {
          margin: 0 0 1rem;
        }

        .modal-links {
          display: flex;
          gap: 0.75rem;
          padding: 0 1.5rem 1.5rem;
          flex-wrap: wrap;
        }

        .modal-link {
          display: inline-block;
          padding: 0.75rem 1.25rem;
          background: #d97706;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .modal-link:hover {
          background: #b45309;
        }

        .popup-cities-bar {
          background: #1c1917;
          padding: 1.5rem 2rem;
          margin: 0;
        }

        .popup-cities-title {
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }

        .popup-cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 2rem;
        }

        .popup-city {
          font-size: 0.8125rem;
          color: #a8a29e;
          text-decoration: none;
          transition: color 0.15s;
        }

        .popup-city:hover {
          color: #fbbf24;
        }

        .popup-city strong {
          color: white;
          font-weight: 600;
        }

        .popup-city:hover strong {
          color: #fbbf24;
        }

        @media (max-width: 1000px) {
          .newsletter-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .newsletter-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 500px) {
          .newsletter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}
