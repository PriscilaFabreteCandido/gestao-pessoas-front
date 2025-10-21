import axios, { AxiosError, type AxiosInstance, type AxiosResponse, } from 'axios';

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    if (!baseURL) {
      throw new Error("A variável de ambiente não foi definida.");
    }

    this.instance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    this.instance.interceptors.request.use((config) => {
      config.headers.Accept = '*/*';
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken")
          const event = new CustomEvent("eventSession", {
            detail: {
              type: "info",
              title: "Sessão Expirada",
              message: "Sua sessão expirou. Por favor, faça o login novamente para continuar.",
            }
          });
          document.dispatchEvent(event)
        }
        return Promise.reject(error);
      }
    );

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(endpoint, { params });
    return HttpClient.handleResponse(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(endpoint, body, { params });
    return HttpClient.handleResponse(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put<T>(endpoint: string, body?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(endpoint, body);
    return HttpClient.handleResponse(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(endpoint);
    return HttpClient.handleResponse(response);
  }

  private static handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}

export default HttpClient;