import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Users from "./pages/Users";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { RolProvider } from "./context/RolContext";
import { EmpleadoProvider } from "./context/EmpleadoContext";
import { PuestoProvider } from "./context/PuestoContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RolProvider>
          <PuestoProvider>
          <EmpleadoProvider>
            <BrowserRouter>
              <main className="">
                <Navbar />
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/home" element={<HomePage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<RegisterPage />} />


                  </Route>
                </Routes>
              </main>
            </BrowserRouter>
          </EmpleadoProvider>
          </PuestoProvider>
        </RolProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
