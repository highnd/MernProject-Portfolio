import Auth from "./components/Auth";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ForgetPassword from "./components/Auth/ForgetPassword";
import EmailVarification from "./components/Auth/EmailVarification";
import ConfirmPassword from "./components/Auth/ConfirmPassword";
import NotFound404 from "./components/NotFound404";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/auth/email-varification"
          element={<EmailVarification />}
        />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
