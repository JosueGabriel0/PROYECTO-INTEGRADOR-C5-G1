import { useEffect } from "react";

function PagoMedioComponent({ estadoMedioDePago, importeADepositar, costoDeMatricula, costoDeEnsenanzaTotal }) {

    function contado() {
        return (
            <div>
                <h3>Al contado</h3>
                <p>
                    <span>Imagen</span>
                    <span>Matricula mas el pago al contado</span><br />
                    <span>S/. {importeADepositar}</span><br />
                    <span>Costo Matricula S/. {costoDeMatricula}, Pago total Enseñanza S/. {costoDeEnsenanzaTotal}</span>
                </p>
            </div>
        )
    }

    function cincoArmadas() {
        const costoDeEnsenanzaTotalDividido = costoDeEnsenanzaTotal / 5;
        return (
            <div>
                <h3>5 ARMADAS</h3>
                <p>
                    <span>Imagen</span>
                    <span>Matricula mas primera cuota</span><br />
                    <span>S/. {costoDeMatricula}</span><br />
                    <span>Costo Matricula S/. {costoDeMatricula}, Primera Cuota Enseñanza S/. {costoDeEnsenanzaTotalDividido}</span>
                </p>

                <p>
                    <span>06. MAR.</span><br />
                    <span>S/. {costoDeEnsenanzaTotalDividido}</span><br />
                    <span>Del 06 de marzo, 2024 al 10 de marzo, 2023</span><br />
                </p>

                <p>
                    <span>17. ABR.</span><br />
                    <span>S/. {costoDeEnsenanzaTotalDividido}</span><br />
                    <span>Del 17 de abril, 2024 al 21 de abril, 2023</span><br />
                </p>

                <p>
                    <span>15. MAY.</span><br />
                    <span>S/. {costoDeEnsenanzaTotalDividido}</span><br />
                    <span>Del 15 de mayo, 2024 al 19 de mayo, 2023</span><br />
                </p>

                <p>
                    <span>05. JUN.</span><br />
                    <span>S/. {costoDeEnsenanzaTotalDividido}</span><br />
                    <span>Del 05 de junio, 2024 al 09 de junio, 2023</span><br />
                </p>

                <p>
                    <span>27. JUN.</span><br />
                    <span>S/. {costoDeEnsenanzaTotalDividido}</span><br />
                    <span>Del 27 de junio, 2024 al 30 de junio, 2023</span>
                </p>
            </div>
        )
    }

    function mostrarMedioDePago() {
        if (estadoMedioDePago === "CONTADO") {
            return contado();
        } else if (estadoMedioDePago === "5_CUOTAS") {
            return cincoArmadas();
        }
    }

    useEffect(() => {
    }, [])

    return (
        <div className="container">
            {mostrarMedioDePago()}
            <h4>PAGAR AQUÍ</h4>
            <img src="" alt="" />
            <button>DEPÓSITO</button>
            <button>SOLICITAR BECA Y DESCUENTOS</button>
            <button>SOLICITAR RECIDENCIA</button>
            <button>CONTACTAME</button>
        </div>
    )
}

export default PagoMedioComponent;