import "./App.css";
import Dashboard from "./components/users/Dashboard";
import Register from "./components/users/Register";
import Signin from "./components/users/Signin";
import { Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  return (
    <Routes>
      {/* <CookiesProvider> */}
      <Route index element={<Register />} />
      <Route path="signin" element={<Signin />} />
      {/* </CookiesProvider> */}
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
