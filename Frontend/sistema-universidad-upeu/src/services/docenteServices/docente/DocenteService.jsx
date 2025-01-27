import axios from "axios";
import { getToken } from "../../authServices/authService";

const DOCENTE_DATABASE_API_REST_URL = `${process.env.REACT_APP_API_BASE_URL}/docente`;

class DocenteService{
    getAllDocentes(){
        return(
            axios.get(DOCENTE_DATABASE_API_REST_URL, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    getDocenteById(idDocente){
        return(
            axios.get(DOCENTE_DATABASE_API_REST_URL + "/" + idDocente, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    postDocente(docente){
        return(
            axios.post(DOCENTE_DATABASE_API_REST_URL, docente, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    putDocente(idDocente, docente){
        return(
            axios.put(DOCENTE_DATABASE_API_REST_URL + "/" + idDocente, docente, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    deleteDocente(idDocente){
        return(
            axios.delete(DOCENTE_DATABASE_API_REST_URL + "/" + idDocente, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }
}

export default new DocenteService();