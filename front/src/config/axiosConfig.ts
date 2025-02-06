import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
    const { accessToken } = useAuth();

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                //
                console.log("TOKEN EXPIRE");
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export default useAxios;
