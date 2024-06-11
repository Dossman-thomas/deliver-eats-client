import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

// Define the main routes of the application
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route for the home page */}
      <Route
        path="/"
        element={
          // Wrap the HomePage component inside the Layout component with a hero section
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      {/* Route for the authentication callback page */}
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      {/* Protected route for user profile page */}
      <Route element={<ProtectedRoute />}>
        {/* Sub-route for the user profile page */}
        <Route
          path="/user-profile"
          element={
            // Wrap the UserProfilePage component inside the Layout component
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      {/* Default route for any other path, redirect to the home page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
