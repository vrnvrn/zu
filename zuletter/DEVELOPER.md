# Developer Guide — ZuZone Newsletter

Internal reference for building and editing newsletter editions.

---

## Newsletter Edition Structure

Each monthly edition lives in `app/<month>-<year>/` with:

- `page.tsx` — Page component with metadata (title, description, OpenGraph, Twitter card)
- `content.ts` — All content: hubs, cards, card positions, popup cities
- Optional background component (e.g., `SpringBackground.tsx`)

### Adding a New Edition

1. Create `app/<month>-<year>/` directory
2. Create `content.ts` exporting: `hubs`, `cards`, `cardPositions`, `popupCities`
3. Create `page.tsx` importing from `content.ts` and rendering `<NewsletterContent />`
4. Add article images to `public/articles/` or `public/images/`

---

## Content Types

### Hub

The full article content shown in the modal when a card is clicked.

```ts
interface Hub {
  id: string
  title: string
  date?: string
  fullContent: string               // Markdown-like content (see Markdown section)
  link?: { url: string; text: string }    // Single CTA button
  links?: { url: string; text: string }[] // Multiple CTA buttons
  image?: string                    // Profile/hero image
}
```

Both `link` and `links` can be used together. They render as buttons at the bottom of the modal.

### Card

The visual card on the scrapbook grid. Each card references a hub by `hubId`.

```ts
interface Card {
  id: string
  hubId: string          // Links to a Hub for modal content
  title?: string
  subtitle?: string
  image?: string
  // Type flags (only set one):
  isIntro?: boolean      // Editor's Corner / intro card
  isCrossword?: boolean  // Links to /crossword page
  isDacc?: boolean       // Builder spotlight with profile image
  isFullImage?: boolean  // Full image display (map, etc.)
  isFadedImage?: boolean // Zoomable image with overlay
  isBgImage?: boolean    // Image as card background
  isCenterText?: boolean // Centered text card
  isPoll?: boolean       // Interactive poll
  isComingSoon?: boolean // Non-clickable placeholder
  isExternalLink?: boolean // Links to externalUrl
  isFiller?: boolean     // Decorative, no click
  isPlaceholder?: boolean // Empty slot
}
```

### CardPosition

Absolute positioning for the scrapbook grid. One per card, in the same order.

```ts
interface CardPosition {
  top: string       // e.g. '2%'
  left: string      // e.g. '32%'
  rotate: number    // degrees, e.g. -2
  width: string     // e.g. '28%'
  height?: string   // e.g. '28%' — omit to let content/aspect-ratio decide
  zIndex: number
}
```

Standard layout is a 3x3 grid with 3 positions per row.

### PopupCity

Entries shown in the bottom popup cities bar.

```ts
interface PopupCity {
  name: string
  date: string
  url: string
}
```

---

## Markdown Renderer

The `renderMarkdown()` function in `NewsletterContent.tsx` processes `fullContent` strings.
It splits on double newlines (`\n\n`) to identify blocks.

### Supported Syntax

| Syntax | Renders As | Notes |
|--------|-----------|-------|
| `> text` | Blockquote | Teal left border, italic. **Must have a blank line before it** |
| `**text**` | Bold heading | Only when standalone on a line, under 120 chars |
| `- item` | Unordered list | All lines in the block must start with `- ` |
| `---` or `***` | Horizontal rule | |
| `:::personal ... :::` | Personal message banner | Green gradient box with optional signoff |
| `*text*` | Italic (inline) | |
| `**text**` | Bold (inline) | |
| `https://...` | Auto-linked URL | Opens in new tab |

### Important: Blockquote Gotcha

The renderer splits on `\n\n`. A blockquote must start its own block:

```
Wrong (renders as plain text — no blank line before >):
Some text before the quote.
> This will NOT render as a blockquote.

Correct (blank line separates the blocks):
Some text before the quote.

> This WILL render as a blockquote.
```

---

## Password Gate

Reusable component at `components/PasswordGate.tsx` for hiding unpublished editions.

### Usage

