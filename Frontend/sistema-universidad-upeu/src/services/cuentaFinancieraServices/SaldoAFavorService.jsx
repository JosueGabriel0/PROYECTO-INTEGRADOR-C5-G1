import axios from "axios";
import { getToken } from "../authServices/authService";

const SALDOAFAVOR_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/saldoAFavor`;

class SaldoAFavorService {
    postSaldoAFavorToCuentaFinanciera(idCuentaFinanciera, saldoAFavor){
        return(
            axios.post(`${SALDOAFAVOR_BASE_REST_API_URL}/cuentaFinanciera/${idCuentaFinanciera}`, saldoAFavor, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getAllSaldosAFavor(){
        return(
            axios.get(`${SALDOAFAVOR_BASE_REST_API_URL}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getSaldoAFavorById(idSaldoAFavor){
        return(
            axios.get(`${SALDOAFAVOR_BASE_REST_API_URL}/${idSaldoAFavor}`, {
                headers: {
                    Authorization: `Beare ${getToken()}`
                }
            })
        );
    }

    getSaldoAFavorByCuentaYAnio(idCuentaFinanciera, anio){
        return(
            axios.get(`${SALDOAFAVOR_BASE_REST_API_URL}/cuentaYAnio/${idCuentaFinanciera}/${anio}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putSaldoAFavor(idSaldoAFavor, saldoAFavor){
        return(
            axios.put(`${SALDOAFAVOR_BASE_REST_API_URL}/${idSaldoAFavor}`, saldoAFavor, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteSaldoAFavor(idSaldoAFavor){
        return(
            axios.delete(`${SALDOAFAVOR_BASE_REST_API_URL}/${idSaldoAFavor}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postSaldoAFavorRestarByCuentaFinanciera(idCuentaFinanciera, monto) {
        console.log(`${SALDOAFAVOR_BASE_REST_API_URL}/restarSaldoAFavor/${idCuentaFinanciera}`);
        console.log("Este es el monto: " + JSON.stringify(monto));
        return axios.post(
            `${SALDOAFAVOR_BASE_REST_API_URL}/restarSaldoAFavor/${idCuentaFinanciera}`, 
            monto,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json"
                }
            }
        );
    }    
}

export default new SaldoAFavorService();