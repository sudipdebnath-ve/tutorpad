import "./App.css";
import Dashboard from "./components/users/Dashboard";
import Register from "./components/registerLogin/Register";
import Signin from "./components/registerLogin/Signin";
import { Routes, Route } from "react-router-dom";
import MyPreferences from "./components/users/MyPreferences";
import ForgetPassword from "./components/registerLogin/ForgetPassword";
import EmailTemplates from "./components/users/EmailTemplates";

function App() {
  return (
    <Routes>
      <Route index element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-preferences" element={<MyPreferences />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/email-templates" element={<EmailTemplates />} />
    </Routes>
  );
}

export default App;
