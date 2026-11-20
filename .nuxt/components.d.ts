
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AdminAnalytics: typeof import("../app/components/AdminAnalytics.vue")['default']
export const AdminConfirmDialog: typeof import("../app/components/AdminConfirmDialog.vue")['default']
export const AdminPageHeader: typeof import("../app/components/AdminPageHeader.vue")['default']
export const AdminStat: typeof import("../app/components/AdminStat.vue")['default']
export const AppFooter: typeof import("../app/components/AppFooter.vue")['default']
export const AppHeader: typeof import("../app/components/AppHeader.vue")['default']
export const AppModal: typeof import("../app/components/AppModal.vue")['default']
export const AppToast: typeof import("../app/components/AppToast.vue")['default']
export const AttachmentList: typeof import("../app/components/AttachmentList.vue")['default']
export const BaseIcon: typeof import("../app/components/BaseIcon.vue")['default']
export const BlogCard: typeof import("../app/components/BlogCard.vue")['default']
export const ComboCard: typeof import("../app/components/ComboCard.vue")['default']
export const CourseAttachmentsManager: typeof import("../app/components/CourseAttachmentsManager.vue")['default']
export const CourseCard: typeof import("../app/components/CourseCard.vue")['default']
export const EmptyState: typeof import("../app/components/EmptyState.vue")['default']
export const ErrorState: typeof import("../app/components/ErrorState.vue")['default']
export const HeroCarousel: typeof import("../app/components/HeroCarousel.vue")['default']
export const InstructorCard: typeof import("../app/components/InstructorCard.vue")['default']
export const LearningPath: typeof import("../app/components/LearningPath.vue")['default']
export const LessonResourcesManager: typeof import("../app/components/LessonResourcesManager.vue")['default']
export const LoadingSkeleton: typeof import("../app/components/LoadingSkeleton.vue")['default']
export const PaginationLinks: typeof import("../app/components/PaginationLinks.vue")['default']
export const ProductCard: typeof import("../app/components/ProductCard.vue")['default']
export const RatingStars: typeof import("../app/components/RatingStars.vue")['default']
export const ReviewsSection: typeof import("../app/components/ReviewsSection.vue")['default']
export const SiteFooter: typeof import("../app/components/SiteFooter.vue")['default']
export const SiteHeader: typeof import("../app/components/SiteHeader.vue")['default']
export const Stars: typeof import("../app/components/Stars.vue")['default']
export const StatsCards: typeof import("../app/components/StatsCards.vue")['default']
export const StatusBadge: typeof import("../app/components/StatusBadge.vue")['default']
export const WhatsAppButton: typeof import("../app/components/WhatsAppButton.vue")['default']
/**
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
/**
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
/**
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
/**
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
/**
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
/**
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
/**
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
/**
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
/**
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
/**
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const NuxtAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
/**
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
/**
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
/**
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
/**
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAdminAnalytics: LazyComponent<typeof import("../app/components/AdminAnalytics.vue")['default']>
export const LazyAdminConfirmDialog: LazyComponent<typeof import("../app/components/AdminConfirmDialog.vue")['default']>
export const LazyAdminPageHeader: LazyComponent<typeof import("../app/components/AdminPageHeader.vue")['default']>
export const LazyAdminStat: LazyComponent<typeof import("../app/components/AdminStat.vue")['default']>
export const LazyAppFooter: LazyComponent<typeof import("../app/components/AppFooter.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../app/components/AppHeader.vue")['default']>
export const LazyAppModal: LazyComponent<typeof import("../app/components/AppModal.vue")['default']>
export const LazyAppToast: LazyComponent<typeof import("../app/components/AppToast.vue")['default']>
export const LazyAttachmentList: LazyComponent<typeof import("../app/components/AttachmentList.vue")['default']>
export const LazyBaseIcon: LazyComponent<typeof import("../app/components/BaseIcon.vue")['default']>
export const LazyBlogCard: LazyComponent<typeof import("../app/components/BlogCard.vue")['default']>
export const LazyComboCard: LazyComponent<typeof import("../app/components/ComboCard.vue")['default']>
export const LazyCourseAttachmentsManager: LazyComponent<typeof import("../app/components/CourseAttachmentsManager.vue")['default']>
export const LazyCourseCard: LazyComponent<typeof import("../app/components/CourseCard.vue")['default']>
export const LazyEmptyState: LazyComponent<typeof import("../app/components/EmptyState.vue")['default']>
export const LazyErrorState: LazyComponent<typeof import("../app/components/ErrorState.vue")['default']>
export const LazyHeroCarousel: LazyComponent<typeof import("../app/components/HeroCarousel.vue")['default']>
export const LazyInstructorCard: LazyComponent<typeof import("../app/components/InstructorCard.vue")['default']>
export const LazyLearningPath: LazyComponent<typeof import("../app/components/LearningPath.vue")['default']>
export const LazyLessonResourcesManager: LazyComponent<typeof import("../app/components/LessonResourcesManager.vue")['default']>
export const LazyLoadingSkeleton: LazyComponent<typeof import("../app/components/LoadingSkeleton.vue")['default']>
export const LazyPaginationLinks: LazyComponent<typeof import("../app/components/PaginationLinks.vue")['default']>
export const LazyProductCard: LazyComponent<typeof import("../app/components/ProductCard.vue")['default']>
export const LazyRatingStars: LazyComponent<typeof import("../app/components/RatingStars.vue")['default']>
export const LazyReviewsSection: LazyComponent<typeof import("../app/components/ReviewsSection.vue")['default']>
export const LazySiteFooter: LazyComponent<typeof import("../app/components/SiteFooter.vue")['default']>
export const LazySiteHeader: LazyComponent<typeof import("../app/components/SiteHeader.vue")['default']>
export const LazyStars: LazyComponent<typeof import("../app/components/Stars.vue")['default']>
export const LazyStatsCards: LazyComponent<typeof import("../app/components/StatsCards.vue")['default']>
export const LazyStatusBadge: LazyComponent<typeof import("../app/components/StatusBadge.vue")['default']>
export const LazyWhatsAppButton: LazyComponent<typeof import("../app/components/WhatsAppButton.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtWelcome>`.
 *
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtLayout>`.
 *
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
/**
 * Lazy-loaded version of `<NuxtErrorBoundary>`.
 *
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
/**
 * Lazy-loaded version of `<ClientOnly>`.
 *
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
/**
 * Lazy-loaded version of `<DevOnly>`.
 *
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
/**
 * Lazy-loaded version of `<NuxtLink>`.
 *
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
/**
 * Lazy-loaded version of `<NuxtLoadingIndicator>`.
 *
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
/**
 * Lazy-loaded version of `<NuxtTime>`.
 *
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
 *
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtAnnouncer>`.
 *
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtImg>`.
 *
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
/**
 * Lazy-loaded version of `<NuxtPicture>`.
 *
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
/**
 * Lazy-loaded version of `<NuxtPage>`.
 *
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
/**
 * Lazy-loaded version of `<NuxtIsland>`.
 *
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
