<script lang="ts" setup>
const auth = useAuth()

// The computed method is used because we want to reactively check the authentication status
const isAuthenticated = computed(() => auth.isAuthenticated.value)

if (isAuthenticated.value) {
  console.log('User is authenticated:', auth.user)
} else {
  console.log('User is not authenticated')
}

</script>

<template>
  <div>
    <h1 class="text-lg font-extrabold">Welcome to my first NuxtJS Application</h1>
    <p>In this example, I'm going to implement a Login and a CRUD of Products</p>
    <div class="flex flex-row mt-5">

      <UButton v-if="!isAuthenticated" icon="lucide:shield-user" class="basis-auto mr-2.5">
        <NuxtLink to="/login">Login</NuxtLink>
      </UButton>

      <UButton v-if="isAuthenticated" icon="lucide:log-out" class="basis-auto mr-2.5" @click="auth.logout">
        Logout
      </UButton>

      <UButton icon="lucide:shopping-cart" class="basis-auto mr-2.5">
        <NuxtLink to="/products">Products</NuxtLink>
      </UButton>
    </div>
  </div>
</template>