# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Install & Run Locally
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your GitHub org/repo
npm run dev
```

### 2. Set Up GitHub Repo

1. Create repo: `community-newsletter`
2. Copy files from `github-repo/` folder
3. Create labels (see SETUP.md)
4. Create folders: `newsletters/`, `decision-logs/`, `templates/`

### 3. Deploy to Vercel

```bash
npm install -g vercel
vercel
# Add env vars: NEXT_PUBLIC_GITHUB_OWNER, NEXT_PUBLIC_GITHUB_REPO
```

## ✅ POC Acceptance Checklist

- [ ] New user can submit item via UI → GitHub issue
- [ ] Item appears in UI within 60 seconds
- [ ] Editor can label issue `accepted` with decision comment
- [ ] Decision reason shows in UI
- [ ] Newsletter markdown in `/newsletters/` shows in Archive
- [ ] "Verify on GitHub" links work
- [ ] All artifacts publicly accessible on GitHub

## 📁 Project Structure

```
/app/              # Next.js app router pages
/components/       # React components
/lib/             # GitHub API utilities & types
/github-repo/     # Files to copy to GitHub repo
```

## 🔗 Key URLs

- Home: `/` - Current cycle view
- Submit: `/submit` - Submit new item
- Archive: `/archive` - Past newsletters
- Item Detail: `/item/[number]` - Individual item view
- How It Works: `/how-decisions-work` - Process explanation

## 🎯 Core Features

✅ **No Auth Required** - Writes via GitHub redirects  
✅ **Fully Auditable** - Everything on GitHub  
✅ **Transparent Decisions** - Labels + structured comments  
✅ **Immutable History** - Git commits + releases  
✅ **Doc-like UI** - Notion-inspired design  

## 📝 Next Steps

See `SETUP.md` for detailed setup instructions and `README.md` for architecture overview.

