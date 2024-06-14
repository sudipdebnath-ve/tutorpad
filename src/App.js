
import "./App.css";
import Register from "./components/registerLogin/Register";
import Signin from "./components/registerLogin/Signin";
import { Routes, Route } from "react-router-dom";
import Starting from "./components/registerLogin/Starting";
import DomainRegister from "./components/registerLogin/DomainName";
import React, { useState, useEffect } from 'react';
import Loader from "../src/components/Loader.js";
import { AuthProvider } from '../src/components/registerLogin/AuthContext.js';
import Dashboard from "./components/users/Dashboard";
import AuthenticatedRoutes from './AuthenticatedRoutes.js';
import ForgetPassword from "./components/registerLogin/ForgetPassword.js";
import ResetPasswordSetup from "./components/users/students/ResetPassword.js";


function App() {
  const [subdomain, setSubdomain] = useState("");
 
  return (
    <div className="wrapperBody">
      <Loader/>
        <AuthProvider>
          <Routes basename={"/"}>
            {/* <Route index element={<Register />} /> */}
            <Route index element={<Register subdomain={subdomain} setSubdomain={setSubdomain} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path ="/domain-signin" element={<DomainRegister />} />
            <Route path="/starting/:token" element={<Starting />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path ="/reset-password" element={<ResetPasswordSetup />} />
            <Route path="*" element={<AuthenticatedRoutes />} />
          </Routes>
        </AuthProvider>
    </div>
  );
  
}

export default App;
