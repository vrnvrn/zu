export type IssueState = 'submitted' | 'shortlisted' | 'accepted' | 'rejected' | 'deferred'

export type Category = 
  | 'events' 
  | 'wins' 
  | 'updates' 
  | 'requests' 
  | 'jobs' 
  | 'research' 
  | 'media'

export interface GitHubLabel {
  id: number
  name: string
  color: string
  description: string | null
}

export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubComment {
  id: number
  user: GitHubUser
  body: string
  created_at: string
  html_url: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string | null
  state: 'open' | 'closed'
  user: GitHubUser
  labels: GitHubLabel[]
  created_at: string
  updated_at: string
  html_url: string
  comments_url: string
}

export interface NewsletterItem {
  issue: GitHubIssue
  state: IssueState
  category: Category | null
  cycle: string | null
  decisionComment?: GitHubComment
  decisionReason?: string
  decidedBy?: string
  section?: string
}

export interface Newsletter {
  path: string
  title: string
  cycle: string
  editors: string[]
  sourceRepo: string
  content: string
  sha?: string
  htmlUrl?: string
}

export interface DecisionLog {
  cycle: string
  generatedAt: string
  items: DecisionLogItem[]
}

export interface DecisionLogItem {
  issueNumber: number
  state: IssueState
  section?: string
  decidedBy: string
  decisionCommentUrl: string
  reason: string
}

