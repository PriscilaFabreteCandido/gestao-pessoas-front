import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import type { LoginRequest } from "../interfaces/Requests/LoginRequest";
import AuthService from "../services/AuthService";
import { login } from "../stores/slices/authSlice";

interface LoginCredentials {
    email: string;
    password: string;
}

export function useLogin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogin = async (values: LoginCredentials) => {
        setLoading(true);
        setError(null);

        try {
            const loginRequest: LoginRequest = {
                username: values.email,
                password: values.password
            };

            const loginResponse = await AuthService.logar(loginRequest);
            localStorage.setItem('authToken', loginResponse.accessToken);
            
            const userInfo = await AuthService.useInfo();

            dispatch(login({
                token: loginResponse,
                usuario: userInfo
            }));

            
            navigate("/private/home");
        } catch (error:any) {
            console.error("Erro ao fazer login:", error);
            setError(error?.response?.data?.message ?? "Credenciais inválidas ou erro na conexão");
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, handleLogin };
}