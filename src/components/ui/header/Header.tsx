import React from 'react';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Button, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../stores/slices/authSlice';
import { LogOut } from "lucide-react";
import { navbarItems } from '../../../constants/NavbarItems';
import type { RootState } from '../../../stores/store';
import logo from "../../../assets/images/logo_maior.jpg";


export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state?.auth.isAuthenticated);
  const usuario = useSelector((state: RootState) => state?.auth.usuario);

  // Função para criar itens do menu mobile recursivamente
  const createMobileMenuItems = (items: typeof navbarItems): MenuProps['items'] => {
    return items.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return {
          key: index.toString(),
          label: (
            <span className="flex items-center justify-between">
              {item.nome}
              <DownOutlined className="ml-2 text-xs" />
            </span>
          ),
          children: createMobileMenuItems(item.children),
        };
      } else {
        return {
          key: index.toString(),
          label: (
            <NavLink
              to={item.caminho}
              className={({ isActive }) => (isActive ? 'font-bold text-green-600!' : 'text-gray-700!') + " " + "text-base"}
            >
              {item.nome}
            </NavLink>
          ),
        };
      }
    });
  };

  const mobileMenuItems: MenuProps['items'] = createMobileMenuItems(navbarItems);

  // Função para renderizar itens da navbar desktop
  const renderDesktopNavItems = (items: typeof navbarItems) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        const subMenuItems: MenuProps['items'] = item.children.map((child, childIndex) => ({
          key: `${item.caminho}-${childIndex}`,
          label: (
            <NavLink
              to={child.caminho}
              className={({ isActive }) =>
                (isActive ? 'font-bold text-green-600! hover:text-green-500!' : 'text-gray-700! hover:text-gray-600!') + " " + "whitespace-nowrap block py-2 px-4"
              }
            >
              {child.nome}
            </NavLink>
          ),
        }));

        return (
          <Dropdown
            key={item.caminho}
            menu={{ items: subMenuItems }}
            placement="bottomLeft"
          >
            <Button
              type="text"
              className={
                "text-gray-700! hover:text-gray-600! whitespace-nowrap text-base xl:text-xl flex items-center gap-1 h-auto px-3 py-1"
              }
            >
              {item.nome}
              <DownOutlined className="text-xs" />
            </Button>
          </Dropdown>
        );
      } else {
        return (
          <NavLink
            key={item.caminho}
            to={item.caminho}
            className={({ isActive }) =>
              (isActive ? 'font-bold text-green-600! hover:text-green-500!' : 'text-gray-700! hover:text-gray-600!') + " " + "whitespace-nowrap text-base xl:text-xl"
            }
          >
            {item.nome}
          </NavLink>
        );
      }
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-b-2xl border-b border-gray-200 p-2 md:p-6 mb-4">
      <div className="mx-auto px-4 md:px-15 py-2 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="w-full md:w-auto flex justify-between items-center">
          <img
            src={logo}
            alt="Logo da Empresa"
            className="h-6 md:h-9 object-contain"
          />

          <div className="md:hidden">
            <Dropdown menu={{ items: mobileMenuItems }} trigger={['click']}>
              <Button type="text" icon={<MenuOutlined className="text-2xl" />} />
            </Dropdown>
          </div>

          <div className="md:hidden">
            <Tooltip title="Sair da conta">
              <Button type="text" icon={<LogOut />} onClick={handleLogout} />
            </Tooltip>
          </div>
        </div>

        {isAuthenticated && usuario && (
          <div>
            <div className="hidden md:flex items-center gap-4 xl:gap-6 text-base xl:text-xl md:mt-3">
              {renderDesktopNavItems(navbarItems)}
            </div>

            <div className="text-center md:text-right text-xl md:text-2xl">
              <span className="mr-2 hidden md:inline">Olá,</span>
              <span className="text-green-600 font-semibold break-words max-w-[200px] md:max-w-none">
                {usuario.nome || '-'}
              </span>
            </div>

            <div className="hidden md:flex">
              <Tooltip title="Sair da conta">
                <Button type="text" icon={<LogOut />} onClick={handleLogout} />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};