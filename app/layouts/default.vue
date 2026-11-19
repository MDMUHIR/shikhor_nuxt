<template>
  <div>
    <AppHeader />
    <main class="min-h-[60vh] pt-18 print:pt-0">
      <slot />
    </main>
    <AppFooter />
    <AppToast />
    <WhatsAppButton />
  </div>
</template>
