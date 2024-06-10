import React from "react";
import { useAuth } from "./context/AuthProvider.jsx";

import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Analytics from "./pages/Analytics.jsx";
import Modules from "./pages/Modules.jsx";
import ListModule from "./pages/ListModule.jsx";
import Administrator from "./pages/Administrator.jsx";
import UserForm from "./components/administrator/UserForm.jsx";
import TypeUserTab from "./components/administrator/TypeUserTab.jsx";
import StudentForm from "./components/administrator/StudentForm.jsx";
import TeacherForm from "./components/administrator/TeacherForm.jsx";

import { RegisterProvider } from "./context/Register_context.jsx";
import UserSettings from "./pages/UserSettings.jsx";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <RegisterProvider>
      <Routes>
        <Route path="login" element={<SignIn />} />

        <Route path="register" element={<SignUp />}>
          <Route path="" element={<UserForm />} />
          <Route path="type" element={<TypeUserTab />}>
            <Route path="" element={<StudentForm />} />
            <Route path="teacher" element={<TeacherForm />} />
          </Route>
        </Route>

        <Route
          element={<ProtectedRoute validate={isAuthenticated} to="login" />}
        >
          <Route path="" element={<Home />}>
            <Route path="" element={<Modules />}>
              <Route path="list/:module/:table" element={<ListModule />} />
            </Route>
            <Route path="analytics" element={<Analytics />} />
            <Route path="administrator" element={<Administrator />} />
            <Route path="userInfo" element={<UserSettings />} />
          </Route>
        </Route>
      </Routes>
    </RegisterProvider>
  );
}
