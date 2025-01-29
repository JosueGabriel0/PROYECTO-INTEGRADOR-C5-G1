import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";

function CompromisoYConsentimientoComponent() {
    //React router dom
    const { idOpcionNivel, idNivelEnsenanza } = useParams();
    const navigate = useNavigate();

    //Datos de checkboxes y boton
    const [isCheckedCompromiso, setIsCheckedCompromiso] = useState(false);
    const [isCheckedConsentimiento, setIsCheckedConsentimiento] = useState(false);

    const isButtonDisabled = !(isCheckedCompromiso && isCheckedConsentimiento);

    const handleCheckBoxCompromisoChange = () => {
        setIsCheckedCompromiso(!isCheckedCompromiso);
    };

    const handleCheckBoxConsentimientoChange = () => {
        setIsCheckedConsentimiento(!isCheckedConsentimiento);
    };

    const handleSubmit = () => {
        localStorage.setItem('isCheckedCompromiso', isCheckedCompromiso);
        localStorage.setItem('isCheckedConsentimiento', isCheckedConsentimiento);
        localStorage.setItem('botonAceptar', true);

        if (isButtonDisabled) {
            alert('Debes aceptar y seleccionar ambos checkboxes.');
        } else {
            navigate(`/matricula/${idOpcionNivel}/${idNivelEnsenanza}`);
        }
    };

    return (
        <div className="container">
            <h1>UNIVERSIDAD PERUANA UNIÓN</h1>
            <h2>Mi compromiso de Honor</h2>
            <h2>Consentimiento informado</h2>

            <input type="checkbox" checked={isCheckedCompromiso} onChange={handleCheckBoxCompromisoChange} />
            <label>Acepto y confirmo haber leido: Compromiso de Honor</label>

            <input type="checkbox" checked={isCheckedConsentimiento} onChange={handleCheckBoxConsentimientoChange} />
            <label>Acepto y confirmo haber leido: Consentimiento informado</label>

            <button onClick={handleSubmit} disabled={isButtonDisabled}>ACEPTAR</button>
        </div>
    )
}

export default CompromisoYConsentimientoComponent;