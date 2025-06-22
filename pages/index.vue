<script setup lang="ts">
const { products, isLoading, error, fetchProducts } = useProducts()

fetchProducts()

// Handle refresh action
async function refreshProducts() {
  await fetchProducts()
}
</script>

<template>
  <div>
    <h1 class="text-lg my-5 font-extrabold">
      Products Lists
    </h1>
    <UButton icon="lucide-database-backup" label="Refresh" class="rounded-full" @click="refreshProducts"
      :loading="isLoading" />
    <div class="mt-4">
      <div v-if="isLoading" class="flex justify-center p-4">
        Loading products...
      </div>
      <div v-else-if="error" class="p-4 text-red-500 bg-red-50 rounded">
        {{ error.message || 'Failed to load products' }}
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <UCard v-for="product in products?.products" :key="product.id" class="h-full">
          <template #header>
            <h3 class="font-bold text-lg">{{ product.title }}</h3>
          </template>
          <p>{{ product.description }}</p>
          <template #footer>
            <div class="flex justify-between items-center">
              <span class="font-bold">${{ product.price }}</span>
              <UBadge color="green">{{ product.category }}</UBadge>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>