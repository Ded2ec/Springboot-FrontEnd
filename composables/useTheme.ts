import { useTheme as vuetifyUseTheme } from 'vuetify'

export const useTheme = () => {

    // สร้าง object useTheme จาก vuetifyUseTheme
    const theme = vuetifyUseTheme()

    // สร้าง function สำหรับโหลด theme จาก localStorage
    const loadTheme = () => {
        const storedTheme = localStorage.getItem('theme_store')
        if(storedTheme) {
            theme.global.name.value = storedTheme
        }
    }

    // สร้างฟังก์ชันสำหรับการ Toggle Theme
    const toggleTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'lightTheme':'darkTheme'
        // บันทึก theme ลง localStorage
        localStorage.setItem('theme_store', theme.global.name.value)
    }

    return {
        theme,
        loadTheme,
        toggleTheme
    }

}