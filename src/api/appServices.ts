import axiosClient from './axiosClient';
import queryString from 'query-string';
import {
    CharsComment,
    CharsCommentInteract,
    CharsSearch,
    NewChars,
} from '@types';

//const API_ENDPOINT = 'http://nguyenthithom.name.vn';
const API_ENDPOINT = 'http://103.130.213.13';

export const getWords = (params?: CharsSearch) => {
    let url = API_ENDPOINT + '/api/chars';
    if (params) {
        const qs = queryString.stringify(params);
        url += `?${qs}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(error => {
            console.error(error);
        });

    return axiosClient.get(url);
};

export const getWord = (id: number) => {
    let url = API_ENDPOINT + '/api/chars/' + id;

    return axiosClient.get(url);
};

export const addWords = (params?: NewChars) => {
    let url = API_ENDPOINT + '/api/chars';
    return axiosClient.post(url, params);
};

export const commentPost = (params: CharsComment) => {
    const { id, author_name, content } = params;

    let url = `${API_ENDPOINT}/api/chars/${id}/comment`;

    return axiosClient.post(url, { author_name, content });
};

export const commentInteract = (params: CharsCommentInteract) => {
    const { id, status, device_fcm } = params;

    let url = `${API_ENDPOINT}/api/comments/${id}/interactive`;

    return axiosClient.post(url, { status, device_fcm });
};

export const reportWords = (params: { char: string; content: string }) => {
    let url = API_ENDPOINT + '/api/reports';
    return axiosClient.post(url, params);
};
