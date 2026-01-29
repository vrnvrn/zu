# Adding Historical Newsletters

This guide explains how to add past ZuLetter editions so they appear in the Archive and are **verifiable on GitHub**.

## Why GitHub?

- Every edition in the Archive links to its source file in the repo.
- When the app loads newsletters from the repo, it shows the **commit SHA** for that file.
- Anyone can open the link and confirm the content matches the repo.

## Steps to Add Past Editions

### 1. Put files in the repo’s `newsletters/` folder

In your GitHub repo (the one set in `NEXT_PUBLIC_GITHUB_OWNER` and `NEXT_PUBLIC_GITHUB_REPO`), ensure you have a **`newsletters/`** directory. Add one file per edition, named by date:

- `newsletters/2024-12-18.md`
- `newsletters/2024-06-01.md`
- `newsletters/2023-11-15.md`
- …

Use `YYYY-MM-DD.md` so the Archive sorts correctly (newest first).

### 2. Frontmatter format

At the **top** of each file, add YAML frontmatter between `---` lines:

```yaml
---
title: "ZuLetter — December 18, 2024"
cycle: "2024-12-18"
editors: ["@yourhandle", "@other"]
source_repo: "your-org/your-repo"
---
```

| Field        | Description |
|-------------|-------------|
| `title`     | Display title in the Archive. |
| `cycle`     | Same as the date in the filename (e.g. `2024-12-18`). |
| `editors`   | List of editor handles (with or without `@`). |
| `source_repo`| GitHub `owner/repo` where this file lives. Used for “View on GitHub” links. |

### 3. Body

Below the closing `---`, add the newsletter content in Markdown (headings, links, lists, etc.).

### 4. Commit and push

Commit the new or updated files and push to the default branch (e.g. `main`). The app lists newsletters from the GitHub API; new files show up in the Archive after the cache refreshes (about 5 minutes).

## Example: minimal historical file

**File:** `newsletters/2023-06-15.md`

```markdown
---
title: "ZuLetter — June 15, 2023"
cycle: "2023-06-15"
editors: ["@alice"]
source_repo: "vrnvrn/zu"
---

# ZuLetter — June 15, 2023

Welcome to this edition!

## Events

- **Community meetup** – June 20 at 3pm

## Wins

- Shipped the new docs site.

---

*This edition is verifiable on GitHub. [View source](https://github.com/vrnvrn/zu/blob/main/newsletters/2023-06-15.md)*
```

## Verification in the UI

- **Verify on GitHub** – Opens the file in the repo (e.g. `github.com/owner/repo/blob/main/newsletters/YYYY-MM-DD.md`).
- **View source in repo** – Same link, text style.
- **SHA** – Shown when the newsletter is loaded from the repo; identifies the commit that last changed that file.

## Adding many years at once

1. List the dates you want (e.g. one per month or per edition).
2. For each date, create `newsletters/YYYY-MM-DD.md` with the frontmatter and body (paste from old emails/docs if you have them).
3. Commit all files in one or more commits and push.
4. Wait for cache refresh; all editions will appear in the Archive with working verification links.

If your repo is `vrnvrn/zu`, set `source_repo: "vrnvrn/zu"` so “View on GitHub” points to the right place.
