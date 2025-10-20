import type { SexoEnum } from "../../enum/SexoEnum";

export interface CriarPessoaRequest {
  nome: string;
  sexo: SexoEnum;
  email: string;
  dataNascimento: any;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
}
