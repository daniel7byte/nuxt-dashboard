<template>
  <div style="padding: 1.5rem;">
    <UButton class="mb-4" @click="$router.push('/')">
      <UIcon name="lucide:home" class="inline-block mr-2" />
      Home
    </UButton>
    <slot />
  </div>
</template>