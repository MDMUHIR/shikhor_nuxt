export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchMe, isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated.value) {
    await fetchMe()
  }
  if (!isAuthenticated.value) {
    return navigateTo(`/login?next=${encodeURIComponent(to.fullPath)}`)
  }
  if (!isAdmin.value) {
    return navigateTo('/?forbidden=admin')
  }
})
