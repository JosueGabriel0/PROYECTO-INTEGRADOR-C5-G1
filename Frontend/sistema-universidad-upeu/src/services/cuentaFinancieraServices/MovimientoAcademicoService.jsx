import axios from "axios";
import { getToken } from "../authServices/authService";

const MOVIMIENTOACADEMICO_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/movimientoAcademico`;

class MovimientoAcademicoService {

    getAllMovimientosAcademicos() {
        return axios.get(MOVIMIENTOACADEMICO_BASE_REST_API_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    postMovimientoAcademico(movimientoAcademico) {
        return axios.post(MOVIMIENTOACADEMICO_BASE_REST_API_URL, movimientoAcademico, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    getMovimientoAcademicoById(idMovimientoAcademico) {
        return axios.get(`${MOVIMIENTOACADEMICO_BASE_REST_API_URL}/${idMovimientoAcademico}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    putMovimientoAcademico(idMovimientoAcademico, movimientoAcademico) {
        return axios.put(`${MOVIMIENTOACADEMICO_BASE_REST_API_URL}/${idMovimientoAcademico}`, movimientoAcademico, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    deleteMovimientoAcademico(idMovimientoAcademico) {
        return axios.delete(`${MOVIMIENTOACADEMICO_BASE_REST_API_URL}/${idMovimientoAcademico}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    getMovimientoAcademicoByCuentaFinanciera(idCuentaFinanciera){
        return axios.get(`${MOVIMIENTOACADEMICO_BASE_REST_API_URL}/porCuentaFinanciera/${idCuentaFinanciera}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    getMovimientoAcademicoByCuentaYAnio(idCuentaFinanciera, anio){
        return axios.get(`${MOVIMIENTOACADEMICO_BASE_REST_API_URL}/buscar/${idCuentaFinanciera}/${anio}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    postMovimientoAcademicoToCuentaFinanciera(idCuentaFinanciera, movimientoAcademico){
        return axios.post(`${MOVIMIENTOACADEMICO_BASE_REST_API_URL}/cuenta/${idCuentaFinanciera}`, movimientoAcademico, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }
}

export default new MovimientoAcademicoService();