```tsx
import PasswordGate from '@/components/PasswordGate'

export default function April2026Page() {
  return (
    <PasswordGate password="yourpassword" title="April 2026">
      {/* page content */}
    </PasswordGate>
  )
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `password` | string | Yes | The password to unlock the page |
| `title` | string | No | Heading shown on the gate screen (defaults to "Preview") |
| `children` | ReactNode | Yes | The page content to show after unlock |

Client-side only. Remove the wrapper when the edition goes live.

---

## Card Type Quick Reference

| Card Type | Flag | Click Behavior |
|-----------|------|---------------|
| Article | (none or `isCenterText`) | Opens hub modal |
| Editor's Corner | `isIntro` | Opens hub modal |
| Builder Spotlight | `isDacc` | Opens hub modal, shows profile image |
| Map / Full Image | `isFullImage` | Opens image zoom modal |
| Crossword | `isCrossword` | Navigates to `/crossword` |
| Poll | `isPoll` | Opens poll modal, fetches from API |
| External Link | `isExternalLink` | Opens `externalUrl` in new tab |
| Faded Image | `isFadedImage` | Opens image zoom modal |
| Coming Soon | `isComingSoon` | Not clickable |
| Filler | `isFiller` | Not clickable |

---

## Image Handling

- **Article images**: `public/articles/<topic>/`
- **Newsletter images**: `public/images/`
- **Full images** (`isFullImage`): Use `object-fit: contain` to avoid cropping. Adjust card position height to match image aspect ratio.
- **DACC profile images**: Rendered as 64x64 circular avatars.

### Map Card Sizing

The map SVG is 3600x2050 (~1.76:1). The card position height should be large enough to prevent text cutoff. Current March 2026 values:

```ts
{ top: '28%', left: '30%', rotate: -1, width: '38%', height: '34%', zIndex: 13 }
```

---

## Adding an Article to an Edition

1. **Add the hub** in `content.ts`:
   ```ts
   myarticle: {
     id: 'myarticle',
     title: 'Article Title',
     fullContent: `Your article content here with **markdown** support.`,
     links: [
       { url: 'https://example.com', text: 'Call to action' },
     ],
   },
   ```

2. **Add the card** in the `cards` array:
   ```ts
   { id: 'myarticle', hubId: 'myarticle', title: 'Card Title', subtitle: 'by Author', isCenterText: true },
   ```

3. **Add the position** in `cardPositions` (must match card index).

4. **Optional**: Save the source markdown in `public/articles/editors corner/` or similar.

---

## Brand Colors

```
Teal primary:    #2d6b5d
Teal dark:       #1a4a40
Yellow accent:   #E8D556
Mint:            #c8f4e7
Text primary:    #1a3d35
Text secondary:  #3d5c54
```

---

## Deployment

```bash
npm run dev     # Local development
vercel          # Deploy to Vercel
```

The site uses Next.js with ISR. Newsletter pages are static with client-side modals.

---

## Twitter Thread Protocol

Each newsletter edition gets a pre-written tweet thread at `/admin/twitter` (password-gated).

### Thread Writing Rules

1. **No em dashes.** Use commas, periods, or line breaks instead.
2. **Tone:** Excited, community-welcoming, engaging. Write like you're sharing good news with friends.
3. **Thread structure:**
   - Tweet 1: Edition announcement + theme/hook
   - Middle tweets: One highlight per tweet (article, builder, feature)
   - Final tweet: CTA with link to the full newsletter
4. **Character limit:** Each tweet must be under 280 characters. The page shows a counter.
5. **Quotes:** Pull one strong quote from the edition as its own tweet.
6. **Tag people:** Use @ handles where available (authors, builders, hubs).
7. **No hashtags** unless they're community-specific (avoid generic ones like #web3).

### Adding a Thread for a New Edition

1. Open `app/admin/twitter/page.tsx`
2. Add a new entry to the `threads` array with `month`, `url`, and `tweets`
3. Each tweet is `{ text: '...' }`
4. Verify character counts on the page (red = over 280)
5. Use "Copy Entire Thread" to paste into Twitter/X

### Access

- URL: `/admin/twitter`
- Password: same as the newsletter preview password
- The page uses `components/PasswordGate.tsx`
