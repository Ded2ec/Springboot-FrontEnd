<script setup lang="ts">
    import useSpringApi from '@/composables/useSpringApi'

      // ดึงค่า path รูปภาพจากไฟล์ .env
        const config = useRuntimeConfig()
        const SPRINGAPI_IMAGE = config.public.urlimage

       // สร้างตัวแปรไว้เก็บข้อมูล Products
       const products: any = ref([])

    // เรียกใช้งาน Product API
    // ฟังก์ชันสำหรับการ Fetch Products ทั้งหมด
    const fetchProducts = async () => {
        // เรียกใช้งาน useSpringApi
        const { data } = await useSpringApi().getAllProducts(1,100)
    
           // นำข้อมูลที่ได้ไปเก็บไว้ในตัวแปร products
           products.value = data.value?.products

           console.log(data.value)

        return data
    }

     // เรียกทำงานครั้งแรกเมื่อ Component ถูก Load
     onMounted(() => {
        fetchProducts()
        })


    definePageMeta({
        layout: "backend",
    })

    useHead({
        title: 'Product',
        meta: [
            {
                name: 'description',
                content: 'Product page'
            }
        ]
    })

</script>

<template>
      <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Info</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Category</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.id">
                                <td>{{ product.id }}</td>
                            <td> 
                                <div class="d-flex align-center py-4">
                                 <div v-if="product.productPicture">
                                    <v-img
                                            :src="`${SPRINGAPI_IMAGE}/${product.productPicture}`"
                                            width="50px"
                                            class="img-fluid"
                                            ></v-img>
                                    </div> 
                                    <div v-else>
                                            <v-icon size="60">mdi-image</v-icon>
                                        </div>
                                 <div>
                                <h4 class="my-2">{{ product.productName }}</h4>
                               </div> 
                            </div>
                        </td>

                                <td>{{ product.unitPrice }}</td>
                                <td>{{ product.unitInStock }}</td>
                                <td>{{ product.categoryName }}</td>
                                <td>{{ product.createdDate }}</td>
                                <td>
                                    <v-icon
                                        small
                                        class="mr-2 text-info cursor-pointer"
                                        title="Edit" >mdi-pencil
                                    </v-icon>
                                    <v-icon
                                        small
                                        class="text-error cursor-pointer"
                                        title="Delete">mdi-delete
                                    </v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
</template>

<style scoped>

</style>