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

function PagoComponent({ cursosSeleccionados, totalCreditos, cicloDetalleConMayorNumero, idOpcionNivel, idsDocente, totalHoras, setEstado, idMatricula, idNivelEnsenanza }) {
    const idInscripcion = getInscripcionId();
    const [estadoMedioDePago, setEstadoMedioDePago] = useState("");

    const [costoDeMatricula, setCostoDeMatricula] = useState("");
    const [costoDeEnsenanzaTotal, setCostoDeEnsenanzaTotal] = useState("");
    const [total, setTotal] = useState("");

    const [comprobante, setComprobante] = useState("");

    //Por el momento no hay descuentos
    const [descuentos, setDescuentos] = useState(0);

    const [importeADepositar, setImporteADepositar] = useState("");

    const [idCuentaFinanciera, setIdCuentaFinanciera] = useState(0);

    const [idEstudiante, setIdEstudiante] = useState(0);

    const [idCiclo, setIdCiclo] = useState(0);

    const [cursosDetalleIds, setCursosDetalleIds] = useState([]);

    const [fechaMatricula, setFechaMatricula] = useState("");

    async function generarContrato(e) {
        e.preventDefault();

        const pagoConBoleta = {};
        const pagoConFactura = {};
        if (comprobante === "BOLETA") {
            PagoService.postPagoConBoleta(pagoConBoleta).then((response) => {
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
                    MatriculaService.putMatricula(idMatricula, matricula);

                    const movimientoAcademico = {
                        idPago: response.data.pago.idPago,
                        fecha: response.data.boleta.fechaEmision,
                        voucher: numeroDeOperacion,
                        lote: "Lote12345",
                        documento: response.data.boleta.documentoDeIdentidad,
                        movimiento: "Recarga a Cuenta Financiera",
                        descripcion: "Pago realizado para recargar Cuenta Financiera",
                        debito: 0,
                        credito: response.data.boleta.precioVentaTotal
                    };
                    MovimientoAcademicoService.postMovimientoAcademicoToCuentaFinanciera(idCuentaFinanciera, movimientoAcademico);
                } catch (error) {
                    console.error(error);
                }
            }).catch((error) => {
                console.error(error);
            })
        } else if (comprobante === "FACTURA") {
            PagoService.postPagoConFactura(pagoConFactura).then((response) => {
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
                    MatriculaService.putMatricula(idMatricula, matricula);

                    const movimientoAcademico = {
                        idPago: response.data.pago.idPago,
                        fecha: response.data.boleta.fechaEmision,
                        voucher: numeroDeOperacion,
                        lote: "Lote12345",
                        documento: response.data.boleta.documentoDeIdentidad,
                        movimiento: "Recarga a Cuenta Financiera",
                        descripcion: "Pago realizado para recargar Cuenta Financiera",
                        debito: 0,
                        credito: response.data.boleta.precioVentaTotal
                    };
                    MovimientoAcademicoService.postMovimientoAcademicoToCuentaFinanciera(idCuentaFinanciera, movimientoAcademico);
                } catch (error) {
                    console.error(error);
                }
            }).catch((error) => {
                console.error(error);
            })
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
            cursosSeleccionados.forEach((cursoSeleccionado) => {
                cursosDetalleIds(...cursosDetalleIds, cursoSeleccionado.idCursoDetalle);
            });
            setFechaMatricula(fechaActual);
        } catch (error) {
            console.error("Error en la obtención de datos:", error);
        }
    }

    useEffect(() => {
        console.log("Este es el ciclo detalle con mayor ciclo: " + JSON.stringify(cicloDetalleConMayorNumero, null, 2));
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
                        importeADepositar={importeADepositar}
                        setImporteADepositar={setImporteADepositar}
                        comprobante={comprobante}
                        setComprobante={setComprobante}
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