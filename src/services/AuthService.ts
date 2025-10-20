
import HttpClient from "../client/HttpClient";
import type { LoginRequest } from "../interfaces/Requests/LoginRequest";
import type { LoginResponse } from "../interfaces/Responses/LoginResponse";
import type { UserInfoResponse } from "../interfaces/Responses/UserInfoResponse";


export default class AuthService {
    private static httpClient: HttpClient;
    private static baseURL: string = `${import.meta.env.VITE_API_BASE_URL}/Auth`;

    private static getHttpClient() {
        if (!this.httpClient) {
            this.httpClient = new HttpClient(this.baseURL);
        }
        return this.httpClient;
    }

    static async logar(parms: LoginRequest): Promise<LoginResponse> {
        return this.getHttpClient().post<LoginResponse>(`/login`, parms);
    }

    static async useInfo(): Promise<UserInfoResponse> {
        return this.getHttpClient().get<UserInfoResponse>(`/user-info`);
    }

    
}