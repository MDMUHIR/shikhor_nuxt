export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchMe, isAuthenticated, isStaff } = useAuth()
  if (!isAuthenticated.value) {
    await fetchMe()
  }
  if (!isAuthenticated.value) {
    return navigateTo(`/login?next=${encodeURIComponent(to.fullPath)}`)
  }
  if (!isStaff.value) {
    return navigateTo('/?forbidden=admin')
  }
})
