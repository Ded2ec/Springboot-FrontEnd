<script setup lang="ts">

    // สร้างตัวแปรไว้ผูกกับฟอร์มและเก็บข้อมูล
    const username = ref('')
    const email = ref('')
    const password = ref('')

    // เรียกใช้ useFormRule สำหรับ validate form
    const { ruleRequired, ruleEmail, rulePassLen } = useFormRules()

    // สร้าง function สำหรับ submit form
    const submitForm = () => {
        // เช็คเงื่อนไขว่าผ่าน validate หรือไม่
        if(
            ruleRequired(username.value) == true &&
            ruleRequired(email.value) == true &&
            ruleEmail(email.value) == true &&
            ruleRequired(password.value) == true &&
            rulePassLen(password.value) == true
        ) {
            // ถ้าผ่านทุกเงื่อนไข ให้แสดงค่าที่กรอกใน console
            console.log('Username:', username.value)
            console.log('Email:', email.value)
            console.log('Password:', password.value)
        }
    }

    useHead({
        title: 'Register',
        meta: [
            {
                name: 'description',
                content: 'Register page'
            }
        ]
    })


</script>

<template>
    <VContainer fluid class="fill-height pa-0">
        <VRow no-gutters align="center" justify="center" class="fill-height">
            <VCol class="hidden-sm-and-down fill-height" md="6" lg="6">
                <VImg
                    src="https://wallpaper.dog/large/5557744.jpg"
                    cover
                    class="h-100 rounded-xl rounded-ts-0 rounded-bs-0 d-flex align-center justify-center"
                >
                    <div class="text-center w-50 text-white mx-auto">
                        <h1 class="mb-4">Welcome back.</h1>
                        <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                </VImg>
            </VCol>
            <VCol cols="12" md="6" lg="6" sm="6">
                
                <VRow no-gutters align="center" justify="center">
                    <VCol cols="12" md="6" class="pa-3">
                        <h1>Register</h1>
                        <p class="text-medium-emphasis">Input your username, email and password</p>
                        <VForm class="mt-7" @submit.prevent="submitForm">
                            <div class="mt-1">
                                <VTextField 
                                    v-model="username"
                                    :rules="[ruleRequired]"
                                    label="Username" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    id="username"
                                    name="username"
                                    type="text"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    v-model="email"
                                    :rules="[ruleRequired, ruleEmail]"
                                    label="Email" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-email"
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    v-model="password"
                                    :rules="[ruleRequired, rulePassLen]"
                                    label="Password" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div class="mt-5 text-center">
                                <VBtn type="submit" 
                                    block
                                    min-height="44" 
                                    class="gradient primary"
                                    >
                                    Register
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>Already have an account?</span>&nbsp;
                            <NuxtLink to="/" class="text-primary">Login</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>

</style>