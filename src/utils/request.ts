import axios, { AxiosInstance } from "axios";
import { notification } from "antd";

import { stringify } from "qs";
import { API_HOST, LOGIN_URL } from "./config";
import { getAccessToken, removeAccessToken } from "./token";

const jsonMimeType = "application/json";

const instance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": jsonMimeType,
    Accept: jsonMimeType,
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.request.use(
  (config) => {
    let { url = "" } = config;
    const { headers = {} } = config;
    if (url.indexOf("://") === -1) {
      url = `${API_HOST}${url}`;
    }
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `bearer ${token}`;
    }
    return {
      ...config,
      url,
      headers,
    };
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status === 204) {
      return response;
    }
    return data;
  },
  (error) => {
    const { response } = error;
    notification.config({
      placement: "bottomRight",
      bottom: 48,
      duration: 2,
    });
    if (response) {
      const { status } = response;
      if (status === 401) {
        removeAccessToken();
        const redirectUri = window.location.href;
        window.location.href = `${LOGIN_URL}?${stringify({ redirectUri })}`;
      }
    } else {
      notification.error({
        message: "网络错误",
      });
    }
  }
);

export default instance;

export function getResponseList(response) {
  if (response && Array.isArray(response.results)) return response.results;
  if (Array.isArray(response)) return response;
  return [];
}
