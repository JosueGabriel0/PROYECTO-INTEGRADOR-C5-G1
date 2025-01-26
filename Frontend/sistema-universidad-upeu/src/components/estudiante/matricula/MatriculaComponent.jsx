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
    const { idOpcionNivel } = useParams();

    //Handle estado
    const [estado, setEstado] = useState("DATOS PERSONALES");

    //Datos de Imagen de Persona
    const [imagenDePersona, setImagenDePersona] = useState(null);

    //Datos de Inscripcion
    const idInscripcion = getInscripcionId();

    //Datos de persona
    const [nombreCompleto, setNombreCompleto] = useState("");

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

    async function obtenerTodosLosDatos() {
        InscripcionService.getInscripcionById(idInscripcion).then(async (response) => {
            console.log("Este es la inscripcion: " + JSON.stringify(response.data, null, 2));

            const fotoPerfilResponse = response.data.persona.fotoPerfil;
            if (fotoPerfilResponse) {
                const imagenUrl = await PersonaService.getPersonaImagen(fotoPerfilResponse);
                console.log("URL de la imagen de Persona:", imagenUrl);
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
                <DatosPersonalesComponent idOpcionNivel={`${idOpcionNivel}`} cambiarOpcion={(nuevaOpcion) => {setEstado(nuevaOpcion)}}/>
            )
        } else if (estado === "CURSOS") {
            return (
                <CursosComponent idOpcionNivel={`${idOpcionNivel}`} cambiarOpcion={(nuevaOpcion) => {setEstado(nuevaOpcion)}}/>
            )
        } else if (estado === "PAGO") {
            return (
                <PagoComponent />
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