import axios from "axios";
import { getToken } from "../authServices/authService";

const NIVELENSENANZA_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/nivelEnsenanza`;
class NivelEnsenanzaService {
    getAllNivelesEnsenanza(){
        return(
            axios.get(`${NIVELENSENANZA_BASE_REST_API_URL}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getNivelEnsenanzaById(idNivelEnsenanza){
        return(
            axios.get(`${NIVELENSENANZA_BASE_REST_API_URL}/${idNivelEnsenanza}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postNivelEnsenanza(nivelEnsenanza){
        return(
            axios.post(`${NIVELENSENANZA_BASE_REST_API_URL}`, nivelEnsenanza, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putNivelEnsenanza(idNivelEnsenanza, nivelEnsenanza){
        return(
            axios.put(`${NIVELENSENANZA_BASE_REST_API_URL}/${idNivelEnsenanza}`, nivelEnsenanza, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteNivelEnsenanza(idNivelEnsenanza){
        return(
            axios.delete(`${NIVELENSENANZA_BASE_REST_API_URL}/${idNivelEnsenanza}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getNivelEnsenanzaByIdOpcionNivel(idOpcionNivel){
        return(
            axios.get(`${NIVELENSENANZA_BASE_REST_API_URL}/por-opcion/${idOpcionNivel}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
}

export default new NivelEnsenanzaService();