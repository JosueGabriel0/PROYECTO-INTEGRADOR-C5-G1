import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente verifica que los checkboxes y la aceptación estén correctos
function ProtectedRouteComponent({ children }) {
  // Aquí puedes verificar el estado global o local, por ejemplo, en un contexto
  const isAuthenticated = localStorage.getItem('isCheckedCompromiso') === 'true' &&
    localStorage.getItem('isCheckedConsentimiento') === 'true' &&
    localStorage.getItem('botonAceptar') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/mensaje-seguridad" />;  // Redirige a la página principal si no está autenticado
  }

  return children;  // Si está autenticado, muestra los niños (la página protegida)
}

export default ProtectedRouteComponent;