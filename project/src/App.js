import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage";
import VerificationCodePage from "./Pages/ForgotPassword/VerificationCodePage";
import NewPasswordPage from "./Pages/ForgotPassword/NewPasswordPage";
import NewLendPage from "./Pages/NewLendItem";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<NewLendPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verification" element={<VerificationCodePage />} />
        <Route path="/set-new-password" element={<NewPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;