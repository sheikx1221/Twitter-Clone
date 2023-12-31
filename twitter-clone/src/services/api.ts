import axios, { AxiosInstance } from 'axios';
import { ServerError } from '../entities/utils';
import { imageOrDefaultImage } from '../utils/functions';

class ApiService {
    private readonly axiosInstance: AxiosInstance;
    private user?: string;
    private baseURL: string = 'https://twitter-clone-production-d4ce.up.railway.app';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            timeout: 6000,
        });
    }

    async login(credential: string, password: string) {
        try {
            const response = await this.axiosInstance.post("/auth/login", {
                credential, password
            });

            this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            this.baseURL = "https://twitter-clone-production-d4ce.up.railway.app/api";
            this.user = response.data.id;
            return response.data;
        }
        catch (err: any) {
            console.log("err = ", err);
            return new ServerError(err.message || "Unknown error", err.code || "500");
        }
    }

    async register(fullName: string, email: string, phone: string, password: string, username: string) {
        try {
            const response = await this.axiosInstance.post("/auth/register", {
                fullName, email, password, phone, username, profilePicture: imageOrDefaultImage()
            });

            this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            this.baseURL = "https://twitter-clone-production-d4ce.up.railway.app/api";
            this.user = response.data.id;
            return response.data;
        }
        catch(err: any) {
            console.log("err = ", err);
            return new ServerError(err.message || "Unknown error", err.code || "500");
        }
    }

    async get<Request, Response>(endpoint: string, data?: Request) {
        try {
            console.log(this.axiosInstance.defaults.baseURL);
            //@ts-ignore
            const queryParams = "?" + new URLSearchParams(data).toString();
            const url = `${endpoint}${queryParams == "?" ? "": queryParams}`;
            const response = await this.axiosInstance.get(url, { baseURL: this.baseURL });

            return response.data as Response;
        }
        catch(err: any) {
            console.log("err = ",err);
            return new ServerError(err.message || "Unknown error", err.code || "500");
        }
    }

    async post<Request, Response>(endpoint: string, data: Request) {
        try {
            const response = await this.axiosInstance.post(endpoint, data, { baseURL: this.baseURL });
            return response.data as Response;
        }
        catch(err: any) {
            return new ServerError(err.message || "Unknown error", err.code || "500");
        }
    }

    getUser() {
        return this.user;
    }
}

export const apiService = new ApiService();