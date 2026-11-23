import { configureMediaBase } from '~/utils/media'

/**
 * Cache the public media origin before any page renders. Head resolvers (useSeoMeta)
 * run outside component setup, so mediaUrl() must not call useRuntimeConfig() then.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  configureMediaBase(String(config.public.mediaUrl || ''))
})
