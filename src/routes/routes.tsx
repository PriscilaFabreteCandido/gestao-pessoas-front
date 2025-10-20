import { HomePage } from "../pages/private/home/Home";
import AdicionarPessoaPage from "../pages/private/pessoas/cadastrar/AdicionarPessoaPage";
import PessoasPage from "../pages/private/pessoas/PessoasPage";


export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permissions: string;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [

  { path: "*", element: <HomePage />, permissions: "" },
  { path: "pessoas", element: <PessoasPage />, permissions: "" },
  { path: "pessoas/adicionar", element: <AdicionarPessoaPage />, permissions: "" },
  { path: "pessoas/editar/:id", element: <AdicionarPessoaPage />, permissions: "" },

];

export default routes;
