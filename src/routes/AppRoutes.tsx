import { useSelector } from "react-redux";
import type { RootState } from "../stores/store";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/public/login/LoginPage";
import routes from "./routes";
import { RootLayout } from "../layouts/RootLayout";

export default function AppRoutes() {
  const isAuthenticated = useSelector((state: RootState) => state?.auth.isAuthenticated);

  return (
    <>
      <Routes >
        <Route element={<RootLayout />}>
          {isAuthenticated ? (
            // Rotas autenticadas sem layout
            routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}
              >
                {route.children && route.children.map((child) => (
                  <Route key={child.path} path={child.path} element={child.element} />
                ))}
              </Route>
            ))
          ) : (
            // Rotas não autenticadas
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<LoginPage />} />
            </>
          )}
        </Route>
      </Routes>
    </>

  );
}