<script setup lang="ts">
    import useSpringApi from '@/composables/useSpringApi'

    // เรียกใช้งาน Product API
    const { data: products } = await useSpringApi().getAllProducts(1, 100)

    console.log(products)

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
    <h1>Product</h1>
</template>

<style scoped>

</style>