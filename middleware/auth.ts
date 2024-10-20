export default defineNuxtRouteMiddleware((to, from) => {
         // Import SweetAlert2
    const { $swal } : any = useNuxtApp()
    // อ่าน token จาก cookie
    const token = useCookie('token')

    // ถ้าไม่มี token ให้ redirect ไปหน้า login
    if(!token.value){
        $swal.fire({
            title: 'Login failed',
            text: 'Please Login your User and Password',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return navigateTo('/')
    }

})
