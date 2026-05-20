import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import DashboardPage from "./pages/dashboard";
import UsersPage from "./pages/users";
import UserCreatePage from "./pages/users/create";
import UserEditPage from "./pages/users/edit";
import UserViewPage from "./pages/users/view";
import CropsPage from "./pages/crops";
import CropCreatePage from "./pages/crops/create";
import CropEditPage from "./pages/crops/edit";
import CropViewPage from "./pages/crops/view";
import LogsPage from "./pages/logpg";
import { DashboardLayout } from "./components/templates/dashboard-layout";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
  const { isLoading } = useThemeContext()

  if (isLoading) {
    return null
  }

  return (
    <Routes>
      <Route path="/" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/create" element={<UserCreatePage />} />
        <Route path="users/edit/:id" element={<UserEditPage />} />
        <Route path="users/view/:id" element={<UserViewPage />} />
        
        <Route path="crops" element={<CropsPage />} />
        <Route path="crops/create" element={<CropCreatePage />} />
        <Route path="crops/edit/:id" element={<CropEditPage />} />
        <Route path="crops/view/:id" element={<CropViewPage />} />

        <Route path="logs" element={<LogsPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
