export const useProducts = () => {

  const productsStore = useProductsStore()

  return {
    ...toRefs(productsStore),
    products: computed(() => productsStore.products),
    fetchProducts: productsStore.fetchProducts,
    fetchProductById: productsStore.fetchProductById,
    createProduct: productsStore.createProduct,
    updateProduct: productsStore.updateProduct,
    deleteProduct: productsStore.deleteProduct,
  }
}
