import axios from 'axios';
import { API_URL } from '../config/runtime.config';
import Method from '../config/method.enum';

export const request = (endpoint: string, method: Method, headers = {}, params = {}, body = {}) => {
    console.log(API_URL + endpoint);

    return axios({
        url: API_URL + endpoint,
        method,
        headers,
        params,
        data: body,
    });
};

export const get = (endpoint: string, params = {}, headers = {}) => {
    return request(endpoint, Method.GET, headers, params);
};

export const post = (endpoint: string, body = {}, params = {}, headers = {}) => {
    return request(endpoint, Method.POST, headers, params, body);
};

export const put = (endpoint: string, body = {}, params = {}, headers = {}) => {
    return request(endpoint, Method.PUT, headers, params, body);
};

export const remove = (endpoint: string, body = {}, params = {}, headers = {}) => {
    return request(endpoint, Method.DELETE, headers, params, body);
};
