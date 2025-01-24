import React from "react";
import { useEffect, useState } from "react";

import MatriculaService from "../../../services/matriculaServices/MatriculaService";
import { getInscripcionId } from "../../../services/authServices/authService";
import EstudianteService from "../../../services/estudianteServices/estudiante/EstudianteService";
import InscripcionService from "../../../services/inscripcionServices/InscripcionService";

function SelectNivEnsenianzaMatriculaComponent() {
    const idInscripcion = getInscripcionId();

    //Datos estudiante
    const [carrerasIngresadas, setCarrerasIngresadas] = useState([]);

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

    function obtenerCarrerasEstudiante() {
        InscripcionService.getInscripcionById(idInscripcion).then((inscripcion) => {
            console.log("Esta es la inscripcion: " + JSON.stringify(inscripcion.data, null, 2));
            const idESTUDIANTE = inscripcion.data.idEstudiante;
            EstudianteService.getEstudianteById(idESTUDIANTE).then((estudiante) => {
                console.log("Este es el estudiante: " + JSON.stringify(estudiante.data, null, 2));
                console.log("Estas son las carreras ingresadas: " + JSON.stringify(estudiante.data.carrerasIngresadasIds, null, 2));
                setCarrerasIngresadas(estudiante.data.carrerasIngresadasIds);
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