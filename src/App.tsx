import { createBrowserRouter } from 'react-router'
import { Home } from './Pages/Home'
import { Admin } from './Pages/Admin'
import { Login } from './Pages/Login'
import { Networks } from './Pages/Networks'

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
    element: <Admin/>
  },
  {
    path: '/admin/social',
    element: <Networks/>
  }
])

export { router }