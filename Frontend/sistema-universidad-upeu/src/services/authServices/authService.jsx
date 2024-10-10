// authService.js

// Guardar el token JWT en localStorage
export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Obtener el token JWT desde localStorage
export const getToken = () => {
    return localStorage.getItem('authToken');
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = getToken();
    return !!token; // Devuelve true si el token existe, false si no.
};

// Función para realizar el login (petición al microservicio ms-auth)
export const login = async (credentials) => {
    try {
        const response = await fetch('http://localhost:9090/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed: ' + response.statusText); // Mejora en el manejo de errores
        }

        const data = await response.json();
        saveToken(data.token); // Guardar el token en localStorage
        return data.token; // Devuelve solo el token
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
};

// Función para obtener un nuevo token que dura 5 minutos
export const getShortLivedToken = async () => {
    const token = getToken(); // Puedes enviar el token existente para verificar la sesión

    try {
        const response = await fetch('http://localhost:9090/auth/token/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Si necesitas el token actual para la autorización
            },
        });

        if (!response.ok) {
            throw new Error('Token refresh failed: ' + response.statusText);
        }

        const data = await response.json();
        saveToken(data.token); // Guardar el nuevo token en localStorage
        return data.token; // Devuelve solo el nuevo token
    } catch (error) {
        console.error('Error getting short-lived token:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
};

// Función para validar el token (usada si es necesario validar en algún punto)
export const validateToken = async () => {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`http://localhost:9090/auth/validate?token=${token}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Token validation failed: ' + response.statusText); // Mejora en el manejo de errores
        }

        return true; // Si la validación es exitosa
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
};

// Función para cerrar sesión y limpiar el token
export const logout = () => {
    localStorage.removeItem('authToken');
};