// Shared crossword answer data — single source of truth
// Used by: app/api/submit-crossword/route.ts, app/crossword/admin/page.tsx, app/crossword/page.tsx

// March 2026 crossword — keyed by starting cell (row-col) of each word
export const CROSSWORD_ANSWERS: Record<string, string> = {
  '0-1': 'ZUGRAMA',      // down
  '0-8': 'VALLEY',       // down
  '1-0': 'MUSHANGHAI',   // across
  '3-0': 'PROTOVILLE',   // across
  '3-9': 'ESMERALDA',    // down
  '8-5': 'ZANZALU',      // across
}

export const ALL_CROSSWORD_ANSWERS = [
  'ZUGRAMA', 'VALLEY', 'MUSHANGHAI', 'PROTOVILLE', 'ESMERALDA', 'ZANZALU',
]
