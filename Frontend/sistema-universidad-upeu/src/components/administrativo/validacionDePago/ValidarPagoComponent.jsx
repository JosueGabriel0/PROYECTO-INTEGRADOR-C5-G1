import React, { useEffect, useState } from "react";
import VoucherService from '../../../services/cuentaFinancieraServices/VoucherService';
import EstudianteService from "../../../services/estudianteServices/estudiante/EstudianteService";
import CuentaFinancieraService from "../../../services/cuentaFinancieraServices/CuentaFinancieraService";
import PersonaService from "../../../services/personaServices/PersonaService";
import PagoService from "../../../services/pagoServices/PagoService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import MovimientoAcademicoService from "../../../services/cuentaFinancieraServices/MovimientoAcademicoService";

function ValidarPagoComponent() {
    // Estado para gestionar la selección entre boleta o factura
    const [seleccion, setSeleccion] = useState("");
    const [estadoFiltrar, setEstadoFiltrar] = useState("");
    const [vouchers, setVouchers] = useState([]);
    const [idVoucher, setIdVoucher] = useState("");

    //Datos de Cuenta Financiera
    const [idCuentaFinanciera, setIdCuentaFinanciera] = useState("");

    //Datos de Movimiento Academico
    const [fechaMovAcademico, setFechaMovAcademico] = useState("");
    const [voucherMovAcademico, setVoucherMovAcademico] = useState("");
    const [loteMovAcademico, setLoteMovAcademico] = useState("");
    const [documentoMovAcademico, setDocumentoMovAcademico] = useState("");
    const [movimientoMovAcademico, setMovimientoMovAcademico] = useState("");
    const [descripcionMovAcademico, setDescripcionMovAcademico] = useState("");
    const [debitoMovAcademico, setDebitoMovAcademico] = useState("");
    const [creditoMovAcademico, setCreditoMovAcademico] = useState("");
    const [idPagoMovAcademico, setIdPagoMovAcademico] = useState("");

    //Datos del voucher
    const [nombreBanco, setNombreBanco] = useState("");
    const [numeroDeOperacion, setNumeroDeOperacion] = useState("");
    const [fechaDeOperacion, setFechaDeOperacion] = useState("");
    const [importe, setImporte] = useState("");
    const [estado, setEstado] = useState("");
    const [voucherURL, setVoucherURL] = useState("");

    const [imagenUrl, setImagenUrl] = useState(null);
    const [error, setError] = useState(null);

    //Datos de Pago
    const [montoTotal, setMontoTotal] = useState("");
    const [metodoDePago, setMetodoDePago] = useState("");
    const [medioDePago, setMedioDePago] = useState("");
    const [estadoPago, setEstadoPago] = useState("");
    const [descripcion, setDescripcion] = useState("Pago al servicio de cuenta financiera");
    const [idEstudiante, setIdEstudiante] = useState("");
    const [estudiantePago, setEstudiantePago] = useState("");
    const fechaActualParaPago = new Date().toISOString().split("T")[0];
    const [fechaPago, setFechaPago] = useState(fechaActualParaPago);

    //Datos de Boleta
    const [nombreClienteBoleta, setNombreClienteBoleta] = useState("");
    const [documentoDeIdentidadBoleta, setDocumentoDeIdentidadBoleta] = useState("");
    const [direccionBoleta, setDireccionBoleta] = useState("");
    const [numeroBoleta, setNumeroBoleta] = useState("");
    const [fechaEmisionBoleta, setFechaEmisionBoleta] = useState("");
    const [descripcionBoleta, setDescripcionBoleta] = useState("Pago al servicio de cuenta financiera");
    const [tipoDocumentoBoleta, setTipoDocumentoBoleta] = useState("");
    const [sucursalBoleta, setSucursalBoleta] = useState("");
    const [organizacionDeVentasBoleta, setOrganizacionDeVentasBoleta] = useState("Sede Juliaca");
    const [tipoMonedaBoleta, setTipoMonedaBoleta] = useState("");
    const [codigoProductoServicioBoleta, setCodigoProductoServicioBoleta] = useState("");
    const [descripcionProductoServicioBoleta, setDescripcionProductoServicioBoleta] = useState("Pago al servicio de cuenta financiera");
    const [unidadDeMedidaBoleta, setUnidadDeMedidaBoleta] = useState("");
    const [cantidadBoleta, setCantidadBoleta] = useState(1);
    const [valorUnitarioBoleta, setValorUnitarioBoleta] = useState(0);
    const [valorDescuentoBoleta, setValorDescuentoBoleta] = useState(0);
    const [valorTotalBoleta, setValorTotalBoleta] = useState(0);
    const [operacionGravadaBoleta, setOperacionGravadaBoleta] = useState(0);
    const [operacionInafectaBoleta, setOperacionInafectaBoleta] = useState(0);
    const [operacionExoneradaBoleta, setOperacionExoneradaBoleta] = useState(0);
    const [operacionGratuitaBoleta, setOperacionGratuitaBoleta] = useState(0);
    const [descuentosTotalesBoleta, setDescuentosTotalesBoleta] = useState(0);
    const [igvBoleta, setIgvBoleta] = useState(0);
    const [precioVentaTotalBoleta, setPrecioVentaTotalBoleta] = useState(0);
    const [boletaUrl, setBoletaUrl] = useState("");

    const [operacionBoleta, setOperacionBoleta] = useState({
        gravada: 0,
        inafecta: 1,
        exonerada: 0,
        gratuita: 0,
    });

    //Datos de Factura
    const [nombreClienteFactura, setNombreClienteFactura] = useState("");
    const [documentoDeIdentidadFactura, setDocumentoDeIdentidadFactura] = useState("");
    const [direccionFactura, setDireccionFactura] = useState("");
    const [numeroFactura, setNumeroFactura] = useState("");
    const [fechaEmisionFactura, setFechaEmisionFactura] = useState("");
    const [descripcionFactura, setDescripcionFactura] = useState("Pago al servicio de cuenta financiera");
    const [tipoDocumentoFactura, setTipoDocumentoFactura] = useState("");
    const [sucursalFactura, setSucursalFactura] = useState("");
    const [organizacionDeVentasFactura, setOrganizacionDeVentasFactura] = useState("Sede Juliaca");
    const [tipoMonedaFactura, setTipoMonedaFactura] = useState("");
    const [estadoFactura, setEstadoFactura] = useState("");
    const [codigoProductoServicioFactura, setCodigoProductoServicioFactura] = useState("");
    const [descripcionProductoServicioFactura, setDescripcionProductoServicioFactura] = useState("Pago al servicio de cuenta financiera");
    const [unidadDeMedidaFactura, setUnidadDeMedidaFactura] = useState("");
    const [cantidadFactura, setCantidadFactura] = useState("1");
    const [valorUnitarioFactura, setValorUnitarioFactura] = useState(0);
    const [valorDescuentoFactura, setValorDescuentoFactura] = useState(0);
    const [valorTotalFactura, setValorTotalFactura] = useState(0);
    const [operacionGravadaFactura, setOperacionGravadaFactura] = useState(0);
    const [operacionInafectaFactura, setOperacionInafectaFactura] = useState(0);
    const [operacionExoneradaFactura, setOperacionExoneradaFactura] = useState(0);
    const [operacionGratuitaFactura, setOperacionGratuitaFactura] = useState(0);
    const [descuentosTotalesFactura, setDescuentosTotalesFactura] = useState(0);
    const [igvFactura, setIgvFactura] = useState(0);
    const [precioVentaTotalFactura, setPrecioVentaTotalFactura] = useState(0);
    const [facturaUrl, setFacturaUrl] = useState("");

    const [operacionFactura, setOperacionFactura] = useState({
        gravada: 0,
        inafecta: 1,
        exonerada: 0,
        gratuita: 0,
    });

    //React Router Dom
    const navigate = useNavigate();

    //Radio Buttons
    const [selectedOptionBoleta, setSelectedOptionBoleta] = useState("Operacion Inafecta");
    const [selectedOptionFactura, setSelectedOptionFactura] = useState("Operacion Inafecta");

    // Función que se ejecutará cuando el usuario cambie la selección
    const handleSelectChange = (e) => {
        setSeleccion(e.target.value);
    };

    function mostrarMensaje(estadoVoucher) {
        Swal.fire({
            title: '¡Éxito!',
            text: `Voucher ${estadoVoucher} correctamente`,
            icon: 'success', // Icono que se mostrará en la alerta
            confirmButtonText: 'Aceptar', // Texto para el botón de confirmación
        });
    }

    async function cambiarDeEstadoVoucher(idVoucher, estadoVoucher) {
        VoucherService.putEstadoVoucher(idVoucher, estadoVoucher).then((response) => {
            console.log("Este es el voucher Actualizado: " + JSON.stringify(response.data, null, 2));
        })
    }

    async function voucherProcesadoConBoleta(e) {
        e.preventDefault();

        const pagoConBoleta = {
            pago: {
                montoTotal,
                metodoDePago,
                medioDePago,
                estado: estadoPago,
                descripcion,
                idEstudiante,
                fechaPago
            },
            boleta: {
                nombreCliente: nombreClienteBoleta,
                documentoDeIdentidad: documentoDeIdentidadBoleta,
                direccion: direccionBoleta,
                numeroBoleta,
                fechaEmision: fechaEmisionBoleta,
                descripcionBoleta,
                tipoDocumento: tipoDocumentoBoleta,
                sucursal: sucursalBoleta,
                organizacionDeVentas: organizacionDeVentasBoleta,
                tipoMoneda: tipoMonedaBoleta,
                codigoProductoServicio: codigoProductoServicioBoleta,
                descripcionProductoServicio: descripcionProductoServicioBoleta,
                unidadDeMedida: unidadDeMedidaBoleta,
                cantidad: cantidadBoleta,
                valorUnitario: valorUnitarioBoleta,
                valorDescuento: valorDescuentoBoleta,
                operacionGravada: operacionGravadaBoleta,
                operacionInafecta: operacionInafectaBoleta,
                operacionExonerada: operacionExoneradaBoleta,
                operacionGratuita: operacionGratuitaBoleta
            }
        }

        let boletaURL = null;
        let movimientoAcademico = {};

        console.log("Este es el pago con boleta: " + JSON.stringify(pagoConBoleta, null, 2))
        await PagoService.postPagoConBoleta(pagoConBoleta).then((response) => {
            console.log("Este es la respuesta despues de crearse" + JSON.stringify(response.data, null, 2));
            // Preparar datos para el movimiento académico
            movimientoAcademico = {
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
            console.log("Este es el URL de la boleta despues de crearse: " + response.data.boleta.boletaUrl)
            boletaURL = response.data.boleta.boletaUrl;
        }).catch((error) => {
            console.log(error);
        })

        // Ejecutar la función crearMovimientoAcademico con los datos preparados
        if (Object.keys(movimientoAcademico).length > 0) {
            crearMovimientoAcademico(movimientoAcademico);
        }

        const estado = "PROCESADO";
        try {
            await cambiarDeEstadoVoucher(idVoucher, estado);

            mostrarMensaje(estado);
            console.log("Esta es la URL de la Boleta: " + boletaUrl)
            navigate(`/mostrar-comprobante-generado/${boletaURL}`);
        } catch (error) {
            // Si ocurre un error, mostramos un mensaje en la consola o una alerta
            console.error("Error al cambiar el estado del voucher: ", error);
            Swal.fire({
                title: 'Error',
                text: "Hubo un error al procesar el estado del voucher. Inténtalo nuevamente.",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    function crearMovimientoAcademico(movimientoAcademico) {
        console.log("Este es el id de la cuenta financiera: " + idCuentaFinanciera);
        console.log("Este es el movimiento Academico que se va a enviar: " + JSON.stringify(movimientoAcademico, null, 2));
        MovimientoAcademicoService.postMovimientoAcademicoToCuentaFinanciera(idCuentaFinanciera, movimientoAcademico).then((response) => {
            console.log("Movimiento academico Creado: " + JSON.stringify(response.data, null, 2));
        }).catch((error) => {
            console.log(error);
        })
    }

    async function voucherProcesadoConFactura(e) {
        e.preventDefault();

        const pagoConFactura = {
            pago: {
                montoTotal,
                metodoDePago,
                medioDePago,
                estado: estadoPago,
                descripcion,
                idEstudiante,
                fechaPago
            },
            factura: {
                nombreCliente: nombreClienteFactura,
                documentoDeIdentidad: documentoDeIdentidadFactura,
                direccion: direccionFactura,
                numeroFactura,
                fechaEmision: fechaEmisionFactura,
                descripcionFactura,
                tipoDocumento: tipoDocumentoFactura,
                sucursal: sucursalFactura,
                organizacionDeVentas: organizacionDeVentasFactura,
                tipoMoneda: tipoMonedaFactura,
                estadoFactura,
                codigoProductoServicio: codigoProductoServicioFactura,
                descripcionProductoServicio: descripcionProductoServicioFactura,
                unidadDeMedida: unidadDeMedidaFactura,
                cantidad: cantidadFactura,
                valorUnitario: valorUnitarioFactura,
                valorDescuento: valorDescuentoFactura,
                operacionGravada: operacionGravadaFactura,
                operacionInafecta: operacionInafectaFactura,
                operacionExonerada: operacionExoneradaFactura,
                operacionGratuita: operacionGratuitaFactura
            }
        }

        let facturaURL = null;
        let movimientoAcademico = {};

        await PagoService.postPagoConFactura(pagoConFactura).then((response) => {
            console.log("Este es la respuesta despues de crearse" + JSON.stringify(response.data, null, 2));
            // Preparar datos para el movimiento académico
            movimientoAcademico = {
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
            console.log("Este es el URL de la factura despues de crearse: " + response.data.factura.facturaUrl)
            facturaURL = response.data.factura.facturaUrl;
        }).catch((error) => {
            console.log(error);
        })

        // Ejecutar la función crearMovimientoAcademico con los datos preparados
        if (Object.keys(movimientoAcademico).length > 0) {
            crearMovimientoAcademico(movimientoAcademico);
        }

        const estado = "PROCESADO";

        try {
            await cambiarDeEstadoVoucher(idVoucher, estado);

            mostrarMensaje(estado);
            console.log("Esta es la URL de Factura: " + facturaURL)
            navigate(`/mostrar-comprobante-generado/${facturaURL}`);
        } catch (error) {
            // Si ocurre un error, mostramos un mensaje en la consola o una alerta
            console.error("Error al cambiar el estado del voucher: ", error);
            alert("Hubo un error al procesar el estado del voucher. Inténtalo nuevamente.");
        }
    }

    async function voucherVerificado(e) {
        e.preventDefault();
        Swal.fire({
            title: "¿Esta seguro de Verificar el Voucher?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const estado = "VERIFICADO";

                try {
                    // Intentamos cambiar el estado del voucher
                    await cambiarDeEstadoVoucher(idVoucher, estado);

                    mostrarMensaje(estado);
                } catch (error) {
                    // Si ocurre un error, mostramos un mensaje en la consola o una alerta
                    console.error("Error al cambiar el estado del voucher: ", error);
                    Swal.fire({
                        title: 'Error',
                        text: "Hubo un error al procesar el estado del voucher. Inténtalo nuevamente.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                console.log("Accion cancelada");
            }
        });
    }

    async function voucherRechazado(e) {
        e.preventDefault();
        Swal.fire({
            title: "¿Esta seguro de Rechazar el Voucher?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const estado = "RECHAZADO";

                try {
                    await cambiarDeEstadoVoucher(idVoucher, estado);

                    mostrarMensaje(estado);
                } catch (error) {
                    console.error("Error al cambiar el estado del voucher: ", error);
                    Swal.fire({
                        title: 'Error',
                        text: "Hubo un error al procesar el estado del voucher. Inténtalo nuevamente.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                console.log("Accion cancelada");
            }
        });
    }

    async function voucherRegistrado(e) {
        e.preventDefault();
        Swal.fire({
            title: "¿Esta seguro de Devolver el Voucher a Registrado?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const estado = "REGISTRADO";

                try {
                    await cambiarDeEstadoVoucher(idVoucher, estado);

                    mostrarMensaje(estado);
                } catch (error) {
                    console.error("Error al cambiar el estado del voucher: ", error);
                    Swal.fire({
                        title: 'Error',
                        text: "Hubo un error al procesar el estado del voucher. Inténtalo nuevamente.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                console.log("Accion cancelada");
            }
        });
    }

    function handleRadioChangeBoleta(e) {
        const valorDelRadio = e.target.value;

        setSelectedOptionBoleta(valorDelRadio);

        const nuevaOperacion = {
            gravada: valorDelRadio === "Operacion Gravada" ? 1 : 0,
            inafecta: valorDelRadio === "Operacion Inafecta" ? 1 : 0,
            exonerada: valorDelRadio === "Operacion Exonerada" ? 1 : 0,
            gratuita: valorDelRadio === "Operacion Gratuita" ? 1 : 0,
        };

        setOperacionBoleta(nuevaOperacion);
    }

    function realizarCalculosBoleta() {
        let valorTotal = valorUnitarioBoleta * cantidadBoleta;
        let valorDescuento = valorTotal * (valorDescuentoBoleta / 100);
        let valorTotalConDescuento = valorTotal - valorDescuento;

        let igvPorcentaje = 0;
        let igv = 0;
        let precioVentaTotal = 0;
        let operacionGravada = 0;
        let operacionInafecta = 0;
        let operacionExonerada = 0;
        let operacionesGratuitas = 0;

        if (operacionBoleta.gravada) {
            console.log("OPERACION GRAVADA");
            operacionGravada = valorTotalConDescuento;

            igvPorcentaje = 18;
            igv = operacionGravada * (igvPorcentaje / 100)

            precioVentaTotal = operacionGravada + igv;

            setOperacionGravadaBoleta(precioVentaTotal);
            setOperacionInafectaBoleta(0);
            setOperacionExoneradaBoleta(0);
            setOperacionGratuitaBoleta(0);

        } else if (operacionBoleta.inafecta) {
            console.log("OPERACION INAFECTA");
            operacionInafecta = valorTotalConDescuento;
            precioVentaTotal = operacionInafecta;

            setOperacionInafectaBoleta(precioVentaTotal);
            setOperacionGravadaBoleta(0);
            setOperacionExoneradaBoleta(0);
            setOperacionGratuitaBoleta(0);

        } else if (operacionBoleta.exonerada) {
            console.log("OPERACION EXONERADA");
            operacionExonerada = valorTotalConDescuento;
            precioVentaTotal = operacionExonerada;

            setOperacionExoneradaBoleta(precioVentaTotal);
            setOperacionGravadaBoleta(0);
            setOperacionInafectaBoleta(0);
            setOperacionGratuitaBoleta(0);

        } else if (operacionBoleta.gratuita) {
            console.log("OPERACION GRATUITA");
            operacionesGratuitas = valorTotalConDescuento;
            precioVentaTotal = operacionesGratuitas;

            setOperacionGratuitaBoleta(precioVentaTotal);
            setOperacionGravadaBoleta(0);
            setOperacionInafectaBoleta(0);
            setOperacionExoneradaBoleta(0);
        } else {
            throw new Error("Solo se puede ingresar una operacion. Vuelva a intentarlo");
        }

        setValorTotalBoleta(valorTotalConDescuento);
        setDescuentosTotalesBoleta(valorDescuento);
        setIgvBoleta(igv);
        setPrecioVentaTotalBoleta(precioVentaTotal);
    }

    const manejarClickBoleta = (evento) => {
        evento.preventDefault();
        // Muestra el mensaje de confirmación con SweetAlert2
        Swal.fire({
            title: '¿Está seguro de procesar el voucher a pago con boleta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                voucherProcesadoConBoleta(evento); // Ejecuta la función si el usuario acepta
            } else {
                console.log("Acción cancelada"); // Si el usuario cancela
            }
        });
    };

    const manejarClickFactura = (evento) => {
        evento.preventDefault();
        // Muestra el mensaje de confirmación con SweetAlert2
        Swal.fire({
            title: '¿Está seguro de procesar el voucher a pago con factura?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                voucherProcesadoConFactura(evento); // Ejecuta la función si el usuario acepta
            } else {
                console.log("Acción cancelada"); // Si el usuario cancela
            }
        });
    };

    function boletaForm() {
        return (
            <div>
                <h3>Datos de Boleta</h3>
                <form>
                    <div>
                        <label>Nombre del Cliente</label>
                        <input type="text" placeholder="Ingrese el nombre del cliente" name="nombreClienteBoleta" value={nombreClienteBoleta} onChange={(e) => { setNombreClienteBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Tipo de documento</label>
                        <input type="text" placeholder="Ingrese el tipo de documento" name="tipoDocumentoBoleta" value={tipoDocumentoBoleta} onChange={(e) => { setTipoDocumentoBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Documento de identidad</label>
                        <input type="text" placeholder="Ingrese el documento de identidad" name="documentoDeIdentidadBoleta" value={documentoDeIdentidadBoleta} onChange={(e) => { setDocumentoDeIdentidadBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Direccion</label>
                        <input type="text" placeholder="Ingrese la direccion" name="direccionBoleta" value={direccionBoleta} onChange={(e) => { setDireccionBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Numero de boleta</label>
                        <input type="text" disabled placeholder="Ingrese el numero de boleta" name="numeroBoleta" value={numeroBoleta} onChange={(e) => { setNumeroBoleta(e.target.value) }} />
                        <span style={{ fontSize: "12px", color: "#555" }}>(Número de boleta generado por la SUNAT)</span>
                    </div>
                    <div>
                        <label>Fecha de Emision</label>
                        <input type="date" placeholder="Ingrese la fecha de emision" name="fechaEmisionBoleta" value={fechaEmisionBoleta} onChange={(e) => { setFechaEmisionBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Descripcion de Boleta</label>
                        <input type="text" placeholder="Ingrese la descripcion" name="descripcionBoleta" value={descripcionBoleta} onChange={(e) => { setDescripcionBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Sucursal</label>
                        <input type="text" placeholder="Ingrese la sucursal" name="sucursalBoleta" value={sucursalBoleta} onChange={(e) => { setSucursalBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Organizacion de ventas</label>
                        <input type="text" placeholder="Ingrese la organizacion de ventas" name="organizacionDeVentasBoleta" value={organizacionDeVentasBoleta} onChange={(e) => { setOrganizacionDeVentasBoleta(e.target.value) }} readOnly />
                    </div>
                    <div>
                        <label>Tipo de moneda</label>
                        <select id="tipoMonedaBoleta" name="tipoMonedaBoleta" value={tipoMonedaBoleta} onChange={(e) => { setTipoMonedaBoleta(e.target.value) }}>
                            <option value="">Seleccione el tipo de moneda</option>
                            <option value="SOL">SOL</option>
                            <option value="DOLAR">DOLAR</option>
                            <option value="EURO">EURO</option>
                            <option value="LIBRA_ESTERLINA">LIBRA ESTERLINA</option>
                        </select>
                    </div>
                    <div>
                        <label>Codigo del producto o servicio</label>
                        <input type="text" placeholder="Ingrese el codigo del producto o servicio" name="codigoProductoServicioBoleta" value={codigoProductoServicioBoleta} onChange={(e) => { setCodigoProductoServicioBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Descripcion del producto o servicio</label>
                        <input type="text" placeholder="Ingrese la descripcion del producto o servicio" name="descripcionProductoServicioBoleta" value={descripcionProductoServicioBoleta} onChange={(e) => { setDescripcionProductoServicioBoleta(e.target.value) }} />
                    </div>
                    <div>
                        <label>Unidad de medida</label>
                        <select id="unidadDeMedidaBoleta" name="unidadDeMedidaBoleta" value={unidadDeMedidaBoleta} onChange={(e) => { setUnidadDeMedidaBoleta(e.target.value) }}>
                            <option value="">Seleccione una unidad de medida</option>
                            <option value="Unidad Monetaria">Unidad Monetaria</option>
                            <option value="Porcentaje">Porcentaje</option>
                        </select>
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <input type="number" placeholder="Ingrese la cantidad" name="cantidadBoleta" value={cantidadBoleta} onChange={(e) => { setCantidadBoleta(e.target.value); }} />
                    </div>
                    <div>
                        <label>Valor Unitario</label>
                        <input type="number" placeholder="Ingrese el valor unitario" name="valorUnitarioBoleta" value={montoTotal} onChange={(e) => { setValorUnitarioBoleta(e.target.value); }} readOnly />
                    </div>
                    <div>
                        <label>Valor de descuento en %(Porcentaje)</label>
                        <input type="number" placeholder="Ingrese el valor de descuento" name="valorDescuentoBoleta" value={valorDescuentoBoleta} onChange={(e) => { setValorDescuentoBoleta(e.target.value); }} />
                    </div>
                    <div>
                        <label>Valor del descuento</label>
                        <input type="number" placeholder="Ingrese los descuentos totales" name="descuentosTotalesBoleta" value={descuentosTotalesBoleta} onChange={(e) => { handleRadioChangeBoleta(e) }} readOnly />
                    </div>
                    <div>
                        <label>Valor Total</label>
                        <input type="number" placeholder="Ingrese el valor total" name="valorTotalBoleta" value={valorTotalBoleta} onChange={(e) => { setValorTotalBoleta(e.target.value) }} readOnly />
                    </div>
                    <div>
                        <label>Operacion Gravada</label>
                        <input type="radio" name="operaciones" value="Operacion Gravada" checked={selectedOptionBoleta === "Operacion Gravada"} onChange={(e) => { handleRadioChangeBoleta(e) }} />
                        <input type="text" name="operacionGravadaBoleta" value={operacionGravadaBoleta} onChange={(e) => { setOperacionGravadaBoleta(e) }} readOnly />
                    </div>
                    <div>
                        <label>Operacion Inafecta</label>
                        <input type="radio" name="operaciones" value="Operacion Inafecta" checked={selectedOptionBoleta === "Operacion Inafecta"} onChange={(e) => { handleRadioChangeBoleta(e) }} />
                        <input type="text" name="operacionInafectaBoleta" value={operacionInafectaBoleta} onChange={(e) => { setOperacionInafectaBoleta(e) }} readOnly />
                    </div>
                    <div>
                        <label>Operacion Exonerada</label>
                        <input type="radio" name="operaciones" value="Operacion Exonerada" checked={selectedOptionBoleta === "Operacion Exonerada"} onChange={(e) => { handleRadioChangeBoleta(e) }} />
                        <input type="text" name="operacionExoneradaBoleta" value={operacionExoneradaBoleta} onChange={(e) => { setOperacionExoneradaBoleta(e) }} readOnly />
                    </div>
                    <div>
                        <label>Operaciones Gratuitas</label>
                        <input type="radio" name="operaciones" value="Operacion Gratuita" checked={selectedOptionBoleta === "Operacion Gratuita"} onChange={(e) => { handleRadioChangeBoleta(e) }} />
                        <input type="text" name="operacionGratuitaBoleta" value={operacionGratuitaBoleta} onChange={(e) => { setOperacionGratuitaBoleta(e) }} readOnly />
                    </div>

                    <div>
                        <label>Porcentaje de I.G.V</label>
                        <b>18%</b>
                    </div>
                    <div>
                        <label>Valor del I.G.V</label>
                        <input type="number" placeholder="Ingrese el I.G.V" name="igvBoleta" value={igvBoleta} onChange={(e) => { setIgvBoleta(e.target.value) }} readOnly />
                    </div>
                    <div>
                        <label>Precio de venta total</label>
                        <input type="number" placeholder="Ingrese el precio de venta total" name="precioVentaTotalBoleta" value={precioVentaTotalBoleta} onChange={(e) => { setPrecioVentaTotalBoleta(e.target.value) }} readOnly />
                    </div>

                    {estado !== "PROCESADO" ? (
                        <button onClick={(e) => manejarClickBoleta(e)}>Procesar voucher con boleta (Procesado)</button>
                    ) : (
                        <b>Voucher Procesado</b>
                    )}
                </form>
            </div>
        );
    }

    function handleRadioChangeFactura(e) {
        const valorDelRadio = e.target.value;

        setSelectedOptionFactura(valorDelRadio);

        const nuevaOperacion = {
            gravada: valorDelRadio === "Operacion Gravada" ? 1 : 0,
            inafecta: valorDelRadio === "Operacion Inafecta" ? 1 : 0,
            exonerada: valorDelRadio === "Operacion Exonerada" ? 1 : 0,
            gratuita: valorDelRadio === "Operacion Gratuita" ? 1 : 0,
        };

        setOperacionFactura(nuevaOperacion);
    }

    function realizarCalculosFactura() {
        let valorTotal = valorUnitarioBoleta * cantidadBoleta;
        let valorDescuento = valorTotal * (valorDescuentoBoleta / 100);
        let valorTotalConDescuento = valorTotal - valorDescuento;

        let igvPorcentaje = 0;
        let igv = 0;
        let precioVentaTotal = 0;
        let operacionGravada = 0;
        let operacionInafecta = 0;
        let operacionExonerada = 0;
        let operacionesGratuitas = 0;

        if (operacionFactura.gravada) {
            console.log("OPERACION GRAVADA");
            operacionGravada = valorTotalConDescuento;

            igvPorcentaje = 18;
            igv = operacionGravada * (igvPorcentaje / 100)

            precioVentaTotal = operacionGravada + igv;

            setOperacionGravadaFactura(precioVentaTotal);
            setOperacionInafectaFactura(0);
            setOperacionExoneradaFactura(0);
            setOperacionGratuitaFactura(0);

        } else if (operacionFactura.inafecta) {
            console.log("OPERACION INAFECTA");
            operacionInafecta = valorTotalConDescuento;
            precioVentaTotal = operacionInafecta;

            setOperacionInafectaFactura(precioVentaTotal);
            setOperacionGravadaFactura(0);
            setOperacionExoneradaFactura(0);
            setOperacionGratuitaFactura(0);

        } else if (operacionFactura.exonerada) {
            console.log("OPERACION EXONERADA");
            operacionExonerada = valorTotalConDescuento;
            precioVentaTotal = operacionExonerada;

            setOperacionExoneradaFactura(precioVentaTotal);
            setOperacionGravadaFactura(0);
            setOperacionInafectaFactura(0);
            setOperacionGratuitaFactura(0);

        } else if (operacionFactura.gratuita) {
            console.log("OPERACION GRATUITA");
            operacionesGratuitas = valorTotalConDescuento;
            precioVentaTotal = operacionesGratuitas;

            setOperacionGratuitaFactura(precioVentaTotal);
            setOperacionGravadaFactura(0);
            setOperacionInafectaFactura(0);
            setOperacionExoneradaFactura(0);
        } else {
            throw new Error("Solo se puede ingresar una operacion. Vuelva a intentarlo");
        }

        setValorTotalFactura(valorTotalConDescuento);
        setDescuentosTotalesFactura(valorDescuento);
        setIgvFactura(igv);
        setPrecioVentaTotalFactura(precioVentaTotal);
    }

    function facturaForm() {
        return (
            <div>
                <h3>Datos de Factura</h3>
                <form>
                    <div>
                        <label>Nombre del Cliente</label>
                        <input type="text" placeholder="Ingrese el nombre del cliente" name="nombreClienteFactura" value={nombreClienteFactura} onChange={(e) => { setNombreClienteFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Tipo de documento</label>
                        <input type="text" placeholder="Ingrese el tipo de documento" name="tipoDocumentoFactura" value={tipoDocumentoFactura} onChange={(e) => { setTipoDocumentoFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Documento de identidad</label>
                        <input type="text" placeholder="Ingrese el documento de identidad" name="documentoDeIdentidadFactura" value={documentoDeIdentidadFactura} onChange={(e) => { setDocumentoDeIdentidadFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Direccion</label>
                        <input type="text" placeholder="Ingrese la direccion" name="direccionFactura" value={direccionFactura} onChange={(e) => { setDireccionFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Numero de factura</label>
                        <input type="text" disabled placeholder="Ingrese el numero de boleta" name="numeroFactura" value={numeroFactura} onChange={(e) => { setNumeroFactura(e.target.value) }} />
                        <span style={{ fontSize: "12px", color: "#555" }}>(Número de boleta generado por la SUNAT)</span>
                    </div>
                    <div>
                        <label>Fecha de Emision</label>
                        <input type="date" placeholder="Ingrese la fecha de emision" name="fechaEmisionFactura" value={fechaEmisionFactura} onChange={(e) => { setFechaEmisionFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Descripcion de Factura</label>
                        <input type="text" placeholder="Ingrese la descripcion" name="descripcionFactura" value={descripcionFactura} onChange={(e) => { setDescripcionFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Sucursal</label>
                        <input type="text" placeholder="Ingrese la sucursal" name="sucursalFactura" value={sucursalFactura} onChange={(e) => { setSucursalFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Organizacion de ventas</label>
                        <input type="text" placeholder="Ingrese la organizacion de ventas" name="organizacionDeVentasFactura" value={organizacionDeVentasFactura} onChange={(e) => { setOrganizacionDeVentasFactura(e.target.value) }} readOnly />
                    </div>
                    <div>
                        <label>Tipo de moneda</label>
                        <select id="tipoMonedaBoleta" name="tipoMonedaFactura" value={tipoMonedaFactura} onChange={(e) => { setTipoMonedaFactura(e.target.value) }}>
                            <option value="">Seleccione el tipo de moneda</option>
                            <option value="SOL">SOL</option>
                            <option value="DOLAR">DOLAR</option>
                            <option value="EURO">EURO</option>
                            <option value="LIBRA_ESTERLINA">LIBRA ESTERLINA</option>
                        </select>
                    </div>
                    <div>
                        <label>Estado de Factura</label>
                        <select id="estadoFactura" name="estadoFactura" value={estadoFactura} onChange={(e) => { setEstadoFactura(e.target.value) }}>
                            <option value="">Seleccione un estado para la factura</option>
                            <option value="Emitida">Emitida</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencida">Vencida</option>
                            <option value="Anulada">Anulada</option>
                            <option value="Modificada">Modificada</option>
                            <option value="Abonada">Abonada</option>
                            <option value="Rechazada">Rechazada</option>
                            <option value="Aceptada">Aceptada</option>
                            <option value="Recibida">Recibida</option>
                            <option value="Con Reembolso">Con Reembolso</option>
                        </select>
                    </div>
                    <div>
                        <label>Codigo del producto o servicio</label>
                        <input type="text" placeholder="Ingrese el codigo del producto o servicio" name="codigoProductoServicioFactura" value={codigoProductoServicioFactura} onChange={(e) => { setCodigoProductoServicioFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Descripcion del producto o servicio</label>
                        <input type="text" placeholder="Ingrese la descripcion del producto o servicio" name="descripcionProductoServicioFactura" value={descripcionProductoServicioFactura} onChange={(e) => { setDescripcionProductoServicioFactura(e.target.value) }} />
                    </div>
                    <div>
                        <label>Unidad de medida</label>
                        <select id="unidadDeMedidaBoleta" name="unidadDeMedidaFactura" value={unidadDeMedidaFactura} onChange={(e) => { setUnidadDeMedidaFactura(e.target.value) }}>
                            <option value="">Seleccione una unidad de medida</option>
                            <option value="Unidad Monetaria">Unidad Monetaria</option>
                            <option value="Porcentaje">Porcentaje</option>
                        </select>
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <input type="number" placeholder="Ingrese la cantidad" name="cantidadFactura" value={cantidadFactura} onChange={(e) => { setCantidadFactura(e.target.value); }} />
                    </div>
                    <div>
                        <label>Valor Unitario</label>
                        <input type="number" placeholder="Ingrese el valor unitario" name="valorUnitarioFactura" value={montoTotal} onChange={(e) => { setValorUnitarioFactura(e.target.value); }} readOnly />
                    </div>
                    <div>
                        <label>Valor de descuento en %(Porcentaje)</label>
                        <input type="number" placeholder="Ingrese el valor de descuento" name="valorDescuentoFactura" value={valorDescuentoFactura} onChange={(e) => { setValorDescuentoFactura(e.target.value); }} />
                    </div>
                    <div>
                        <label>Valor del descuento</label>
                        <input type="number" placeholder="Ingrese los descuentos totales" name="descuentosTotalesFactura" value={descuentosTotalesFactura} onChange={(e) => { setDescuentosTotalesFactura(e) }} readOnly />
                    </div>
                    <div>
                        <label>Valor Total</label>
                        <input type="number" placeholder="Ingrese el valor total" name="valorTotalFactura" value={valorTotalFactura} onChange={(e) => { setValorTotalFactura(e.target.value) }} readOnly />
                    </div>
                    <div>
                        <label>Operacion Gravada</label>
                        <input type="radio" name="operaciones" value="Operacion Gravada" checked={selectedOptionFactura === "Operacion Gravada"} onChange={(e) => { handleRadioChangeFactura(e) }} />
                        <input type="text" name="operacionGravadaFactura" value={operacionGravadaFactura} onChange={(e) => { setOperacionGravadaFactura(e) }} readOnly />
                    </div>
                    <div>
                        <label>Operacion Inafecta</label>
                        <input type="radio" name="operaciones" value="Operacion Inafecta" checked={selectedOptionFactura === "Operacion Inafecta"} onChange={(e) => { handleRadioChangeFactura(e) }} />
                        <input type="text" name="operacionInafectaFactura" value={operacionInafectaFactura} onChange={(e) => { setOperacionInafectaFactura(e) }} readOnly />
                    </div>
                    <div>
                        <label>Operacion Exonerada</label>
                        <input type="radio" name="operaciones" value="Operacion Exonerada" checked={selectedOptionFactura === "Operacion Exonerada"} onChange={(e) => { handleRadioChangeFactura(e) }} />
                        <input type="text" name="operacionExoneradaFactura" value={operacionExoneradaFactura} onChange={(e) => { setOperacionExoneradaFactura(e) }} readOnly />
                    </div>
                    <div>
                        <label>Operaciones Gratuitas</label>
                        <input type="radio" name="operaciones" value="Operacion Gratuita" checked={selectedOptionFactura === "Operacion Gratuita"} onChange={(e) => { handleRadioChangeFactura(e) }} />
                        <input type="text" name="operacionGratuitaFactura" value={operacionGratuitaFactura} onChange={(e) => { setOperacionGratuitaFactura(e) }} readOnly />
                    </div>

                    <div>
                        <label>Porcentaje de I.G.V</label>
                        <b>18%</b>
                    </div>
                    <div>
                        <label>Valor del I.G.V</label>
                        <input type="number" placeholder="Ingrese el I.G.V" name="igvFactura" value={igvFactura} onChange={(e) => { setIgvFactura(e.target.value) }} readOnly />
                    </div>
                    <div>
                        <label>Precio de venta total</label>
                        <input type="number" placeholder="Ingrese el precio de venta total" name="precioVentaTotalFactura" value={precioVentaTotalFactura} onChange={(e) => { setPrecioVentaTotalFactura(e.target.value) }} readOnly />
                    </div>

                    {estado !== "PROCESADO" ? (
                        <button onClick={(e) => manejarClickFactura(e)}>Procesar voucher con factura (Procesado)</button>
                    ) : (
                        <b>Voucher Procesado</b>
                    )}
                </form>
            </div>
        );
    }

    const handleButtonClick = async () => {
        buscarDatosDeLaPersona(idVoucher);
        await handleFiltrar();
        realizarCalculosBoleta();
        realizarCalculosFactura();
    };

    async function handleFiltrar() {
        console.log("Este es el id del voucher: " + idVoucher)
        VoucherService.getVoucherById(idVoucher).then((response) => {
            setNombreBanco(response.data.nombreBanco);
            setNumeroDeOperacion(response.data.numeroDeOperacion);
            setFechaDeOperacion(response.data.fechaDeOperacion);
            setImporte(response.data.importe);
            setEstado(response.data.estado);
            setVoucherURL(response.data.voucherURL);

            setMetodoDePago("Transferencia bancaria");
            setMontoTotal(response.data.importe);
            setMedioDePago(response.data.nombreBanco);
            setCodigoProductoServicioBoleta("1");
            setCodigoProductoServicioFactura("1");
            setNumeroBoleta("B000-00000000(ejemplo)");
            setNumeroFactura("F000-00000000(ejemplo)");
            const fechaActual = new Date().toISOString().split("T")[0];
            setValorUnitarioBoleta(response.data.importe);
            setFechaEmisionBoleta(fechaActual);
            setFechaEmisionFactura(fechaActual);

            // Obtén el voucherURL de la respuesta
            const voucherUrlObtenido = response.data.voucherURL;
            setVoucherURL(voucherUrlObtenido); // Actualiza el estado
            fetchImagen(voucherUrlObtenido); // Llama a fetchImagen con el valor actualizado
        })
    }

    async function fetchImagen(voucherUrl) {
        try {
            console.log("Este es la URL del Voucher: " + voucherUrl);
            const imagenObtenida = await VoucherService.getVoucherImagen(voucherUrl);

            if (imagenObtenida) {
                setImagenUrl(imagenObtenida);
                console.log("Esta es la imagen obtenida: " + imagenObtenida);
            } else {
                setError("No se pudo Obtener la imagen.");
            }
        } catch (e) {
            setError("Hubo un error al cargar la imagen.");
            console.error(e);
        }
    }

    function handleEstadoVoucher(estado) {
        if (estado) {
            console.log("Este es el estado para pasar al controller: " + estado)
            VoucherService.getVoucherByEstado(estado)
                .then((response) => {
                    setVouchers(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function handleChange(e) {
        const estadoSeleccionado = e.target.value;
        console.log("Este es el estado: " + estadoSeleccionado)
        setEstadoFiltrar(estadoSeleccionado);
        handleEstadoVoucher(estadoSeleccionado); // Filtrar al cambiar el estado
    }

    function buscarDatosDeLaPersona(idVoucher) {
        console.log("Este es el id del Voucherr: " + idVoucher)
        CuentaFinancieraService.getCuentaFinancieraByVoucher(idVoucher).then((cuenta) => {
            console.log("Este es el id de cuenta financiera: " + cuenta.data.idCuentaFinanciera);
            setIdCuentaFinanciera(cuenta.data.idCuentaFinanciera);
            EstudianteService.getEstudianteByCuentaFinanciera(cuenta.data.idCuentaFinanciera).then((estudiante) => {
                setIdEstudiante(estudiante.data.idEstudiante);
                PersonaService.getPersonaById(estudiante.data.idPersona).then((persona) => {
                    const nombreCompletoPersona = persona.data.nombres + " " + persona.data.apellido_paterno + " " + persona.data.apellido_materno;
                    setNombreClienteBoleta(nombreCompletoPersona);
                    setNombreClienteFactura(nombreCompletoPersona);
                    setEstudiantePago(nombreCompletoPersona);
                    setTipoDocumentoBoleta(persona.data.tipoDocumento);
                    setTipoDocumentoFactura(persona.data.tipoDocumento);
                    setDocumentoDeIdentidadBoleta(persona.data.numeroDocumento);
                    setDocumentoDeIdentidadFactura(persona.data.numeroDocumento);
                    setDireccionBoleta(persona.data.direccion);
                    setDireccionFactura(persona.data.direccion);
                    console.log(nombreCompletoPersona);
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    function mostrarBotonRegistrado() {
        if (estado !== "REGISTRADO") {
            return (
                <div>
                    <button onClick={(e) => voucherRegistrado(e)}>Devolver a Registrado (Registrado)</button>
                </div>
            )
        }
    }

    function mostrarBotonVerificado() {
        if (estado !== "VERIFICADO") {
            return (
                <div>
                    <button onClick={(e) => voucherVerificado(e)}>Verificar (Verificado)</button>
                </div>
            )
        }
    }

    function mostrarBotonRechazado() {
        if (estado !== "RECHAZADO") {
            return (
                <div>
                    <button onClick={(e) => voucherRechazado(e)}>Rechazar (Rechazado)</button>
                </div>
            )
        }
    }

    useEffect(() => {
        console.log("Este es la operacion: " + selectedOptionBoleta);
        console.log("Estos son los estados para que entre a la condicion Boleta: Gravada: " + operacionBoleta.gravada + " - Inafecta: " + operacionBoleta.inafecta + " - Exonerada: " + operacionBoleta.exonerada + " - Gratuita: " + operacionBoleta.gratuita);
        realizarCalculosBoleta();

        console.log("Este es la operacion: " + selectedOptionFactura);
        console.log("Estos son los estados para que entre a la condicion Factura: Gravada: " + operacionFactura.gravada + " - Inafecta: " + operacionFactura.inafecta + " - Exonerada: " + operacionFactura.exonerada + " - Gratuita: " + operacionFactura.gratuita);
        realizarCalculosFactura();
    }, [montoTotal, cantidadBoleta, valorDescuentoBoleta, selectedOptionBoleta, operacionBoleta, cantidadFactura, valorDescuentoFactura, selectedOptionFactura, operacionFactura])


    return (
        <div>
            <div className="Filtrar">
                <div>
                    <label><b>Seleccione el estado de los vouchers:</b></label>
                    <select name="estadoFiltrar" value={estadoFiltrar} onChange={(e) => { handleChange(e) }}>
                        <option value="">Seleccione un estado</option>
                        <option value="REGISTRADO">Registrados</option>
                        <option value="VERIFICADO">Verificados</option>
                        <option value="PROCESADO">Procesados</option>
                        <option value="RECHAZADO">Rechazados</option>
                    </select>
                </div>

                <div>
                    <label><b>Seleccione un voucher</b></label>
                    <select name="idVoucher" value={idVoucher} onChange={(e) => { setIdVoucher(e.target.value) }}>
                        <option value="">Seleccione un voucher</option>
                        {vouchers.map((voucher) => (
                            <option key={voucher.idVoucher} value={voucher.idVoucher}>
                                {voucher.nombreBanco} - {voucher.numeroDeOperacion}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleButtonClick}>Filtrar</button>
            </div>

            <h2>Proceso de validacion de voucher y creacion de pago</h2>
            <h3>Voucher seleccionado:</h3>
            <div>
                <label>Nombre del Banco:&nbsp;<b>{nombreBanco}</b></label>
                &nbsp;
                &nbsp;
                <label>Numero de Operacion:&nbsp;<b>{numeroDeOperacion}</b></label>
                &nbsp;
                &nbsp;
                <label>Fecha de Operacion:&nbsp;<b>{fechaDeOperacion}</b></label>
                &nbsp;
                &nbsp;
                <label>Importe:&nbsp;<b>{importe}</b></label>
                &nbsp;
                &nbsp;
                <label>Estado:&nbsp;<b>{estado}</b></label>
                &nbsp;
                &nbsp;
                <br />
                <label>Imagen del Voucher:</label>
                &nbsp;
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : imagenUrl ? (
                    <img src={imagenUrl} alt="Imagen del Voucher" style={{ width: "300px", height: "300px" }} />
                ) : (
                    <p>Cargando imagen...</p>
                )}
            </div>

            <h3>Procesar datos</h3>
            <form action="">
                <h3>Datos de Pago</h3>
                <div>
                    <label>Monto Total:</label>
                    <input type="number" placeholder="Ingrese el monto total" name="montoTotal" value={montoTotal} onChange={(e) => { setMontoTotal(e.target.value) }} />
                </div>
                <div>
                    <label >Método de pago:</label>
                    <input type="text" placeholder="Ingrese el método de pago" name="metodoDePago" value={metodoDePago} onChange={(e) => { setMetodoDePago(e.target.value) }} />
                </div>
                <div>
                    <label>Medio de pago:</label>
                    <input type="text" placeholder="Ingrese el medio de pago" name="medioDePago" value={medioDePago} onChange={(e) => { setMedioDePago(e.target.value) }} />
                </div>
                <div>
                    <label>Estado:</label>
                    <select id="estadoPago" name="estadoPago" value={estadoPago} onChange={(e) => { setEstadoPago(e.target.value) }}>
                        <option value="">Seleccione un estado</option>
                        <option value="Pagado">Pagado</option>
                        <option value="Pendiente_de_pago">Pendiente de pago</option>
                        <option value="Retrasado">Retrasado</option>
                        <option value="No_procesado">No procesado</option>
                    </select>
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type="text" placeholder="Ingrese el descripcion" name="descripcion" value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
                </div>
                <div>
                    <label>Estudiante:</label>
                    <input type="text" placeholder="Ingrese el estudiante" name="estudiantePago" value={estudiantePago} readOnly />
                </div>
                <div>
                    <label>Fecha de Pago:</label>
                    <input type="date" placeholder="Ingrese la fecha" name="fechaPago" value={fechaPago} readOnly />
                </div>
                <div>
                    <label>Seleccione boleta o factura:</label>
                    <select onChange={handleSelectChange}>
                        <option value="">Seleccione...</option>
                        <option value="boleta">Boleta</option>
                        <option value="factura">Factura</option>
                    </select>
                </div>
            </form>

            {/* Renderizar el formulario según la selección */}
            <div>
                {seleccion === "boleta" && boletaForm()}
                {seleccion === "factura" && facturaForm()}
                {mostrarBotonRegistrado()}
                {mostrarBotonVerificado()}
                {mostrarBotonRechazado()}
            </div>
        </div>
    );
}

export default ValidarPagoComponent;