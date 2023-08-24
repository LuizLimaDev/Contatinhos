import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import SingUp from "./pages/SingUp/index.jsx";
import Home from "./pages/Home/index.jsx";
import { useLocalStorage } from 'react-use';

function ProtectedRoutes({ redirectTo }) {
  const [value] = useLocalStorage('token');
  const isAuthenticated = value;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/singup" element={<SingUp />} />

      <Route element={<ProtectedRoutes redirectTo='/' />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes >
  )
}

export default MainRoutes;