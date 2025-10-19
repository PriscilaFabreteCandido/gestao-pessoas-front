import { HomePage } from "../pages/private/home/Home";
import { PessoasPage } from "../pages/private/pessoas/PessoasPage";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [

  { path: "", element: <HomePage />, permissions: "" },
  { path: "pessoas", element: <PessoasPage />, permissions: "" },
 
];

export default routes;
