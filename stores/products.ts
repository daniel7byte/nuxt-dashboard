import { defineStore } from 'pinia'

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await $fetch<Product[]>('https://api.escuelajs.co/api/v1/products', {
          method: 'GET',
        })

        this.products = res

        return this.products
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    },
    async fetchProductById(id: number) {
      try {
        const res = await $fetch<Product>(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: 'GET',
        })
        return res
      } catch (error) {
        console.error(`Failed to fetch product with id ${id}:`, error)
        throw error
      }
    },
    async createProduct(product: Omit<Product, 'id'>) {
      try {
        const res = await $fetch<Product>('https://api.escuelajs.co/api/v1/products', {
          method: 'POST',
          body: product,
        })
        this.products.push(res)
        return res
      } catch (error) {
        console.error('Failed to create product:', error)
        throw error
      }
    },
    async updateProduct(id: number, product: Partial<Omit<Product, 'id'>>) {
      try {
        const res = await $fetch<Product>(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: 'PUT',
          body: product,
        })
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = res
        }
        return res
      } catch (error) {
        console.error(`Failed to update product with id ${id}:`, error)
        throw error
      }
    },
    async deleteProduct(id: number) {
      try {
        await $fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: 'DELETE',
        })
        this.products = this.products.filter(p => p.id !== id)
      } catch (error) {
        console.error(`Failed to delete product with id ${id}:`, error)
        throw error
      }
    }
  },
  getters: {
    getProducts: (state) => state.products,
  }
})