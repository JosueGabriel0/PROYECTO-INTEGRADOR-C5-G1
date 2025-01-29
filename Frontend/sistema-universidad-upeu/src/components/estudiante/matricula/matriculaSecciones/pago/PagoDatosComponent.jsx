function PagoDatosComponent() {
    return (
        <div className="container">
            <div>
                <label>Seleccione medio de pago</label>
                <select name="" id="">
                    <option value="">Seleccione medio de pago</option>
                    <option value="CONTADO">Contado</option>
                    <option value="5_CUOTAS">5 Cuotas</option>
                </select>

                <label>Seleccione un tipo de comprobante</label>
                <select name="" id="">
                    <option value="">Seleccione un tipo de comprobante</option>
                    <option value="">Boleta de Venta</option>
                    <option value="">Factura</option>
                </select>
            </div>
            <div>
                <div>
                    <p>COBROS</p>
                    <span>Matricula</span>
                    <span>Enseñanza</span>
                    <span>Total:</span>
                </div>
                <div>
                    <p>DESCUENTOS</p>
                    <span>Descuento Matricula</span>
                    <span>Total:</span>
                </div>
            </div>
            <div>
                <div>
                    <span>IMPORTE A DEPOSITAR:</span>
                </div>
            </div>
        </div>
    )
}

export default PagoDatosComponent;