import { PiggyBank } from 'lucide-react'

import { createBrowserRouter } from 'react-router-dom'

import { Button } from './componets/shared/Button'
import { RootLayout } from './componets/layout/RootLayout';


export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <h1>Smart Financial Educator</h1>
          { /* <Button variant="primary" icon={PiggyBank} className ="w-full">
              {' '}
              Clique aqui
            </Button>*/}
          </>
        ),
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
