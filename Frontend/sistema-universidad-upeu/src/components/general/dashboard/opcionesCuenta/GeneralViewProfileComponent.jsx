import React, { useEffect, useState } from "react";
import "../../../../style-sheets/general/dashboard/opcionesCuenta/GeneralViewProfileComponent.css";
import { useNavigate } from "react-router-dom";
import { getInscripcionId } from "../../../../services/authServices/authService";
import InscripcionService from "../../../../services/inscripcionServices/InscripcionService";
import PersonaService from "../../../../services/personaServices/PersonaService";
import CursoService from "../../../../services/cursoServices/CursoService"
import CarreraService from "../../../../services/carreraServices/CarreraService";

const GeneralViewProfileComponent = () => {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const inscripcionId = getInscripcionId();

  //Datos generales

  //Rol
  const [nombreRol, setNombreRol] = useState("");
  const [description, setDescription] = useState("");
  //Usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [enabled, setEnabled] = useState("");
  const [ultimoLogin, setUltimoLogin] = useState("");
  //Persona
  const [nombres, setNombres] = useState("");
  const [apellido_paterno, setApellido_paterno] = useState("");
  const [apellido_materno, setApellido_materno] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [tipoSangre, setTipoSangre] = useState("");
  const [responsableFinanciero, setResponsableFinanciero] = useState("");
  const [contactoEmergenciaNombre, setContactoEmergenciaNombre] = useState("");
  const [contactoEmergenciaTelefono, setContactoEmergenciaTelefono] = useState("");
  const [contactoEmergenciaEmail, setContactoEmergenciaEmail] = useState("");
  const [contactoEmergenciaDireccion, setContactoEmergenciaDireccion] = useState("");
  const [contactoEmergenciaCiudad, setContactoEmergenciaCiudad] = useState("");
  const [contactoEmergenciaParentesco, setContactoEmergenciaParentesco] = useState("");

  const [imagendePersona, setImagenDePersona] = useState("")

  //Datos de Administrador
  const [actividadReciente, setActividadReciente] = useState("");
  const [fechaActividad, setFechaActividad] = useState("");
  const [estadoSistema, setEstadoSistema] = useState("");
  const [fechaUltimaRevision, setFechaUltimaRevision] = useState("");
  const [permisosEspeciales, setPermisosEspeciales] = useState("");
  const [logsAcceso, setLogsAcceso] = useState("");
  const [cambiosConfiguracion, setCambiosConfiguracion] = useState("");

  //Datos de Administrativo
  const [registroPagos, setRegistroPagos] = useState("");
  const [montoTotalPagos, setMontoTotalPagos] = useState("");
  const [fechaUltimoPago, setFechaUltimoPago] = useState("");
  const [gestionEmpleados, setGestionEmpleados] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [cargoEmpleado, setCargoEmpleado] = useState("");
  const [solicitudesPendientes, setSolicitudesPendientes] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState("");

  //Datos de Docente
  const [departamentoDocente, setDepartamentoDocente] = useState("");
  const [tituloAcademico, setTituloAcademico] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const [cursosImpartidos, setCursosImpartidos] = useState([]);
  const [nuevoCursoImpartido, setNuevoCursoImpartido] = useState("");

  const [historialLaboral, setHistorialLaboral] = useState([]);

  const [puesto, setPuesto] = useState("");
  const [departamentoHistorialLaboral, setDepartamentoHistorialLaboral] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [estadoLaboral, setEstadoLaboral] = useState("");
  const [tipoDocente, setTipoDocente] = useState("");
  const [fechaContratacionDocente, setFechaContratacionDocente] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [salario, setSalario] = useState("");
  const [horarioDocente, setHorarioDocente] = useState("");

  const [publicacionesAcademicas, setPublicacionesAcademicas] = useState([]);
  const [nuevaPublicacionAcademica, setNuevaPublicacionAcademica] = useState("");

  const [proyectosInvestigacion, setProyectosInvestigacion] = useState([]);
  const [nuevoProyectoInvestigacion, setNuevoProyectoInvestigacion] = useState("");

  const [numeroOficina, setNumeroOficina] = useState("");
  const [extensionTelefonica, setExtensionTelefonica] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const [logrosAcademicos, setLogrosAcademicos] = useState([]);
  const [nuevoLogroAcademico, setNuevoLogroAcademico] = useState("");

  const [fechaJubilacion, setFechaJubilacion] = useState("");

  const [cursosDocente, setCursosDocente] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState("");

  const [cursosService, setCursosService] = useState([]);

  //Datos de Estudiante
  const [matricula, setMatricula] = useState("");
  const [cicloActual, setCicloActual] = useState("");
  const [promedioGeneral, setPromedioGeneral] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [estado, setEstado] = useState("");
  const [tipoEstudiante, setTipoEstudiante] = useState("");
  const [beca, setBeca] = useState("");
  const [numeroMatricula, setNumeroMatricula] = useState("");
  const [carrerasIngresadasIds, setCarrerasIngresadasIds] = useState([]);
  const [nuevaCarrera, setNuevaCarrera] = useState(""); // Carrera a agregar
  const [asignaturasMatriculadas, setAsignaturasMatriculadas] = useState([]);
  const [nuevaAsignatura, setNuevaAsignatura] = useState("");
  const [horarioEstudiante, setHorarioEstudiante] = useState("");
  const [consejeroAcademico, setConsejeroAcademico] = useState("");
  const [fechaGraduacion, setFechaGraduacion] = useState("");
  const [practicasRealizadas, setPracticasRealizadas] = useState([]);
  const [nuevaPractica, setNuevaPractica] = useState("");

  const [historialAcademico, setHistorialAcademico] = useState([]);

  const [nombreCurso, setNombreCurso] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");

  const [carreras, setCarreras] = useState([]);
  const [cursosEstudiante, setCursosEstudiante] = useState([]);

  const datosDelPerfil = () => {
    InscripcionService.getInscripcionById(inscripcionId).then(async (response) => {

      console.log("Estos son los datos de la inscripcion: " + JSON.stringify(response.data, null, 2));
      //Rol
      setNombreRol(response.data.rol.nombreRol);
      setDescription(response.data.rol.description);

      //Usuario
      setUsername(response.data.usuario.username);
      setPassword(response.data.usuario.password);
      setEmailUsuario(response.data.usuario.email);
      setEnabled(response.data.usuario.enabled);
      setUltimoLogin(response.data.usuario.ultimoLogin);

      //Persona
      setNombres(response.data.persona.nombres);
      setApellido_paterno(response.data.persona.apellido_paterno);
      setApellido_materno(response.data.persona.apellido_materno);
      setFecha_nacimiento(response.data.persona.fecha_nacimiento);
      setGenero(response.data.persona.genero);
      setNacionalidad(response.data.persona.nacionalidad);
      setTipoDocumento(response.data.persona.tipoDocumento);
      setNumeroDocumento(response.data.persona.numeroDocumento);
      setDireccion(response.data.persona.direccion);
      setCiudad(response.data.persona.ciudad);
      setDepartamento(response.data.persona.departamento);
      setPais(response.data.persona.pais);
      setProvincia(response.data.persona.provincia);
      setTelefono(response.data.persona.telefono);
      setEmail(response.data.persona.email);
      setEstadoCivil(response.data.persona.estadoCivil);
      setFotoPerfil(response.data.persona.fotoPerfil);

      if (response.data.persona.fotoPerfil) {
        const imagenUrl = await PersonaService.getPersonaImagen(response.data.persona.fotoPerfil);
        console.log("URL de la imagen de Persona:", imagenUrl);
        setImagenDePersona(imagenUrl);
      } else {
        console.warn("La Persona no tiene una foto de Perfil definida.")
      }


      setTipoSangre(response.data.persona.tipoSangre);
      setResponsableFinanciero(response.data.persona.responsableFinanciero);
      setContactoEmergenciaNombre(response.data.persona.contactoEmergenciaNombre);
      setContactoEmergenciaTelefono(response.data.persona.contactoEmergenciaTelefono);
      setContactoEmergenciaEmail(response.data.persona.contactoEmergenciaEmail);
      setContactoEmergenciaDireccion(response.data.persona.contactoEmergenciaDireccion);
      setContactoEmergenciaCiudad(response.data.persona.contactoEmergenciaCiudad);
      setContactoEmergenciaParentesco(response.data.persona.contactoEmergenciaParentesco);


      console.log("Este es el nombre del rol: " + response.data.rol.nombreRol);
      if (response.data.rol.nombreRol === "ADMINISTRADOR") {

        setActividadReciente(response.data.administrador.actividadReciente);
        setFechaActividad(response.data.administrador.fechaActividad);
        setEstadoSistema(response.data.administrador.estadoSistema);
        setFechaUltimaRevision(response.data.administrador.fechaUltimaRevision);
        setPermisosEspeciales(response.data.administrador.permisosEspeciales);
        setLogsAcceso(response.data.administrador.logsAcceso);
        setCambiosConfiguracion(response.data.administrador.cambiosConfiguracion);

      } else if (response.data.rol.nombreRol === "ADMINISTRATIVO") {

        setRegistroPagos(response.data.administrativo.registroPagos);
        setMontoTotalPagos(response.data.administrativo.montoTotalPagos);
        setFechaUltimoPago(response.data.administrativo.fechaUltimoPago);
        setGestionEmpleados(response.data.administrativo.gestionEmpleados);
        setFechaContratacion(response.data.administrativo.fechaContratacion);
        setCargoEmpleado(response.data.administrativo.cargoEmpleado);
        setSolicitudesPendientes(response.data.administrativo.solicitudesPendientes);
        setFechaSolicitud(response.data.administrativo.fechaSolicitud);

      } else if (response.data.rol.nombreRol === "DOCENTE") {
        setDepartamento(response.data.docente.departamento);
        setTituloAcademico(response.data.docente.tituloAcademico);
        setEspecialidad(response.data.docente.especialidad);
        setCursosImpartidos(response.data.docente.cursosImpartidos);
        setHistorialLaboral(response.data.docente.historialLaboral);
        setEstadoLaboral(response.data.docente.estadoLaboral);
        setTipoDocente(response.data.docente.tipoDocente);
        setFechaContratacion(response.data.docente.fechaContratacion);
        setTipoContrato(response.data.docente.tipoContrato);
        setSalario(response.data.docente.salario);
        setHorarioDocente(response.data.docente.horario);
        setPublicacionesAcademicas(response.data.docente.publicacionesAcademicas);
        setProyectosInvestigacion(response.data.docente.proyectosInvestigacion);
        setNumeroOficina(response.data.docente.numeroOficina);
        setExtensionTelefonica(response.data.docente.extensionTelefonica);
        setSupervisor(response.data.docente.supervisor);
        setLogrosAcademicos(response.data.docente.logrosAcademicos);
        setFechaJubilacion(response.data.docente.fechaJubilacion);
        setCursosDocente(response.data.docente.cursos);

      } else if (response.data.rol.nombreRol === "ESTUDIANTE") {

        console.log("Estos son los 15 datos del estudiante: ");
        console.log(response.data.estudiante.matricula)
        console.log(response.data.estudiante.cicloActual)
        console.log(response.data.estudiante.promedioGeneral)
        console.log(response.data.estudiante.fechaIngreso)
        console.log(response.data.estudiante.estado)
        console.log(response.data.estudiante.tipoEstudiante)
        console.log(response.data.estudiante.beca)
        console.log(response.data.estudiante.numeroMatricula)
        console.log(response.data.estudiante.carrerasIngresadasIds)
        console.log(response.data.estudiante.asignaturasMatriculadas)
        console.log(response.data.estudiante.horario)
        console.log(response.data.estudiante.consejeroAcademico)
        console.log(response.data.estudiante.fechaGraduacion)
        console.log(response.data.estudiante.practicasRealizadas)
        console.log(response.data.estudiante.historialAcademico)

        setMatricula(response.data.estudiante.matricula);
        setCicloActual(response.data.estudiante.cicloActual);
        setPromedioGeneral(response.data.estudiante.promedioGeneral);
        setFechaIngreso(response.data.estudiante.fechaIngreso);
        setEstado(response.data.estudiante.estado);
        setTipoEstudiante(response.data.estudiante.tipoEstudiante);
        setBeca(response.data.estudiante.beca);
        setNumeroMatricula(response.data.estudiante.numeroMatricula);
        setCarrerasIngresadasIds(response.data.estudiante.carrerasIngresadasIds);
        setAsignaturasMatriculadas(response.data.estudiante.asignaturasMatriculadas);
        setHorarioEstudiante(response.data.estudiante.horario);
        setConsejeroAcademico(response.data.estudiante.consejeroAcademico);
        setFechaGraduacion(response.data.estudiante.fechaGraduacion);
        setPracticasRealizadas(response.data.estudiante.practicasRealizadas);
        setHistorialAcademico(response.data.estudiante.historialAcademico);

      }

      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.log(error);
    })
  }

  const mostrarAdministrador = () => {
    return (
      <div className="container">
        <h4>Información del Administrador</h4>
        <p>
          <strong>Actividad Reciente:</strong> {actividadReciente}
        </p>
        <p>
          <strong>Fecha Actividad:</strong> {fechaActividad}
        </p>
        <p>
          <strong>Estado del Sistema:</strong> {estadoSistema}
        </p>
        <p>
          <strong>Fecha de Ultima Revision:</strong> {fechaUltimaRevision}
        </p>
        <p>
          <strong>Permisos Especiales:</strong> {permisosEspeciales}
        </p>
        <p>
          <strong>Logs Accesos:</strong> {logsAcceso}
        </p>
        <p>
          <strong>Cambios de la Configuracion:</strong> {cambiosConfiguracion}
        </p>
      </div>
    )
  }

  const mostrarAdministrativo = () => {
    return (
      <div className="container">
        <h4>Información del Administrativo</h4>
        <p>
          <strong>Registro de Pagos:</strong> {registroPagos}
        </p>
        <p>
          <strong>Monto Total de Pagos:</strong> {montoTotalPagos}
        </p>
        <p>
          <strong>Fecha de Último Pago:</strong> {fechaUltimoPago}
        </p>
        <p>
          <strong>Gestión de Empleados:</strong> {gestionEmpleados}
        </p>
        <p>
          <strong>Fecha de Contratación:</strong> {fechaContratacion}
        </p>
        <p>
          <strong>Cargo de Empleado:</strong> {cargoEmpleado}
        </p>
        <p>
          <strong>Solicitudes Pendientes:</strong> {solicitudesPendientes}
        </p>
        <p>
          <strong>Fecha de Solicitud:</strong> {fechaSolicitud}
        </p>
      </div>
    );
  };

  const estadosLaborales = ["ACTIVO",
    "INACTIVO",
    "LICENCIA",
    "JUBILADO",
    "BAJA_TEMPORAL",
    "BAJA_PERMANENTE"]

  const tiposDocentes = ["TIEMPO_COMPLETO",
    "MEDIO_TIEMPO",
    "VISITANTE",
    "ADJUNTO",
    "TITULAR",
    "EMERITO"]

  function listarCursosDocente() {
    CursoService.getAllCursos().then(response => {
      setCursosDocente(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  function obtenerNombreCurso(idCurso) {
    const cursoEncontrado = cursosService.find(cursoService => cursoService.idCurso === idCurso);
    return cursoEncontrado ? cursoEncontrado.nombre : "Desconocido";
  }

  const mostrarDocente = () => {
    return (
      <div className="container">
        <h4>Información del Docente</h4>
        <div>
          <strong>Departamento:</strong> {departamento}
        </div>

        <div>
          <strong>Título Académico:</strong> {tituloAcademico}
        </div>

        <div>
          <strong>Especialidad:</strong> {especialidad}
        </div>

        <div>
          <strong>Cursos Impartidos:</strong>
          <ul>
            {cursosImpartidos.map((cursoImpartido, index) => (
              <li key={index}>{cursoImpartido}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Historial Laboral:</strong>
          <ul>
            {historialLaboral.map((registro, index) => (
              <li key={index}>
                <strong>Puesto:</strong> {registro.puesto}, <strong>Departamento:</strong> {registro.departamento},
                <strong> Fecha de Inicio:</strong> {registro.fechaInicio},
                <strong> Fecha de Fin:</strong> {registro.fechaFin},
                <strong> Descripción:</strong> {registro.descripcion}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Estado Laboral:</strong> {estadoLaboral}
        </div>

        <div>
          <strong>Tipo de Docente:</strong> {tipoDocente}
        </div>

        <div>
          <strong>Fecha de Contratación:</strong> {fechaContratacion}
        </div>

        <div>
          <strong>Tipo de Contrato:</strong> {tipoContrato}
        </div>

        <div>
          <strong>Salario:</strong> {salario}
        </div>

        <div>
          <strong>Horario:</strong> {horarioDocente}
        </div>

        <div>
          <strong>Publicaciones Académicas:</strong>
          <ul>
            {publicacionesAcademicas.map((publicacionAcademica, index) => (
              <li key={index}>{publicacionAcademica}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Proyectos de Investigación:</strong>
          <ul>
            {proyectosInvestigacion.map((proyectoInvestigacion, index) => (
              <li key={index}>{proyectoInvestigacion}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Número de Oficina:</strong> {numeroOficina}
        </div>

        <div>
          <strong>Extensión Telefónica:</strong> {extensionTelefonica}
        </div>

        <div>
          <strong>Supervisor:</strong> {supervisor}
        </div>

        <div>
          <strong>Logros Académicos:</strong>
          <ul>
            {logrosAcademicos.map((logroAcademico, index) => (
              <li key={index}>{logroAcademico}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Fecha de Jubilación:</strong> {fechaJubilacion}
        </div>

        <div>
          <strong>Todos los Cursos:</strong>
          <ul>
            {cursosDocente.map((idCurso, index) => (
              <li key={index}>{obtenerNombreCurso(Number(idCurso))}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // Agregar una lista de estados posibles
  const estados = ["ACTIVO", "SUSPENDIDO", "GRADUADO", "RETIRADO"]; // Correspondientes a tu enum

  function listarCarreras() {
    CarreraService.getAllCarreras().then(response => {
      setCarreras(response.data);
      console.log(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  function listarCursosEstudiante() {
    CursoService.getAllCursos().then(response => {
      setCursosEstudiante(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }


  const mostrarEstudiante = () => {
    return (
      <div>
        <h4>Información del Estudiante</h4>
        <div>
          <strong>Matrícula:</strong> {matricula}
        </div>

        <div>
          <strong>Ciclo Actual:</strong> {cicloActual}
        </div>

        <div>
          <strong>Promedio General:</strong> {promedioGeneral}
        </div>

        <div>
          <strong>Fecha de Ingreso:</strong> {fechaIngreso}
        </div>

        <div>
          <strong>Estado:</strong> {estado}
        </div>

        <div>
          <strong>Tipo de Estudiante:</strong> {tipoEstudiante}
        </div>

        <div>
          <strong>Beca:</strong> {beca}
        </div>

        <div>
          <strong>Número de Matrícula:</strong> {numeroMatricula}
        </div>

        <div>
          <strong>Carreras Ingresadas:</strong>
          <ul>
            {carrerasIngresadasIds.map((carrera, index) => (
              <li key={index}>{carrera}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Asignaturas Matriculadas:</strong>
          <ul>
            {asignaturasMatriculadas.map((asignatura, index) => (
              <li key={index}>{asignatura}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Horario:</strong> {horarioEstudiante}
        </div>

        <div>
          <strong>Consejero Académico:</strong> {consejeroAcademico}
        </div>

        <div>
          <strong>Fecha de Graduación:</strong> {fechaGraduacion}
        </div>

        <div>
          <strong>Prácticas Realizadas:</strong>
          <ul>
            {practicasRealizadas.map((practica, index) => (
              <li key={index}>{practica}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Historial Académico:</strong>
          <ul>
            {historialAcademico.map((registro, index) => (
              <li key={index}>
                <strong>Curso:</strong> {registro.nombreCurso},
                <strong> Calificación:</strong> {registro.calificacion},
                <strong> Fecha de Finalización:</strong> {registro.fechaFinalizacion}
              </li>
            ))}
          </ul>
        </div>

      </div>

    )
  }

  const mostrarDatosSegunRol = () => {
    if (nombreRol === "ADMINISTRADOR") {
      return mostrarAdministrador();
    } else if (nombreRol === "ADMINISTRATIVO") {
      return mostrarAdministrativo();
    } else if (nombreRol === "DOCENTE") {
      return mostrarDocente();
    } else if (nombreRol === "ESTUDIANTE") {
      return mostrarEstudiante();
    }
  }

  const handleBack = () => {
    navigate(`/dashboard-${nombreRol.toLowerCase()}`);
  };

  useEffect(() => {
    datosDelPerfil();
    listarCarreras();
    listarCursosDocente();
    listarCursosEstudiante();
  }, []);

  if (loading) {
    return <div className="loading">Cargando datos del perfil...</div>;
  }

  return (
    <div className="view-profile">
      <div className="view-profile-header">
        <h2>Perfil de Usuario</h2>
      </div>
      <div className="view-profile-content">
        {/* Sección de Foto*/}

        <div className="view-profile-image-container">
          {imagendePersona ? (
            <img
              src={imagendePersona}
              alt="Foto de perfil"
              className="view-profile-image"
            />
          ) : (
            <div className="view-placeholder-image">Sin foto</div>
          )}
        </div>


        <div className="view-profile-scroll">

          {/* Información del Usuario */}
          <div className="view-profile-info">
            <h3>{nombres} {apellido_paterno} {apellido_materno}</h3>

            <h4>Información del Rol</h4>
            <p>
              <strong>Nombre del Rol:</strong> {nombreRol}
            </p>
            <p>
              <strong>Descripcion:</strong> {description}
            </p>

            <h4>Información del Usuario</h4>
            <p>
              <strong>Nombre del Usuario:</strong> {username}
            </p>
            <p>
              <strong>Contraseña:</strong> {"•".repeat(password.length)}
            </p>
            <p>
              <strong>Email del Usuario:</strong> {emailUsuario}
            </p>
            <p>
              <strong>Disponibilidad:</strong> {enabled ? "Disponible" : "No disponible"}
            </p>
            <p>
              <strong>Ultimo Login:</strong> {ultimoLogin}
            </p>

            <h4>Información de la Persona</h4>
            <p>
              <strong>Nombres Completos:</strong> {nombres}
            </p>
            <p>
              <strong>Apellido Paterno:</strong> {apellido_paterno}
            </p>
            <p>
              <strong>Apellido Materno:</strong> {apellido_materno}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong> {fecha_nacimiento}
            </p>
            <p>
              <strong>Genero:</strong> {genero}
            </p>
            <p>
              <strong>Nacionalidad:</strong> {nacionalidad}
            </p>
            <p>
              <strong>Tipo de documento:</strong> {tipoDocumento}
            </p>
            <p>
              <strong>Direccion:</strong> {direccion}
            </p>
            <p>
              <strong>Ciudad:</strong> {ciudad}
            </p>
            <p>
              <strong>Departamento:</strong> {departamento}
            </p>
            <p>
              <strong>País:</strong> {pais}
            </p>
            <p>
              <strong>Provincia:</strong> {provincia}
            </p>
            <p>
              <strong>Telefono:</strong> {telefono}
            </p>
            <p>
              <strong>Email Personal:</strong> {email}
            </p>
            <p>
              <strong>Estado Civil:</strong> {estadoCivil}
            </p>
            <p>
              <strong>Tipo de Sangre:</strong> {tipoSangre}
            </p>
            <p>
              <strong>Responsable Financiero:</strong> {responsableFinanciero}
            </p>
            <p>
              <strong>Nombre del Contacto de Emergencia:</strong> {contactoEmergenciaNombre}
            </p>
            <p>
              <strong>Telefono del Contacto de Emergencia:</strong> {contactoEmergenciaTelefono}
            </p>
            <p>
              <strong>Email del Contacto de Emergencia:</strong> {contactoEmergenciaEmail}
            </p>
            <p>
              <strong>Direccion del Contacto de Emergencia:</strong> {contactoEmergenciaDireccion}
            </p>
            <p>
              <strong>Ciudad del Contacto de Emergencia:</strong> {contactoEmergenciaCiudad}
            </p>
            <p>
              <strong>Parentesco del Contacto de Emergencia:</strong> {contactoEmergenciaParentesco}
            </p>

          </div>

          {mostrarDatosSegunRol()}

        </div>
      </div>

      {/* Botón de Regresar */}
      <div className="view-profile-actions">
        <button onClick={handleBack} className="view-back-button">
          Regresar
        </button>
      </div>
    </div>
  );
};

export default GeneralViewProfileComponent;