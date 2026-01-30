'use client'

import Nav from '@/components/Nav'
import { useState } from 'react'
import Image from 'next/image'

interface Update {
  id: string
  title: string
  date?: string
  summary: string
  fullContent: string
  image?: string
  image2?: string
  link?: { url: string; text: string }
  isIntro?: boolean
  isCalendar?: boolean
  isFooter?: boolean
}

const updates: Update[] = [
  {
    id: 'intro',
    title: 'Zuzalu Newsletter',
    summary: 'January 2026 — Updates from our global network of pop-up cities and communities.',
    fullContent: 'Welcome to the January 2026 edition of the Zuzalu community newsletter! This month brings exciting updates from across our global network of pop-up cities, hubs, and communities.\n\nNew: We\'re starting a monthly crossword next month! Submit your Q&A at zuletter.vercel.app/crossword to help build the first puzzle.',
    isIntro: true,
  },
  {
    id: 'arc',
    title: 'Ârc: Montenegro',
    date: 'April 3 – May 29, 2026',
    summary: 'Building a Charter City at Lustica Bay. Immersive live/work for founders, builders, researchers.',
    fullContent: 'Ârc is building a Charter City. We are hosting a pop-up city at Lustica Bay, Montenegro as part of our continued journey to this goal.\n\nMontenegro will have a fully immersive live/work experience for founders, builders, researchers, investors & more. There will be three festivals, daily community programming, co-working spaces and three communal meals a day.\n\nMeanwhile, you can join us at our permanent hub at Network School, where we\'ve now run over 200 events and helped transform a ghost city to a thriving city.\n\nÂrc aims to show that with new approaches to governance we can flourish on every axis simultaneously. Let\'s have our cake and eat it.',
    image: '/newsletters/images/2026-01/arc1.png',
  },
  {
    id: 'edgecity',
    title: 'Edge City',
    summary: '182+ projects tracked. From "container" to "catalyst."',
    fullContent: 'In 2026, Edge City is shifting from being a "container" for serendipity to a "catalyst" for startups, research, and new movements.\n\nWe\'re tracking 182+ projects that have emerged from our villages, from neurotech startup Constellation to the d/acc Residency we ran in Patagonia with Vitalik and Protocol Labs.\n\nWe recently hired Katherine Jones, who helped launch Merge Labs, to lead ecosystem building and better support what emerges.\n\nUpcoming:\n• Edge Esmeralda 2026 — May 30 – June 27, Healdsburg, CA\n• Edge City India — Q4 2026',
    image: '/newsletters/images/2026-01/edgecity.png',
  },
  {
    id: 'invisiblegarden',
    title: 'Invisible Garden',
    summary: '45 builders, 69 workshops, 27 OSS projects shipped.',
    fullContent: 'Buenos Aires was a moment of refinement for Invisible Garden at the dawn of the AI age: a tight, high-intensity builder residency for deep learning, mentorship, and shipping reusable work.\n\nFrom 1,038 applications, we brought 45 builders on-site in Buenos Aires 🇦🇷, ran 69 workshops, and shipped 27 high-quality open-source projects and research outputs. Our latest recap shares our field notes on what worked, what we\'d change, and why these spaces are becoming essential.\n\nNext, we\'re drafting a forward-looking chapter that formalizes our commitment to the future of technical education and high-intensity builder-focused spaces.',
    image: '/newsletters/images/2026-01/invisiblegarden1.jpeg',
    link: { url: 'https://x.com/invisiblgarden/status/2016377386301063673', text: 'Read the full recap →' },
  },
  {
    id: 'mushanghai',
    title: 'muShanghai',
    date: 'April 26 – May 23, 2026',
    summary: 'Be a Chinese Builder for a month. Dark factories, frontier AI, China speed.',
    fullContent: 'Be a Chinese Builder for a month.\n\nThis May, we\'re bringing global builders to Shanghai to experience China\'s innovation landscape firsthand: dark factories, frontier AI, and founders shipping at China speed.\n\nChina dominates headlines, but most builders outside China still don\'t understand how it actually works on the ground. muShanghai changes that: live here, build here, and learn how to plug into China\'s ecosystem to level up your project.\n\nApplications are live. Partnerships are open.\n\nSee you in muShanghai.',
  },
  {
    id: 'shanhaiwoo',
    title: 'ShanHaiWoo',
    date: 'H2 2026 — Early Planning',
    summary: 'Expected before Devcon. Focus: Ethereum-native apps.',
    fullContent: '2026 is in early planning!\n\nThe next ShanHaiWoo is expected to take place in the second half of 2026, likely just before Devcon.\n\nThe residency will continue to focus on accelerating Ethereum-native applications and real-world use cases.\n\nLocations under consideration include Hong Kong and India (Mumbai or Bangalore), and the team would love to hear your thoughts and ideas as planning unfolds!',
    link: { url: 'https://www.shanhaiwoo.com/', text: 'Learn more →' },
  },
  {
    id: 'valley',
    title: 'Valley of the Commons',
    date: 'Austria — August 24 – September 20, 2026',
    summary: 'Four-week pop-up village in the Austrian Alps.',
    fullContent: 'Valley of the Commons is a four-week pop-up village by a nascent network society envisioning life beyond extractive systems.\n\nRooted at The Commons Hub and held by the forests, mountains, and open skies of the Austrian Alps, this gathering is a living commons shared in work and study, in making and care, in governance and everyday life.\n\nProgram Highlights:\n• Week 1: Five-day course led by Michel Bauwens and Adam Arvidsson, two of the most insightful contemporary thinkers on the commons.\n• Week 2: Shift from macro-narratives to the mechanics of how a village economy could actually function.\n• Week 3: How we might actually live together — architecturally, legally, ecologically, and socially.\n• Week 4: Stewardship — how we organize, decide, invest, and protect what we build together.',
    image: '/newsletters/images/2026-01/valley1.jpg',
    link: { url: 'https://www.valleyofthecommons.com/', text: 'Apply now →' },
  },
  {
    id: 'vivacity',
    title: 'Viva.city & Frontier Tower',
    summary: 'Permanent city for longevity biotech, AI & crypto. Frontier Tower in SF.',
    fullContent: 'Building viva.city — a permanent city to accelerate innovation, starting with a focus on longevity biotech, AI & crypto.\n\nWe\'re looking for a new host country to establish a Special Economic Zone. Meanwhile, we\'re bringing people together IRL to self-govern and self-experiment, with a first hub in San Francisco, in a 16-floor vertical village: the Frontier Tower.',
    link: { url: 'http://frontiertower.io/', text: 'Frontier Tower →' },
  },
  {
    id: 'zanzalu',
    title: 'Zanzalu',
    date: 'Zanzibar — July 25 – August 14, 2026',
    summary: 'Fumba Town — walkable waterfront, permaculture. Leapfrog tech, cities, industry.',
    fullContent: 'Zanzalu 2026 is happening!\n\nHosted in Fumba Town, Zanzibar — a walkable waterfront community built around permaculture design principles.\n\nThemes centered on leapfrog tech, cities, and industry.\n\nNew residency tracks for builders and creatives.',
  },
  {
    id: 'zuafrique',
    title: 'ZuAfrique',
    date: 'Kenya — April 12 – May 3, 2026',
    summary: '25 builders at Accra hub, end-of-year Web3 at Kilifi.',
    fullContent: 'Here are the highlights from the ZuAfrique ecosystem:\n\n• 3-day developer workshop using the Hub residence and event halls as the venue. A total of 25 builders were hosted at our Accra hub.\n• 3-day end-of-year Web3 experience hosted at the Kilifi Hub (December 11-13, 2025). The event brought together residents, local builders, founders, and university talent to learn, connect, and celebrate the close of the year.\n• We also hosted post-Devconnect batch at both Ghana and Kenya Hub.\n\nThank you, Vitalik and the entire Zuzalu community for keeping human hope alive.',
    image: '/newsletters/images/2026-01/zuafrique1.jpg',
  },
  {
    id: 'zuberlin',
    title: 'ZuBerlin',
    summary: 'Two hubs: City Center (Kreuzberg, March) + Co-Living at river (June).',
    fullContent: 'The ZuBerlin team is working on two permanent hubs in Berlin:\n\n• City Center Hub — In the middle of Kreuzberg, combines cozy co-working, a cafe and a health area including a sauna & gym. We are very actively working on this one and planning to open in March.\n• Large-Scale Co-Living Project — At the river in Berlin, will be initiated with a first residency in June, more details to be announced.\n\nWe are excited to soon go more public with our new, exciting projects.\n\nIf you are interested to contribute (and ideally located in Berlin), feel free to reach out to chris@ephema.io.',
    link: { url: 'mailto:chris@ephema.io', text: 'Get involved →' },
  },
  {
    id: 'zuitzerland',
    title: 'Zuitzerland',
    summary: 'd/accelerator — Fund-of-funds for hub operators. ETH Zuri Apr 10–12.',
    fullContent: 'Our focus: d/accelerator — We\'re making progress on a fund-of-funds approach to channel capital into the best hub funds and community operators. We aim to host the first d/acc accelerator cohort in Switzerland later this year, piloting the hub/accelerator model.\n\nd/acc a day: get featured! We\'re looking for ambitious d/acc builders to feature in live interviews, showcasing your work to our community of builders and investors.\n\nJoin us at Ethereum Zuri April 10–12, with a hackathon co-hosted by the ETH Blockchain Club. Build, learn, and connect.',
  },
  {
    id: 'zukas',
    title: 'ZuKas',
    date: 'Kas, Turkey — April 10 – May 10, 2026',
    summary: 'ZuGov with ranked voting. Glen Weyl, Michel Bauwens. 150+ residents.',
    fullContent: 'ZuGov development is almost complete, and we now support multiple option ranked voting.\n\nZukas2 residency April 10-May 10 2026 in Kas, Turkey. Confirmed speakers include E. Glen Weyl, Michel Bauwens (P2P Foundation), Vit Jedlicka (Liberland), Martinet Lee (Zircuit), Xiao Wu (EthRiyadh and Chainide), Isa Sertkaya (Tubitak), and Ramazan Agirtas (Nethermind).\n\nAdditionally, several Turkish foundations and government organizations have provided soft commitments. We are targeting 150+ residents for a meaningful alpha test, with a primary focus on privacy, governance, d/acc, and Phygital commons coordination.',
  },
  {
    id: 'arc2',
    title: 'Ârc: Community',
    summary: 'Three festivals, daily programming, communal meals.',
    fullContent: 'Ârc Montenegro will feature:\n\n• Three festivals throughout the residency\n• Daily community programming\n• Co-working spaces\n• Three communal meals a day\n\nJoin our permanent hub at Network School where we\'ve run 200+ events.',
    image: '/newsletters/images/2026-01/arc2.JPG',
  },
  {
    id: 'edgecity2',
    title: 'Edge City: Upcoming',
    summary: 'Edge Esmeralda May 30 – Jun 27, India Q4.',
    fullContent: 'Upcoming Edge City events:\n\n• Edge Esmeralda 2026 — May 30 – June 27, Healdsburg, CA\n• Edge City India — Q4 2026\n\nWe\'re tracking 182+ projects that have emerged from our villages.',
    image: '/newsletters/images/2026-01/edgecity2.png',
  },
  {
    id: 'invisiblegarden2',
    title: 'Invisible Garden: Buenos Aires',
    summary: '69 workshops in Buenos Aires.',
    fullContent: 'From Buenos Aires:\n\n• 1,038 applications received\n• 45 builders on-site\n• 69 workshops conducted\n• 27 high-quality open-source projects shipped\n\nA tight, high-intensity builder residency for deep learning, mentorship, and shipping reusable work.',
    image: '/newsletters/images/2026-01/invisiblegarden2.jpeg',
  },
  {
    id: 'valley2',
    title: 'Valley: Program',
    summary: 'Michel Bauwens & Adam Arvidsson on the commons.',
    fullContent: 'Valley of the Commons Program:\n\n• Week 1: Five-day course led by Michel Bauwens and Adam Arvidsson on the commons\n• Week 2: Village economics\n• Week 3: Co-living — architecturally, legally, ecologically, and socially\n• Week 4: Stewardship and governance',
    image: '/newsletters/images/2026-01/valley2.png',
  },
  {
    id: 'zuafrique2',
    title: 'ZuAfrique: Builders',
    summary: '25 builders at Accra hub.',
    fullContent: 'ZuAfrique highlights:\n\n• 25 builders hosted at Accra hub\n• 3-day developer workshop\n• End-of-year Web3 experience at Kilifi Hub\n• Post-Devconnect batches at Ghana and Kenya hubs',
    image: '/newsletters/images/2026-01/zuafrique2.jpg',
  },
  {
    id: 'calendar',
    title: '2026 Pop-ups',
    summary: '',
    fullContent: '2026 Pop-up Cities Calendar:\n\n• ETH Chiang Mai, Thailand — Dec 8, 2025 – Feb 3\n• Infinita City, Próspera, Honduras — Feb 1 – Mar 31\n• ZuCity, Japan — Mar 1 – Mar 30\n• Ipê Village, Brazil — Apr 6 – May 1\n• MuShanghai, China — Apr 26 – May 23\n• Ârc, Montenegro — Apr 3 – May 29\n• ZuAfrique, Kenya — Apr 12 – May 3\n• Edge City, CA, USA — May 30 – Jun 27\n• Zanzalu, Zanzibar — Jul 25 – Aug 14\n• Valley of the Commons, Austria — Aug 24 – Sep 20\n• Invisible Garden, India — October\n• Edge City India — Q4\n• ZuGrama, India — Q4',
    isCalendar: true,
  },
  {
    id: 'footer',
    title: '',
    summary: '',
    fullContent: 'Submit your Q&A for the monthly crossword at zuletter.vercel.app/crossword\n\nView the newsletter source on GitHub.',
    isFooter: true,
  },
]

