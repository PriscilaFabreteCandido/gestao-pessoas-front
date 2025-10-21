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
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const usuario = useSelector((state: RootState) => state.auth.usuario);
  const isMobile = useIsMobile(); // Hook responsivo

  const handleLogout = () => {
    dispatch(logout());
  };

  const isHomeRoute = location.pathname === "/";

  return (
    <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-b-2xl border-b border-gray-200 p-2 md:px-15 mb-4">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">

        {isMobile && (
          <div className="w-full flex justify-between items-center">
            <img
              src={logoMenor}
              alt="Logo da Empresa"
              className="h-8 object-contain"
            />

            {isAuthenticated && (
              <Tooltip title="Sair da conta">
                <Button
                  type="text"
                  icon={<LogOut size={18} />}
                  onClick={handleLogout}
                  className="flex items-center justify-center"
                />
              </Tooltip>
            )}
          </div>
        )}
 
        {!isMobile && (
          <div className="w-full md:w-auto flex justify-between items-center gap-6">
            <img
              src={logoMaior}
              alt="Logo da Empresa"
              className="h-14 object-contain"
            />

            {isAuthenticated && usuario && (
              <Link
                to="/"
                className={`text-2xl transition-colors duration-200 ${
                  isHomeRoute
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Home
              </Link>
            )}
          </div>
        )}
 
        {!isMobile && isAuthenticated && usuario && (
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-xl  font-semibold">
              Olá, <strong className="text-primary">{usuario.nome || "-"}</strong>
            </span>
            <Tooltip title="Sair da conta">
              <Button
                type="text"
                icon={<LogOut size={22} />}
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
