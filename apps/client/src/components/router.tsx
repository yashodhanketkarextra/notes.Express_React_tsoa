import { Routes, Route, Outlet, Navigate } from "react-router";
import { Home } from "@/pages/main/home";
import { Login } from "@/pages/auth/login";
import { NotFound } from "@/pages/main/notfound";
import { Register } from "@/pages/auth/register";
import { Notes } from "@/pages/notes/notes";

export const MainRouter = () => {
  const hasToken = !!localStorage?.getItem("token");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {!hasToken && (
          <>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        )}
        <Route element={<ProtectedRoute hasToken={hasToken} />}>
          <Route path="/notes" element={<Notes />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
};

const ProtectedRoute = ({ hasToken }: { hasToken: boolean }) => {
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
