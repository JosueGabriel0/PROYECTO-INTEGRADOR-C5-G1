import { Await, useParams } from "react-router-dom";
import { getInscripcionId } from "../../../services/authServices/authService";
import InscripcionService from "../../../services/inscripcionServices/InscripcionService";
import OpcionNivelService from "../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import { useEffect, useState } from "react";
import PersonaService from "../../../services/personaServices/PersonaService";
import "../../../style-sheets/generalMomentaneo.css";
import NivelEnsenanzaService from "../../../services/nivelDeEnsenanzaServices/NivelEnsenanzaService";
import DatosPersonalesComponent from "./matriculaSecciones/datosPersonales/DatosPersonalesComponent";
import CursosComponent from "./matriculaSecciones/cursos/CursosComponent";
import PagoComponent from "./matriculaSecciones/pago/PagoComponent";

function MatriculaComponent() {
    //React router dom
    const { idOpcionNivel, idNivelEnsenanza } = useParams();

    const [idMatricula, setIdMatricula] = useState("");

    //Handle estado
    const [estado, setEstado] = useState("DATOS PERSONALES");

    //Datos de Imagen de Persona
    const [imagenDePersona, setImagenDePersona] = useState(null);

    //Datos de Inscripcion
    const idInscripcion = getInscripcionId();

    //Datos de persona
    const [nombreCompleto, setNombreCompleto] = useState("");

    const [contador, setContador] = useState(0);

    //Datos de opcion nivel
    const [campus, setCampus] = useState("");
    const [modalidad, setModalidad] = useState("");
    const [semestre, setSemestre] = useState("");

    //Datos de carrera
    const [nombre, setNombre] = useState("");

    //Datos de planificacion academica
    const [nombrePlanEstudio, setNombrePlanEstudio] = useState("");

    //Datos de estudiante
    const [codigoUniversitario, setCodigoUniversitario] = useState("");

    //Datos de nivel de ensenanza
    const [nombreNivelEnsenanza, setNombreNivelEnsenanza] = useState("");

    //Datos de Curso
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

    //Creditos totales
    const [totalCreditos, setTotalCreditos] = useState(0);

    //Horas Totales
    const [totalHoras, setTotalHoras] = useState(0);

    //Datos de Ciclo Detalle
    const [cicloDetalleConMayorNumero, setCicloDetalleConMayorNumero] = useState(null);

    //Datos de Docente
    const [idsDocente, setIdsDocente] = useState([]);

    const sumarCreditos = (creditos) => {
        setTotalCreditos((prev) => prev + creditos);
    };

    const restarCreditos = (creditos) => {
        setTotalCreditos((prev) => prev - creditos);
    };

    const sumarHoras = (horas) => {
        setTotalHoras((prev) => prev + horas);
    };

    const restarHoras = (horas) => {
        setTotalHoras((prev) => prev - horas);
    };

    async function obtenerTodosLosDatos() {
        InscripcionService.getInscripcionById(idInscripcion).then(async (response) => {

            const fotoPerfilResponse = response.data.persona.fotoPerfil;
            if (fotoPerfilResponse) {
                const imagenUrl = await PersonaService.getPersonaImagen(fotoPerfilResponse);
                setImagenDePersona(imagenUrl);
            } else {
                console.warn("La persona no tiene una foto de perfil definida");
            }

            const nombreCompletoResponse = `${response.data.persona.nombres} ${response.data.persona.apellido_paterno} ${response.data.persona.apellido_materno}`;
            setNombreCompleto(nombreCompletoResponse);

            const opcionNivelResponse = await OpcionNivelService.getOpcionNivelById(idOpcionNivel);
            setCampus(opcionNivelResponse.data.campus);
            setModalidad(opcionNivelResponse.data.modalidad);
            setSemestre(opcionNivelResponse.data.semestre);

            setNombre(opcionNivelResponse.data.carrera.nombre);

            setNombrePlanEstudio(response.data.estudiante.planificacionAcademica.nombrePlanEstudio);

            setCodigoUniversitario(response.data.estudiante.codigoUniversitario);

            const nivelEnsenanzaResponse = await NivelEnsenanzaService.getNivelEnsenanzaByIdOpcionNivel(idOpcionNivel);
            setNombreNivelEnsenanza(nivelEnsenanzaResponse.data.nombre);
        }).catch((error) => {
            console.error(error);
        })
    }

    function verOpcionSeleccionada() {
        if (estado === "DATOS PERSONALES") {
            return (
                <div>
                    <DatosPersonalesComponent idOpcionNivel={`${idOpcionNivel}`} cambiarOpcion={(nuevaOpcion) => { setEstado(nuevaOpcion) }} />
                </div>
            )
        } else if (estado === "CURSOS") {
            return (
                <div>
                    <CursosComponent key={contador} idOpcionNivel={`${idOpcionNivel}`} cambiarOpcion={(nuevaOpcion) => { setEstado(nuevaOpcion) }} campus={campus} setEstado={setEstado} idNivelEnsenanza={idNivelEnsenanza} cursosSeleccionados={cursosSeleccionados} setCursosSeleccionados={setCursosSeleccionados} totalCreditos={totalCreditos} setTotalCreditos={setTotalCreditos} cicloDetalleConMayorNumero={cicloDetalleConMayorNumero} setCicloDetalleConMayorNumero={setCicloDetalleConMayorNumero} idsDocente={idsDocente} setIdsDocente={setIdsDocente} totalHoras={totalHoras} setTotalHoras={setTotalHoras} sumarCreditos={sumarCreditos} restarCreditos={restarCreditos} sumarHoras={sumarHoras} restarHoras={restarHoras} contador={contador} setContador={setContador} idMatricula={idMatricula} setIdMatricula={setIdMatricula} />
                </div>
            )
        } else if (estado === "PAGO") {
            return (
                <div>
                    <PagoComponent cursosSeleccionados={cursosSeleccionados} totalCreditos={totalCreditos} cicloDetalleConMayorNumero={cicloDetalleConMayorNumero} idOpcionNivel={idOpcionNivel} idsDocente={idsDocente} totalHoras={totalHoras} setEstado={setEstado} idMatricula={idMatricula} idNivelEnsenanza={idNivelEnsenanza}/>
                </div>
            )
        }
    }

    useEffect(() => {
        obtenerTodosLosDatos();
    }, [])

    return (
        <div className="container">
            <div>
                <div>
                    {imagenDePersona ? (
                        <div className="image-container">
                            <img src={imagenDePersona} alt="Foto de Perfil" />
                        </div>
                    ) : (
                        <p>No disponible</p>
                    )}
                    <p>{nombreCompleto}</p>
                    <p>{campus} - {nombre} - {modalidad} - {nombrePlanEstudio}</p>
                    <p><strong>Código: </strong>{codigoUniversitario}</p>
                </div>
                <div>
                    <button>VER PLAN</button>
                </div>
                <div>
                    <button>SOLICITAR EQUIVALENCIA</button>
                </div>
                <div>
                    <p>REGULAR: {semestre}</p>
                    <p>{nombreNivelEnsenanza}</p>
                </div>
            </div>
            <div>
                <button onClick={(e) => { setEstado("DATOS PERSONALES") }}>DATOS PERSONALES</button>
                <button onClick={(e) => { setEstado("CURSOS") }}>CURSOS</button>
                <button onClick={(e) => { setEstado("PAGO") }}>PAGO</button>
            </div>
            <div>
                {verOpcionSeleccionada()}
            </div>
        </div>
    )
}

export default MatriculaComponent;