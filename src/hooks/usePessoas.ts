import { useEffect, useState, useCallback } from "react";
import { PessoaService } from "../services/PessoaService";
import type { PessoaResponse } from "../interfaces/Responses/PessoaResponse";

export const usePessoas = () => {
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPessoas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await PessoaService.obterTodos();
      setPessoas(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchPessoas();
  }, [fetchPessoas]);

  useEffect(() => {
    fetchPessoas();
  }, [fetchPessoas]);

  return { pessoas, loading, error, refetch };
};