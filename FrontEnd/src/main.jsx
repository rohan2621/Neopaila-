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
import { ClerkProvider } from '@clerk/clerk-react'
import { ToastContainer, toast } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

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
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right'/>
      </QueryClientProvider>
      </ClerkProvider>
  </StrictMode>,
)
