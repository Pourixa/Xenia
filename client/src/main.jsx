import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {RouterProvider,createBrowserRouter} from "react-router"

import './index.css'
import { Home } from './routes/Home'
import { Search } from './routes/Search'
import { Create } from './routes/Create'
import { Profile } from './routes/Profile'
import { Notifications } from './routes/Notifications'
import { Signin } from './routes/Signin'
import { Signup } from './routes/Signup'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    children:[
      {path:"/search",element:<Search/>},
      {path:"/create",element:<Create/>},
      {path:"/profile",element:<Profile/>},
      {path:"/notifications",element:<Notifications/>},
    ]
  },
  {
    path:"/signin",
    element:<Signin/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
