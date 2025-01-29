import PagoCursosComponent from "./PagoCursosComponent";
import PagoDatosComponent from "./PagoDatosComponent";
import PagoMedioComponent from "./PagoMedioComponent";
import "../../../../../style-sheets/generalMomentaneo.css"

function PagoComponent({ cursosSeleccionados, totalCreditos, cicloDetalleConMayorNumero, idOpcionNivel, idsDocente, totalHoras }) {
    return (
        <div className="container">
            <div>
                <h3>PROFORMA FINANCIERA</h3>
            </div>
            <div className="containerPago">
                <div className="columnPago">
                    <PagoCursosComponent cursosSeleccionados={cursosSeleccionados} totalCreditos={totalCreditos} cicloDetalleConMayorNumero={cicloDetalleConMayorNumero} idOpcionNivel={idOpcionNivel} idsDocente={idsDocente} totalHoras={totalHoras}/>
                </div>
                <div className="columnPago">
                    <PagoDatosComponent/>
                </div>
                <div className="columnPago">
                    <PagoMedioComponent/>
                </div>
                <div>
                    <button>EDITAR CRUSOS</button>
                    <button>GENERAR CONTRATO</button>
                </div>
            </div>

            <div></div>
            <div></div>
        </div>
    )
}

export default PagoComponent;