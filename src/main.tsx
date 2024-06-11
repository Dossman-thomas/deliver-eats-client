import React from "react"; // Import the React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering the application
import "./global.css"; // Import global CSS styles
import { BrowserRouter as Router } from "react-router-dom"; // Import the BrowserRouter for handling routing
import AppRoutes from "./AppRoutes"; // Import the component that defines the application's routes
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate"; // Import the Auth0 provider for authentication
import { QueryClient, QueryClientProvider } from "react-query"; // Import React Query's client and provider
import { Toaster } from "sonner";

// Create a new QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus for all queries
    },
  },
});

// Render the React application to the root DOM node
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* StrictMode helps to detect potential problems in an application */}
    <Router>
      {/* Router component for enabling routing */}
      <QueryClientProvider client={queryClient}>
        {/* Provide the QueryClient to the React Query context */}
        <Auth0ProviderWithNavigate>
          {/* Provide authentication context using Auth0 */}
          <AppRoutes />
          {/* Render the application's routes */}
          <Toaster visibleToasts={1} position="top-right" richColors />
          {/* Render the Toaster component for displaying notifications */}
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
