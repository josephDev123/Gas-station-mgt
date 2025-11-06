import axios from "axios";
import { persistor, store } from "./redux/store";
import { toast } from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Wait for Redux Persist to rehydrate
    persistor.persist();
    await persistor.flush(); // Ensure state is loaded
    // Get the token from the Redux store
    // const state = store.getState();
    // const token = state.users?.access;

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle the error
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    // console.log(error);

    if (error.response.status === 401) {
      // Redirect to login page if unauthorized
      toast.error("session expired", { position: "top-right" });
      //   store.dispatch(logout());
      // await persistor.purge();
      setTimeout(() => {
        window.location.href = "/auth?auth_type=login";
      }, 1000);

      return Promise.reject(error);
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      // originalRequest._retry = true;
      // const access_token = await refreshAccessToken();
      // console.log(access_token);

      // Redirect to login page if unauthorized
      toast.error("session expired", { position: "top-right" });
      //   store.dispatch(logout());
      // await persistor.purge();
      setTimeout(() => {
        window.location.href = "/auth?auth_type=login";
      }, 1000);

      // return axiosInstance(originalRequest);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const axiosUnToken = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
