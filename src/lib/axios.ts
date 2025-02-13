import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true, // Ensures cookies are sent with requests
    withXSRFToken: true
})

// Add a request interceptor to include the CSRF token in headers
// axios.interceptors.request.use((config) => {
//     const token = getCsrfToken(); // Fetch the CSRF token from cookies
//     if (token) {
//         config.headers['X-XSRF-TOKEN'] = token; // Add the CSRF token to the headers
//     }
//     return config;
// });

// // Helper function to get the CSRF token from cookies
// const getCsrfToken = () => {
//     const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('XSRF-TOKEN='))
//         ?.split('=')[1];
//     return cookieValue ? decodeURIComponent(cookieValue) : null;
// };

export default axios