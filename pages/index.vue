<script setup lang="ts">

    // เรียกใช้ useRouter สำหรับการเปลี่ยนหน้า
    const router = useRouter()

    // Import SweetAlert2
    const { $swal } : any = useNuxtApp()


    // เรียกใช้ useCookie สำหรับเก็บข้อมูลลง token
    const token = useCookie(
        'token', {
            // ตั้งค่า cookie ให้หมดอายุหลังจาก 1 ชั่วโมง
            maxAge: 60 * 60
        }
    )

    // เรียกใช้ useCookie สำหรับเก็บข้อมูลลง user data
    const userData = useCookie(
        'userData', {
            // ตั้งค่า cookie ให้หมดอายุหลังจาก 1 ชั่วโมง
            maxAge: 60 * 60
        }
    )

    // สร้างตัวแปรไว้ผูกกับฟอร์มและเก็บข้อมูล
    const username = ref('')
    const password = ref('')

    // เรียกใช้ useFormRule สำหรับ validate form
    const { ruleRequired, rulePassLen } = useFormRules()

    // สร้าง function สำหรับ submit form
    const submitForm = () => {
        // เช็คเงื่อนไขว่าผ่าน validate หรือไม่
        if(
            ruleRequired(username.value) == true &&
            ruleRequired(password.value) == true &&
            rulePassLen(password.value) == true
        ) {
            // ถ้าผ่านทุกเงื่อนไข ให้แสดงค่าที่กรอกใน console
            // console.log('Username:', username.value)
            // console.log('Password:', password.value)

            // สร้างตัวแปร config ไว้ใช้งาน runtime config
            const config = useRuntimeConfig()
            const SPRING_API = config.public.url

            // console.log('SPRING_API:', SPRING_API)
            // console.log('SPRING_API_IMAGE:', SPRING_API_IMAGE)

            // Login API with Spring Boot API
            useFetch(
                `${SPRING_API}/authenticate/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value
                    }),
                    
                    onResponse({ request, response, options }) {
                        // console.log(response)
                        if(response.status == 401){
                            // console.log('Username or Password is incorrect')
                            // alert('Username or Password is incorrect')
                            $swal.fire({
                                title: 'Login failed',
                                text: 'Please check your username and password',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })
                        } else{
                            // console.log('Login Success')
                            // alert('Login Success')

                            // บันทึก token ลง cookie
                            token.value = response._data.data.token

                            // บันทึก user data ลง cookie
                            userData.value = response._data.data

                            $swal.fire({
                                title: 'Login Success',
                                text: 'Welcome to the system',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })

                            // Delay 2 seconds
                            setTimeout(() => {
                                // ปิด popup
                                $swal.close()
                                // ส่งไปหน้า dashboard
                                router.push('/backend/dashboard')
                            }, 1300)
                        }
                    }
                }
            )
        }
    }

    useHead({
        title: 'Login',
        meta: [
            {
                name: 'description',
                content: 'Login page'
            }
        ]
    })

</script>

<template>
    <VContainer fluid class="fill-height pa-0">
        <VRow no-gutters align="center" justify="center" class="fill-height">
            <VCol class="hidden-sm-and-down fill-height" md="6" lg="6">
                <VImg
                    src="/images/moo.jpg"
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
                        <h1>Login</h1>
                        <p class="text-medium-emphasis">Input your username and password</p>
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
                                    Login
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>Don't have an account? Registe</span>&nbsp;
                            <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>

</style>