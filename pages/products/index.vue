<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'

const auth = useAuth()
const router = useRouter()

const isAuthenticated = computed(() => auth.isAuthenticated.value)

if (isAuthenticated.value) {
  console.log('User is authenticated:', isAuthenticated.value, auth.user.value)
} else {
  console.log('User is not authenticated')
  // Redirect to the home page or dashboard
  router.push('/')
}


const products = useProducts()

const resProducts = await products.fetchProducts()

const data = ref<Product[]>(resProducts ?? [])

const columns: TableColumn<Product>[] = [
  { accessorKey: 'id', header: 'ID' },
  // Image first position
  {
    accessorKey: 'images', header: 'Image', cell: ({ row }) => {
      const imageUrl = row.getValue('images') as string[]
      return h('img', {
        src: imageUrl[0],
        alt: 'Product Image',
        class: 'w-16 h-16 object-cover rounded'
      })
    }
  },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'price', header: 'Price' },
  {
    accessorKey: 'category.name', header: 'Category'
  }
]

</script>

<template>
  <div>
    <h1 class="text-lg font-extrabold">
      <UIcon name="lucide:shield-user" class="inline-block mr-2" />
      Products
    </h1>
    <p>
      This is the products page. Here you can manage your products, view details, and perform CRUD operations.
    </p>
    <UTable :data="data" :columns="columns" class="flex-1" />
  </div>
</template>
