export default defineNuxtPlugin(async () => {
  const { fetchMe, isAuthenticated } = useAuth()
  await fetchMe()

  if (import.meta.client && isAuthenticated.value) {
    await Promise.allSettled([useCart().refresh(), useWishlist().refresh()])
  }
})
