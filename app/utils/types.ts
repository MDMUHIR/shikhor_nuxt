export interface User {
  id: number
  name: string
  email: string
  type: 'admin' | 'super_admin' | 'instructor' | 'customer'
  avatar?: string | null
  is_active?: boolean
  created_at?: string | null
}

export interface Paginator<T> {
  current_page: number
  data: T[]
  last_page: number
  per_page: number
  total: number
  from?: number | null
  to?: number | null
  links?: Array<{ url: string | null; label: string; active: boolean }>
  next_page_url?: string | null
  prev_page_url?: string | null
  path?: string
  first_page_url?: string
  last_page_url?: string
}

export interface ApiEnvelope<T> {
  status: boolean
  success?: boolean
  message: string
  data: T
  errors?: Record<string, string[]>
}

export interface CourseCategory {
  id: number
  name: string
  slug: string
  description?: string | null
  image?: string | null
  status?: boolean
  sort_order?: number
  courses_count?: number
}

export interface RatingSummary {
  average: number
  count: number
  five_star?: number
  four_star?: number
  three_star?: number
  two_star?: number
  one_star?: number
}

export interface Course {
  id: number
  category_id: number | null
  title: string
  slug: string
  subtitle: string | null
  description: string | null
  thumbnail: string | null
  promo_video_url: string | null
  level: 'all' | 'beginner' | 'intermediate' | 'advanced'
  language: string
  price: number
  offer_price: number | null
  effective_price: number
  access_days: number | null
  effective_access_days: number
  access_type: 'time_limited' | 'lifetime'
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  duration_minutes: number | null
  requirements: string[]
  outcomes: string[]
  rating: { average: number; count: number }
  total_lessons: number
  total_students: number
  published_at: string | null
  category: { id: number; name: string; slug: string } | null
  sections?: CourseSection[]
  quizzes?: QuizSummary[]
  reviews_summary?: RatingSummary
}

export interface LessonVideo {
  source: 'external' | 'upload' | 'youtube'
  url?: string
  stream_url?: string
  video_id?: string
  embed_url?: string
}

export interface LessonResource {
  id: number
  title: string
  mime_type?: string | null
  size?: number | null
  external_url?: string | null
  download_url?: string | null
}

export interface Lesson {
  id: number
  resources?: LessonResource[]
  is_required?: boolean
  course_id: number
  section_id: number | null
  title: string
  slug: string | null
  description: string | null
  type: 'video' | 'text' | 'quiz'
  duration_seconds: number
  is_preview: boolean
  is_published?: boolean
  sort_order?: number
  is_locked: boolean
  is_completed: boolean
  last_position_seconds: number
  content?: string
  video?: LessonVideo | null
  quiz?: { id: number; title: string; pass_percentage: number; time_limit_minutes: number | null; max_attempts: number | null } | null
}

export interface CourseSection {
  id: number
  title: string
  description: string | null
  sort_order: number
  lessons: Lesson[]
}

export interface QuizSummary {
  id: number
  course_id?: number
  lesson_id: number | null
  title: string
  description?: string | null
  pass_percentage: number
  time_limit_minutes: number | null
  max_attempts: number | null
  questions_count?: number
  is_published?: boolean
  sort_order?: number
}

export interface Review {
  id: number
  course_id: number
  rating: number
  title: string | null
  comment: string | null
  is_approved: boolean
  status?: 'pending' | 'approved' | 'rejected' | 'hidden'
  user: { id: number; name: string; email?: string } | null
  course?: { id: number; title: string; slug: string } | null
  created_at: string
  updated_at?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  image?: string | null
}

export interface ProductImage {
  id: number
  product_id?: number
  variant_id?: number
  url: string
  is_featured: boolean
}

export interface VariantAttribute {
  id?: number
  attribute: string
  value: string
}

