export type ProgressRecord = {
  id: string
  title: string
  subject: string
  score: number
  total: number
  completedAt: string
}

export const PROGRESS_STORAGE_KEY = 'lumalearn-progress'

export function readProgress(): ProgressRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const value = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveProgress(record: ProgressRecord) {
  if (typeof window === 'undefined') return
  const current = readProgress()
  const next = [record, ...current.filter((item) => item.id !== record.id)]
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next.slice(0, 100)))
}

export function progressId(subject: string, title: string) {
  return `${subject}:${title}`.toLowerCase().replace(/\s+/g, '-')
}

export function averageScore(records: ProgressRecord[]) {
  if (!records.length) return 0
  return Math.round(records.reduce((sum, record) => sum + (record.score / record.total) * 100, 0) / records.length)
}
