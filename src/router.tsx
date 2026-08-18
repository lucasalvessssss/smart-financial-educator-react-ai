import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    children: [
      { 
        path: "/",
        element: <div>Formulário de Simulação</div>,
      },
      {
        path: '/resultado',
        element: <div>Resultado da Simulação</div>,
      },
      {
        path: '/historico',
        element: <div>Histórico de Simulações</div>,
      },
    ],
  },
]);