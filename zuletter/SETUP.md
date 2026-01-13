# Setup Guide

## Prerequisites

- Node.js 18+ and npm
- A GitHub account
- A Vercel account (for deployment)

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file:
   ```
   NEXT_PUBLIC_GITHUB_OWNER=your-org
   NEXT_PUBLIC_GITHUB_REPO=community-newsletter
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## GitHub Repository Setup

1. **Create a new GitHub repository** named `community-newsletter`

2. **Copy the GitHub repo structure:**
   - Copy files from `github-repo/` to your new repository
   - This includes:
     - `.github/ISSUE_TEMPLATE/submit-item.yml` - Issue form template
     - `.github/pull_request_template.md` - PR template
     - `README.md` - Repository README
     - `CONTRIBUTING.md` - Contributing guidelines
     - `templates/newsletter.md` - Newsletter template

3. **Create the folder structure:**
   ```
   /newsletters/
   /decision-logs/
   /templates/
   ```

4. **Set up labels:**
   Create the following labels in your GitHub repository:
   
   **State labels:**
   - `state:submitted` (gray)
   - `state:shortlisted` (yellow)
   - `state:accepted` (green)
   - `state:rejected` (red)
   - `state:deferred` (gray)
   
   **Category labels:**
   - `category:events` (blue)
   - `category:wins` (green)
   - `category:updates` (purple)
   - `category:requests` (orange)
   - `category:jobs` (yellow)
   - `category:research` (pink)
   - `category:media` (cyan)
   
   **Cycle labels:**
   - Create as needed: `cycle:YYYY-MM-DD` (any color)

## Vercel Deployment

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Add environment variables in Vercel:**
   - `NEXT_PUBLIC_GITHUB_OWNER` - Your GitHub org/username
   - `NEXT_PUBLIC_GITHUB_REPO` - Repository name (usually `community-newsletter`)

3. **Deploy:**
   - Vercel will automatically deploy on push to main
   - Or trigger a manual deployment

## Testing the POC

### Test Submission Flow

1. Go to `/submit` page
2. Fill out the form
3. Click "Submit via GitHub"
4. Complete the GitHub issue form
5. Verify the issue appears in the UI within 60 seconds

### Test Decision Flow

1. As an editor, label an issue `state:shortlisted`
2. Add a decision comment:
   ```
   Decision: accepted
   Reason: high relevance + actionable
   Editor: @yourhandle
   Section: Events
   ```
3. Label the issue `state:accepted`
4. Verify the decision appears in the UI

### Test Publishing

1. Create a newsletter markdown file in `/newsletters/YYYY-MM-DD.md`
2. Include frontmatter:
   ```yaml
   ---
   title: "Community Newsletter — 2025-12-18"
   cycle: "2025-12-18"
   editors: ["@editor1"]
   source_repo: "org/community-newsletter"
   ---
   ```
3. Commit and push to main
4. Verify it appears in `/archive`

## Troubleshooting

### GitHub API Rate Limits

- The app uses public GitHub API (no auth required)
- Rate limit: 60 requests/hour per IP
- If you hit limits, increase cache times in `lib/github.ts` (`revalidate` values)

### Issues Not Appearing

- Check that issues have the correct cycle label: `cycle:YYYY-MM-DD`
- Verify the cycle matches the current cycle format
- Check browser console for API errors

### Styling Issues

- Clear browser cache
- Check that `globals.css` is imported in `layout.tsx`

## Next Steps After POC

Once the POC is validated, consider:

1. **GitHub App Integration** - For authenticated API access (higher rate limits)
2. **Automated Decision Logs** - GitHub Action to generate JSON logs
3. **Newsletter Generation** - Automated markdown generation from accepted items
4. **Cycle Management** - UI for creating/managing cycles
5. **Editor Dashboard** - Streamlined interface for editors

