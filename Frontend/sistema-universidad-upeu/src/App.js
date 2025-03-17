import React from 'react';

import "./App.css";
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import GeneralProtectedRouteComponent from './components/general/GeneralProtectedRouteComponent';
import ListRolComponent from './components/administrador/GestionarRol/ListRolComponent';
import AddRolComponent from './components/administrador/GestionarRol/AddRolComponent';
import AddUsuarioComponent from './components/administrador/GestionarUsuario/AddUsuarioComponent';
import ListUsuarioComponent from './components/administrador/GestionarUsuario/ListUsuarioComponent';
import AddPersonaComponent from './components/administrador/GestionarPersona/AddPersonaComponent';
import ListPersonaComponent from './components/administrador/GestionarPersona/ListPersonaComponent';
import ListAdministradorComponent from './components/administrador/GestionarAdministrador/ListAdministradorComponent';
import AddAdministradorComponent from './components/administrador/GestionarAdministrador/AddAdministradorComponent';
import ListAdministrativoComponent from './components/administrador/GestionarAdministrativo/ListAdministrativoComponent';
import AddAdministrativoComponent from './components/administrador/GestionarAdministrativo/AddAdministrativoComponent';
import ListDocenteComponent from './components/administrador/GestionarDocente/ListDocenteComponent';
import AddDocenteComponent from './components/administrador/GestionarDocente/AddDocenteComponent';
import ListEstudianteComponent from './components/administrador/GestionarEstudiante/ListEstudianteComponent';
import AddEstudianteComponent from './components/administrador/GestionarEstudiante/AddEstudianteComponent';

import GeneralInicioDashboardComponent from './components/general/inicioDashboard/GeneralInicioDashboardComponent';
import GeneralLoginComponent from './components/general/GeneralLoginComponent';
import AdministradorDashboardComponent from './components/administrador/AdministradorDashboardComponent';
import { getUserRole, isAuthenticated } from './services/authServices/authService'; // Importa la función de verificación de autenticación
import GeneralEmailComponent from './components/general/GeneralEmailComponent';
import GeneralRestablecerContraseniaComponent from './components/general/GeneralRestablecerContraseniaComponent';
import GeneralCambiarContraseniaComponent from './components/general/GeneralCambiarContraseniaComponent';
import Unauthorized from './components/general/GeneralUnauthorizedComponent'; // Importa tu componente de no autorizado

import GestionarInscripcionesComponent from './components/administrador/GestionarInscripcion/GestionarInscripcionesComponent';
import ListInscripcionAdministradorComponent from './components/administrador/GestionarInscripcion/ListInscripcionAdministradorComponent';
import ListInscripcionAdministrativoComponent from './components/administrador/GestionarInscripcion/ListInscripcionAdministrativoComponent';
import ListInscripcionDocenteComponent from './components/administrador/GestionarInscripcion/ListInscripcionDocenteComponent';
import ListInscripcionEstudianteComponent from './components/administrador/GestionarInscripcion/ListInscripcionEstudianteComponent';
import ListInscripcionNuevoRolComponent from './components/administrador/GestionarInscripcion/ListInscripcionNuevoRolComponent';
import AddInscripcionAdministradorComponent from './components/administrador/GestionarInscripcion/AddInscripcionAdministradorComponent';
import AddInscripcionAdministrativoComponent from './components/administrador/GestionarInscripcion/AddInscripcionAdministrativoComponent';
import AddInscripcionDocenteComponent from './components/administrador/GestionarInscripcion/AddInscripcionDocenteComponent';
import AddInscripcionEstudianteComponent from './components/administrador/GestionarInscripcion/AddInscripcionEstudianteComponent';
import AddInscripcionNuevoRolComponent from './components/administrador/GestionarInscripcion/AddInscripcionNuevoRolComponent';

import ChatComponent from './components/realTimeChat/ChatComponent';
import LoginComponent from './components/realTimeChat/LoginComponent';
import GeneralViewProfileComponent from './components/general/dashboard/opcionesCuenta/GeneralViewProfileComponent';
import AdministrativoDashboardComponent from './components/administrativo/AdministrativoDashboardComponent';
import DocenteDashboardComponent from './components/docente/DocenteDashboardComponent';
import EstudianteDashboardComponent from './components/estudiante/EstudianteDashboardComponent';

