import HttpClient from "../client/HttpClient";
import type { CriarPessoaRequest } from "../interfaces/Requests/CriarPessoaRequest";
import type { EditarPessoaRequest } from "../interfaces/Requests/EditarPessoaRequest";
import type { PessoaResponse } from "../interfaces/Responses/PessoaResponse";

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

  static async obterPorId(id: string): Promise<PessoaResponse> {
    return this.getHttpClient().get<PessoaResponse>(`/obter-por-id/${id}` );
  }

  static async obterPorCpf(cpf: string,): Promise<PessoaResponse> {
    return this.getHttpClient().get<PessoaResponse>(`/cpf/${cpf}`);
  }

  static async criar(pessoa: CriarPessoaRequest): Promise<PessoaResponse> {
    return this.getHttpClient().post<PessoaResponse>(`/criar`, pessoa);
  }

  static async atualizar(id: string, pessoa:EditarPessoaRequest,): Promise<PessoaResponse> {
    return this.getHttpClient().put<PessoaResponse>(`/atualizar/${id}`, pessoa);
  }

  static async excluir(id: string,): Promise<void> {
    return this.getHttpClient().delete(`/excluir/${id}`);
  }
}