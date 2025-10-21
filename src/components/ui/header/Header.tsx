import React from "react";
import { Button, Tooltip } from "antd";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../../../stores/store";
import { logout } from "../../../stores/slices/authSlice";
import logoMaior from "../../../assets/images/logo_maior.jpg";
import logoMenor from "../../../assets/images/logo_maior.jpg";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const usuario = useSelector((state: RootState) => state.auth.usuario);
  const isMobile = useIsMobile(); // breakpoint padrão

  const handleLogout = () => {
    dispatch(logout());
  };

  const isHomeRoute = location.pathname === "/";

  return (
    <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-b-2xl border-b border-gray-200 p-2 md:p-4 mb-4">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
        
       
        <div className="w-full md:w-auto flex justify-between items-center gap-6">
          <img
            src={isMobile ? logoMenor : logoMaior}
            alt="Logo da Empresa"
            className={`${isMobile ? "h-8" : "h-14"} object-contain`}
          />

          {isAuthenticated && usuario && (
            <Link
              to="/"
              className={`text-lg md:text-2xl transition-colors duration-200 ${
                isHomeRoute
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Home
            </Link>
          )}
        </div>

        
        {isAuthenticated && usuario && (
          <div
            className={`flex items-center ${
              isMobile ? "gap-2" : "gap-4"
            }`}
          >
            {!isMobile && (
              <span className="text-sm md:text-xl text-primary font-semibold">
                Olá, {usuario.nome || "-"}
              </span>
            )}
            <Tooltip title="Sair da conta">
              <Button
                type="text"
                icon={<LogOut size={isMobile ? 18 : 22} />}
                onClick={handleLogout}
                className="flex items-center justify-center"
              />
            </Tooltip>
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center text-gray-500 text-sm md:text-base">
            Faça login para acessar o sistema
          </div>
        )}
      </div>
    </nav>
  );
};
