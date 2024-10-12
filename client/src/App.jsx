import React from "react";
import { useAuth } from "./context/AuthProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/global.css';

import Inicio from "./paginas/Inicio/Inicio.jsx";
import DFormativo from "./paginas/DFormativo/DFormativo.jsx";
import DSostenible from "./paginas/DSostenible/DSostenible.jsx";
import ExtensionU from "./paginas/ExtensionU/ExtensionU.jsx";
import SEgresado from "./paginas/SEgresado/SEgresado.jsx";
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
import Inscripciones from "./pages/Inscripciones.jsx";
import ListInscripciones from "./pages/ListInscripciones.jsx";
import Tabla from "./pages/Tabla.jsx";
import DetailsModules from "./pages/DetailsModules.jsx";
import EgresadoForm from "./components/administrator/EgresadoForm.jsx";

import ProtectedRoutes from "./context/ProtectedRoutes.jsx";
import NotAuthorized from "./pages/NotAuthorized.jsx";
import VoluntariadoPage from "./coordinadores/Voluntariados/voluntariado.jsx";
import Dashboard from "./paginas/Home/Homes.jsx";
import AdministrarDFormativo from "./pages/AdminDF.jsx";
import AdministrarDSostenible from "./pages/AdminDSostenible.jsx";
import AdministrarEUniversitaria from "./pages/AdminEUniv.jsx";
import AdministrarSEgresado from "./pages/AdminSEgresado.jsx";
import FormularioVoluntariado from "./coordinadores/Voluntariados/AgregarVoluntariados.jsx";
import TallerPage from "./coordinadores/talleres/VerTalleres.jsx";
import FormularioTaller from "./coordinadores/talleres/AgregarTalleres.jsx";
import OfertaLaboralPage from "./coordinadores/bolsaLaboral/VerEmpleos.jsx";
import CapacitacionPage from "./coordinadores/capacitaciones/VerCapacitaciones.jsx";
import EventoPage from "./coordinadores/eventos/VerEventos.jsx";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <RegisterProvider>
      <Routes>
        {/* Componente Inicio antes de login */}
        <Route path="/" element={<Inicio />} />
        <Route path="/Desarrollo-Formativo" element={<DFormativo />} />
        <Route path="/Desarrollo-Sostenible" element={<DSostenible />} />
        <Route path="/Extension-Universitaria" element={<ExtensionU />} />
        <Route path="/SeguimientoAlEgresado" element={<SEgresado />} />
        <Route path="/Homes" element={<Home />} />
        <Route path="/login" element={<SignIn />} />

        <Route path="register" element={<SignUp />}>
          <Route path="" element={<UserForm />} />
          <Route path="type" element={<TypeUserTab />} >
            <Route path="" element={<StudentForm />} />
            <Route path="egresado" element={<EgresadoForm />} />
            <Route path="docente" element={<TeacherForm />} />
          </Route>
        </Route>

        <Route
          element={<ProtectedRoute validate={isAuthenticated} to="login" />}
        >
          <Route path="/Home" element={<Dashboard />} >
            <Route path="modules" element={<Modules />} >
              <Route path="list/:table" element={<ListModule />} />
              <Route path="form/:table/:id" element={<DetailsModules />} />
            </Route>

            {/* Rutas para los Coordinadores */}
            <Route path="coordinadores">
              <Route path="DesarrolloFormativo" element={<AdministrarDFormativo />}>
                {/* Las rutas hijas  */}
                <Route path="verTalleres" element={<TallerPage />} />
                <Route path="verInscritos" element={<FormularioTaller />} />
                <Route path="verEventos" element={<EventoPage />} />
                {/* <Route path="verAsistencia" element={<AsistenciaPage />} /> */}
                {/* <Route path="verAnalitica" element={<AnaliticaPage />} /> */}
              </Route>
              <Route path="DesarrolloSostenible" element={<AdministrarDSostenible />} />
              <Route path="ExtensionUniversitaria" element={<AdministrarEUniversitaria />}>
                {/* Las rutas hijas  */}
                <Route path="verVoluntariados" element={<VoluntariadoPage />} />
                <Route path="verInscritos" element={<FormularioVoluntariado />} />
              </Route>
              <Route path="SeguimientoEgresado" element={<AdministrarSEgresado />} >
                <Route path="verOfertas" element={<OfertaLaboralPage />} />
                <Route path="verCapacitaciones" element={<CapacitacionPage />} />
              </Route>
            </Route>

            <Route path="inscripciones" element={<Inscripciones />}>
              <Route path=":table" element={<ListInscripciones />} />
              <Route path="tables/:table/:id" element={<Tabla />} />
            </Route>
            <Route path="analytics" element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Analytics />
              </ProtectedRoutes>
            } />
            <Route path="userInfo" element={<UserSettings />} />
            <Route path="no-autorizado" element={<NotAuthorized />} />
          </Route>
        </Route>
      </Routes>
    </RegisterProvider>
  );
}
