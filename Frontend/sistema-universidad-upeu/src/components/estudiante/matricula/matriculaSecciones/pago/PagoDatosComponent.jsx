import { useEffect, useState } from "react";
import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";

function PagoDatosComponent({ idOpcionNivel, cursosSeleccionados, estadoMedioDePago, setEstadoMedioDePago, costoDeMatricula, setCostoDeMatricula, costoDeEnsenanzaTotal, setCostoDeEnsenanzaTotal, total, setTotal, descuentos, setDescuentos, cuotaPorMes, setCuotaPorMes, totalConPrimeraCuota, setTotalConPrimeraCuota, importeADepositar, setImporteADepositar, comprobante, setComprobante, saldoAFavor }) {

    const [estadoCuotas, setEstadoCuotas] = useState(false);
    async function listarDatosCobros() {
        try {
            const responseOpcionNivel = await OpcionNivelService.getOpcionNivelById(idOpcionNivel);
            setCostoDeMatricula(responseOpcionNivel.data.costoDeMatricula);

            let costoDeEnsenanza = 0;

            cursosSeleccionados.forEach((cursoSeleccionado) => {
                costoDeEnsenanza = cursoSeleccionado.costoTotalPorCreditos + costoDeEnsenanza;
            });
            setCostoDeEnsenanzaTotal(costoDeEnsenanza);

            if (estadoMedioDePago === "CONTADO") {
                setEstadoCuotas(false);
                const totalCobros = responseOpcionNivel.data.costoDeMatricula + costoDeEnsenanza;
                setTotal(totalCobros);
                setImporteADepositar(Math.max(totalCobros - saldoAFavor, 0));
            } else if (estadoMedioDePago === "5_CUOTAS") {
                setEstadoCuotas(true);
                const totalCobros = responseOpcionNivel.data.costoDeMatricula + costoDeEnsenanza;
                setTotal(totalCobros);
                setCuotaPorMes(costoDeEnsenanza/5);
                const totalCobrosPrimeraCuota = responseOpcionNivel.data.costoDeMatricula + costoDeEnsenanza/5;
                setTotalConPrimeraCuota(totalCobrosPrimeraCuota);
                setImporteADepositar(Math.max(totalCobrosPrimeraCuota - saldoAFavor, 0));
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        listarDatosCobros();
    })

    return (
        <div className="container">
            <div>
                <label>Seleccione medio de pago</label>
                <select name="estadoMedioDePago" id="" value={estadoMedioDePago} onChange={(e) => { setEstadoMedioDePago(e.target.value) }}>
                    <option value="">Seleccione medio de pago</option>
                    <option value="CONTADO">Contado</option>
                    <option value="5_CUOTAS">5 Cuotas</option>
                </select>

                <label>Seleccione un tipo de comprobante</label>
                <select name="comprobante" id="" value={comprobante} onChange={(e) => { setComprobante(e.target.value) }}>
                    <option value="">Seleccione un tipo de comprobante</option>
                    <option value="BOLETA">Boleta de Venta</option>
                    <option value="FACTURA">Factura</option>
                </select>
            </div>
            <div>
                <div>
                    <p>COBROS</p>
                    <span>Matricula {costoDeMatricula}</span><br />
                    <span>Enseñanza {costoDeEnsenanzaTotal}</span><br />
                    <span>Total: {total}</span>
                </div>
                <div>
                    <p>DESCUENTOS</p>
                    <span>Descuento Matricula {descuentos}</span><br />
                    <span>Total: {0}</span><br />
                </div>
                {estadoCuotas && (
                    <div>
                        <p>5 CUOTAS</p>
                        <span>Cuota Por Mes {cuotaPorMes}</span><br />
                        <span>Total Con Primera Cuota {totalConPrimeraCuota}</span><br />
                    </div>
                )}
            </div>
            <div>
                <div>
                    <span>SALDO A FAVOR: {saldoAFavor}</span><br />
                    <span>IMPORTE A DEPOSITAR: {importeADepositar}</span>
                </div>
            </div>
        </div>
    )
}

export default PagoDatosComponent;