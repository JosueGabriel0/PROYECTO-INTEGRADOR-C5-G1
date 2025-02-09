import React, { useEffect, useState } from "react";
import CuentaFinancieraService from "../../../../../services/cuentaFinancieraServices/CuentaFinancieraService";
import EstudianteService from "../../../../../services/estudianteServices/estudiante/EstudianteService";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";
import PersonaService from "../../../../../services/personaServices/PersonaService";
import { Link, useNavigate } from "react-router-dom";
import MovimientoAcademicoService from "../../../../../services/cuentaFinancieraServices/MovimientoAcademicoService";
import PagoService from "../../../../../services/pagoServices/PagoService";
import SaldoAFavorService from "../../../../../services/cuentaFinancieraServices/SaldoAFavorService";

function EstadoFinancieroComponent() {
    const [imagendePersona, setImagenDePersona] = useState("")

    //Datos de Cuenta financiera
    const [idCuentaFinanciera, setIdCuentaFinanciera] = useState("");
    const [entidad, setEntidad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [anio, setAnio] = useState("");
    const [sumasDebito, setSumasDebito] = useState("");
    const [sumasCredito, setSumasCredito] = useState("");
    const [saldoFinalDebito, setSaldoFinalDebito] = useState("");
    const [saldoFinalCredito, setSaldoFinalCredito] = useState("");

    //Datos de Saldo A Favor
    const [montoSaldoAFavor, setMontoSaldoAFavor] = useState("");
    const [montoGastado, setMontoGastado] = useState("");
    const [fechaSaldoAFavor, setFechaSaldoAFavor] = useState("");

    //Datos Personales
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [codigoUniversitario, setCodigoUniversitario] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [responsableFinancieroNombres, setResponsableFinancieroNombres] = useState("");
    const [responsableFinancieroTelefono, setResponsableFinancieroTelefono] = useState("");
    const [responsableFinancieroTipoDocumento, setResponsableFinancieroTipoDocumento] = useState("");
    const [responsableFinancieroNumeroDocumento, setResponsableFinancieroNumeroDocumento] = useState("");

    //Datos Movimientos Academicos
    const [movimientosAcademicos, setMovimientosAcademicosAcademicos] = useState([]);

    const currentYear = new Date().getFullYear();
    const [filtroAnio, setFiltroAnio] = useState(currentYear);
    const [tempAnio, setTempAnio] = useState(currentYear); // Estado temporal para el valor del select


    const idInscripcion = getInscripcionId();

    //React Router Dom
    const navigate = useNavigate();

    function obtenerFotoPersona() {
        InscripcionService.getInscripcionById(idInscripcion).then(async (response) => {
            if (response.data.persona.fotoPerfil) {
                const imagenUrl = await PersonaService.getPersonaImagen(response.data.persona.fotoPerfil);
                console.log("URL de la imagen de Persona:", imagenUrl);
                setImagenDePersona(imagenUrl);
            } else {
                console.warn("La Persona no tiene una foto de Perfil definida.");
            }
        })
    }

    function listarMovimientosAcademicos(idCuentaFinanciera, anio) {
        MovimientoAcademicoService.getMovimientoAcademicoByCuentaYAnio(idCuentaFinanciera, anio).then((response) => {
            setMovimientosAcademicosAcademicos(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    function listarSaldoAFavor(idCuentaFinanciera, anio){
        SaldoAFavorService.getSaldoAFavorByCuentaYAnio(idCuentaFinanciera, anio).then((response) => {
            console.log("Este es el response: " + JSON.stringify(response.data, null, 2));
            console.log("Este es el monto del saldo a favor: " + response.data.montoSaldoAFavor + " y esta la fecha: " + response.data.fechaSaldoAFavor)
            setMontoSaldoAFavor(response.data.montoSaldoAFavor);
            setMontoGastado(response.data.montoGastado);
            setFechaSaldoAFavor(response.data.fechaSaldoAFavor);
        }).catch((error) => {
            console.log(error);
        });
    }

    function YearFilter() {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 2001 }, (_, i) => 2002 + i);

        const handleFiltrar = async () => {
            // Actualizamos filtroAnio
            await new Promise((resolve) => {
                setFiltroAnio(tempAnio);
                resolve(); // Aseguramos que esto se ejecute antes de continuar
            });

            // Confirmamos los valores actualizados
            console.log("Este es el id de la cuenta financiera1: " + idCuentaFinanciera + " y este es el anio1: " + tempAnio);

            // Llamada a listarMovimientosAcademicos
            try {
                listarMovimientosAcademicos(idCuentaFinanciera, tempAnio); // Si listarMovimientosAcademicos es async
                console.log("Movimientos académicos filtrados correctamente.");

                listarSaldoAFavor(idCuentaFinanciera, tempAnio);
                console.log("Saldo a Favor filtrado correctamente.");
            } catch (error) {
                console.error("Error al listar movimientos académicos:", error);
            }
        };

        useEffect(() => {
            if (idCuentaFinanciera && filtroAnio) {
                handleFiltrar(); // Ejecutar el filtrado automáticamente una vez que los datos estén listos
            }
        }, [idCuentaFinanciera, filtroAnio]);

        return (
            <div>
                <label>Año:</label>
                <select
                    name="filtroAnio"
                    value={tempAnio}
                    onChange={(e) => {
                        setTempAnio(e.target.value); // Actualiza solo el estado temporal
                    }}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button onClick={handleFiltrar}>FILTRAR</button>

                <div>
                    <p>Año filtrado: {filtroAnio || "No se ha seleccionado ningún año"}</p>
                </div>
            </div>
        );
    }

    function verComprobante(idPago) {
        PagoService.getPagoById(idPago).then((response) => {
            console.log("Este es el response: " + JSON.stringify(response.data, null, 2));
            const comprobanteUrl = response.data.boleta ? response.data.boleta.boletaUrl : response.data.factura.facturaUrl;
            navigate(`/ver-comprobante/${comprobanteUrl}`)
        })
    }

    useEffect(() => {
        const obtenerDatosCuentaFinanciera = async () => {
            try {
                const inscripcion = await InscripcionService.getInscripcionById(idInscripcion);
                const persona = await PersonaService.getPersonaById(inscripcion.data.idPersona);
                const estudiante = await EstudianteService.getEstudianteById(inscripcion.data.idEstudiante);

                const idPersona = persona.data.id;
                const idEstudiante = estudiante.data.idEstudiante;
                const idCuentaFinanciera = estudiante.data.idCuentaFinanciera;

                console.log("Este es el id de la inscripcion: " + idInscripcion);
                console.log("Este es el id de la persona: " + idPersona);
                console.log("Este es el id del estudiante: " + idEstudiante);
                console.log("Este es el id de la cuenta financiera: " + idCuentaFinanciera);

                if (idPersona) {
                    setNombreCompleto(persona.data.nombres + " " + persona.data.apellido_paterno + " " + persona.data.apellido_materno);
                    setEmail(persona.data.email);
                    setTelefono(persona.data.telefono);
                } else {
                    console.error("ID de Persona no disponible.");
                }

                if (idEstudiante) {
                    setCodigoUniversitario(estudiante.data.codigoUniversitario);
                    setResponsableFinancieroNombres(estudiante.data.responsableFinanciero.nombres + " " + estudiante.data.responsableFinanciero.apellido_paterno + " " + estudiante.data.responsableFinanciero.apellido_materno);
                    setResponsableFinancieroTelefono(estudiante.data.responsableFinanciero.celular);
                    setResponsableFinancieroTipoDocumento(estudiante.data.responsableFinanciero.tipoDocumento);
                    setResponsableFinancieroNumeroDocumento(estudiante.data.responsableFinanciero.numeroDocumento);
                } else {
                    console.error("ID del estudiante no disponible.");
                }

                if (idCuentaFinanciera) {
                    CuentaFinancieraService.getCuentaFinancieraById(idCuentaFinanciera).then((response) => {
                        setEntidad(response.data.entidad);
                        setDepartamento(response.data.departamento);
                        setAnio(response.data.anio);
                        setSumasDebito(response.data.sumasDebito);
                        setSumasCredito(response.data.sumasCredito);
                        setSaldoFinalDebito(response.data.saldoFinalDebito);
                        setSaldoFinalCredito(response.data.saldoFinalCredito);
                        console.log("Este es el id de la cuenta financiera: " + response.data.idCuentaFinanciera + " y este es el anio: " + filtroAnio);
                        setIdCuentaFinanciera(response.data.idCuentaFinanciera);
                    });
                } else {
                    console.error("ID de cuenta financiera no disponible.");
                }
            } catch (error) {
                console.error("Error al obtener algunos datos", error);
            }
        };

        obtenerDatosCuentaFinanciera();
        obtenerFotoPersona();
        listarMovimientosAcademicos(idCuentaFinanciera, filtroAnio);
    }, []);

    return (
        <div className="container">
            <h2>Bienvenido al Estado Financiero</h2>
            <h2>Universidad Peruana Unión</h2>
            <h3>Carret. Central Km 19.5 Ñaña. Telef. 6816300</h3>
            <h3>Fax. 618-6339 Castilla 3564 Lima 1, Perú.</h3>
            <h2>Estado Financiero</h2>

            <div>
                <div>
                    <label htmlFor="">Entidad:</label>
                    <select name="entidad" value={entidad}>
                        <option value="">Seleccione una entidad</option>
                        <option value={entidad}>{entidad}</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="">Departamento:</label>
                    <select name="departamento" value={departamento}>
                        <option value="">Seleccione un departamento</option>
                        <option value={departamento}>{departamento}</option>
                    </select>
                </div>

                {YearFilter()}

                <div>
                    <label htmlFor="">De:</label>
                    <select disabled>
                        <option value="">Enero</option>
                        <option value="">Seleccione un desde que mes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="">Hasta:</label>
                    <select disabled>
                        <option value="">Diciembre</option>
                        <option value="">Seleccione hasta que mes</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="view-profile-image-container">
                    {imagendePersona ? (
                        <img
                            src={imagendePersona}
                            alt="Foto de perfil"
                            className="view-profile-image"
                        />
                    ) : (
                        <div className="view-placeholder-image">Sin foto</div>
                    )}
                </div>
                <div>
                    <label htmlFor=""><b>Alumno:</b>&nbsp;{nombreCompleto}</label>
                    <label htmlFor=""><b>Codigo:</b>&nbsp;{codigoUniversitario}</label>
                    <label htmlFor=""><b>EAP:</b>&nbsp;</label>
                    <label htmlFor=""><b>e-mail:</b>&nbsp;{email}</label>
                    <label htmlFor=""><b>AluTelf/Cel:</b>&nbsp;{telefono}</label>
                    <label htmlFor=""><b>Resp. Finan:</b>&nbsp;{responsableFinancieroNombres}</label>
                    <label htmlFor=""><b>Tel R.F:</b>&nbsp;{responsableFinancieroTelefono}</label>
                    <label htmlFor=""><b>{responsableFinancieroTipoDocumento} R.F:</b>&nbsp;{responsableFinancieroNumeroDocumento}</label>
                </div>
            </div>

            <div>
                <h4>Depositar:</h4>
                <Link to="/">DEPOSITE AQUI</Link>&nbsp;&nbsp;
                <Link to={`/list-vouchers/${idCuentaFinanciera}/${filtroAnio}`}>VOUCHER DE DEPOSITO</Link>
            </div>

            <div>
                <div>
                    <h4>Mis depositos: </h4>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Voucher</th>
                                <th>Lote</th>
                                <th>Documento</th>
                                <th>Mov</th>
                                <th>Glosa</th>
                                <th>Débito</th>
                                <th>Crédito</th>
                                <th>PDF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientosAcademicos ? (
                                movimientosAcademicos.map((movimiento) => (
                                    <tr key={movimiento.idMovimientoAcademico}>
                                        <td>{movimiento.idMovimientoAcademico}</td>
                                        <td>{movimiento.fecha}</td>
                                        <td>{movimiento.voucher}</td>
                                        <td>{movimiento.lote}</td>
                                        <td>{movimiento.documento}</td>
                                        <td>{movimiento.movimiento}</td>
                                        <td>{movimiento.descripcion}</td>
                                        <td>{movimiento.debito}</td>
                                        <td>{movimiento.credito}</td>
                                        <td>
                                            <button onClick={(e) => {verComprobante(movimiento.idPago)}}>Ver comprobante</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No hay movimientos disponibles</td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="6"></td>
                                <td colSpan="1">Saldo Final:</td>
                                <td colSpan="1">{montoGastado}</td>
                                <td colSpan="1">{montoSaldoAFavor}</td>
                                <td colSpan="1"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            
            <label><b>Ud. tiene a favor un saldo de</b></label>
            <label><br /><b>{montoSaldoAFavor}</b><br /></label>
            <label><b>nuevos Soles</b></label>
        </div>
    );
}

export default EstadoFinancieroComponent;