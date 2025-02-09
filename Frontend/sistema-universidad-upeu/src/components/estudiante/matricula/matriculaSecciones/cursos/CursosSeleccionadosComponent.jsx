import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import DocenteService from "../../../../../services/docenteServices/docente/DocenteService";
import MatriculaService from "../../../../../services/matriculaServices/MatriculaService";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";
import Swal from "sweetalert2";
import CursoDetalleService from "../../../../../services/nivelDeEnsenanzaServices/CursoDetalleService";

function CursosSeleccionadosComponent({ cicloDetalleConMayorNumero, idOpcionNivel, eliminarCurso, cursosSeleccionados, setCursosSeleccionados, idsDocente, totalCreditos, setTotalCreditos, setEstado, idNivelEnsenanza, totalHoras, setTotalHoras, sumarCreditos, restarCreditos, sumarHoras, restarHoras, estadoMatriculaView, setEstadoMatriculaView, contador, setContador, idMatricula, setIdMatricula, estadoValidacion }) {
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
    const [idEstudiante, setIdEstudiante] = useState(0);
    const [idCarrera, setIdCarrera] = useState(0);
    const [idCiclo, setIdCiclo] = useState("");
    const [cursosDetalleIds, setCursosDetalleIds] = useState([]);

    const handleMouseEnter = (index) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    async function crearMatriculaInicial(idEstudiante) {
        try {
            const responseMatricula = await MatriculaService.getMatriculaByIdEstudiante(idEstudiante);

            // Verificar si responseMatricula.data está vacío o no
            if (responseMatricula.data && Object.keys(responseMatricula.data).length > 0) {
                setEstadoMatriculaView(responseMatricula.data.estado);
                setIdMatricula(responseMatricula.data.idMatricula);
                localStorage.setItem("idMatricula", responseMatricula.data.idMatricula);

                await CursoDetalleService.getCursosDetalleByIds(responseMatricula.data.cursosDetalleIds).then((responseCursoDetalle) => {
                    setCursosSeleccionados(responseCursoDetalle.data);

                    let creditosSumados = 0;
                    responseCursoDetalle.data.forEach((cursoDetalle) => {
                        creditosSumados = cursoDetalle.curso.creditos + creditosSumados;
                    });
                    setTotalCreditos(creditosSumados);

                    let horasSumadas = 0;
                    responseCursoDetalle.data.forEach((cursoDetalle) => {
                        const horas = cursoDetalle.curso.horasTeoricas + cursoDetalle.curso.horasPracticas;
                        horasSumadas = horas + horasSumadas;
                    });
                    setTotalHoras(horasSumadas);
                });
            } else {
                const matriculaInicial = { idNivelEnsenanza, idOpcionNivel, idEstudiante, estado: "INICIADO", fechaMatricula };

                const response = await MatriculaService.postMatricula(matriculaInicial);
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

    async function obtenerIdEstudianteMatricula() {
        try {
            const response = await InscripcionService.getInscripcionById(idInscripcion);
            setIdEstudiante(response.data.idEstudiante); // Actualiza el estado
            return response.data.idEstudiante; // Devuelve el valor
        } catch (error) {
            console.error(error);
            return null; // En caso de error
        }
    }

    function updateMatriculaPendiente(e) {
        e.preventDefault();

        if (estadoValidacion === "SINCONFLICTOS") {
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
                    await MatriculaService.putMatricula(idMatricula, matricula).then((response) => {
                        setEstado("PAGO");
                        localStorage.setItem("idMatricula", response.data.idMatricula);
                    }).catch((error) => {
                        console.error(error);
                    });

                    obtenerIdEstudianteMatricula();
                    cursosDetalleIds.forEach((cursoDetalleId) => {
                        const cursoDetalleRequest = { cursoDetalleIdOperacion: cursoDetalleId };
                        CursoDetalleService.postCursoDetalleRestarCupo(cursoDetalleRequest).then((response) => {
                        }).catch((error) => {
                            console.error(error);
                        })
                    });
                } else {
                    console.log("Accion cancelada");
                }
            })
        } else if (estadoValidacion === "CONFLICTOS") {
            Swal.fire({
                title: "⚠️ Conflicto en los cursos",
                text: "Alguno(s) cursos tienen cruce de horarios, vuelva a seleccionar los cursos",
                icon: "error",
                confirmButtonText: "Entendido",
            });
        }
    }

    function updateMatriculaIniciado(e) {
        e.preventDefault();

        Swal.fire({
            title: "¿Está seguro de editar los cursos?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const fechaActual = new Date().toLocaleDateString('en-CA');

                const idNivelEnsenanzaANumero = parseInt(idNivelEnsenanza, 10)
                const matricula = { idNivelEnsenanza: idNivelEnsenanzaANumero, idEstudiante, idCarrera, idCalendarioAcademico: 0, IdPago: 0, idRequisito: 0, idAdministrativo: 0, tipoAlumno: "REGULAR", numeroDeCreditos: totalCreditos, costoTotal: 0, idCiclo, cursosDetalleIds, estado: "INICIADO", fechaMatricula: fechaActual, observaciones: "Ninguna" };
                await MatriculaService.putMatricula(idMatricula, matricula).then((response) => {
                    localStorage.setItem("idMatricula", response.data.idMatricula);
                }).catch((error) => {
                    console.error(error);
                });

                cursosDetalleIds.forEach((cursoDetalleId) => {
                    const cursoDetalleRequest = { cursoDetalleIdOperacion: cursoDetalleId };
                    CursoDetalleService.postCursoDetalleSumarCupo(cursoDetalleRequest).then((response) => {
                    }).catch((error) => {
                        console.error(error);
                    })
                });

                setEstadoMatriculaView("INICIADO");
                setContador(contador + 1);
            } else {
                console.log("Accion cancelada");
            }
        })

    }

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

    const estiloContenedor = {
        border: "1px solid #000", // Borde negro de 1px
        padding: "16px",          // Espaciado interno
        margin: "16px",           // Espaciado externo
        borderRadius: "8px",      // Bordes redondeados opcionales
        backgroundColor: "#f9f9f9", // Color de fondo opcional
        width: "300px",           // Ancho fijo opcional
        cursor: "pointer",
    };

    function mostrarBoton() {
        if (estadoMatriculaView === "PENDIENTE") {
            return (
                <div>
                    <button onClick={(e) => { updateMatriculaIniciado(e) }}>EDITAR CURSOS</button>
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

    useEffect(() => {
        mostrarBoton();
        if (cursosSeleccionados.length > 0) {
            cursosSeleccionados.forEach((curso) => {
                if (idsDocente.length > 0) {
                    mostrarDocentes(idsDocente);
                }
            });
        }
        const ids = cursosSeleccionados.map((curso) => curso.idCurso);
        setCursosDetalleIds(ids);
    }, [cursosSeleccionados, estadoMatriculaView])

    useEffect(() => {
        const ejecutarFunciones = async () => {
            try {
                listarDatos();
                const estudianteId = await obtenerIdEstudianteMatricula();

                if (estudianteId) {
                    crearMatriculaInicial(estudianteId);
                }
            } catch (error) {
                console.error("Error en la secuencia de ejecución:", error);
            }
        };

        ejecutarFunciones();
    }, [cicloDetalleConMayorNumero, idOpcionNivel]);

    return (
        <div className="container">
            <h3>Cursos seleccionados</h3>
            {cursosSeleccionados.length > 0 ? (cursosSeleccionados.map((curso, index) => {
                return (
                    <div key={curso.idCurso} onClick={estadoMatriculaView === "INICIADO" ? (() => handleSelection(curso)) : undefined} style={estiloContenedor} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
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