import "./App.css";
import SignUp from "./views/auth/signup";
import SignIn from "./views/auth/signin";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./views/auth/Dashboard";

const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

const PrivateRoute = ({ element }) => {
  if (isAuthenticated()) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
