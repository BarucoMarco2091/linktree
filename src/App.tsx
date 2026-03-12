// fazer a proteção de rota onde configura as rotas

import { createBrowserRouter } from 'react-router'
import { Home } from './Pages/Home'
import { Admin } from './Pages/Admin'
import { Login } from './Pages/Login'
import { Networks } from './Pages/Networks'
import { ErrorPage } from './Pages/Error'
import { Private } from './Routes/private'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    // verificação : se estiver logado deixa acessar, passa primeiro pelo private
    element: <Private><Admin/></Private> 
  },
  {
    path: '/admin/social',
    element: <Private><Networks/></Private>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])

export { router }