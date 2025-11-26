import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
})


httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // User session expired - you could trigger a logout here
            console.log('Unauthorized - session expired');
        }
        return Promise.reject(error);
    }
);

// Auth API methods
export const authApi = {
    login(email: string, password: string) {
        return httpClient.post('/login', {email, password});
    },

    register(email: string, password: string, passwordConfirmation: string) {
        return httpClient.post('/register', {
            user: {
                email,
                password,
                password_confirmation: passwordConfirmation,
            },
        });
    },

    logout() {
        return httpClient.delete('/logout');
    },

    getCurrentUser() {
        return httpClient.get('/me');
    },
};