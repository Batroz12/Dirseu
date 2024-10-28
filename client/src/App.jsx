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
import FormularioOfertaLaboral from "./coordinadores/bolsaLaboral/AgregarEmpleos.jsx";
import OfertaLaboralPage from "./coordinadores/bolsaLaboral/VerEmpleos.jsx";
import CapacitacionPage from "./coordinadores/capacitaciones/VerCapacitaciones.jsx";
import EventoPage from "./coordinadores/eventos/VerEventos.jsx";

import VerInscritosCapacitaciones from "./coordinadores/capacitaciones/verInscritos.jsx";
import VerInscritosTalleres from "./coordinadores/talleres/verInscritos.jsx";
import VerInscritosVoluntariados from "./coordinadores/Voluntariados/verInscritos.jsx";

// Nuevas rutas de Empleador y Egresado
import DashboardEmpleador from "./empleador/DashboardEmpleador.jsx";
import AgregarOfertaLaboral from "./empleador/AgregarOfertaLaboral.jsx";
// import Notificaciones from "./egresado/Notificaciones.jsx";

import CreateUserEmpleador from "./coordinadores/empleadores/agregarEmpleador.jsx";
import UserFormEmpleador from "./coordinadores/empleadores/userform.jsx";
import ListaOfertas from "./empleador/ListaOfertas.jsx";
import EmpleosConModal from "./egresado/verEmpleos.jsx";
import Convenios from "./egresado/convenios.jsx";
import FormatosAcademicosActualizados from "./egresado/formatosAcademicos.jsx";

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
                <Route path="verInscritos" element={<VerInscritosTalleres />} />
                <Route path="verEventos" element={<EventoPage />} />
                {/* <Route path="verAsistencia" element={<AsistenciaPage />} /> */}
                {/* <Route path="verAnalitica" element={<AnaliticaPage />} /> */}
              </Route>
              <Route path="DesarrolloSostenible" element={<AdministrarDSostenible />} />
              <Route path="ExtensionUniversitaria" element={<AdministrarEUniversitaria />}>
                <Route path="verVoluntariados" element={<VoluntariadoPage />} />
                <Route path="verInscritos" element={<VerInscritosVoluntariados />} />
              </Route>
              <Route path="SeguimientoEgresado" element={<AdministrarSEgresado />} >
                <Route path="verOfertas" element={<OfertaLaboralPage />} />
                <Route path="verCapacitaciones" element={<CapacitacionPage />} />
                <Route path="verInscritos" element={<VerInscritosCapacitaciones />} />
                <Route path="userEmForm" element={<UserFormEmpleador />} />
                <Route path="agregarEmpleador" element={<CreateUserEmpleador />} />
              </Route>
            </Route>
            {/* Rutas del Empleador */}
            <Route path="empleador">
              <Route path="Agregar-Empleo" element={<AgregarOfertaLaboral />} />
              <Route path="dashboard" element={<DashboardEmpleador />} >
                <Route path="AgregarEmpleo" element={<FormularioOfertaLaboral />} />
              </Route>
              
              {/* <Route path="editar-oferta/:id" element={<EditarOferta />} />
              <Route path="estadisticas" element={<EstadisticasEmpleador />} />
              <Route path="listar" element={<ListaOfertas />} /> */}
            </Route>
            {/* Rutas del Egresado */}
            <Route path="Egresado">
              <Route path="empleos" element={<EmpleosConModal />} />
              <Route path="convenios" element={<Convenios />} />
              <Route path="Formatos" element={<FormatosAcademicosActualizados />} />

              {/* <Route path="notificaciones" element={<Notificaciones />} /> */}
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
