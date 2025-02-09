import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import "../../../../../style-sheets/generalMomentaneo.css";
import CicloCursosComponent from "./CicloCursosComponent";
import OtrosCiclosCursosComponent from "./OtrosCiclosCursosComponent";
import OtrasEscuelasComponent from "./OtrasEscuelasComponent";
import CursosSeleccionadosComponent from "./CursosSeleccionadosComponent";
import HorarioComponent from "./HorarioComponent";

function CursosComponent({ idOpcionNivel = "0", cambiarOpcion, campus, setEstado, idNivelEnsenanza, cursosSeleccionados, setCursosSeleccionados, totalCreditos, setTotalCreditos, cicloDetalleConMayorNumero, setCicloDetalleConMayorNumero, idsDocente, setIdsDocente, totalHoras, setTotalHoras, sumarCreditos, restarCreditos, sumarHoras, restarHoras, contador, setContador, idMatricula, setIdMatricula }) {

    //Estados para ciclo cursos
    const [estadoCicloCursos, setEstadoCicloCursos] = useState("CICLO");

    //Datos de Ciclo Detalle
    const [ciclosDetalles, setCiclosDetalles] = useState([]);

    //Datos de Ciclo
    const [numeroCiclo, setNumeroCiclo] = useState("");

    //Datos Opcion nivel carrera
    const [nombre, setNombre] = useState("");

    //Datos de horario detalle
    const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);

    //Estado para manejar el boton y seleccion de cursos
    const [estadoMatriculaView, setEstadoMatriculaView] = useState("");

    const [estadoValidacion, setEstadoValidacion] = useState("SINCONFLICTOS");

    const agregarCurso = (curso) => {
        if (!cursosSeleccionados.find((c) => c.idCurso === curso.idCurso)) {
            setCursosSeleccionados([...cursosSeleccionados, curso]);

            if (curso.horario && curso.horario.horarioDetalles) {
                agregarHorario(curso.horario.horarioDetalles);
            }
        }
    };

    const eliminarCurso = (idCurso) => {
        const cursoAEliminar = cursosSeleccionados.find((curso) => curso.idCurso === idCurso);
        setCursosSeleccionados(cursosSeleccionados.filter((curso) => curso.idCurso !== idCurso));

        if (cursoAEliminar && cursoAEliminar.horario && cursoAEliminar.horario.horarioDetalles) {
            eliminarHorario(cursoAEliminar.horario.horarioDetalles);
        }
    };

    const agregarHorario = (horarios) => {
        setHorariosSeleccionados([...horariosSeleccionados, ...horarios]);
    };

    const eliminarHorario = (horarios) => {
        setHorariosSeleccionados((prev) =>
            prev.filter(
                (h) =>
                    !horarios.some(
                        (horario) =>
                            horario.dia === h.dia &&
                            horario.horaInicio === h.horaInicio &&
                            horario.horaFin === h.horaFin
                    )
            )
        );
    };

    function verComponenteSeleccionado() {
        if (estadoCicloCursos === "CICLO") {
            return (
                <div>
                    <CicloCursosComponent
                        cicloDetalleConMayorNumero={cicloDetalleConMayorNumero}
                        idOpcionNivel={idOpcionNivel}
                        agregarCurso={agregarCurso}
                        eliminarCurso={eliminarCurso}
                        cursosSeleccionados={cursosSeleccionados}
                        setIdsDocente={setIdsDocente}
                        setTotalCreditos={setTotalCreditos}
                        nombre={nombre}
                        setNombre={setNombre}
                        agregarHorario={agregarHorario}
                        eliminarHorario={eliminarHorario}
                        horariosSeleccionados={horariosSeleccionados}
                        setTotalHoras={setTotalHoras}
                        sumarCreditos={sumarCreditos}
                        restarCreditos={restarCreditos}
                        sumarHoras={sumarHoras}
                        restarHoras={restarHoras}
                        estadoMatriculaView={estadoMatriculaView}
                    />
                </div>
            )
        } else if (estadoCicloCursos === "OTROS_CICLOS") {
            return (
                <div>
                    <OtrosCiclosCursosComponent />
                </div>
            )
        } else if (estadoCicloCursos === "OTRAS_ESCUELAS") {
            return (
                <div>
                    <OtrasEscuelasComponent />
                </div>
            )
        }
    }

    function listarDatosOpcionNivel() {
        OpcionNivelService.getOpcionNivelById(idOpcionNivel).then((response) => {
            setCiclosDetalles(response.data.cicloDetalle);
        })
    }

    useEffect(() => {
        listarDatosOpcionNivel();
    }, [idOpcionNivel])

    function encontrarCicloDetalleConMayorNumeroCiclo() {
        if (ciclosDetalles.length > 0) {
            const cicloDetalleMaximoCiclo = ciclosDetalles.reduce((max, cicloDetalle) => {
                return cicloDetalle.ciclo.numeroCiclo > max.ciclo.numeroCiclo ? cicloDetalle : max;
            });

            setCicloDetalleConMayorNumero(cicloDetalleMaximoCiclo); // Establecemos el ciclo con el número máximo
            setNumeroCiclo(cicloDetalleMaximoCiclo.ciclo.numeroCiclo);
        }
    }

    useEffect(() => {
        encontrarCicloDetalleConMayorNumeroCiclo();
    }, [ciclosDetalles])

    if (!cicloDetalleConMayorNumero) {
        return <p>Cargando ciclo con el número más alto...</p>;
    }

    return (
        <div className="container">
            <div className="containerCursos">
                <div className="columnCursos">
                    <h3>Cursos</h3>
                    <div>
                        <button onClick={(e) => { setEstadoCicloCursos("CICLO") }}>CICLO {numeroCiclo}</button>
                        <button onClick={(e) => { setEstadoCicloCursos("OTROS_CICLOS") }}>OTROS CICLOS</button>
                        <button onClick={(e) => { setEstadoCicloCursos("OTRAS_ESCUELAS") }}>OTRAS ESCUELAS</button>
                    </div>
                    <div>
                        {verComponenteSeleccionado()}
                    </div>
                </div>
                <div className="columnCursos">
                    <CursosSeleccionadosComponent
                        cicloDetalleConMayorNumero={cicloDetalleConMayorNumero}
                        idOpcionNivel={idOpcionNivel}
                        eliminarCurso={eliminarCurso}
                        cursosSeleccionados={cursosSeleccionados}
                        setCursosSeleccionados={setCursosSeleccionados}
                        idsDocente={idsDocente}
                        totalCreditos={totalCreditos}
                        setTotalCreditos={setTotalCreditos}
                        setEstado={setEstado}
                        idNivelEnsenanza={idNivelEnsenanza}
                        totalHoras={totalHoras}
                        setTotalHoras={setTotalHoras}
                        sumarCreditos={sumarCreditos}
                        restarCreditos={restarCreditos}
                        sumarHoras={sumarHoras}
                        restarHoras={restarHoras}
                        estadoMatriculaView={estadoMatriculaView}
                        setEstadoMatriculaView={setEstadoMatriculaView}
                        contador={contador}
                        setContador={setContador}
                        idMatricula={idMatricula}
                        setIdMatricula={setIdMatricula}
                        estadoValidacion={estadoValidacion}
                    />
                </div>
                <div className="columnCursos">
                    <HorarioComponent
                        cicloDetalleConMayorNumero={cicloDetalleConMayorNumero}
                        campus={campus}
                        nombre={nombre}
                        horariosSeleccionados={horariosSeleccionados}
                        cursosSeleccionados={cursosSeleccionados}
                        setEstadoValidacion={setEstadoValidacion}
                    />
                </div>
            </div>
        </div>
    )
}

export default CursosComponent;