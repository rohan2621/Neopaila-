// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import "leaflet/dist/leaflet.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import { MainLayout } from "./Layout/MainLayout.jsx";
import RequireAdmin from "./Components/Auth/RequireAdmin.jsx";

import HomePage from "./Routes/HomePage.jsx";
import { PostListPage } from "./Routes/PostListPage.jsx";
import { SinglePostPage } from "./Routes/SinglePostPage.jsx";
import { Write } from "./Routes/Write.jsx";
import LoginPage from "./Routes/LoginPage.jsx";
import { RegisterPage } from "./Routes/RegisterPage.jsx";
import Gallery from "./Components/Gallery.jsx";
import JoinUsPage from "./Routes/JoinUsPage.jsx";

import MapsPage from "./Components/MapsPage.jsx";
import LocationPage from "./Components/LocationPage.jsx";
import WriteMap from "./Components/WriteMap.jsx";

import ContactUsPage from "./Routes/ContactUsPage.jsx";
import AdminContactPage from "./Routes/AdminContactPage.jsx";

import SmoothScroll from "./Components/providers/SmoothScroll.jsx";
import "./leafletIconFix";
import AboutPage from "./Routes/AboutPage.jsx";
import PageNotFound from "./Routes/PageNotFound.jsx";

const queryClient = new QueryClient();
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <SmoothScroll>
          <HashRouter>
            <Routes>
              {/* Main Layout wrapper */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<PostListPage />} />
                <Route path="/write" element={<Write />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/gallery" element={<Gallery />} />

                {/* MAP ROUTES */}
                <Route path="/maps" element={<MapsPage />} />
                <Route path="/maps/write" element={<WriteMap />} />
                <Route path="/maps/:slug" element={<LocationPage />} />

                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* ADMIN ROUTE */}
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminContactPage />
                    </RequireAdmin>
                  }
                />

                {/* Dynamic post route */}
                <Route path="/:slug" element={<SinglePostPage />} />

                {/* 404 Page — MUST BE LAST */}
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </HashRouter>
          <ToastContainer position="bottom-right" />
        </SmoothScroll>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
