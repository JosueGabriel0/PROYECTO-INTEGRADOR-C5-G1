import axios from "axios";
import { getToken } from "../authServices/authService";
const PERSONA_BASE_REST_API_URL = `${process.env.REACT_APP_API_BASE_URL}/persona`;

class PersonaService {
    getAllPersonas() {
        return axios.get(PERSONA_BASE_REST_API_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    }

    getPersonaById(idPersona) {
        return axios.get(`${PERSONA_BASE_REST_API_URL}/${idPersona}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    }

    // Modificación de createPersona para manejar FormData
    createPersona(persona) {
        return axios.post(PERSONA_BASE_REST_API_URL, persona, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // No especificamos 'Content-Type', axios lo maneja automáticamente cuando usamos FormData
            },
        });
    }

    // Modificación de updatePersona para manejar FormData
    updatePersona(idPersona, persona) {
        return axios.put(`${PERSONA_BASE_REST_API_URL}/${idPersona}`, persona, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                // No especificamos 'Content-Type', axios lo maneja automáticamente cuando usamos FormData
            },
        });
    }

    deletePersona(idPersona) {
        return axios.delete(`${PERSONA_BASE_REST_API_URL}/${idPersona}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    }

    async getPersonaImagen(fotoPerfil) {
        const imagenUrl = `${PERSONA_BASE_REST_API_URL}/images/${fotoPerfil}`; // Asegúrate de que la URL sea correcta

        try {
            const response = await axios.get(imagenUrl, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                responseType: 'blob' // Para manejar la imagen como blob
            });
            console.log("Imagen recibida:", response.data); // Verificar si se recibe la imagen correctamente
            return URL.createObjectURL(response.data); // Crear una URL para la imagen
        } catch (error) {
            console.error("Error al obtener la imagen:", error);
            return null; // Manejo de errores
        }
    }

    putPersonaDatosEspecificos(idPersona, personaActualizada) {
        return axios.put(`${PERSONA_BASE_REST_API_URL}/actualizarDatosPersona/${idPersona}`, personaActualizada, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    }
}

export default new PersonaService();