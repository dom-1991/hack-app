import axiosClient from './axiosClient';

export const getWords = () => {
    let url = 'http://103.130.213.12/api/chars';
    return axiosClient.get(url);
};

export const reportWords = (params: { char: string; content: string }) => {
    let url = 'http://103.130.213.12/api/reports';
    return axiosClient.post(url, params);
};
