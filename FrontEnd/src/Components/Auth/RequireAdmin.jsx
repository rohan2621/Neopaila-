import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return null; // avoid flicker

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🚫 Access Denied</h1>
          <p className="text-gray-600">
            This page is only available to administrators.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireAdmin;
