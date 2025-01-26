import axios from "axios"
import { getToken } from "../../authServices/authService"

const RESPONSABLEFINANCIERO_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/responsableFinanciero`

class ResponsableFinancieroService {
    postResponsableFinanciero(responsableFinanciero){
        return(
            axios.post(RESPONSABLEFINANCIERO_BASE_REST_API_URL, responsableFinanciero, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getAllResponsablesFinancieros(){
        return(
            axios.get(RESPONSABLEFINANCIERO_BASE_REST_API_URL, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getResponsablesFinancierosById(idResponsableFinanciero){
        return(
            axios.get(`${RESPONSABLEFINANCIERO_BASE_REST_API_URL}/${idResponsableFinanciero}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putResponsableFinanciero(idResponsableFinanciero, responsableFinanciero){
        return(
            axios.put(`${RESPONSABLEFINANCIERO_BASE_REST_API_URL}/${idResponsableFinanciero}`, responsableFinanciero, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteResponsableFinanciero(idResponsableFinanciero){
        return(
            axios.delete(`${RESPONSABLEFINANCIERO_BASE_REST_API_URL}/${idResponsableFinanciero}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postResponsableFinancieroToEstudiante(idEstudiante, responsableFinanciero){
        return(
            axios.post(`${RESPONSABLEFINANCIERO_BASE_REST_API_URL}/paraEstudiante/${idEstudiante}`, responsableFinanciero, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
}

export default new ResponsableFinancieroService();