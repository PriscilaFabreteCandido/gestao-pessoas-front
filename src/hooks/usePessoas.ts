import { useEffect, useState } from "react";
import { PessoaService } from "../services/PessoaService";
import type { PessoaResponse } from "../interfaces/Responses/PessoaResponse";


export const usePessoas = () => {
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await PessoaService.obterTodos();
        
        setPessoas(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoas();
  }, []);

  return { pessoas, loading, error };
};
