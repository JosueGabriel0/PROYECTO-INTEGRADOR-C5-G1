import axios from "axios";
import { getToken } from "../../authServices/authService";

const ESTUDIANTE_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/estudiante`;

class EstudianteService{
    getAllEstudiantes(){
        return axios.get(ESTUDIANTE_BASE_REST_API_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    getEstudianteById(idEstudiante){
        return axios.get(ESTUDIANTE_BASE_REST_API_URL+"/"+idEstudiante, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    createEstudiante(estudiante){
        return axios.post(ESTUDIANTE_BASE_REST_API_URL, estudiante, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    updateEstudiante(idEstudiante, estudiante){
        return axios.put(ESTUDIANTE_BASE_REST_API_URL+ "/" + idEstudiante, estudiante, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    deleteEstudiante(idEstudiante){
        return axios.delete(ESTUDIANTE_BASE_REST_API_URL + "/" + idEstudiante, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    }

    getEstudianteByCuentaFinanciera(idCuentaFinanciera){
        return(
            axios.get(ESTUDIANTE_BASE_REST_API_URL + "/cuentaFinanciera/" + idCuentaFinanciera, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putEstudianteCodigo(codigo, idEstudiante){
        const codigoLimpio = encodeURIComponent(codigo.trim());
        return(
            axios.put(`${ESTUDIANTE_BASE_REST_API_URL}/codigoEstudiante/${codigoLimpio}/${idEstudiante}`, null, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
}

export default new EstudianteService();