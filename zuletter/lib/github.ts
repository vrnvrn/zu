import { GitHubIssue, GitHubComment, Newsletter, NewsletterItem, IssueState, Category } from './types'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com'

export function getGitHubOwner(): string {
  return process.env.NEXT_PUBLIC_GITHUB_OWNER || 'your-org'
}

export function getGitHubRepo(): string {
  return process.env.NEXT_PUBLIC_GITHUB_REPO || 'community-newsletter'
}

export function getRepoPath(): string {
  return `${getGitHubOwner()}/${getGitHubRepo()}`
}

export function getIssueUrl(issueNumber: number): string {
  return `https://github.com/${getRepoPath()}/issues/${issueNumber}`
}

export function getNewIssueUrl(): string {
  return `https://github.com/${getRepoPath()}/issues/new`
}

export function getNewIssueWithTemplateUrl(template: string): string {
  return `https://github.com/${getRepoPath()}/issues/new?template=${template}`
}

// Extract state from labels
export function extractStateFromLabels(labels: { name: string }[]): IssueState {
  const stateLabels = labels
    .map(l => l.name)
    .filter(name => name.startsWith('state:'))
    .map(name => name.replace('state:', '') as IssueState)
  
  if (stateLabels.length > 0) {
    return stateLabels[0] as IssueState
  }
  return 'submitted' // default
}

// Extract category from labels
export function extractCategoryFromLabels(labels: { name: string }[]): Category | null {
  const categoryLabels = labels
    .map(l => l.name)
    .filter(name => name.startsWith('category:'))
    .map(name => name.replace('category:', '') as Category)
  
  if (categoryLabels.length > 0) {
    return categoryLabels[0]
  }
  return null
}

// Extract cycle from labels
export function extractCycleFromLabels(labels: { name: string }[]): string | null {
  const cycleLabels = labels
    .map(l => l.name)
    .filter(name => name.startsWith('cycle:'))
    .map(name => name.replace('cycle:', ''))
  
  if (cycleLabels.length > 0) {
    return cycleLabels[0]
  }
  return null
}

// Parse decision comment
export function parseDecisionComment(comment: GitHubComment): {
  state?: IssueState
  reason?: string
  editor?: string
  section?: string
} {
  const body = comment.body
  const result: {
    state?: IssueState
    reason?: string
    editor?: string
    section?: string
  } = {}

  // Look for "Decision: accepted" pattern
  const decisionMatch = body.match(/Decision:\s*(\w+)/i)
  if (decisionMatch) {
    result.state = decisionMatch[1].toLowerCase() as IssueState
  }

  // Look for "Reason: ..." pattern
  const reasonMatch = body.match(/Reason:\s*(.+?)(?:\n|$)/i)
  if (reasonMatch) {
    result.reason = reasonMatch[1].trim()
  }

  // Look for "Editor: @handle" pattern
  const editorMatch = body.match(/Editor:\s*@?(\w+)/i)
  if (editorMatch) {
    result.editor = editorMatch[1]
  }

  // Look for "Section: ..." pattern
  const sectionMatch = body.match(/Section:\s*(.+?)(?:\n|$)/i)
  if (sectionMatch) {
    result.section = sectionMatch[1].trim()
  }

  return result
}