import InicioMatriculaComponent from './components/estudiante/matricula/InicioMatriculaComponent';

import SelectNivEnsenianzaMatriculaComponent from './components/estudiante/matricula/SelectNivEnsenianzaMatriculaComponent';
import PortalDelEstudianteComponent from './components/estudiante/portalDelEstudiante/PortalDelEstudianteComponent';
import PlanAcademicoComponent from './components/estudiante/portalDelEstudiante/opciones/PlanAcademicoComponent';
import EstadoFinancieroComponent from './components/estudiante/portalDelEstudiante/opciones/estadoFinanciero/EstadoFinancieroComponent';
import ValidarPagoComponent from './components/administrativo/validacionDePago/ValidarPagoComponent';
import ListVouchersComponent from './components/estudiante/portalDelEstudiante/opciones/estadoFinanciero/voucher/ListVouchersComponent';
import AddVoucherComponent from './components/estudiante/portalDelEstudiante/opciones/estadoFinanciero/voucher/AddVoucherComponent';
import VerVoucherComponent from './components/estudiante/portalDelEstudiante/opciones/estadoFinanciero/voucher/VerVoucherComponent';
import MostrarBoletaOFacturaComponent from './components/administrativo/validacionDePago/MostrarBoletaOFacturaComponent';
import VerComprobanteComponent from './components/estudiante/portalDelEstudiante/opciones/estadoFinanciero/comprobante/VerComprobanteComponent';
import CompromisoYConsentimientoComponent from './components/estudiante/matricula/CompromisoYConsentimientoComponent';
import MatriculaProtectedRouteComponent from './components/estudiante/matricula/matriculaProtectedRoute/MatriculaProtectedRouteComponent';
import VerMensajeSeguridadComponent from './components/estudiante/matricula/matriculaProtectedRoute/VerMensajeSeguridadComponent';
import MatriculaComponent from './components/estudiante/matricula/MatriculaComponent';
import AddResponsableFinancieroComponent from './components/estudiante/matricula/matriculaSecciones/datosPersonales/AddResponsableFinancieroComponent';

