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
}

interface Card const hubs: Record<string, Hub> = {
  intro: {
    id: 'intro',
    title: 'Zuzalu Newsletter — January 2026',
    fullContent: 'Welcome to the January 2026 edition of the Zuzalu community newsletter! This month brings exciting updates from across our global network of pop-up cities, hubs, and communities.\n\nNew: We\'re starting a monthly crossword next month! Submit your Q&A at zuletter.vercel.app/crossword to help build the first puzzle.',
  },
  arc: {
    id: 'arc',
    title: 'Ârc: Montenegro',
    date: 'April 3 – May 29, 2026',
    fullContent: 'Ârc is building a Charter City. We are hosting a pop-up city at Lustica Bay, Montenegro as part of our continued journey to this goal.\n\nMontenegro will have a fully immersive live/work experience for founders, builders, researchers, investors & more. There will be three festivals, daily community programming, co-working spaces and three communal meals a day.\n\nMeanwhile, you can join us at our permanent hub at Network School, where we\'ve now run over 200 events and helped transform a ghost city to a thriving city.\n\nÂrc aims to show that with new approaches to governance we can flourish on every axis simultaneously. Let\'s have our cake and eat it.',
  },
  edgecity: {
    id: 'edgecity',
    title: 'Edge City',
    date: 'May 30 – June 27 (CA) · Q4 (India)',
    fullContent: 'In 2026, Edge City is shifting from being a "container" for serendipity to a "catalyst" for startups, research, and new movements.\n\nWe\'re tracking 182+ projects that have emerged from our villages, from neurotech startup Constellation to the d/acc Residency we ran in Patagonia with Vitalik and Protocol Labs.\n\nWe recently hired Katherine Jones, who helped launch Merge Labs, to lead ecosystem building and better support what emerges.\n\nUpcoming:\n• Edge Esmeralda 2026 — May 30 – June 27, Healdsburg, CA\n• Edge City India — Q4 2026',
  },
  invisiblegarden: {
    id: 'invisiblegarden',
    title: 'Invisible Garden',
    date: 'October 2026 · India',
    fullContent: 'Buenos Aires was a moment of refinement for Invisible Garden at the dawn of the AI age: a tight, high-intensity builder residency for deep learning, mentorship, and shipping reusable work.\n\nFrom 1,038 applications, we brought 45 builders on-site in Buenos Aires 🇦🇷, ran 69 workshops, and shipped 27 high-quality open-source projects and research outputs. Our latest recap shares our field notes on what worked, what we\'d change, and why these spaces are becoming essential.\n\nNext, we\'re drafting a forward-looking chapter that formalizes our commitment to the future of technical education and high-intensity builder-focused spaces.',
    link: { url: 'https://x.com/invisiblgarden/status/2016377386301063673', text: 'Read the full recap →' },
  },
  mushanghai: {
    id: 'mushanghai',
    title: 'muShanghai',
    date: 'April 26 – May 23, 2026 · China',
    fullContent: 'Be a Chinese Builder for a month.\n\nThis May, we\'re bringing global builders to Shanghai to experience China\'s innovation landscape firsthand: dark factories, frontier AI, and founders shipping at China speed.\n\nChina dominates headlines, but most builders outside China still don\'t understand how it actually works on the ground. muShanghai changes that: live here, build here, and learn how to plug into China\'s ecosystem to level up your project.\n\nApplications are live. Partnerships are open.\n\nSee you in muShanghai.',
  },
  shanhaiwoo: {
    id: 'shanhaiwoo',
    title: 'ShanHaiWoo',
    date: 'H2 2026 · Early Planning',
    fullContent: '2026 is in early planning!\n\nThe next ShanHaiWoo is expected to take place in the second half of 2026, likely just before Devcon.\n\nThe residency will continue to focus on accelerating Ethereum-native applications and real-world use cases.\n\nLocations under consideration include Hong Kong and India (Mumbai or Bangalore), and the team would love to hear your thoughts and ideas as planning unfolds!',
    link: { url: 'https://www.shanhaiwoo.com/', text: 'Learn more →' },
  },
  valley: {
    id: 'valley',
    title: 'Valley of the Commons',
    date: 'August 24 – September 20, 2026 · Austria',
    fullContent: 'Valley of the Commons is a four-week pop-up village by a nascent network society envisioning life beyond extractive systems.\n\nRooted at The Commons Hub and held by the forests, mountains, and open skies of the Austrian Alps, this gathering is a living commons shared in work and study, in making and care, in governance and everyday life.\n\nProgram Highlights:\n• Week 1: Five-day course led by Michel Bauwens and Adam Arvidsson, two of the most insightful contemporary thinkers on the commons.\n• Week 2: Shift from macro-narratives to the mechanics of how a village economy could actually function.\n• Week 3: How we might actually live together — architecturally, legally, ecologically, and socially.\n• Week 4: Stewardship — how we organize, decide, invest, and protect what we build together.',
    link: { url: 'https://www.valleyofthecommons.com/', text: 'Apply now →' },
  },
  vivacity: {
    id: 'vivacity',
    title: 'Viva.city',
    fullContent: 'Building viva.city — a permanent city to accelerate innovation, starting with a focus on longevity biotech, AI & crypto.\n\nWe\'re looking for a new host country to establish a Special Economic Zone. Meanwhile, we\'re bringing people together IRL to self-govern and self-experiment, with a first hub in San Francisco, in a 16-floor vertical village: the Frontier Tower.',
    link: { url: 'http://frontiertower.io/', text: 'Frontier Tower →' },
  },
  zanzalu: {
    id: 'zanzalu',
    title: 'Zanzalu',
    date: 'July 25 – August 14, 2026 · Zanzibar',
    fullContent: 'Zanzalu 2026 is happening!\n\nHosted in Fumba Town, Zanzibar — a walkable waterfront community built around permaculture design principles.\n\nThemes centered on leapfrog tech, cities, and industry.\n\nNew residency tracks for builders and creatives.',
  },
  zuafrique: {
    id: 'zuafrique',
    title: 'ZuAfrique',
    date: 'April 12 – May 3, 2026 · Kenya',
    fullContent: 'Here are the highlights from the ZuAfrique ecosystem:\n\n• 3-day developer workshop using the Hub residence and event halls as the venue. A total of 25 builders were hosted at our Accra hub.\n• 3-day end-of-year Web3 experience hosted at the Kilifi Hub (December 11-13, 2025). The event brought together residents, local builders, founders, and university talent to learn, connect, and celebrate the close of the year.\n• We also hosted post-Devconnect batch at both Ghana and Kenya Hub.\n\nThank you, Vitalik and the entire Zuzalu community for keeping human hope alive.',
  },
  zuberlin: {
    id: 'zuberlin',
    title: 'ZuBerlin',
    fullContent: 'The ZuBerlin team is working on two permanent hubs in Berlin:\n\n• City Center Hub — In the middle of Kreuzberg, combines cozy co-working, a cafe and a health area including a sauna & gym. We are very actively working on this one and planning to open in March.\n• Large-Scale Co-Living Project — At the river in Berlin, will be initiated with a first residency in June, more details to be announced.\n\nWe are excited to soon go more public with our new, exciting projects.\n\nIf you are interested to contribute (and ideally located in Berlin), feel free to reach out to chris@ephema.io.',
    link: { url: 'mailto:chris@ephema.io', text: 'Get involved →' },
  },
  zuitzerland: {
    id: 'zuitzerland',
    title: 'Zuitzerland',
    fullContent: 'Our focus: d/accelerator — We\'re making progress on a fund-of-funds approach to channel capital into the best hub funds and community operators. We aim to host the first d/acc accelerator cohort in Switzerland later this year, piloting the hub/accelerator model.\n\nd/acc a day: get featured! We\'re looking for ambitious d/acc builders to feature in live interviews, showcasing your work to our community of builders and investors.\n\nJoin us at Ethereum Zuri April 10–12, with a hackathon co-hosted by the ETH Blockchain Club. Build, learn, and connect.',
  },
  zukas: {
    id: 'zukas',
    title: 'ZuKas',
    date: 'April 10 – May 10, 2026 · Turkey',
    fullContent: 'ZuGov development is almost complete, and we now support multiple option ranked voting.\n\nZukas2 residency April 10-May 10 2026 in Kas, Turkey. Confirmed speakers include E. Glen Weyl, Michel Bauwens (P2P Foundation), Vit Jedlicka (Liberland), Martinet Lee (Zircuit), Xiao Wu (EthRiyadh and Chainide), Isa Sertkaya (Tubitak), and Ramazan Agirtas (Nethermind).\n\nAdditionally, several Turkish foundations and government organizations have provided soft commitments. We are targeting 150+ residents for a meaningful alpha test, with a primary focus on privacy, governance, d/acc, and Phygital commons coordination.',
  },
  calendar: {
    id: 'calendar',
    title: '2026 Pop-up Cities Calendar',
    fullContent: '• ETH Chiang Mai, Thailand — Dec 8, 2025 – Feb 3\n• Infinita City, Próspera, Honduras — Feb 1 – Mar 31\n• ZuCity, Japan — Mar 1 – Mar 30\n• Ipê Village, Brazil — Apr 6 – May 1\n• MuShanghai, China — Apr 26 – May 23\n• Ârc, Montenegro — Apr 3 – May 29\n• ZuAfrique, Kenya — Apr 12 – May 3\n• Edge City, CA, USA — May 30 – Jun 27\n• Zanzalu, Zanzibar — Jul 25 – Aug 14\n• Valley of the Commons, Austria — Aug 24 – Sep 20\n• Invisible Garden, India — October\n• Edge City India — Q4\n• ZuGrama, India — Q4',
  },
}

