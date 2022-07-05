import axios, { AxiosError } from 'axios';

const handleErrors = (error: AxiosError) => {
    const { response, request } = error;
    console.log('interceptorResponses error response', response);
    console.log('interceptorResponses error request', request);
    if (response) {
        return Promise.resolve(response);
    }

    // showMessageDanger(message);
    return Promise.reject(error);
};

const axiosClient = axios.create({
    baseURL: process.env.API_URL,

    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        charset: 'UTF-8',
    },
});

axiosClient.interceptors.request.use((config: any) => {
    console.log('================> API CALL', config);
    delete axios.defaults.headers.common['Accept-Encoding'];
    return config;
});

axiosClient.interceptors.response.use(response => {
    console.log('===========> API RES', response);
    if (response && response.data) {
        return response.data;
    }
    return response;
}, handleErrors);

export default axiosClient;
