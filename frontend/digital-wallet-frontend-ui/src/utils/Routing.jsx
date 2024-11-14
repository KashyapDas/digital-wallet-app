import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import Send from "../pages/Send";

function Routing() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
  );
}

export default Routing;
