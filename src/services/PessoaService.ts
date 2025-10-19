import HttpClient from "../client/HttpClient";
import type { PessoaResponse } from "../interfaces/Responses/PessoaReponse";

export class PessoaService {
  private static httpClient: HttpClient;
  private static baseURL: string = `${import.meta.env.VITE_API_BASE_URL}/Pessoa`;

  private static getHttpClient() {
    if (!this.httpClient) {
      this.httpClient = new HttpClient(this.baseURL);
    }
    return this.httpClient;
  }

  static async obterTodos(): Promise<PessoaResponse[]> {
    return this.getHttpClient().get<PessoaResponse[]>(`/obter-todos`);
  }

  static async obterPorId(id: number): Promise<PessoaResponse> {
    return this.getHttpClient().get<PessoaResponse>(`/obter-por-id`, {id});
  }

  static async obterPorCpf(cpf: string,): Promise<PessoaResponse> {
    return this.getHttpClient().get<PessoaResponse>(`/cpf/${cpf}`);
  }

  static async criar(pessoa: Omit<PessoaResponse, 'id'>): Promise<PessoaResponse> {
    return this.getHttpClient().post<PessoaResponse>(`?`, pessoa);
  }

  static async atualizar(id: number, pessoa: Partial<PessoaResponse>,): Promise<PessoaResponse> {
    return this.getHttpClient().put<PessoaResponse>(`/atualizar`, pessoa);
  }

  static async excluir(id: number,): Promise<void> {
    return this.getHttpClient().delete(`/`);
  }
}