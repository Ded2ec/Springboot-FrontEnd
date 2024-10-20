export default() => {

    const router = useRouter()

    const config = useRuntimeConfig()
    const SPRING_API = config.public.url

    // อ่าน token จาก cookie
    const token = useCookie('token')

    // กำหนด header สำหรับการเรียก api
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
    }

    // function สำหรับดึงข้อมูล product และเช็คว่ามี token หรือไม่
    const fetchWithTokenCheck = async <T>(url: any, options: any) => {
        const response = await useFetch(url, options)
        if(response.error.value && response.error.value.statusCode === 403){
            // หาก token หมดอายุหรือไม่ถูกต้องให้ redirect ไปหน้า login
            router.push('/')
        }

        return response
    }

    // function สำหรับดึงข้อมูล product ทั้งหมด
    const getAllProducts = async(page: number, limit: number) => {
        return fetchWithTokenCheck<any>(
            `${SPRING_API}/products?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    return {
        getAllProducts
    }
}