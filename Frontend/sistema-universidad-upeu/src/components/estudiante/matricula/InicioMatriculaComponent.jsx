import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getInscripcionId } from "../../../services/authServices/authService";
import MatriculaService from "../../../services/matriculaServices/MatriculaService";

function InicioMatriculaComponent() {
    const idInscripcion = getInscripcionId();

    function componenteConValidacionExtra() {
        const [mensaje, setMensaje] = useState('');
        const [cargando, setCargando] = useState(true);
    
        useEffect(() => {
            // Llamada al backend para validar si es estudiante
            const validarEstudiante = async () => {
                try {
                    const response = await MatriculaService.getValidationEstudianteMatricula(idInscripcion);
                    setMensaje(response.data.mensaje);
                } catch (error) {
                    console.error('Error al validar estudiante:', error);
                    setMensaje('Estudiante no encontrado');
                } finally {
                    setCargando(false); // Termina la carga
                }
            };
    
            validarEstudiante();
        }, [idInscripcion]);
    
        if (cargando) {
            return <div>Cargando...</div>;
        }
    
        if (mensaje === 'Estudiante validado') {
            return (
                <div>
                    <h1>Matricula virtual</h1>
                    <h4>Clic para iniciar el proceso de matricula virtual.</h4>
                    <Link to="/select-matricula-virtual-estudiante">Empezar</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>No es un estudiante, no tiene permitido realizar esta acción</h2>
                </div>
            );
        }
    }

    return (
        <div className="container">
            {componenteConValidacionExtra()}
        </div>
    )
}

export default InicioMatriculaComponent;