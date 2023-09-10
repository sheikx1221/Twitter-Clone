import axios, { AxiosInstance } from 'axios';
import { ServerError } from '../entities/utils';

class ApiService {
    private readonly axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 6000
        });
    }

    async login(credential: string, password: string) {
        try {
            const response = await this.axiosInstance.post("/auth/login", {
                credential, password
            });

            this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            return response.data;
        }
        catch (err: any) {
            console.log("err = ", err);
            return new ServerError(err.message || "Unknown error", err.code || "500");
        }
    }

    async get<Request, Response>(endpoint: string, data?: Request) {
        try {
            //@ts-ignore
            const queryParams = new URLSearchParams(data).toString();
            const url = `${endpoint}?${queryParams}`;
            const response = await this.axiosInstance.get(url);

            return response.data;
        }
        catch(err: any) {
            console.log("err = ",err);
            return new ServerError(err.message || "Unknown error", err.code || "500");
        }
    }

    async post<Request, Response>(endpoint: string, data: Request) {
        
    }
}

export const apiService = new ApiService();