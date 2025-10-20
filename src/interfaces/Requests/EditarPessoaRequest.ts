import type { SexoEnum } from "../../enum/SexoEnum";

export interface EditarPessoaRequest {
    id: string;
    nome: string;
    sexo: SexoEnum;
    email: string;
    dataNascimento: any;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
}
