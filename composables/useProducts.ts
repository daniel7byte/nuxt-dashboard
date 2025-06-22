export function useProducts() {
  const products = useState('products', () => [])
  const isLoading = useState('products-loading', () => true)
  const error = useState('products-error', () => null)

  async function fetchProducts() {
    isLoading.value = true
    error.value = null

    try {
      const { data, pending } = await useAsyncData('products', () =>
        $fetch('https://dummyjson.com/products')
      )

      products.value = data.value
      isLoading.value = pending.value
    } catch (err) {
      error.value = err
      console.error('Error fetching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts
  }
}
