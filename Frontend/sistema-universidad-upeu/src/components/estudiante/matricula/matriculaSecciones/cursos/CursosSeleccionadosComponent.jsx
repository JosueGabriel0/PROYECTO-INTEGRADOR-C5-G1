import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import DocenteService from "../../../../../services/docenteServices/docente/DocenteService";
import MatriculaService from "../../../../../services/matriculaServices/MatriculaService";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";
import Swal from "sweetalert2";
import CursoDetalleService from "../../../../../services/nivelDeEnsenanzaServices/CursoDetalleService";

function CursosSeleccionadosComponent({ cicloDetalleConMayorNumero, idOpcionNivel, eliminarCurso, cursosSeleccionados, setCursosSeleccionados, idsDocente, totalCreditos, setTotalCreditos, setEstado, idNivelEnsenanza, totalHoras, setTotalHoras }) {
    //Datos de Inscripcion
    const idInscripcion = getInscripcionId();
    //Datos de Ciclo
    const [numeroCiclo, setNumeroCiclo] = useState("");

    //Datos Opcion nivel carrera
    const [nombre, setNombre] = useState("");

    //Hover
    const [hoveredIndex, setHoveredIndex] = useState([]);

    //Datos de docente
    const [docentesNombres, setDocentesNombres] = useState([]);

    //Datos de matricula
    const [idMatricula, setIdMatricula] = useState("");
    const [idEstudiante, setIdEstudiante] = useState(0);
    const [idCarrera, setIdCarrera] = useState(0);
    const [idCiclo, setIdCiclo] = useState("");
    const [cursosDetalleIds, setCursosDetalleIds] = useState([]);

    //Estado para manejar el boton y seleccion de cursos
    const [estadoMatriculaView, setEstadoMatriculaView] = useState("");

    const handleMouseEnter = (index) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    async function crearMatriculaInicial(idEstudiante) {
        console.log("este es el idEstudiante: " + idEstudiante);
        try {
            const responseMatricula = await MatriculaService.getMatriculaByIdEstudiante(idEstudiante);

            // Verificar si responseMatricula.data está vacío o no
            if (responseMatricula.data && Object.keys(responseMatricula.data).length > 0) {
                console.log("Matrícula ya registrada");
                console.log("Response estado: " + responseMatricula.data.estado);
                setEstadoMatriculaView(responseMatricula.data.estado);
                setIdMatricula(responseMatricula.data.idMatricula);

                console.log("Estos son los ids de curso detalle: " + JSON.stringify(responseMatricula.data.cursosDetalleIds, null, 2));
                CursoDetalleService.getCursosDetalleByIds(responseMatricula.data.cursosDetalleIds).then((responseCursoDetalle) => {
                    console.log("Estos son los cursos para poner en cursos seleccionados: " + JSON.stringify(responseCursoDetalle.data, null, 2))
                    setCursosSeleccionados(responseCursoDetalle.data);
                })
            } else {
                const matriculaInicial = { idNivelEnsenanza, idOpcionNivel, idEstudiante, estado: "INICIADO", fechaMatricula };

                const response = await MatriculaService.postMatricula(matriculaInicial);
                console.log("Esta es la matrícula inicial: " + JSON.stringify(response.data));
                setIdMatricula(response.data.idMatricula);
            }

        } catch (error) {
            console.error("Error al verificar o crear la matrícula:", error);
        }
    }

    function handleSelection(curso) {
        eliminarCurso(curso.idCurso);
        restarCreditos(curso.curso.creditos);
        const horas = curso.curso.horasTeoricas + curso.curso.horasPracticas;
        restarHoras(horas);
    }

    function listarDatos() {
        setNumeroCiclo(cicloDetalleConMayorNumero.ciclo.numeroCiclo);
        setIdCiclo(cicloDetalleConMayorNumero.ciclo.idCiclo);

        OpcionNivelService.getOpcionNivelById(idOpcionNivel).then((response) => {
            setNombre(response.data.carrera.nombre);
            setIdCarrera(response.data.carrera.idCarrera);
        }).catch((error) => {
            console.error(error);
        })
    }

    async function obtenerDatosMatricula() {
        let idEstudiante = null;
        await InscripcionService.getInscripcionById(idInscripcion).then((response) => {
            idEstudiante = response.data.idEstudiante;
            setIdEstudiante(response.data.idEstudiante);
        }).catch((error) => {
            console.error(error);
        })

        crearMatriculaInicial(idEstudiante);
    }

    function updateMatriculaPendiente(e) {
        e.preventDefault();

        Swal.fire({
            title: "¿Está seguro de confirmar los cursos seleccionados?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fechaActual = new Date().toLocaleDateString('en-CA');

                const idNivelEnsenanzaANumero = parseInt(idNivelEnsenanza, 10)
                const matricula = { idNivelEnsenanza: idNivelEnsenanzaANumero, idEstudiante, idCarrera, idCalendarioAcademico: 0, IdPago: 0, idRequisito: 0, idAdministrativo: 0, tipoAlumno: "REGULAR", numeroDeCreditos: totalCreditos, costoTotal: 0, idCiclo, cursosDetalleIds, estado: "PENDIENTE", fechaMatricula: fechaActual, observaciones: "Ninguna" };
                console.log("Esta es la matricula: " + JSON.stringify(matricula, null, 2));
                await MatriculaService.putMatricula(idMatricula, matricula).then((response) => {
                    console.log("Matricula guardada: " + JSON.stringify(response.data, null, 2));
                    setEstado("PAGO");
                }).catch((error) => {
                    console.error(error);
                });
                obtenerDatosMatricula();
            } else {
                console.log("Accion cancelada");
            }
        })

    }

    useEffect(() => {
        listarDatos();
        obtenerDatosMatricula();
    }, [cicloDetalleConMayorNumero, idOpcionNivel])

    async function mostrarDocentes(idsDocentes) {
        const docentes = [];

        for (let idDocente of idsDocentes) {
            try {
                const docenteResponse = await DocenteService.getDocenteById(idDocente);

                const docenteNombreCompleto = `${docenteResponse.data.persona.nombres} ${docenteResponse.data.persona.apellido_paterno} ${docenteResponse.data.persona.apellido_materno}`;

                docentes.push({
                    idDocente: idDocente,
                    nombreCompletoDocente: docenteNombreCompleto
                });
            } catch (error) {
                console.error(`Error al obtener el docente con ID: ${idDocente}`, error);
            }
        }

        setDocentesNombres(docentes);
    }

    useEffect(() => {
        if (cursosSeleccionados.length > 0) {
            cursosSeleccionados.forEach((curso) => {
                if (idsDocente.length > 0) {
                    mostrarDocentes(idsDocente);
                }
            });
        }
        const ids = cursosSeleccionados.map((curso) => curso.idCurso);
        setCursosDetalleIds(ids);
    }, [cursosSeleccionados])

    const estiloContenedor = {
        border: "1px solid #000", // Borde negro de 1px
        padding: "16px",          // Espaciado interno
        margin: "16px",           // Espaciado externo
        borderRadius: "8px",      // Bordes redondeados opcionales
        backgroundColor: "#f9f9f9", // Color de fondo opcional
        width: "300px",           // Ancho fijo opcional
        cursor: "pointer",
    };

    const restarCreditos = (creditos) => {
        setTotalCreditos((prev) => prev - creditos);
    };

    const restarHoras = (horas) => {
        setTotalHoras((prev) => prev - horas);
    };

    function mostrarBoton() {
        if (estadoMatriculaView === "PENDIENTE") {
            return (
                <div>
                    <button onClick={(e) => { }}>EDITAR CURSOS</button>
                </div>
            );
        } else if (estadoMatriculaView === "INICIADO") {
            return (
                <div>
                    <button onClick={(e) => { updateMatriculaPendiente(e) }}>CONFIRMAR CURSOS</button>
                </div>
            );
        }
    }

    return (
        <div className="container">
            <h3>Cursos seleccionados</h3>
            {cursosSeleccionados.length > 0 ? (cursosSeleccionados.map((curso, index) => {
                return (
                    <div key={curso.idCurso} onClick={estadoMatriculaView === "INICIADO" ? (() => handleSelection(curso)) : ""} style={estiloContenedor} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                        <span style={{ fontWeight: "bold" }}>{index + 1} </span>
                        <span style={{ fontWeight: "bold" }}>{curso.curso.nombre}</span>
                        <button style={{ marginLeft: "40px" }}>X</button>
                        <p>Ciclo <b>{numeroCiclo}</b>| Grupo <b>{curso.grupo}</b>| Creditos <b>{curso.curso.creditos}</b>| H.teoricas <b>{curso.curso.horasTeoricas}</b>| H. practicas <b>{curso.curso.horasPracticas}</b>| Cupos <b>{curso.cupos}</b>| Cupos disponibles <b>{curso.cuposDisponibles}</b></p>
                        {hoveredIndex === index && (
                            <>
                                {docentesNombres.length > 0 ? (
                                    docentesNombres.map((docente) => {
                                        return (
                                            <div key={docente.idDocente}>
                                                <p>Docente <strong>{docente.nombreCompletoDocente}</strong></p>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>No hay docentes</p>
                                )}
                                <p>Escuela <strong>{nombre}</strong></p>
                            </>
                        )}
                    </div>
                )
            })

            ) : (
                <p>No hay cursos seleccionados.</p>
            )}
            <div>
                <p>Nro. de creditos {totalCreditos}</p>
            </div>
            <div>
                <p>Nro. de horas {totalHoras}</p>
            </div>
            <div>
                {mostrarBoton()}
            </div>
        </div>
    )
}

export default CursosSeleccionadosComponent;