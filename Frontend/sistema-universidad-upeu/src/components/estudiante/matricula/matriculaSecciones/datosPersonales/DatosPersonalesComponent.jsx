import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonaService from "../../../../../services/personaServices/PersonaService";
import EstudianteService from "../../../../../services/estudianteServices/estudiante/EstudianteService";
import Swal from 'sweetalert2';

function DatosPersonalesComponent({idOpcionNivel = "0", cambiarOpcion}) {

    //Datos de inscripcion
    const idInscripcion = getInscripcionId();

    //Datos de persona
    const [idPersona, setIdPersona] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellido_paterno, setApellido_paterno] = useState("");
    const [apellido_materno, setApellido_materno] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    //Datos de estudiante
    const [idEstudiante, setIdEstudiante] = useState("");
    const [codigoUniversitario, setCodigoUniversitario] = useState("");

    //Datos de responsable financiero
    const [idResponsableFinanciero, setIdResponsableFinanciero] = useState("");
    const [nombreCompletoResponsableFinanciero, setNombreCompletoResponsableFinanciero] = useState("");

    function obtenerTodosLosDatos() {
        InscripcionService.getInscripcionById(idInscripcion).then((response) => {
            setIdPersona(response.data.persona.id);
            setNombres(response.data.persona.nombres);
            setApellido_paterno(response.data.persona.apellido_paterno);
            setApellido_materno(response.data.persona.apellido_materno);
            setTipoDocumento(response.data.persona.tipoDocumento);
            setNumeroDocumento(response.data.persona.numeroDocumento);
            setTelefono(response.data.persona.telefono);
            setEmail(response.data.persona.email);

            setIdEstudiante(response.data.estudiante.idEstudiante);
            setCodigoUniversitario(response.data.estudiante.codigoUniversitario);

            const idResponsableResponse = response.data.estudiante.responsableFinanciero?.idResponsableFinanciero;
            const nombreCompletoResponsableResponse = `${response.data.estudiante.responsableFinanciero?.nombres} ${response.data.estudiante.responsableFinanciero?.apellido_paterno} ${response.data.estudiante.responsableFinanciero?.apellido_materno}`;
            setIdResponsableFinanciero(idResponsableResponse || "0");
            setNombreCompletoResponsableFinanciero(nombreCompletoResponsableResponse || "");
        })
    }

    async function actualizarPersonaConEstudiante(e){
        e.preventDefault();
        const datosPersona = {nombres, apellido_paterno, apellido_materno, tipoDocumento, numeroDocumento, telefono, email};
        await PersonaService.putPersonaDatosEspecificos(idPersona, datosPersona).then((response) => {
        }).catch((error) => {
            console.error(error);
        });

        await EstudianteService.putEstudianteCodigo(codigoUniversitario, idEstudiante).then((response) => {
        }).catch((error) => {
            console.error(error);
        })

        Swal.fire({
                    title: '¡Éxito!',
                    text: `Datos personales guardados correctamente`,
                    icon: 'success', // Icono que se mostrará en la alerta
                    confirmButtonText: 'Aceptar', // Texto para el botón de confirmación
                });
    }

    async function actualizarYContinuar(e){
        e.preventDefault();
        await actualizarPersonaConEstudiante(e);
        await Swal.fire({
            title: '¡Éxito!',
            text: `Datos personales guardados correctamente`,
            icon: 'success', // Icono que se mostrará en la alerta
            confirmButtonText: 'Aceptar', // Texto para el botón de confirmación
        });
        cambiarOpcion("CURSOS");
    }

    useEffect(() => {
        obtenerTodosLosDatos();
    }, [])
    return (
        <div className="container">
            <div>
                <label>Nombres</label>
                <input type="text" placeholder="Ingrese los nombres" value={nombres} onChange={(e) => {setNombres(e.target.value)}}/>
            </div>

            <div>
                <label>Apellido paterno</label>
                <input type="text" placeholder="Ingrese el apellido paterno" value={apellido_paterno} onChange={(e) => {setApellido_paterno(e.target.value)}}/>
            </div>

            <div>
                <label>Apellido materno</label>
                <input type="text" placeholder="Ingrese apellido materno" value={apellido_materno} onChange={(e) => {setApellido_materno(e.target.value)}}/>
            </div>

            <div>
                <label>Tipo documento</label>
                <input type="text" placeholder="Ingrese el tipo de documento" value={tipoDocumento} onChange={(e) => {setTipoDocumento(e.target.value)}}/>
            </div>

            <div>
                <label>Número de documento</label>
                <input type="text" placeholder="Ingrese el numero de documento" value={numeroDocumento} onChange={(e) => {setNumeroDocumento(e.target.value)}}/>
            </div>

            <div>
                <label>Código</label>
                <input type="text" placeholder="Ingrese el codigo" value={codigoUniversitario} onChange={(e) => {setCodigoUniversitario(e.target.value)}}/>
            </div>

            <div>
                <label>Celular</label>
                <input type="text" placeholder="Ingrese el celular" value={telefono} onChange={(e) => {setTelefono(e.target.value)}}/>
            </div>

            <div>
                <label>Correo Electronico</label>
                <input type="text" placeholder="Ingrese el correo electronico" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>

            <div>
                <label>Responsable financiero</label>
                <Link to={`/add-responsableFinanciero/${idResponsableFinanciero}/${idOpcionNivel}`}>AÑADIR O ACTUALIZAR RESPONSABLE FINANCIERO</Link>
                <input type="text" placeholder="Ingrese el responsable financiero" value={nombreCompletoResponsableFinanciero} onChange={(e) => {setNombreCompletoResponsableFinanciero(e.target.value)}}/>
            </div>

            <button onClick={(e) => {actualizarPersonaConEstudiante(e)}}>GUARDAR</button>
            <button onClick={(e) => {actualizarYContinuar(e)}}>GUARDAR Y CONTINUAR</button>
        </div>
    )
}

export default DatosPersonalesComponent;