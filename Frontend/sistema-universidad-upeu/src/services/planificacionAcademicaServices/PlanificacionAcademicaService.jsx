import axios from "axios";
import { getToken } from "../authServices/authService";

const PLANIFICACIONACADEMICA_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/planificacionAcademica`;
class PlanificacionAcademicaService {
    postPlanificacionAcademica(planificacionAcademica){
        return(
            axios.post(`${PLANIFICACIONACADEMICA_BASE_REST_API_URL}`, planificacionAcademica, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getAllPlanificacionesAcademicas(){
        return(
            axios.get(`${PLANIFICACIONACADEMICA_BASE_REST_API_URL}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getPlanificacionAcademicaById(idPLanificacionAcademica){
        return(
            axios.get(`${PLANIFICACIONACADEMICA_BASE_REST_API_URL}/${idPLanificacionAcademica}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putPlanificacionAcademica(idPLanificacionAcademica, planificacionAcademica){
        return(
            axios.put(`${PLANIFICACIONACADEMICA_BASE_REST_API_URL}/${idPLanificacionAcademica}`, planificacionAcademica, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deletePlanificacionAcademica(idPLanificacionAcademica){
        return(
            axios.delete(`${PLANIFICACIONACADEMICA_BASE_REST_API_URL}/${idPLanificacionAcademica}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
}

export default new PlanificacionAcademicaService();