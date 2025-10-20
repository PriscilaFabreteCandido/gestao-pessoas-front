import { useState, useEffect, useCallback } from "react";

import dayjs from "dayjs";
import { Modal } from "antd";
import type { PessoaResponse } from "../interfaces/Responses/PessoaResponse";
import { PessoaService } from "../services/PessoaService";

interface UsePessoaFormProps {

  pessoaId?: string;
  onSuccess?: () => void;
}

export const usePessoaForm = ({ pessoaId, onSuccess }: UsePessoaFormProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<any>({
    sexo: undefined,
    dataNascimento: null,
  });
  const isEditMode = !!pessoaId;

  const fetchPessoa = useCallback(async () => {
    if (!isEditMode || !pessoaId) return;

    try {
      setLoading(true);
      console.log('pessoaId', pessoaId)
      const pessoa: PessoaResponse = await PessoaService.obterPorId(pessoaId);
      setInitialValues({
        ...pessoa,
        dataNascimento: pessoa.dataNascimento ? dayjs(pessoa.dataNascimento) : null,
      });
    } catch (error: any) {
      Modal.error({
        title: "Erro ao carregar dados",
        content: error?.response?.data?.message || "Erro desconhecido ao buscar pessoa.",
      });
    } finally {
      setLoading(false);
    }
  }, [isEditMode, pessoaId]);

  const handleSubmit = useCallback(
    async (values: any, resetForm: () => void, navigateBack: () => void) => {
      try {
        setLoading(true);
        const pessoaData: PessoaResponse = { ...values , id: pessoaId};

        if (isEditMode && pessoaId) {
          await PessoaService.atualizar(pessoaId, pessoaData);
          Modal.success({ title: "Sucesso", content: "Pessoa atualizada com sucesso!" });
        } else {
          await PessoaService.criar(pessoaData);
          Modal.success({ title: "Sucesso", content: "Pessoa adicionada com sucesso!" });
        }

        resetForm();
        onSuccess?.();
        navigateBack();
      } catch (error: any) {
        Modal.error({
          title: "Erro ao salvar",
          content: error?.response?.data?.message || "Erro desconhecido ao salvar pessoa.",
        });
      }
      finally {
        setLoading(false);
      }
    },
    [isEditMode, pessoaId, onSuccess]
  );

  useEffect(() => {
    fetchPessoa();
  }, [fetchPessoa]);

  return { initialValues, handleSubmit, isEditMode, loading };
};
