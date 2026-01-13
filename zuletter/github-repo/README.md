# Community Newsletter

A transparent, GitHub-native newsletter system where all submissions, decisions, and publications are tracked and verifiable on GitHub.

## How It Works

1. **Submit**: Community members submit items via GitHub Issues
2. **Curate**: Editors review and make decisions using labels and structured comments
3. **Publish**: Newsletters are published as Markdown files with GitHub Releases
4. **Verify**: Everything is publicly accessible and auditable on GitHub

## For Contributors

### Submitting an Item

1. Go to [Issues](https://github.com/YOUR-ORG/community-newsletter/issues)
2. Click "New Issue"
3. Select "Submit Newsletter Item" template
4. Fill out the form and submit

Or use the web UI at [your-vercel-app.vercel.app/submit](https://your-vercel-app.vercel.app/submit)

### Decision Process

Editors use labels to track items:
- `state:submitted` - Initial state
- `state:shortlisted` - Under consideration
- `state:accepted` - Will be included
- `state:rejected` - Will not be included
- `state:deferred` - Postponed to future cycle

When making a decision, editors add a structured comment:
```
Decision: accepted
Reason: high relevance + actionable
Editor: @handle
Section: Events
```

## For Editors

### Publishing a Newsletter

1. Review all items with `state:accepted` for the current cycle
2. Create a new Markdown file in `/newsletters/` following the template
3. Create a Pull Request
4. After merge, create a GitHub Release tag: `newsletter-YYYY-MM-DD`

### Newsletter Format

Newsletters use Markdown with frontmatter:

```yaml
---
title: "Community Newsletter — 2025-12-18"
cycle: "2025-12-18"
editors: ["@alice", "@bob"]
source_repo: "org/community-newsletter"
---
```

## Structure

```
/newsletters/          # Published newsletters
/decision-logs/        # Optional decision logs (JSON)
/templates/            # Newsletter templates
/.github/
  ISSUE_TEMPLATE/      # Issue form templates
```

## License

[Your License]

