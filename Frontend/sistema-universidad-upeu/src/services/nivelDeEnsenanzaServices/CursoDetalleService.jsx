import axios from "axios";
import { getToken } from "../authServices/authService";

const CURSODETALLE_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/cursoDetalle`;

class CursoDetalleService {
    getAllCursosDetalle(){
        return(
            axios.get(`${CURSODETALLE_BASE_REST_API_URL}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getCursoDetalleById(idCursoDetalle){
        return(
            axios.get(`${CURSODETALLE_BASE_REST_API_URL}/${idCursoDetalle}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postCursoDetalle(cursoDetalle){
        return(
            axios.post(`${CURSODETALLE_BASE_REST_API_URL}`, cursoDetalle, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    putCursoDetalle(idCursoDetalle, cursoDetalle){
        return(
            axios.put(`${CURSODETALLE_BASE_REST_API_URL}/${idCursoDetalle}`, cursoDetalle, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    deleteCursoDetalle(idCursoDetalle){
        return(
            axios.delete(`${CURSODETALLE_BASE_REST_API_URL}/${idCursoDetalle}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    getCursosDetalleByIds(cursosDetalleIds){
        return(
            axios.post(`${CURSODETALLE_BASE_REST_API_URL}/buscarCursosDetallePorIds`, cursosDetalleIds, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }

    postCursoDetalleRestarCupo(cursoDetalleRequest){
        return(
            axios.post(`${CURSODETALLE_BASE_REST_API_URL}/restarCuposCursoDetalle`, cursoDetalleRequest, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
    
    postCursoDetalleSumarCupo(cursoDetalleRequest){
        return(
            axios.post(`${CURSODETALLE_BASE_REST_API_URL}/sumarCuposCursoDetalle`, cursoDetalleRequest, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        );
    }
}

export default new CursoDetalleService();