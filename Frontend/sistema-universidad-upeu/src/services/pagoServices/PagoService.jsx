import axios from "axios";
import { getToken } from "../authServices/authService";

const PAGO_DATABASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/pago`;

class PagoService {
    getAllPagos() {
        return (
            axios.get(PAGO_DATABASE_REST_API_URL, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getPagoById(idPago) {
        return (
            axios.get(PAGO_DATABASE_REST_API_URL + "/" + idPago, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postPago(pago) {
        return (
            axios.post(PAGO_DATABASE_REST_API_URL, pago, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putPago(idPago, pago) {
        return (
            axios.put(PAGO_DATABASE_REST_API_URL + "/" + idPago, pago, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteCurso(idPago) {
        return (
            axios.delete(PAGO_DATABASE_REST_API_URL + "/" + idPago, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postPagoConBoleta(pagoConBoleta) {
        return (
            axios.post(PAGO_DATABASE_REST_API_URL + "/boleta", pagoConBoleta, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postPagoConFactura(pagoConFactura) {
        return (
            axios.post(PAGO_DATABASE_REST_API_URL + "/factura", pagoConFactura, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putPagoConComprobante(idPago, pagoConComprobante) {
        return (
            axios.put(PAGO_DATABASE_REST_API_URL + "/pagoConComprobante/" + idPago, pagoConComprobante, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deletePagoConComprobante(idPago) {
        return (
            axios.delete(PAGO_DATABASE_REST_API_URL + "/" + idPago, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getPdf(fileName) {
        return axios.get(`${PAGO_DATABASE_REST_API_URL}/pdf/${fileName}`, {
            responseType: 'blob', // Esto es importante para manejar el archivo binario (PDF)
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }
}

export default new PagoService();