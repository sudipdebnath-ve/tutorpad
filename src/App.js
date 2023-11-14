import "./App.css";
import Dashboard from "./components/users/Dashboard";
import Register from "./components/users/Register";
import Signin from "./components/users/Signin";
import { Routes, Route } from "react-router-dom";
import MyPreferences from "./components/users/MyPreferences";

function App() {
  return (
    <Routes>
      <Route index element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-preferences" element={<MyPreferences />} />
    </Routes>
  );
}

export default App;
