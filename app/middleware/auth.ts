export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchMe, isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    await fetchMe()
  }
  if (!isAuthenticated.value) {
    return navigateTo(`/login?next=${encodeURIComponent(to.fullPath)}`)
  }
})
