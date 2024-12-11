import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/': {
                target: 'http://localhost:5172', // URL backend
                changeOrigin: true, // Đảm bảo gửi request từ đúng domain
                secure: false,      // Nếu backend dùng HTTPS tự ký, đặt thành false
            },
        },
    },
    // define: {
    //     'process.env': {
    //         API_URL: process.env.API_URL || 'http://localhost:5172', // Mặc định nếu không có biến môi trường
    //     },
    // },
})
