import axiosClient from './axiosClient';
import queryString from 'query-string';
import { CharsComment, CharsCommentInteract, CharsSearch } from '@types';

export const getWords = (params?: CharsSearch) => {
    let url = 'http://103.130.213.12/api/chars';
    if (params) {
        const qs = queryString.stringify(params);
        url += `?${qs}`;
    }
    return axiosClient.get(url);
};

export const commentPost = (params: CharsComment) => {
    const { id, author_name, content } = params;

    let url = `http://103.130.213.12/api/chars/${id}/comment`;

    return axiosClient.post(url, { author_name, content });
};

export const commentInteract = (params: CharsCommentInteract) => {
    const { id, status, device_fcm } = params;

    let url = `http://103.130.213.12/api/comments/${id}/interactive`;

    return axiosClient.post(url, { status, device_fcm });
};

export const reportWords = (params: { char: string; content: string }) => {
    let url = 'http://103.130.213.12/api/reports';
    return axiosClient.post(url, params);
};
