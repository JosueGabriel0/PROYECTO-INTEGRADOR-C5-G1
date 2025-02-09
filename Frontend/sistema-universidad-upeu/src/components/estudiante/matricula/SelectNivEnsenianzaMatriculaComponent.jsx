import React from "react";
import { useEffect, useState } from "react";

import MatriculaService from "../../../services/matriculaServices/MatriculaService";
import { getInscripcionId } from "../../../services/authServices/authService";
import InscripcionService from "../../../services/inscripcionServices/InscripcionService";
import OpcionNivelService from "../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import NivelEnsenanzaService from "../../../services/nivelDeEnsenanzaServices/NivelEnsenanzaService";
import "../../../style-sheets/generalMomentaneo.css";
import PlanificacionAcademicaService from "../../../services/planificacionAcademicaServices/PlanificacionAcademicaService";
import CarreraService from "../../../services/carreraServices/CarreraService";
import { useNavigate } from "react-router-dom";

function SelectNivEnsenianzaMatriculaComponent() {
    const idInscripcion = getInscripcionId();

    //Datos de nivel ensenanza
    const [idNivelEnsenanza, setIdNivelEnsenanza] = useState("");

    //Datos de opciones de nivel de ensenanza
    const [opcionesNivel, setOpcionesNivel] = useState([]);

    //Datos de nivel ensenanza
    const [nombresNivel, setNombresNivel] = useState({});

    //Datos de planificacion academica
    const [nombresPlanificacion, setNombresPlanificacion] = useState({});

    //Datos de Carrera
    const [nombresCarreras, setNombresCarreras] = useState({});

    //Datos loading
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(true);

    //React Router Dom
    const navigate = useNavigate();

    async function obtenerOpcionesNivel() {
        try {
            const inscripcion = await InscripcionService.getInscripcionById(idInscripcion);
            const idEstudiante = inscripcion.data.idEstudiante;
            const response = await OpcionNivelService.getOpcionesNivelPorCarrerasEstudiante(idEstudiante);
            setOpcionesNivel(response.data);

            // Obtener nombres de nivel en paralelo
            const nombresNivelEnsenanza = {};
            const nombresPlanificacionAcademica = {};
            const nombresCarrerasOpcionNivel = {};

            await Promise.all(
                response.data.map(async (opcionNivel) => {
                    const nivelResponse = await NivelEnsenanzaService.getNivelEnsenanzaByIdOpcionNivel(opcionNivel.idOpcionNivel);
                    const planificacionResponse = await PlanificacionAcademicaService.getPlanificacionAcademicaById(opcionNivel.idPLanificacionAcademica);
                    const carreraResponse = await CarreraService.getCarreraById(opcionNivel.idCarrera);

                    nombresNivelEnsenanza[opcionNivel.idOpcionNivel] = nivelResponse.data.nombre;
                    setIdNivelEnsenanza(nivelResponse.data.idNivelEnsenanza);
                    nombresPlanificacionAcademica[opcionNivel.idOpcionNivel] = planificacionResponse.data.nombrePlanEstudio;
                    nombresCarrerasOpcionNivel[opcionNivel.idOpcionNivel] = carreraResponse.data.nombre;
                })
            );

            setNombresNivel(nombresNivelEnsenanza);
            setNombresPlanificacion(nombresPlanificacionAcademica);
            setNombresCarreras(nombresCarrerasOpcionNivel);
        } catch (error) {
            console.error('Error al obtener las opciones de nivel:', error);
        } finally {
            setCargando(false);
        }
    }

    function nivelDeEnsenanzaSeleccionado(idOpcionNivel) {
        navigate(`/compromiso-consentimiento/${idOpcionNivel}/${idNivelEnsenanza}`);
    }

    useEffect(() => {
        obtenerOpcionesNivel();
    }, []);

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

    return (
        <div className="container">
            {cargando ? (
                <div>Cargando...</div>
            ) : (mensaje === 'Estudiante validado' ? (
                <div>
                    <h1>Seleccione un nivel de ensenanza.</h1>
                    {opcionesNivel ? (
                        opcionesNivel.map((opcionNivel) => {
                            return (
                                <div className="card" key={opcionNivel.idOpcionNivel} onClick={(e) => { nivelDeEnsenanzaSeleccionado(opcionNivel.idOpcionNivel) }}>
                                    <h2 className="card-title">{nombresNivel[opcionNivel.idOpcionNivel] || 'Cargando...'}</h2>
                                    <div className="card-content">
                                        <p><strong>Semestre:</strong>{opcionNivel.semestre}</p>
                                        <p><strong>Campus:</strong>{opcionNivel.campus}</p>
                                        <p><strong>Plan:</strong>{nombresPlanificacion[opcionNivel.idPLanificacionAcademica] || 'Cargando...'}</p>
                                        <p><strong>Programa de estudio</strong>{nombresCarreras[opcionNivel.idCarrera] || 'Cargando...'}</p>
                                        <p><strong>Modalidad de estudio</strong>{opcionNivel.modalidad}</p>
                                        <p><strong>Estado:</strong>{opcionNivel.estado}</p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p>No hay niveles de enseñanza</p>
                    )}
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