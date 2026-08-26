import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {RouterProvider,createBrowserRouter} from "react-router"

import './index.css'
import { Home, HomeTab } from './routes/Home'
import { Search } from './routes/Search'
import { Create } from './routes/Create'
import { Profile } from './routes/Profile'
import { Notifications } from './routes/Notifications'
import { Signin } from './routes/Signin'
import { Signup } from './routes/Signup'
import { PostPage } from './routes/PostPage'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    children:[
      {index:true,element:<HomeTab/>},
      {path:"/user/search",element:<Search/>},
      {path:"/post/create",element:<Create/>},
      {path:"/user/notifications",element:<Notifications/>},
      {path:"/:username",element:<Profile/>},
      {path:"/:username/post/:postId",element:<PostPage/>},
    ]
  },
  {
    path:"/user/signin",
    element:<Signin/>
  },
  {
    path:"/user/signup",
    element:<Signup/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
