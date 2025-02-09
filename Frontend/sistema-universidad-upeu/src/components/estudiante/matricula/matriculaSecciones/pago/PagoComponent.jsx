import PagoCursosComponent from "./PagoCursosComponent";
import PagoDatosComponent from "./PagoDatosComponent";
import PagoMedioComponent from "./PagoMedioComponent";
import "../../../../../style-sheets/generalMomentaneo.css"
import { useEffect, useState } from "react";
import MatriculaService from "../../../../../services/matriculaServices/MatriculaService";
import PagoService from "../../../../../services/pagoServices/PagoService";
import MovimientoAcademicoService from "../../../../../services/cuentaFinancieraServices/MovimientoAcademicoService";
import { getInscripcionId } from "../../../../../services/authServices/authService";
import InscripcionService from "../../../../../services/inscripcionServices/InscripcionService";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import Swal from "sweetalert2";
import EstudianteService from "../../../../../services/estudianteServices/estudiante/EstudianteService";
import PersonaService from "../../../../../services/personaServices/PersonaService";
import SaldoAFavorService from "../../../../../services/cuentaFinancieraServices/SaldoAFavorService";
import { useNavigate } from "react-router-dom";

function PagoComponent({ cursosSeleccionados, totalCreditos, cicloDetalleConMayorNumero, idOpcionNivel, idsDocente, totalHoras, setEstado, idMatricula, idNivelEnsenanza }) {
    const idInscripcion = getInscripcionId();
    const [estadoMedioDePago, setEstadoMedioDePago] = useState("");

    const [costoDeMatricula, setCostoDeMatricula] = useState("");
    const [costoDeEnsenanzaTotal, setCostoDeEnsenanzaTotal] = useState("");
    const [total, setTotal] = useState("");

    const [comprobante, setComprobante] = useState("");

    //Por el momento no hay descuentos
    const [descuentos, setDescuentos] = useState(0);

    const [cuotaPorMes, setCuotaPorMes] = useState("");

    const [totalConPrimeraCuota, setTotalConPrimeraCuota] = useState(0);

    const [importeADepositar, setImporteADepositar] = useState("");

    const [idCuentaFinanciera, setIdCuentaFinanciera] = useState(0);

    const [idEstudiante, setIdEstudiante] = useState(0);

    const [idCiclo, setIdCiclo] = useState(0);

    const [cursosDetalleIds, setCursosDetalleIds] = useState([]);

    const [fechaMatricula, setFechaMatricula] = useState("");

    const fechaActual = new Date().toLocaleDateString('en-CA');

    const currentYear = new Date().getFullYear();

    const [nombresCompletos, setNombresCompletos] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documentoDeIdentidad, setDocumentoDeIdentidad] = useState("");
    const [direccion, setDireccion] = useState("");

    const [saldoAFavor, setSaldoAFavor] = useState(0);

    const [idCarrera, setIdCarrera] = useState("");

    const navigate = useNavigate();

    async function generarContrato(e) {
        e.preventDefault();

        const pagoConBoleta = {
            pago: {
                montoTotal: total,
                metodoDePago: "POR_CUENTA_FINANCIERA",
                medioDePago: estadoMedioDePago,
                estado: "Pagado",
                descripcion: `Pago de matrícula al ${estadoMedioDePago} cuota por mes ${cuotaPorMes}, pago total con primera cuota ${totalConPrimeraCuota}`,
                idEstudiante,
                fechaPago: fechaActual,
            },
            boleta: {
                nombreCliente: nombresCompletos,
                documentoDeIdentidad,
                direccion,
                numeroBoleta: "B541-00067650",
                fechaEmision: fechaActual,
                descripcionBoleta: "Pago de matrícula 2024-1",
                tipoDocumento,
                sucursal: "Sucursal Juliaca",
                organizacionDeVentas: "Oficina Central",
                tipoMoneda: "PEN",
                codigoProductoServicio: "MAT2024-1",
                descripcionProductoServicio: "Matricula 2024-1",
                unidadDeMedida: "Servicio",
                cantidad: 1,
                valorUnitario: total,
                valorDescuento: 0,
                operacionInafecta: 1.00
            }
        };
        const pagoConFactura = {
            pago: {
                montoTotal: total,
                metodoDePago: "POR_CUENTA_FINANCIERA",
                medioDePago: estadoMedioDePago,
                estado: "Pagado",
                descripcion: `Pago de matrícula al ${estadoMedioDePago} cuota por mes ${cuotaPorMes}, pago total con primera cuota ${totalConPrimeraCuota}`,
                idEstudiante,
                fechaPago: fechaActual,
            },
            factura: {
                nombreCliente: nombresCompletos,
                documentoDeIdentidad,
                direccion,
                numeroBoleta: "B541-00067650",
                fechaEmision: fechaActual,
                descripcionBoleta: "Pago de matrícula 2024-1",
                tipoDocumento,
                sucursal: "Sucursal Juliaca",
                organizacionDeVentas: "Oficina Central",
                tipoMoneda: "PEN",
                estadoFactura: "Pagado",
                codigoProductoServicio: "MAT2024-1",
                descripcionProductoServicio: "Matricula 2024-1",
                unidadDeMedida: "Servicio",
                cantidad: 1,
                valorUnitario: total,
                valorDescuento: 0,
                operacionInafecta: 1.00
            }
        };

        if (cursosSeleccionados.length > 0) {
            if (estadoMedioDePago === "CONTADO" || estadoMedioDePago === "5_CUOTAS") {
                if (comprobante === "BOLETA" || comprobante === "FACTURA") {
                    if (importeADepositar === 0) {
                        Swal.fire({
                            title: "¿Esta seguro de generar el contrato?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                if (comprobante === "BOLETA") {
                                    await PagoService.postPagoConBoleta(pagoConBoleta).then(async (response) => {
                                        try {
                                            const matricula = {
                                                idNivelEnsenanza,
                                                idOpcionNivel,
                                                idEstudiante,
                                                idCarrera,
                                                idPago: response.data.pago.idPago,
                                                tipoAlumno: "REGULAR",
                                                numeroDeCreditos: totalCreditos,
                                                horas: totalHoras,
                                                costoMatricula: costoDeMatricula,
                                                costoEnsenanza: costoDeEnsenanzaTotal,
                                                costoTotal: total,
                                                idCiclo,
                                                cursosDetalleIds,
                                                estado: "COMPLETADO",
                                                fechaMatricula,
                                                observaciones: "Matriculado con éxito"
                                            };
                                            await MatriculaService.putMatricula(idMatricula, matricula);

                                            const movimientoAcademico = {
                                                idPago: response.data.pago.idPago,
                                                fecha: response.data.boleta.fechaEmision,
                                                voucher: 12345,
                                                lote: "Lote12345",
                                                documento: response.data.boleta.documentoDeIdentidad,
                                                movimiento: "Pago matricula contado 2024-1",
                                                descripcion: "Matricula Contado Pregrado 2024-1",
                                                debito: response.data.boleta.precioVentaTotal,
                                                credito: 0
                                            };
                                            await MovimientoAcademicoService.postMovimientoAcademicoToCuentaFinanciera(idCuentaFinanciera, movimientoAcademico);
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    })
                                    navigate("/select-matricula-virtual-estudiante");
                                } else if (comprobante === "FACTURA") {
                                    await PagoService.postPagoConFactura(pagoConFactura).then(async (response) => {
                                        try {
                                            const matricula = {
                                                idNivelEnsenanza,
                                                idOpcionNivel,
                                                idEstudiante,
                                                idCarrera,
                                                idPago: response.data.pago.idPago,
                                                tipoAlumno: "REGULAR",
                                                numeroDeCreditos: totalCreditos,
                                                horas: totalHoras,
                                                costoMatricula: costoDeMatricula,
                                                costoEnsenanza: costoDeEnsenanzaTotal,
                                                costoTotal: total,
                                                idCiclo,
                                                cursosDetalleIds,
                                                estado: "COMPLETADO",
                                                fechaMatricula,
                                                observaciones: "Matriculado con éxito"
                                            };
                                            await MatriculaService.putMatricula(idMatricula, matricula);

                                            const movimientoAcademico = {
                                                idPago: response.data.pago.idPago,
                                                fecha: response.data.boleta.fechaEmision,
                                                voucher: 12345,
                                                lote: "Lote12345",
                                                documento: response.data.boleta.documentoDeIdentidad,
                                                movimiento: "Pago matricula contado 2024-1",
                                                descripcion: "Matricula Contado Pregrado 2024-1",
                                                debito: response.data.boleta.precioVentaTotal,
                                                credito: 0
                                            };
                                            await MovimientoAcademicoService.postMovimientoAcademicoToCuentaFinanciera(idCuentaFinanciera, movimientoAcademico);
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }).catch((error) => {
                                        console.error(error);
                                    })
                                    navigate("/select-matricula-virtual-estudiante");
                                }
                                console.log("Este es el id y el total: " + idCuentaFinanciera + " " + total);
                                SaldoAFavorService.postSaldoAFavorRestarByCuentaFinanciera(idCuentaFinanciera, { monto: total });
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "⚠️ Saldo insuficiente",
                            text: "Recargue su cuenta financiera a traves de un metodo de pago",
                            icon: "error",
                            confirmButtonText: "Entendido",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "⚠️ Comprobante no seleccionado",
                        text: "Seleccione un comprobante para realizar el contrato",
                        icon: "error",
                        confirmButtonText: "Entendido",
                    });
                }
            } else {
                Swal.fire({
                    title: "⚠️ Medio de pago no seleccionado",
                    text: "Seleccione un medio de pago para realizar el contrato",
                    icon: "error",
                    confirmButtonText: "Entendido",
                });
            }

        } else {
            Swal.fire({
                title: "⚠️ No hay ningun curso seleccionado",
                text: "Seleccione al menos 1 curso para poder generar un contrato",
                icon: "error",
                confirmButtonText: "Entendido",
            });
        }
    }

    async function listarDatos() {
        try {
            const [responseInscripcion, responseOpcionNivel] = await Promise.all([
                InscripcionService.getInscripcionById(idInscripcion),
                OpcionNivelService.getOpcionNivelById(idOpcionNivel)
            ]);

            const fechaActual = new Date().toLocaleDateString('en-CA');

            setIdCuentaFinanciera(responseInscripcion.data.estudiante.idCuentaFinanciera);
            setIdEstudiante(responseInscripcion.data.estudiante.idEstudiante);
            setIdCarrera(responseOpcionNivel.data.idCarrera);
            setIdCiclo(cicloDetalleConMayorNumero.ciclo.idCiclo);
            setCursosDetalleIds((prevCursos) => [
                ...prevCursos,
                ...cursosSeleccionados.map(curso => curso.idCursoDetalle)
            ]);
            setFechaMatricula(fechaActual);

            EstudianteService.getEstudianteById(responseInscripcion.data.estudiante.idEstudiante).then((estudianteResponse) => {
                PersonaService.getPersonaById(estudianteResponse.data.idPersona).then((personaResponse) => {
                    setNombresCompletos(`${personaResponse.data.nombres} ${personaResponse.data.apellido_paterno} ${personaResponse.data.apellido_materno}`);
                    setTipoDocumento(personaResponse.data.tipoDocumento);
                    setDocumentoDeIdentidad(personaResponse.data.numeroDocumento);
                    setDireccion(personaResponse.data.direccion);
                }).catch((error) => {
                    console.error(error);
                });
                SaldoAFavorService.getSaldoAFavorByCuentaYAnio(estudianteResponse.data.idCuentaFinanciera, currentYear).then((saldoAFavorResponse) => {
                    setSaldoAFavor(saldoAFavorResponse.data.montoSaldoAFavor);
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((error) => {
                console.error(error);
            });

        } catch (error) {
            console.error("Error en la obtención de datos:", error);
        }
    }

    useEffect(() => {
        listarDatos();
    }, [])

    return (
        <div className="container">
            <div>
                <h3>PROFORMA FINANCIERA</h3>
            </div>
            <div className="containerPago">
                <div className="columnPago">
                    <PagoCursosComponent cursosSeleccionados={cursosSeleccionados} totalCreditos={totalCreditos} cicloDetalleConMayorNumero={cicloDetalleConMayorNumero} idOpcionNivel={idOpcionNivel} idsDocente={idsDocente} totalHoras={totalHoras} />
                </div>
                <div className="columnPago">
                    <PagoDatosComponent idOpcionNivel={idOpcionNivel}
                        cursosSeleccionados={cursosSeleccionados}
                        estadoMedioDePago={estadoMedioDePago}
                        setEstadoMedioDePago={setEstadoMedioDePago}
                        costoDeMatricula={costoDeMatricula}
                        setCostoDeMatricula={setCostoDeMatricula}
                        costoDeEnsenanzaTotal={costoDeEnsenanzaTotal}
                        setCostoDeEnsenanzaTotal={setCostoDeEnsenanzaTotal}
                        total={total}
                        setTotal={setTotal}
                        descuentos={descuentos}
                        setDescuentos={setDescuentos}
                        cuotaPorMes={cuotaPorMes}
                        setCuotaPorMes={setCuotaPorMes}
                        totalConPrimeraCuota={totalConPrimeraCuota}
                        setTotalConPrimeraCuota={setTotalConPrimeraCuota}
                        importeADepositar={importeADepositar}
                        setImporteADepositar={setImporteADepositar}
                        comprobante={comprobante}
                        setComprobante={setComprobante}
                        saldoAFavor={saldoAFavor}
                    />
                </div>
                <div className="columnPago">
                    <PagoMedioComponent estadoMedioDePago={estadoMedioDePago} importeADepositar={importeADepositar} costoDeMatricula={costoDeMatricula} costoDeEnsenanzaTotal={costoDeEnsenanzaTotal} />
                </div>
                <div>
                    <button onClick={() => setEstado("CURSOS")}>EDITAR CRUSOS</button>
                    <button onClick={(e) => generarContrato(e)}>GENERAR CONTRATO</button>
                </div>
            </div>

            <div></div>
            <div></div>
        </div>
    )
}

export default PagoComponent;