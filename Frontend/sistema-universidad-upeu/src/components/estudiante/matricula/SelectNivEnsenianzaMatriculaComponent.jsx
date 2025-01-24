import React from "react";
import { useEffect, useState } from "react";

import MatriculaService from "../../../services/matriculaServices/MatriculaService";
import { getInscripcionId } from "../../../services/authServices/authService";
import InscripcionService from "../../../services/inscripcionServices/InscripcionService";
import OpcionNivelService from "../../../services/nivelDeEnsenanzaServices/OpcionNivelService";

function SelectNivEnsenianzaMatriculaComponent() {
    const idInscripcion = getInscripcionId();

    //Datos estudiante
    const [carrerasIngresadas, setCarrerasIngresadas] = useState([]);

    //Datos de opciones de nivel de ensenanza
    const [opcionesNivel, setOpcionesNivel] = useState([]);

    //Datos loading
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Llamada al backend para validar si es estudiante
        const validarEstudiante = async () => {
            try {
                const response = await MatriculaService.getValidationEstudianteMatricula(idInscripcion);
                setMensaje(response.data.mensaje); // Asume que el backend devuelve { mensaje: "..." }
                console.log("Este es el mensaje del Backend: " + response.data.mensaje);
            } catch (error) {
                console.error('Error al validar estudiante:', error);
                setMensaje('Estudiante no encontrado');
            } finally {
                setCargando(false); // Termina la carga
            }
        };

        validarEstudiante();
    }, [idInscripcion]);

    function obtenerOpcionesNivelYNivelEnsenanza() {
        InscripcionService.getInscripcionById(idInscripcion).then((inscripcion) => {
            console.log("Esta es la inscripcion: " + JSON.stringify(inscripcion.data, null, 2));
            const idESTUDIANTE = inscripcion.data.idEstudiante;
            OpcionNivelService.getOpcionesNivelPorCarrerasEstudiante(idESTUDIANTE).then((response) => {
                console.log("Estas son las opciones de nivel de ensenanza: " + JSON.stringify(response.data, null, 2));
                setOpcionesNivel(response.data);
            })
        })
    }

    useEffect(() => {
        obtenerCarrerasEstudiante();
    }, [])

    return (
        <div className="container">
            {cargando ? (
                <div>Cargando...</div>
            ) : (mensaje === 'Estudiante validado' ? (
                <div>
                    <h1>Seleccione un nivel de enseñanza para su matricula.</h1>
                </div>
            ) : (
                <div>
                    <h2>No es un estudiante, no tiene permitido realizar esta acción</h2>
                </div>
            ))}
        </div>
    );
}
export default SelectNivEnsenianzaMatriculaComponent;