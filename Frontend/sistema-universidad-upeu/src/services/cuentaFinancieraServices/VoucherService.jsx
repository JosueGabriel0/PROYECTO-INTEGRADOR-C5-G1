import axios from "axios";
import { getToken } from "../authServices/authService";

const VOUCHER_DATABASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/voucher`;

class VoucherService {

    async getVoucherImagen(voucherURL) {
        const imagenUrl = `${VOUCHER_DATABASE_REST_API_URL}/images/${voucherURL}`; // Asegúrate de que la URL sea correcta

        try {
            const response = await axios.get(imagenUrl, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                responseType: 'blob' // Para manejar la imagen como blob
            });
            console.log("Imagen recibida:", response.data); // Verificar si se recibe la imagen correctamente
            return URL.createObjectURL(response.data); // Crear una URL para la imagen
        } catch (error) {
            console.error("Error al obtener la imagen:", error);
            return null; // Manejo de errores
        }
    }

    postVoucher(voucher) {
        return (
            axios.post(VOUCHER_DATABASE_REST_API_URL, voucher, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putVoucher(idVoucher, voucher) {
        return (
            axios.put(VOUCHER_DATABASE_REST_API_URL + "/" + idVoucher, voucher, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getAllVouchers() {
        return (
            axios.get(VOUCHER_DATABASE_REST_API_URL, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getVoucherById(idVoucher) {
        return (
            axios.get(VOUCHER_DATABASE_REST_API_URL + "/" + idVoucher, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteVoucher(idVoucher) {
        return (
            axios.delete(VOUCHER_DATABASE_REST_API_URL + "/" + idVoucher, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getVoucherByCuentaFinanciera(idCuentaFinanciera) {
        return (
            axios.get(VOUCHER_DATABASE_REST_API_URL + "/porCuentaFinanciera/" + idCuentaFinanciera, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getVoucherByCuentaYAnio(idCuentaFinanciera, anio) {
        return (
            axios.get(VOUCHER_DATABASE_REST_API_URL + "/buscar/" + idCuentaFinanciera + "/" + anio, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postVoucherToCuentaFinanciera(idCuentaFinanciera, voucher) {
        return (
            axios.post(VOUCHER_DATABASE_REST_API_URL + "/cuenta/" + idCuentaFinanciera, voucher, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getVoucherByEstado(estado) {
        return (
            axios.get(VOUCHER_DATABASE_REST_API_URL + "/estado/" + estado, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putEstadoVoucher(idVoucher, estado) {
        const estadoLimpio = encodeURIComponent(estado.trim()); // Elimina espacios y codifica caracteres especiales
        return axios.put(
            `${VOUCHER_DATABASE_REST_API_URL}/actualizarEstado/${idVoucher}/${estadoLimpio}`,
            null, // No envías un cuerpo en el método PUT
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
    }

}

export default new VoucherService();