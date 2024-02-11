import { ReactNode, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import PrivatePage from "./components/PrivatePage";
import { Context } from "./index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuthentication redirectTo={"/login"}>
              <PrivatePage />
            </RequireAuthentication>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuthentication({
  children,
  redirectTo,
}: {
  children: ReactNode;
  redirectTo: string;
}) {
  const store = useContext(Context);
  return (
    <>{store.store.isAuthenticated ? children : <Navigate to={redirectTo} />}</>
  );
}
export default App;
