import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import "../../../../../style-sheets/generalMomentaneo.css";
import CicloCursosComponent from "./CicloCursosComponent";
import OtrosCiclosCursosComponent from "./OtrosCiclosCursosComponent";
import OtrasEscuelasComponent from "./OtrasEscuelasComponent";
import CursosSeleccionadosComponent from "./CursosSeleccionadosComponent";
import HorarioComponent from "./HorarioComponent";

function CursosComponent({ idOpcionNivel = "0", cambiarOpcion }) {
    //Estados para ciclo cursos
    const [estadoCicloCursos, setEstadoCicloCursos] = useState("CICLO");

    //Datos de Ciclo Detalle
    const [ciclosDetalles, setCiclosDetalles] = useState([]);
    const [cicloDetalleConMayorNumero, setCicloDetalleConMayorNumero] = useState(null);

    //Datos de Ciclo
    const [numeroCiclo, setNumeroCiclo] = useState("");

    //Datos de Curso
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

    //Datos de Docente
    const [idsDocente, setIdsDocente] = useState([]);

    const agregarCurso = (curso) => {
        if (!cursosSeleccionados.find((c) => c.idCurso === curso.idCurso)) {
            setCursosSeleccionados([...cursosSeleccionados, curso]);
        }
    };

    const eliminarCurso = (idCurso) => {
        setCursosSeleccionados(cursosSeleccionados.filter((curso) => curso.idCurso !== idCurso));
    };

    function verComponenteSeleccionado() {
        console.log("este es el estado: " + estadoCicloCursos);
        if (estadoCicloCursos === "CICLO") {
            return (
                <CicloCursosComponent
                    cicloDetalleConMayorNumero={cicloDetalleConMayorNumero}
                    idOpcionNivel={idOpcionNivel}
                    agregarCurso={agregarCurso}
                    eliminarCurso={eliminarCurso}
                    cursosSeleccionados={cursosSeleccionados}
                    setIdsDocente={setIdsDocente}
                />
            )
        } else if (estadoCicloCursos === "OTROS_CICLOS") {
            return (
                <OtrosCiclosCursosComponent />
            )
        } else if (estadoCicloCursos === "OTRAS_ESCUELAS") {
            return (
                <OtrasEscuelasComponent />
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
            <h1>CURSOS</h1>
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
                        idsDocente={idsDocente}
                    />
                </div>
                <div className="columnCursos">
                    <HorarioComponent />
                </div>
            </div>
        </div>
    )
}

export default CursosComponent;