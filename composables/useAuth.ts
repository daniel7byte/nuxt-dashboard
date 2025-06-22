export const useAuth = () => {

  const auth = useAuthStore()

  const isLoggedIn = computed(() => !!auth.isAuthenticated)

  return {
    ...toRefs(auth), // Converts the store state to refs
    isLoggedIn,
    login: auth.login,
    logout: auth.logout,
  }
}
