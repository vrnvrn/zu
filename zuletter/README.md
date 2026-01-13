# ZuLetter 💚 POC

A GitHub-native, fully auditable newsletter system with no servers/databases beyond GitHub + Vercel.

## Architecture

- **Data**: Lives in GitHub (Issues, Markdown files, Labels)
- **UI**: Next.js app on Vercel (static/ISR)
- **Writes**: Redirects to GitHub's native flows (no auth needed)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_GITHUB_OWNER=your-org
NEXT_PUBLIC_GITHUB_REPO=community-newsletter
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

The app uses ISR (Incremental Static Regeneration) to cache GitHub API responses.