// Fetch issues for a cycle
export async function fetchIssuesForCycle(cycle: string): Promise<GitHubIssue[]> {
  const owner = getGitHubOwner()
  const repo = getGitHubRepo()
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?labels=cycle:${cycle}&state=all&per_page=100&sort=created&direction=desc`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 } // Cache for 60 seconds
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const issues = await response.json()
    // Filter out pull requests (they have a pull_request property)
    return issues.filter((issue: any) => !issue.pull_request)
  } catch (error) {
    console.error('Error fetching issues:', error)
    return []
  }
}

// Fetch all comments for an issue
export async function fetchIssueComments(issueNumber: number): Promise<GitHubComment[]> {
  const owner = getGitHubOwner()
  const repo = getGitHubRepo()
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issueNumber}/comments?per_page=100&sort=created&direction=asc`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Fetch a single issue
export async function fetchIssue(issueNumber: number): Promise<GitHubIssue | null> {
  const owner = getGitHubOwner()
  const repo = getGitHubRepo()
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issueNumber}`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }
    })
    
    if (!response.ok) {
      return null
    }
    
    const issue = await response.json()
    // Make sure it's not a PR
    if (issue.pull_request) {
      return null
    }
    
    return issue
  } catch (error) {
    console.error('Error fetching issue:', error)
    return null
  }
}

// Process issues into newsletter items
export async function processIssuesIntoItems(issues: GitHubIssue[]): Promise<NewsletterItem[]> {
  const items: NewsletterItem[] = []
  
  for (const issue of issues) {
    const state = extractStateFromLabels(issue.labels)
    const category = extractCategoryFromLabels(issue.labels)
    const cycle = extractCycleFromLabels(issue.labels)
    
    // Fetch comments to find decision comment
    const comments = await fetchIssueComments(issue.number)
    const decisionComment = comments.find(comment => 
      comment.body.toLowerCase().includes('decision:') ||
      comment.body.toLowerCase().includes('reason:')
    )
    
    let decisionReason: string | undefined
    let decidedBy: string | undefined
    let section: string | undefined
    
    if (decisionComment) {
      const parsed = parseDecisionComment(decisionComment)
      decisionReason = parsed.reason
      decidedBy = parsed.editor
      section = parsed.section
    }
    
    items.push({
      issue,
      state,
      category,
      cycle,
      decisionComment,
      decisionReason,
      decidedBy,
      section,
    })
  }
  
  return items
}

// Fetch newsletters from repo
export async function fetchNewsletters(): Promise<Newsletter[]> {
  const owner = getGitHubOwner()
  const repo = getGitHubRepo()
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/newsletters?ref=main`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      return []
    }
    
    const files = await response.json()
    const newsletters: Newsletter[] = []
    
    for (const file of files) {
      if (file.type === 'file' && file.name.endsWith('.md')) {
        // Fetch the file content
        const contentResponse = await fetch(file.download_url, {
          next: { revalidate: 300 }
        })
        
        if (contentResponse.ok) {
          const content = await contentResponse.text()
          
          // Parse frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
          let title = file.name.replace('.md', '')
          let cycle = file.name.replace('.md', '')
          let editors: string[] = []
          let sourceRepo = `${owner}/${repo}`
          
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1]
            const body = frontmatterMatch[2]
            
            const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/)
            if (titleMatch) title = titleMatch[1]
            
            const cycleMatch = frontmatter.match(/cycle:\s*["'](.+?)["']/)
            if (cycleMatch) cycle = cycleMatch[1]
            
            const editorsMatch = frontmatter.match(/editors:\s*\[(.+?)\]/)
            if (editorsMatch) {
              editors = editorsMatch[1]
                .split(',')
                .map(e => e.trim().replace(/["']/g, ''))
            }
            
            const repoMatch = frontmatter.match(/source_repo:\s*["'](.+?)["']/)
            if (repoMatch) sourceRepo = repoMatch[1]
            
            newsletters.push({
              path: file.path,
              title,
              cycle,
              editors,
              sourceRepo,
              content: body,
              sha: file.sha,
              htmlUrl: `https://github.com/${sourceRepo}/blob/main/${file.path}`,
            })
          } else {
            // No frontmatter, use filename as title
            newsletters.push({
              path: file.path,
              title,
              cycle,
              editors,
              sourceRepo,
              content,
              sha: file.sha,
              htmlUrl: `https://github.com/${sourceRepo}/blob/main/${file.path}`,
            })
          }
        }
      }
    }
    
    // Sort by cycle (newest first)
    newsletters.sort((a, b) => b.cycle.localeCompare(a.cycle))
    
    return newsletters
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return []
  }
}

// Fetch a single newsletter
export async function fetchNewsletter(cycle: string): Promise<Newsletter | null> {
  const owner = getGitHubOwner()
  const repo = getGitHubRepo()
  const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/main/newsletters/${cycle}.md`
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }
    })
    
    if (!response.ok) {
      return null
    }
    
    const content = await response.text()
    
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    let title = `Newsletter — ${cycle}`
    let editors: string[] = []
    let sourceRepo = `${owner}/${repo}`
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const body = frontmatterMatch[2]
      
      const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/)
      if (titleMatch) title = titleMatch[1]
      
      const cycleMatch = frontmatter.match(/cycle:\s*["'](.+?)["']/)
      if (cycleMatch) cycle = cycleMatch[1]
      
      const editorsMatch = frontmatter.match(/editors:\s*\[(.+?)\]/)
      if (editorsMatch) {
        editors = editorsMatch[1]
          .split(',')
          .map(e => e.trim().replace(/["']/g, ''))
      }
      
      const repoMatch = frontmatter.match(/source_repo:\s*["'](.+?)["']/)
      if (repoMatch) sourceRepo = repoMatch[1]
      
      return {
        path: `newsletters/${cycle}.md`,
        title,
        cycle,
        editors,
        sourceRepo,
        content: body,
        htmlUrl: `https://github.com/${sourceRepo}/blob/main/newsletters/${cycle}.md`,
      }
    }
    
    return {
      path: `newsletters/${cycle}.md`,
      title,
      cycle,
      editors,
      sourceRepo,
      content,
      htmlUrl: `https://github.com/${sourceRepo}/blob/main/newsletters/${cycle}.md`,
    }
  } catch (error) {
    console.error('Error fetching newsletter:', error)
    return null
  }
}

// Get current cycle (most recent cycle label from issues, or default to today's week)
export async function getCurrentCycle(): Promise<string> {
  // For POC, we'll use a simple format: YYYY-MM-DD
  // In production, this could fetch the most recent cycle label
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

