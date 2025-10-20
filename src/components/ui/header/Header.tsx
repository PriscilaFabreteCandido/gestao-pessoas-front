import React from 'react';
import { Button, Tooltip } from 'antd';
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import type { RootState } from '../../../stores/store';
import { logout } from '../../../stores/slices/authSlice';
import logo from "../../../assets/images/logo_maior.jpg";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const usuario = useSelector((state: RootState) => state.auth.usuario);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Verifica se está na rota da Home
  const isHomeRoute = location.pathname === '/';

  return (
    <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-b-2xl border-b border-gray-200 p-2 md:p-6 mb-4">
      <div className="mx-auto px-4 md:px-15 py-2 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo */}
        <div className="w-full md:w-auto flex justify-start items-center gap-10">
          <img
            src={logo}
            alt="Logo da Empresa"
            className="h-6 md:h-14 object-contain"
          />

          {isAuthenticated && usuario && (
            <Link 
              to="/" 
              className={`text-2xl transition-colors duration-200 ${
                isHomeRoute 
                  ? 'text-primary font-semibold' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Home
            </Link>
          )}
        </div>

        {isAuthenticated && usuario && (
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-xl text-primary font-semibold">
              Olá, {usuario.nome || '-'}
            </span>
            <Tooltip title="Sair da conta">
              <Button
                type="text"
                icon={<LogOut />}
                onClick={handleLogout}
                className="flex items-center justify-center"
              />
            </Tooltip>
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center text-gray-500">
            Faça login para acessar o sistema
          </div>
        )}

      </div>
    </nav>
  );
};