export default function January2026Page() {
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null)

  const handleCardClick = (update: Update) => {
    if (!update.isFooter) {
      setSelectedUpdate(update)
    }
  }

  const closeModal = () => {
    setSelectedUpdate(null)
  }

  return (
    <>
      <Nav />
      <div className="newsletter-fullpage">
        <div className="newsletter-grid-container">
          {updates.map((update) => (
            <div
              key={update.id}
              className={`cell ${update.isIntro ? 'dark' : ''} ${update.isCalendar ? 'accent' : ''} ${update.isFooter ? 'dark' : ''} ${update.image ? 'has-img' : ''} ${!update.isFooter && !update.isCalendar ? 'clickable' : ''}`}
              onClick={() => handleCardClick(update)}
            >
              {update.image && (
                <img className="cell-img" src={update.image} alt={update.title} />
              )}
              <div className={update.image ? 'content' : ''}>
                {update.title && <h2 className="cell-title">{update.title}</h2>}
                {update.date && <p className="cell-date">{update.date}</p>}
                {update.summary && <p className="cell-text">{update.summary}</p>}
                {update.isCalendar && (
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
                {update.isFooter && (
                  <>
                    <a href="https://zuletter.vercel.app/crossword" className="cell-cta">Submit crossword Q&A →</a>
                    <a href="https://github.com/vrnvrn/zu" className="cell-cta" style={{ marginTop: '0.5rem' }}>View on GitHub</a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedUpdate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedUpdate.image && (
              <img className="modal-image" src={selectedUpdate.image} alt={selectedUpdate.title} />
            )}
            <h2 className="modal-title">{selectedUpdate.title}</h2>
            {selectedUpdate.date && <p className="modal-date">{selectedUpdate.date}</p>}
            <div className="modal-body">
              {selectedUpdate.fullContent.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {selectedUpdate.link && (
              <a href={selectedUpdate.link.url} target="_blank" rel="noopener noreferrer" className="modal-link">
                {selectedUpdate.link.text}
              </a>
            )}
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .newsletter-fullpage {
          width: 100%;
          padding: 1rem;
          box-sizing: border-box;
        }
        
        .newsletter-grid-container {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(4, 1fr);
          height: calc(100vh - 130px);
          width: 100%;
          gap: 1px;
          background: #d4d4d4;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .cell {
          background: white;
          padding: 0.75rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        
        .cell.clickable {
          cursor: pointer;
        }
        
        .cell.clickable:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          z-index: 10;
        }
        
        .cell.dark {
          background: #1c1917;
          color: white;
        }
        
        .cell.accent {
          background: #fef3c7;
        }
        
        .cell.has-img {
          padding: 0;
        }
        
        .cell.has-img .content {
          padding: 0.5rem 0.75rem;
          background: white;
        }
        
        .cell-img {
          width: 100%;
          flex: 1;
          min-height: 0;
          object-fit: cover;
        }
        
        .cell-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #1c1917;
          margin: 0 0 0.125rem 0;
          line-height: 1.2;
        }
        
        .cell.dark .cell-title {
          color: white;
          font-size: 1.5rem;
        }
        
        .cell-date {
          font-size: 0.5625rem;
          color: #a8a29e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        
        .cell-text {
          font-size: 0.6875rem;
          line-height: 1.4;
          color: #57534e;
          flex: 1;
          overflow: hidden;
          margin: 0;
        }
        
        .cell.dark .cell-text {
          color: #a8a29e;
        }
        
        .cell-text strong {
          color: #1c1917;
        }
        
        .cell.dark .cell-text strong {
          color: #fbbf24;
        }
        
        .cell-cta {
          font-size: 0.5625rem;
          font-weight: 600;
          color: #fbbf24;
          text-decoration: none;
          display: block;
        }
        
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          flex: 1;
          min-height: 0;
          margin-top: 0.25rem;
        }
        
        .cal-item {
          background: white;
          padding: 0.25rem;
          font-size: 0.5rem;
          overflow: hidden;
        }
        
        .cal-item strong {
          display: block;
          font-size: 0.5rem;
          color: #1c1917;
        }
        
        .cal-item span {
          color: #78716c;
          font-size: 0.4375rem;
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
          z-index: 10;
        }
        
        .modal-close:hover {
          background: rgba(0,0,0,0.2);
        }
        
        .modal-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
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
          text-transform: uppercase;
          letter-spacing: 0.05em;
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
        
        @media (max-width: 1200px) {
          .newsletter-grid-container {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(5, 1fr);
          }
        }
        
        @media (max-width: 900px) {
          .newsletter-grid-container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            height: auto;
          }
          .cell {
            min-height: 140px;
          }
        }
        
        @media (max-width: 600px) {
          .newsletter-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .modal-content {
            margin: 1rem;
          }
        }
      `}</style>
    </>
  )
}
