export interface NavbarItem {
  nome: string;
  caminho: string;
  children?: NavbarItem[]; 
}


export const navbarItems: NavbarItem[] = [
  {
    nome: 'Gerenciar Pessoas',
    caminho: '/pessoas',
    children: [
      {
        nome: 'Visualizar Pessoas',
        caminho: '/pessoas',
      },
      {
        nome: 'Adicionar Pessoa',
        caminho: '/pessoas/adicionar',
      }
    ]
  },
  // Você pode adicionar mais itens aqui
  {
    nome: 'Dashboard',
    caminho: '/dashboard',
  }
];