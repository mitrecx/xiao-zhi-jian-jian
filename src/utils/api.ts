// utils/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/v1';
axios.defaults.withCredentials = true


export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
                // 如果有需要，你还可以添加其他的请求头
                // 'Authorization': 'Bearer YourAccessToken',
            },
            // withCredentials: true
        });
        // 处理登录成功的逻辑
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        // 处理登录失败的逻辑
        console.error('Login failed:', error);
        throw error;
    }
};
