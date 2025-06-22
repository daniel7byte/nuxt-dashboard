<script lang="ts" setup>
import * as z from 'zod'
const toast = useToast()
const auth = useAuth()
const router = useRouter()

const isAuthenticated = computed(() => auth.isAuthenticated.value)

if (isAuthenticated.value) {
  console.log('User is authenticated:', isAuthenticated.value, auth.user.value)
  // Redirect to the home page or dashboard
  router.push('/')
} else {
  console.log('User is not authenticated')
}

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

const state = reactive({
  email: '',
  password: ''
})

const handlerLogin = async () => {
  try {
    console.log('Logging in with', { email: state.email, password: state.password });

    const authenticate = await auth.login({
      email: state.email,
      password: state.password
    })
    console.log('Login response:', authenticate);

    toast.add({
      title: 'Logged in successfully',
      description: `Welcome back, ${authenticate?.name}!`,
      icon: 'lucide:check-circle',
      color: 'success',
      duration: 3000
    })
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error);
    // Handle login error (e.g., show a notification)
    toast.add({
      title: 'Login failed',
      description: 'Please check your email and password.',
      icon: 'lucide:x-circle',
      color: 'error',
      duration: 3000
    })
  }
}

</script>

<template>
  <div>
    <h1 class="text-lg font-extrabold">
      <UIcon name="lucide:shield-user" class="inline-block mr-2" />
      Login
    </h1>
    <UForm class="mt-5 space-y-5" :state="state" :schema="schema" @submit.prevent="handlerLogin">
      <UFormField name="email">
        <UInput v-model="state.email" type="email" placeholder="Enter your email" />
      </UFormField>
      <UFormField name="password">
        <UInput v-model="state.password" type="password" placeholder="Enter your password" />
      </UFormField>
      <UButton class="mt-4" type="submit">Login</UButton>
    </UForm>
  </div>
</template>