export interface ProductVariant {
  id: number
  product_id: number
  sku: string
  price: number
  offer_price: number | null
  stock: number
  images: ProductImage[]
  attributes: VariantAttribute[]
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  offer_price: number | null
  stock: number
  status: string
  category_id: number | null
  category?: { id: number; name: string; slug: string } | null
  images: ProductImage[]
  variants: ProductVariant[]
}

export interface CartItem {
  id: number
  user_id: number
  product_id: number
  variant_id: number | null
  quantity: number
  price: number
  total: number
  is_selected: boolean
  product: Product
  variant: ProductVariant | null
  effective_price?: number
  effective_stock?: number
}

export interface CourseCartItem {
  id: number
  course_id: number
  price: number
  is_selected: boolean
  course: {
    id: number
    title: string
    slug: string
    thumbnail: string | null
    price: number
    offer_price: number | null
    effective_price: number
    total_lessons: number
    duration_minutes: number | null
    access_days: number | null
    rating: { average: number; count: number }
    category: { id: number; name: string; slug: string } | null
  }
}

export interface CourseCartResponse {
  items: CourseCartItem[]
  subtotal: number
  count: number
  selected_count: number
}

export interface WishlistItem {
  id: number
  user_id: number
  product_id: number
  variant_id: number | null
  product: Product
  variant: ProductVariant | null
  effective_price: number | null
  effective_stock: number | null
}

export interface Coupon {
  id: number
  code: string
  type: 'fixed' | 'percentage'
  discount: number
  applies_to?: 'all' | 'products' | 'courses'
  discount_amount?: number
  is_active?: boolean
  starts_at?: string | null
  expires_at?: string | null
  max_discount?: number | null
  min_purchase?: number | null
  usage_limit?: number | null
  per_user_limit?: number | null
  times_used?: number
}

export interface DeliveryCharge {
  id: number
  name: string
  charge: number
  minimum_order: number | null
  status: boolean
}

export interface OrderItem {
  id: number
  product_id: number
  variant_id: number | null
  name: string
  slug: string
  sku: string | null
  image: string | null
  attributes: VariantAttribute[]
  original_price: number
  unit_price: number
  discount: number
  quantity: number
  line_total: number
  stock_snapshot: Record<string, unknown> | null
}

export interface OrderCourseItem {
  enrolled?: boolean
  id: number
  course_id: number
  name: string
  slug: string
  image: string | null
  original_price: number
  unit_price: number
  discount: number
  line_total: number
  access_days: number | null
}

export interface OrderStatusHistory {
  status: string
  label: string
  note: string | null
  created_by: string | null
  created_at: string | null
}

export interface Order {
  id: number
  order_number: string
  customer_id?: number
  status: string
  payment_method: string | null
  payment_status: string
  customer: { name: string; email: string; phone: string; phone_alt: string }
  shipping_address: { line1: string; line2: string; district: string; city: string; country: string }
  pricing: {
    currency: string
    refunded_amount?: number
    subtotal: number
    products_subtotal: number
    courses_subtotal: number
    delivery_charge: number
    discount: number
    discount_type: string | null
    coupon_code: string | null
    total: number
  }
  shipping: { method: string | null; estimated_delivery_days: number | null }
  summary: { total_items: number; total_quantity: number }
  items: OrderItem[]
  course_items: OrderCourseItem[]
  status_history: OrderStatusHistory[]
  notes: string | null
  created_at: string
  updated_at: string
  user?: { id: number; name: string; email: string } | null
}

export interface Enrollment {
  id: number
  status: 'active' | 'completed' | 'expired' | 'suspended' | 'cancelled'
  is_active: boolean
  is_lifetime?: boolean
  source: 'order' | 'manual'
  enrolled_at: string | null
  starts_at?: string | null
  expires_at: string | null
  remaining_days: number | null
  order_id?: number | null
}

export interface Progress {
  total_lessons: number
  completed_lessons: number
  percentage: number
  is_complete: boolean
  completed_lesson_ids: number[]
  enrollment: Enrollment | null
}

