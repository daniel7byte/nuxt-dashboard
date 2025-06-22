import { defineStore } from 'pinia'

// https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt.html
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string; email: string },
    token: null as string | null,
    isAuthenticated: false
  }),
  persist: true,
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const res = await $fetch<{ access_token: string }>('https://api.escuelajs.co/api/v1/auth/login', {
          method: 'POST',
          body: credentials,
        })

        this.token = res.access_token

        const userRest = await $fetch<{ name: string; email: string }>('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })

        this.user = { name: userRest.name, email: userRest.email }

        this.isAuthenticated = true

        return this.user

      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      // Optionally, you can also clear the persisted state
      this.$reset()
    },
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  }
})
