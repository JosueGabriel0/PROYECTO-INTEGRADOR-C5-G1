import { Link, useNavigate, useParams } from "react-router-dom";
import ResponsableFinancieroService from "../../../../../services/estudianteServices/estudiante/ResponsableFinancieroService";
import { useState } from "react";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";

function AddResponsableFinancieroComponent() {
    //React router dom
    const { idResponsableFinanciero, idOpcionNivel } = useParams();
    const navigate = useNavigate();

    //Auth
    const idInscripcion = getInscripcionId();

    //Datos de responsable financiero
    const [parentesco, setParentesco] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellido_paterno, setApellido_paterno] = useState("");
    const [apellido_materno, setApellido_materno] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [celular, setCelular] = useState("");
    const [direccion, setDireccion] = useState("");

    const [responsableFinansieroResponse, setResponsableFinansieroResponse] = useState({});

    //Datos de estudiante y persona
    const [idEstudiante, setIdEstudiante] = useState("");

    const [nombresPersona, setNombresPersona] = useState("");
    const [apellido_paternoPersona, setApellido_paternoPersona] = useState("");
    const [apellido_maternoPersona, setApellido_maternoPersona] = useState("");
    const [nacionalidadPersona, setNacionalidadPersona] = useState("");
    const [tipoDocumentoPersona, setTipoDocumentoPersona] = useState("");
    const [numeroDocumentoPersona, setNumeroDocumentoPersona] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccionPersona, setDireccionPersona] = useState("");

    async function saveOrUpdateResponsableFinanciero(e) {
        e.preventDefault();

        const responsableFinanciero = { nombres, apellido_paterno, apellido_materno, correoElectronico, celular, direccion, parentesco, nacionalidad, tipoDocumento, numeroDocumento };

        if (JSON.stringify(responsableFinansieroResponse) !== "{}") {
            ResponsableFinancieroService.putResponsableFinanciero(idResponsableFinanciero, responsableFinanciero).then((response) => {
                navigate(`/matricula/${idOpcionNivel}`);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            ResponsableFinancieroService.postResponsableFinancieroToEstudiante(idEstudiante, responsableFinanciero).then((response) => {
                navigate(`/matricula/${idOpcionNivel}`);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    function autoSustento(e) {
        e.preventDefault();

        const responsableFinanciero = { nombres: nombresPersona, apellido_paterno: apellido_paternoPersona, apellido_materno: apellido_maternoPersona, correoElectronico: email, celular: telefono, direccion: direccionPersona, parentesco: "Auto_sustento", nacionalidad: nacionalidadPersona, tipoDocumento: tipoDocumentoPersona, numeroDocumento: numeroDocumentoPersona };

        if (JSON.stringify(responsableFinansieroResponse) !== "{}") {
            ResponsableFinancieroService.putResponsableFinanciero(idResponsableFinanciero, responsableFinanciero).then((response) => {
                navigate(`/matricula/${idOpcionNivel}`);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            ResponsableFinancieroService.postResponsableFinancieroToEstudiante(idEstudiante, responsableFinanciero).then((response) => {
                navigate(`/matricula/${idOpcionNivel}`);
            }).catch((error) => {
                console.error(error);
            });
        }

    }

    function obtenerDatosEstudianteYPersona() {
        InscripcionService.getInscripcionById(idInscripcion).then((response) => {
            const idDelEstudiante = response.data.estudiante.idEstudiante;
            setIdEstudiante(idDelEstudiante);

            setNacionalidadPersona(response.data.persona.nacionalidad);
            setTipoDocumentoPersona(response.data.persona.tipoDocumento);
            setNumeroDocumentoPersona(response.data.persona.numeroDocumento);
            setNombresPersona(response.data.persona.nombres);
            setApellido_paternoPersona(response.data.persona.apellido_paterno);
            setApellido_maternoPersona(response.data.persona.apellido_materno);
            setEmail(response.data.persona.email);
            setTelefono(response.data.persona.telefono);
            setDireccionPersona(response.data.persona.direccion);
        })
    }

    async function verificarResponsableFinanciero() {
        if (idResponsableFinanciero !== "0") {
            ResponsableFinancieroService.getResponsablesFinancierosById(idResponsableFinanciero).then((response) => {
                setResponsableFinansieroResponse(response.data);
                setParentesco(response.data.parentesco);
                setNacionalidad(response.data.nacionalidad);
                setTipoDocumento(response.data.tipoDocumento);
                setNumeroDocumento(response.data.numeroDocumento);
                setNombres(response.data.nombres);
                setApellido_paterno(response.data.apellido_paterno);
                setApellido_materno(response.data.apellido_materno);
                setCorreoElectronico(response.data.correoElectronico);
                setCelular(response.data.celular);
                setDireccion(response.data.direccion);
            });
        }
    }

    useState(() => {
        verificarResponsableFinanciero();
        obtenerDatosEstudianteYPersona();
    }, [idResponsableFinanciero])

    return (
        <div className="container">
            <h1>Responsable Financiero</h1>
            <div>
                <div>
                    <label>Responsable financiero</label>
                    <select value={parentesco} onChange={(e) => { setParentesco(e.target.value) }}>
                        <option value="">Seleccione un responsable financiero</option>
                        <option value="Padre/Madre">Padre/Madre</option>
                        <option value="Auto_sustento">Auto Sustento</option>
                    </select>
                </div>

                <div>
                    <label>Nacionalidad</label>
                    <input type="text" placeholder="Ingrese la nacionalidad" value={nacionalidad} onChange={(e) => { setNacionalidad(e.target.value) }} />
                </div>

                <div>
                    <label>Tipo documento</label>
                    <input type="text" placeholder="Ingrese el tipo de documento" value={tipoDocumento} onChange={(e) => { setTipoDocumento(e.target.value) }} />
                </div>

                <div>
                    <label>Documento de identidad</label>
                    <input type="text" placeholder="Ingrese el documento de identidad" value={numeroDocumento} onChange={(e) => { setNumeroDocumento(e.target.value) }} />
                </div>

                <div>
                    <label>Nombres</label>
                    <input type="text" placeholder="Ingrese los nombres" value={nombres} onChange={(e) => { setNombres(e.target.value) }} />
                </div>

                <div>
                    <label>Apellido paterno</label>
                    <input type="text" placeholder="Ingrese el apellido paterno" value={apellido_paterno} onChange={(e) => { setApellido_paterno(e.target.value) }} />
                </div>

                <div>
                    <label>Apellido materno</label>
                    <input type="text" placeholder="Ingrese la apellido materno" value={apellido_materno} onChange={(e) => { setApellido_materno(e.target.value) }} />
                </div>

                <div>
                    <label>Correo electronico</label>
                    <input type="text" placeholder="Ingrese el correo electronico" value={correoElectronico} onChange={(e) => { setCorreoElectronico(e.target.value) }} />
                </div>

                <div>
                    <label>Celular</label>
                    <input type="text" placeholder="Ingrese el celular" value={celular} onChange={(e) => { setCelular(e.target.value) }} />
                </div>

                <div>
                    <label>Direccion</label>
                    <input type="text" placeholder="Ingrese la direccion" value={direccion} onChange={(e) => { setDireccion(e.target.value) }} />
                </div>

                <button onClick={(e) => { autoSustento(e) }}>AUTO SUSTENTO</button>
                {JSON.stringify(responsableFinansieroResponse) !== "{}" ? (
                    <button onClick={(e) => { saveOrUpdateResponsableFinanciero(e) }}>CAMBIAR RESPONSABLE</button>
                ) : (
                    <button onClick={(e) => { saveOrUpdateResponsableFinanciero(e) }}>AGREGAR RESPONSABLE</button>
                )}
                <Link to={`/matricula/${idOpcionNivel}`}>CANCELAR</Link>
            </div>
        </div>
    )
}

export default AddResponsableFinancieroComponent;