import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import DocenteService from "../../../../../services/docenteServices/docente/DocenteService";

function CicloCursosComponent({ cicloDetalleConMayorNumero, idOpcionNivel, agregarCurso, eliminarCurso, cursosSeleccionados, setIdsDocente, setTotalCreditos, nombre, setNombre, agregarHorario, eliminarHorario, setTotalHoras, sumarCreditos, restarCreditos, sumarHoras, restarHoras, estadoMatriculaView }) {
    //Datos de Ciclo
    const [numeroCiclo, setNumeroCiclo] = useState("");

    //Datos de curso detalle
    const [cursoDetalles, setCursoDetalles] = useState([]);

    //Hover
    const [hoveredIndex, setHoveredIndex] = useState([]);

    //Datos de docente
    const [docentesNombres, setDocentesNombres] = useState([]);

    const handleMouseEnter = (index) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    const handleSelection = (curso) => {
        const seleccionado = cursosSeleccionados.find((c) => c.idCurso === curso.idCurso);
        if (seleccionado) {
            eliminarCurso(curso.idCurso);
            eliminarHorario(curso.horario.horarioDetalles)
            restarCreditos(curso.curso.creditos);
            const horas = curso.curso.horasTeoricas + curso.curso.horasPracticas;
            restarHoras(horas);
        } else {
            agregarCurso(curso);
            agregarHorario(curso.horario.horarioDetalles);
            sumarCreditos(curso.curso.creditos);
            const horas = curso.curso.horasTeoricas + curso.curso.horasPracticas;
            sumarHoras(horas);
        }
    };

    const isSelected = (idCurso) => {
        return !!cursosSeleccionados.find((c) => c.idCurso === idCurso);
    };

    function listarDatos() {
        setNumeroCiclo(cicloDetalleConMayorNumero.ciclo.numeroCiclo);

        OpcionNivelService.getOpcionNivelById(idOpcionNivel).then((response) => {
            setNombre(response.data.carrera.nombre);
        }).catch((error) => {
            console.error(error);
        })

        setCursoDetalles(cicloDetalleConMayorNumero.cursoDetalles);
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
        listarDatos();
    }, [cicloDetalleConMayorNumero, idOpcionNivel, estadoMatriculaView])

    useEffect(() => {
        if (cursoDetalles.length > 0) {
            cursoDetalles.forEach((detalle) => {
                if (detalle.idsDocentes) {
                    setIdsDocente(detalle.idsDocentes);
                    mostrarDocentes(detalle.idsDocentes);
                }
            });
        }
    }, [cursoDetalles]);


    return (
        <div className="container">
            {cursoDetalles.length > 0 ? (cursoDetalles.map((cursoDetalle, index) => {
                return (
                    <div key={cursoDetalle.idCurso} onClick={() => estadoMatriculaView === "INICIADO" ? handleSelection(cursoDetalle) : undefined} style={estiloContenedor} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <input type="checkbox" checked={isSelected(cursoDetalle.idCurso)} style={{ display: "inline-block" }} />
                            <span style={{ fontWeight: "bold" }}>{cursoDetalle.curso.nombre}</span>
                        </label>
                        <p>Ciclo <b>{numeroCiclo}</b>| Grupo <b>{cursoDetalle.grupo}</b>| Creditos <b>{cursoDetalle.curso.creditos}</b>| H.teoricas <b>{cursoDetalle.curso.horasTeoricas}</b>| H. practicas <b>{cursoDetalle.curso.horasPracticas}</b>| Cupos <b>{cursoDetalle.cupos}</b>| Cupos disponibles <b>{cursoDetalle.cuposDisponibles}</b></p>

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
                <p>No hay cursos disponibles</p>
            )}
        </div>
    );
}

export default CicloCursosComponent;