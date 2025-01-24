import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function VerMensajeSeguridadComponent() {

    const navigate = useNavigate();

    function mensaje() {
        Swal.fire({
            title: 'Error',
            text: 'Debes de aceptar y confirmar haber leido el Compromiso de Honor y el Consentimiento informado antes de continuar',
            icon: 'warning',
            confirmButtonText: 'Regresar',
            customClass: {
                confirmButton: 'swal-btn-class',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/select-matricula-virtual-estudiante`);
            }
        });
    }

    useEffect(() => {
        mensaje();
    }, [])

    return (
        <div className="container">
        </div>
    )
}

export default VerMensajeSeguridadComponent;