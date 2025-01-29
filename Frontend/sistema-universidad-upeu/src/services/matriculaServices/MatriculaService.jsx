import axios from "axios";
import { getToken } from "../authServices/authService";

const MATRICULA_DATABASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/matricula`;

class MatriculaService{

    getAllMatriculas(){
        return(
            axios.get(MATRICULA_DATABASE_REST_API_URL, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    getMatriculaById(idMatricula){
        return(
            axios.get(MATRICULA_DATABASE_REST_API_URL + "/" + idCarrera, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    postMatricula(matricula){
        return(
            axios.post(MATRICULA_DATABASE_REST_API_URL, matricula, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    putMatricula(idMatricula, matricula){
        return(
            axios.put(MATRICULA_DATABASE_REST_API_URL + "/" + idMatricula, matricula, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    deleteMatricula(idMatricula){
        return(
            axios.delete(MATRICULA_DATABASE_REST_API_URL + "/" + idMatricula, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    getValidationEstudianteMatricula(idMatricula){
        return(
            axios.get(MATRICULA_DATABASE_REST_API_URL + "/validarEstudiante/" + idMatricula, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }

    getMatriculaByIdEstudiante(idEstudiante){
        return(
            axios.get(`${MATRICULA_DATABASE_REST_API_URL}/buscarPorIdEstudiante/${idEstudiante}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        )
    }
}

export default new MatriculaService();