export interface MyCourse {
  enrollment: Enrollment
  course: Course
  progress: Progress | null
}

export interface LearnCourse extends Course {
  access: { has_access: boolean; enrollment: Enrollment | null }
  progress: Progress
  sections: CourseSection[]
  quizzes: QuizSummary[]
}

export interface QuizAttempt {
  id: number
  quiz_id: number
  score: number
  total_marks: number
  percentage: number
  passed: boolean
  answers: Record<string, string[]>
  started_at: string | null
  completed_at: string | null
}

export interface QuizQuestion {
  id: number
  type: 'single_choice' | 'multiple_choice' | 'true_false'
  question: string
  options: Array<{ id: string; text: string }>
  marks: number
  sort_order: number
}

export interface QuizDetail extends QuizSummary {
  total_marks: number
  attempts_used: number
  attempts_remaining: number | null
  best_percentage: number
  has_passed: boolean
  questions: QuizQuestion[]
}

export interface QuizReviewItem {
  question_id: number
  selected: string[]
  is_correct: boolean
  correct_answers: string[]
  marks: number
}

export interface Certificate {
  id: number
  certificate_number: string
  status: 'issued' | 'revoked'
  is_valid: boolean
  issued_at: string | null
  revoked_at: string | null
  metadata: Record<string, unknown> | null
  course: { id: number; title: string; slug: string; thumbnail?: string | null } | null
  download_url?: string | null
  user?: { id: number; name: string; email: string } | null
}

export interface CertificateVerification {
  valid: boolean
  message?: string
  status?: string
  certificate_number?: string
  student_name?: string
  course_title?: string
  issued_at?: string | null
  revoked_at?: string | null
}

export interface Banner {
  id: number
  title: string | null
  description: string | null
  image: string
  link: string | null
  is_active: boolean
  sort_order: number
}

export interface Blog {
  id: number
  title: string
  slug: string
  content: string
  published_at: string | null
  views: number
  is_featured: boolean
  author: { id: number; name: string }
  image: string | null
  tags: string[]
}

export interface BlogPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface BlogListResponse {
  status: boolean
  message: string
  blogs: Blog[]
  pagination: BlogPagination
}

export interface BlogTag {
  id: number
  name: string
  slug: string
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description?: string | null
  color?: string | null
  is_active?: boolean
  sort_order?: number
}

export interface AdminEnrollment {
  id: number
  user: { id: number; name: string; email: string } | null
  course: { id: number; title: string; slug: string } | null
  order_id: number | null
  source: 'order' | 'manual'
  status: 'active' | 'completed' | 'expired' | 'suspended' | 'cancelled'
  is_active: boolean
  enrolled_at: string | null
  expires_at: string | null
  remaining_days: number | null
}

export interface AdminReview extends Review {
  user: { id: number; name: string; email?: string } | null
}

export interface AdminQuiz extends QuizSummary {
  questions?: AdminQuizQuestion[]
}

export interface AdminQuizQuestion extends QuizQuestion {
  quiz_id: number
  correct_answers: string[]
}

export interface AdminLesson {
  id: number
  course_id: number
  section_id: number | null
  title: string
  slug: string | null
  description: string | null
  type: 'video' | 'text' | 'quiz'
  video_source: 'external' | 'upload' | 'youtube' | null
  video_url: string | null
  video_path: string | null
  duration_seconds: number
  content: string | null
  is_preview: boolean
  is_published: boolean
  sort_order: number
  quiz: { id: number; title: string; is_published: boolean } | null
}

export interface AdminCourseSection {
  id: number
  title: string
  description: string | null
  sort_order: number
  lessons: AdminLesson[]
}

export interface AdminCourse extends Course {
  sections: AdminCourseSection[]
  quizzes: AdminQuiz[]
}

export interface AdminOrder extends Order {
  user: { id: number; name: string; email: string } | null
}