const cards: Card[] = [
  // Row 1
  { id: 'intro', hubId: 'intro', title: 'Zuzalu Newsletter', subtitle: 'January 2026', isIntro: true },
  { id: 'arc1', hubId: 'arc', title: 'Ârc: Montenegro', subtitle: 'APR 3 – MAY 29', image: '/newsletters/images/2026-01/arc1.png' },
  { id: 'edge1', hubId: 'edgecity', title: 'Edge City', subtitle: '182+ projects tracked', image: '/newsletters/images/2026-01/edgecity.png' },
  { id: 'ig1', hubId: 'invisiblegarden', title: 'Invisible Garden', subtitle: '45 builders, 27 OSS projects', image: '/newsletters/images/2026-01/invisiblegarden1.jpeg' },
  
  // Row 2
  { id: 'mu1', hubId: 'mushanghai', title: 'muShanghai', subtitle: 'APR 26 – MAY 23', size: 'small' },
  { id: 'shw1', hubId: 'shanhaiwoo', title: 'ShanHaiWoo', subtitle: 'H2 2026' },
  { id: 'valley1', hubId: 'valley', title: 'Valley of the Commons', subtitle: 'AUSTRIA • AUG 24 – SEP 20', image: '/newsletters/images/2026-01/valley1.jpg' },
  { id: 'viva1', hubId: 'vivacity', title: 'Viva.city', subtitle: 'Permanent city for longevity biotech, AI & crypto.' },
  
  // Row 3
  { id: 'zanzalu1', hubId: 'zanzalu', title: 'Zanzalu', subtitle: 'ZANZIBAR • JUL 25 – AUG 14' },
  { id: 'zuafrique1', hubId: 'zuafrique', title: 'ZuAfrique', subtitle: 'KENYA • APR 12 – MAY 3', image: '/newsletters/images/2026-01/zuafrique1.jpg' },
  { id: 'crossword', hubId: 'intro', isCrossword: true, image: '/images/crossword-blank.svg' },
  { id: 'zuberlin1', hubId: 'zuberlin', title: 'ZuBerlin', subtitle: 'Two hubs: City Center (Kreuzberg, March) + Co-Living at river (June).' },
  { id: 'zuitzerland1', hubId: 'zuitzerland', title: 'Zuitzerland', subtitle: 'd/accelerator — Fund-of-funds for hub operators.' },
  
  // Row 4
  { id: 'zukas1', hubId: 'zukas', title: 'ZuKas', subtitle: 'TURKEY • APR 10 – MAY 10' },
  { id: 'arc2', hubId: 'arc', subtitle: 'Three festivals, daily programming, communal meals', image: '/newsletters/images/2026-01/arc2.JPG' },
  { id: 'edge2', hubId: 'edgecity', subtitle: 'Edge Esmeralda May 30 – Jun 27, India Q4', image: '/newsletters/images/2026-01/edgecity2.png' },
  { id: 'ig2', hubId: 'invisiblegarden', subtitle: '69 workshops in Buenos Aires', image: '/newsletters/images/2026-01/invisiblegarden2.jpeg' },
  // Row 5
  { id: 'valley2', hubId: 'valley', subtitle: 'Michel Bauwens & Adam Arvidsson on the commons', image: '/newsletters/images/2026-01/valley2.png' },
  { id: 'zuafrique2', hubId: 'zuafrique', subtitle: '25 builders at Accra hub', image: '/newsletters/images/2026-01/zuafrique2.jpg' },
  { id: 'calendar', hubId: 'calendar', title: '2026 Pop-ups', isCalendar: true },
]

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
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.isIntro ? 'intro' : ''} ${card.isCalendar ? 'calendar' : ''} ${card.isCrossword ? 'crossword' : ''} $${card.image ? 'has-image' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              {card.image && (
                <img className="card-image" src={card.image} alt={card.title || ''} />
              )}
              <div className={`card-content ${card.image ? 'overlay' : ''}`}>
                {card.title && <h3 className="card-title">{card.title}</h3>}
                {card.subtitle && <p className="card-subtitle">{card.subtitle}</p>}
                {card.isCalendar && (
                  <div className="cal-grid">
                    <div className="cal-item"><strong>Chiang Mai</strong><span>Dec–Feb</span></div>
                    <div className="cal-item"><strong>Infinita</strong><span>Feb–Mar</span></div>
                    <div className="cal-item"><strong>ZuCity JP</strong><span>Mar</span></div>
                    <div className="cal-item"><strong>Ipê Village</strong><span>Apr</span></div>
                    <div className="cal-item"><strong>Ârc</strong><span>Apr–May</span></div>
                    <div className="cal-item"><strong>muShanghai</strong><span>Apr–May</span></div>
                    <div className="cal-item"><strong>Edge</strong><span>May–Jun</span></div>
                    <div className="cal-item"><strong>Zanzalu</strong><span>Jul–Aug</span></div>
                    <div className="cal-item"><strong>Valley</strong><span>Aug–Sep</span></div>
                  </div>
                )}
                {card.isCrossword && (
                  <>
                    <p className="card-title">Submit crossword Q&amp;A →</p>
                    <a href="https://github.com/vrnvrn/zu" className="card-link">View on GitHub</a>
                  </>
                )}
                </div>
            </div>
          ))}
        </div>
        
        <div className="popup-cities-bar">
          <h3 className="popup-cities-title">2026 Pop-up Cities</h3>
          <div className="popup-cities-list">
            <span className="popup-city"><strong>ETH Chiang Mai</strong> Dec 8 – Feb 3</span>
            <span className="popup-city"><strong>Infinita City</strong> Feb 1 – Mar 31</span>
            <span className="popup-city"><strong>ZuCity Japan</strong> Mar 1 – 30</span>
            <span className="popup-city"><strong>Ipê Village</strong> Apr 6 – May 1</span>
            <span className="popup-city"><strong>Ârc Montenegro</strong> Apr 3 – May 29</span>
            <span className="popup-city"><strong>ZuAfrique</strong> Apr 12 – May 3</span>
            <span className="popup-city"><strong>muShanghai</strong> Apr 26 – May 23</span>
            <span className="popup-city"><strong>Edge Esmeralda</strong> May 30 – Jun 27</span>
            <span className="popup-city"><strong>Zanzalu</strong> Jul 25 – Aug 14</span>
            <span className="popup-city"><strong>Valley of the Commons</strong> Aug 24 – Sep 20</span>
            <span className="popup-city"><strong>Invisible Garden</strong> October</span>
            <span className="popup-city"><strong>Edge City India</strong> Q4</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedHub && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">{selectedHub.title}</h2>
            {selectedHub.date && <p className="modal-date">{selectedHub.date}</p>}
            <div className="modal-body">
              {selectedHub.fullContent.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {selectedHub.link && (
              <a href={selectedHub.link.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                {selectedHub.link.text}
              </a>
            )}
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .newsletter-fullpage {
          padding: 1rem;
        }
        
        .newsletter-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .card {
          background: white;
          padding: 1rem;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          display: flex;
          flex-direction: column;
          min-height: 140px;
          position: relative;
          overflow: hidden;
        }
        
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          z-index: 10;
        }
        
        .card.has-image {
          padding: 0;
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
          font-size: 0.875rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.25rem 0;
        }
        
        .card-subtitle {
          font-size: 0.6875rem;
          color: #78716c;
          margin: 0;
          line-height: 1.4;
        }
        
        .card.intro {
          background: #1c1917;
          grid-row: span 1;
        }
        
        .card.intro .card-title {
          color: white;
          font-size: 1.25rem;
        }
        
        .card.intro .card-subtitle {
          color: #fbbf24;
          font-size: 0.875rem;
        }
        
        .card.calendar {
          background: #fef3c7;
        }
        
        .card.crossword {
          background: #fafaf9;
        }
        
        .card.crossword .card-image {
          opacity: 0.15;
        }
        
        .card.crossword .card-content.overlay {
          background: transparent;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        
        .card.crossword .card-title {
          color: #1c1917;
          font-size: 0.8125rem;
        }
        
        .card.crossword .card-link {
          color: #78716c;
          font-size: 0.6875rem;
          margin-top: 0.5rem;
        }
        
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          margin-top: 0.5rem;
        }
        
        .cal-item {
          background: white;
          padding: 0.25rem 0.375rem;
          border-radius: 3px;
          font-size: 0.5rem;
        }
        
        .cal-item strong {
          display: block;
          color: #1c1917;
        }
        
        .cal-item span {
          color: #78716c;
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
          max-width: 560px;
          width: 100%;
          max-height: 80vh;
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
        
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 1.5rem 1.5rem 0.5rem;
          color: #1c1917;
        }
        
        .modal-date {
          font-size: 0.875rem;
          color: #78716c;
          margin: 0 1.5rem 1rem;
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
        
        .modal-link {
          display: inline-block;
          margin: 0 1.5rem 1.5rem;
          padding: 0.75rem 1.25rem;
          background: #2563eb;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .modal-link:hover {
          background: #1d4ed8;
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
        
        .popup-cities-bar {
          margin-top: 1rem;
          background: #1c1917;
          border-radius: 8px;
          padding: 1rem 1.5rem;
        }
        
        .popup-cities-title {
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 0.75rem 0;
        }
        
        .popup-cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
        }
        
        .popup-city {
          font-size: 0.75rem;
          color: #a8a29e;
        }
        
        .popup-city strong {
          color: white;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}
