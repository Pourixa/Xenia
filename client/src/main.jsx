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
import { ProfilePosts } from './components/Profile/ProfilePosts'
import { ProfileLikes } from './components/Profile/ProfileLikes'
import { ProfileComments } from './components/Profile/ProfileComments'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <HomeTab /> },

      { path: "/search", element: <Search /> },
      { path: "/create", element: <Create /> },
      { path: "/notifications", element: <Notifications /> },

        {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
      {
        path: "/:username",
        element: <Profile />,
        children: [
          { index: true, element: <ProfilePosts /> },
          { path: "likes", element: <ProfileLikes /> },
          { path: "comments", element: <ProfileComments /> },
        ]
      },

      { path: ":username/post/:postId", element: <PostPage /> },
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
