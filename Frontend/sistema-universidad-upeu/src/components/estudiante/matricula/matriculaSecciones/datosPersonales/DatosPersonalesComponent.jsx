import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DatosPersonalesComponent() {
    //Datos de inscripcion
    const idInscripcion = getInscripcionId();

    //Datos de persona
    const [nombres, setNombres] = useState("");
    const [apellido_paterno, setApellido_paterno] = useState("");
    const [apellido_materno, setApellido_materno] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    //Datos de estudiante
    const [codigoUniversitario, setCodigoUniversitario] = useState();

    //Datos de responsable financiero
    const [idResponsableFinanciero, setIdResponsableFinanciero] = useState();
    const [nombreResponsableFinanciero, setNombreResponsableFinanciero] = useState();

    function obtenerTodosLosDatos() {
        InscripcionService.getInscripcionById(idInscripcion).then((response) => {
            setNombres(response.data.persona.nombres);
            setApellido_paterno(response.data.persona.apellido_paterno);
            setApellido_materno(response.data.persona.apellido_materno);
            setTipoDocumento(response.data.persona.tipoDocumento);
            setNumeroDocumento(response.data.persona.numeroDocumento);
            setTelefono(response.data.persona.telefono);
            setEmail(response.data.persona.email);

            setCodigoUniversitario(response.data.estudiante.codigoUniversitario);

            setIdResponsableFinanciero(response.data.estudiante.idResponsableFinanciero);
            setNombreResponsableFinanciero(response.data.estudiante.responsableFinanciero.nombres);
        })
    }

    useEffect(() => {
        obtenerTodosLosDatos();
    }, [])
    return (
        <div className="container">
            <div>
                <label>Nombres</label>
                <input type="text" value={nombres} onChange={(e) => {setNombres(e.target.value)}}/>
            </div>

            <div>
                <label>Apellido paterno</label>
                <input type="text" value={apellido_paterno} onChange={(e) => {setApellido_paterno(e.target.value)}}/>
            </div>

            <div>
                <label>Apellido materno</label>
                <input type="text" value={apellido_materno} onChange={(e) => {setApellido_materno(e.target.value)}}/>
            </div>

            <div>
                <label>Tipo documento</label>
                <input type="text" value={tipoDocumento} onChange={(e) => {setTipoDocumento(e.target.value)}}/>
            </div>

            <div>
                <label>Número de documento</label>
                <input type="text" value={numeroDocumento} onChange={(e) => {setNumeroDocumento(e.target.value)}}/>
            </div>

            <div>
                <label>Código</label>
                <input type="text" value={codigoUniversitario} onChange={(e) => {setCodigoUniversitario(e.target.value)}}/>
            </div>

            <div>
                <label>Celular</label>
                <input type="text" value={telefono} onChange={(e) => {setTelefono(e.target.value)}}/>
            </div>

            <div>
                <label>Correo Electronico</label>
                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>

            <div>
                <label>Responsable financiero</label>
                <Link to={`/add-responsableFinanciero/${idResponsableFinanciero}`}></Link>
                <input type="text" value={nombreResponsableFinanciero} onChange={(e) => {setNombreResponsableFinanciero(e.target.value)}}/>
            </div>

            <button>GUARDAR</button>
            <button>GUARDAR Y CONTINUAR</button>
        </div>
    )
}

export default DatosPersonalesComponent;