import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import DocenteService from "../../../../../services/docenteServices/docente/DocenteService";

function CursosSeleccionadosComponent({ cicloDetalleConMayorNumero, idOpcionNivel, eliminarCurso, cursosSeleccionados, idsDocente }) {
    //Datos de Ciclo
    const [numeroCiclo, setNumeroCiclo] = useState("");

    //Datos Opcion nivel carrera
    const [nombre, setNombre] = useState("");

    //Hover
    const [hoveredIndex, setHoveredIndex] = useState([]);

    //Datos de docente
    const [docentesNombres, setDocentesNombres] = useState([]);

    const handleMouseEnter = (index) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    function handleSelection(curso) {
        eliminarCurso(curso.idCurso);
    }

    function listarDatos() {
        setNumeroCiclo(cicloDetalleConMayorNumero.ciclo.numeroCiclo);

        OpcionNivelService.getOpcionNivelById(idOpcionNivel).then((response) => {
            setNombre(response.data.carrera.nombre);
        }).catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        listarDatos();
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
                if (idsDocente.length>0) {
                    mostrarDocentes(idsDocente);
                }
            });
        }
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

    return (
        <div className="container">
            <h3>Cursos seleccionados</h3>
            {cursosSeleccionados.length > 0 ? (cursosSeleccionados.map((curso, index) => {
                return (
                    <div key={curso.idCurso} onClick={() => handleSelection(curso)} style={estiloContenedor} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                        <span style={{ fontWeight: "bold" }}>{curso.curso.nombre}</span>
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
        </div>
    )
}

export default CursosSeleccionadosComponent;