const App = () => {
  const nombreDelRol = getUserRole();

  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<GeneralInicioDashboardComponent />} />

          {/* Ruta de login pública */}
          <Route path='/login' element={<GeneralLoginComponent />} />
          <Route path='/email' element={<GeneralEmailComponent />} />
          <Route path='/restablecimiento-contrasenia' element={<GeneralRestablecerContraseniaComponent />} />
          <Route path='/cambiar-contrasenia/:token' element={<GeneralCambiarContraseniaComponent />} />

          {/* RUTAS DEL ADMINISTRADOR*/}

          {/* Ruta protegida para el dashboard */}
          <Route
            path='/dashboard-administrador'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AdministradorDashboardComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          {/* Ruta protegida para el dashboard */}
          <Route
            path='/dashboard-administrador'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AdministradorDashboardComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path='/roles'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListRolComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-rol'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddRolComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/edit-rol/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddRolComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/usuarios'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListUsuarioComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-usuario'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddUsuarioComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/edit-usuario/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddUsuarioComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/personas'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListPersonaComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-persona'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddPersonaComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/edit-persona/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddPersonaComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/administradores'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListAdministradorComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-administrador'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddAdministradorComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/edit-administrador/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddAdministradorComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/administrativos'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListAdministrativoComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-administrativo'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddAdministrativoComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/edit-administrativo/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddAdministrativoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/docentes'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListDocenteComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-docente'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddDocenteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-docente/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddDocenteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/estudiantes'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />
          <Route
            path='/add-estudiante'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-estudiante/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/inscripciones'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <GestionarInscripcionesComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/list-inscripcion-administrador'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListInscripcionAdministradorComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/list-inscripcion-administrativo'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListInscripcionAdministrativoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/list-inscripcion-docente'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListInscripcionDocenteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/list-inscripcion-estudiante'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListInscripcionEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/list-inscripcion-nuevo-rol'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <ListInscripcionNuevoRolComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-inscripcion-administrador'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionAdministradorComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-inscripcion-administrativo'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionAdministrativoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-inscripcion-docente'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionDocenteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-inscripcion-estudiante'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-inscripcion-nuevo-rol'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionNuevoRolComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-inscripcion-administrador/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionAdministradorComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-inscripcion-administrativo/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionAdministrativoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-inscripcion-docente/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionDocenteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-inscripcion-estudiante/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/edit-inscripcion-nuevo-rol/:id'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRADOR']}>
                <AddInscripcionNuevoRolComponent />
              </GeneralProtectedRouteComponent>
            }
          />


          {/* RUTAS DEL ADMINISTRATIVO*/}

          {/* Ruta protegida para el dashboard */}
          <Route
            path='/dashboard-administrativo'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRATIVO']}>
                <AdministrativoDashboardComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/validacion-pagos'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRATIVO']}>
                <ValidarPagoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/mostrar-comprobante-generado/:comprobanteURL'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ADMINISTRATIVO']}>
                <MostrarBoletaOFacturaComponent />
              </GeneralProtectedRouteComponent>
            }
          />


          {/* RUTAS DEL DOCENTE*/}

          {/* Ruta protegida para el dashboard */}
          <Route
            path='/dashboard-docente'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['DOCENTE']}>
                <DocenteDashboardComponent />
              </GeneralProtectedRouteComponent>
            }
          />


          {/* RUTAS DEL ESTUDIANTE*/}

          {/* Ruta protegida para el dashboard */}
          <Route
            path='/dashboard-estudiante'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
              < EstudianteDashboardComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          {/* Rutas protegidas para la matricula virtual */}
          <Route
            path='/inicio-matricula-virtual-estudiante'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <InicioMatriculaComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/select-matricula-virtual-estudiante'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <SelectNivEnsenianzaMatriculaComponent />
              </GeneralProtectedRouteComponent>
            }
          />


          <Route
            path="/login-real-time-chat"
            element={
              <LoginComponent />
            }
          />

          <Route
            path="/chat-real-time-chat"
            element={
              <ChatComponent />
            }
          />

          <Route
            path='/ver-perfil'
            element={
              <GeneralProtectedRouteComponent allowedRoles={[nombreDelRol]}>
                <GeneralViewProfileComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/portal-academico'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <PortalDelEstudianteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/plan-academico'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <PlanAcademicoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/estado-financiero'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <EstadoFinancieroComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/list-vouchers/:idCuentaFinanciera/:anioSeleccionado'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <ListVouchersComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-voucher/:idCuentaFinanciera/:anioSeleccionado'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <AddVoucherComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/ver-voucher/:voucherURL'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <VerVoucherComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/ver-comprobante/:comprobanteUrl'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <VerComprobanteComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/compromiso-consentimiento/:idOpcionNivel/:idNivelEnsenanza'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <CompromisoYConsentimientoComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/mensaje-seguridad'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <VerMensajeSeguridadComponent />
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/matricula/:idOpcionNivel/:idNivelEnsenanza'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <MatriculaProtectedRouteComponent>
                  <MatriculaComponent />
                </MatriculaProtectedRouteComponent>
              </GeneralProtectedRouteComponent>
            }
          />

          <Route
            path='/add-responsableFinanciero/:idResponsableFinanciero/:idOpcionNivel'
            element={
              <GeneralProtectedRouteComponent allowedRoles={['ESTUDIANTE']}>
                <MatriculaProtectedRouteComponent>
                  <AddResponsableFinancieroComponent />
                </MatriculaProtectedRouteComponent>
              </GeneralProtectedRouteComponent>
            }
          />

          <Route path='/unauthorized' element={<Unauthorized />} /> {/* Ruta para no autorizado */}
          <Route path='*' element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;