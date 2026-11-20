export interface ExamInfo {
  id: number
  title: string
  description: string | null
  instructions: string | null
  course: { id: number; title: string; slug: string } | null
  duration_minutes: number
  pass_percentage: number
  max_attempts: number | null
  questions_count: number
  total_marks: number
  negative_marking: boolean
  negative_marking_type: 'fraction' | 'fixed' | null
  negative_marking_value: number
  allow_negative_total: boolean
  show_answers: 'after_submit' | 'after_exam_end' | 'never'
  starts_at: string | null
  ends_at: string | null
  state: 'upcoming' | 'open' | 'closed'
}

export interface ExamListItem extends ExamInfo {
  attempts_used: number
  best_percentage: number | null
  passed: boolean
  in_progress_attempt_id: number | null
}

export interface ExamAttemptSummary {
  id: number
  exam_id: number
  status: 'in_progress' | 'submitted' | 'expired'
  started_at: string
  expires_at: string
  submitted_at: string | null
  score: number | null
  total_marks: number
  percentage: number | null
  correct_count: number
  wrong_count: number
  unanswered_count: number
  negative_marks_total: number
  passed: boolean | null
  negative_marking: boolean
  pass_percentage: number | null
}

export interface ExamTakeQuestion {
  id: number
  type: 'single_choice' | 'multiple_choice' | 'true_false'
  question: string
  options: Array<{ id: string; text: string }>
  marks: number
  negative_marks: number
}

export interface ExamReviewItem {
  question_id: number
  question: string
  options: Array<{ id: string; text: string }>
  marks: number
  selected: string[]
  status: 'correct' | 'wrong' | 'unanswered'
  awarded: number
  correct_answers: string[] | null
  explanation: string | null
}

/** Human description of the negative marking rule. */
export function negativeMarkingLabel(exam: Pick<ExamInfo, 'negative_marking' | 'negative_marking_type' | 'negative_marking_value'>): string {
  if (!exam.negative_marking || !exam.negative_marking_value) return 'No negative marking'
  if (exam.negative_marking_type === 'fixed') return `−${exam.negative_marking_value} mark${exam.negative_marking_value === 1 ? '' : 's'} per wrong answer`
  const value = exam.negative_marking_value
  const fractions: Record<string, string> = { '0.25': '¼', '0.33': '⅓', '0.5': '½', '1': '1×' }
  return `−${fractions[String(value)] ?? value}${value === 1 ? '' : '×'} of the question marks per wrong answer`
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(safe / 3600)
  const m = Math.floor((safe % 3600) / 60)
  const s = safe % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}
