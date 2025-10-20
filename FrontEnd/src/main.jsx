import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { MainLayout } from './Layout/MainLayout.jsx';
import HomePage from './Routes/HomePage.jsx';
import { PostListPage } from './Routes/PostListPage.jsx';
import { SinglePostPage } from './Routes/SinglePostPage.jsx';
import { Write } from './Routes/Write.jsx';
import LoginPage from './Routes/LoginPage.jsx';
import { RegisterPage } from './Routes/RegisterPage.jsx';


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },{
        path: "/posts",
        element: <PostListPage/>,
      },{
        path: "/:slug",
        element: <SinglePostPage/>,
      },{
        path: "/write",
        element: <Write/>,
      },{
        path: "/login",
        element: <LoginPage/>,
      },{
        path: "/register",
        element: <RegisterPage/>,
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
