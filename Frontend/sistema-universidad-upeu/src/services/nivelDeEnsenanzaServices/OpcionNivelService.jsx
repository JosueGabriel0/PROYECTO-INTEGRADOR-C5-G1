import axios from "axios";
import { getToken } from "../authServices/authService";

const OPCIONNIVEL_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/opcionNivel`;

class OpcionNivelService {
    getOpcionesNivelByNivelEnsenanza(idNivelEnsenanza){
        return(
            axios.get(`${OPCIONNIVEL_BASE_REST_API_URL}/nivelEnsenanza/${idNivelEnsenanza}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getAllOpcionesNivel(){
        return(
            axios.get(`${OPCIONNIVEL_BASE_REST_API_URL}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getOpcionNivelById(idOpcionNivel){
        return(
            axios.get(`${OPCIONNIVEL_BASE_REST_API_URL}/${idOpcionNivel}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postOpcionNivel(opcionNivel){
        return(
            axios.post(`${OPCIONNIVEL_BASE_REST_API_URL}`, opcionNivel, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putOpcionNivel(idOpcionNivel, opcionNivel){
        return(
            axios.put(`${OPCIONNIVEL_BASE_REST_API_URL}/${idOpcionNivel}`, opcionNivel, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteOpcionNivel(idOpcionNivel){
        return(
            axios.delete(`${OPCIONNIVEL_BASE_REST_API_URL}/${idOpcionNivel}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getOpcionesNivelPorCarrerasEstudiante(idEstudiante){
        return(
            axios.get(`${OPCIONNIVEL_BASE_REST_API_URL}/por-estudiante/${idEstudiante}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
}

export default new OpcionNivelService();