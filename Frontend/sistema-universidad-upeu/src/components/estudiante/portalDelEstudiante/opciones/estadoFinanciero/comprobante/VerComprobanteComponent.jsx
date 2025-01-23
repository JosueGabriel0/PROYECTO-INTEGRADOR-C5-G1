import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PagoService from "../../../../../../services/pagoServices/PagoService";

function VerComprobanteComponent() {
    const { comprobanteUrl } = useParams();
    const [pdfUrl, setPdfUrl] = useState("");

    const obtenerPdf = async (fileName) => {
        try {
            const response = await PagoService.getPdf(fileName);

            // Crear una URL temporal del archivo PDF
            const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
            setPdfUrl(url); // Guardar la URL para usarla en el `iframe`
        } catch (error) {
            console.error("Error obteniendo el PDF:", error);
        }
    };

    const descargarPdf = async (fileName) => {
        try {
            const response = await PagoService.getPdf(fileName);

            // Crear una URL temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Nombre del archivo para la descarga
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error descargando el PDF:", error);
        }
    };

    return (
        <div>
            {comprobanteUrl ? (
                <>
                    <button onClick={() => obtenerPdf(comprobanteUrl)}>Ver PDF Generado</button>
                    <button onClick={() => descargarPdf(comprobanteUrl)}>Descargar PDF</button>
                    <Link to="/estado-financiero">Continuar</Link>
                    {pdfUrl && (
                        <div style={{ width: "100%", height: "600px", border: "1px solid black", marginTop: "20px" }}>
                            <iframe
                                src={pdfUrl}
                                title="PDF Viewer"
                                style={{ width: "100%", height: "100%" }}
                                frameBorder="0"
                            ></iframe>
                        </div>
                    )}
                </>
            ) : (
                <p>No se encontró una boleta o factura para mostrar.</p>
            )}
        </div>
    );
}

export default VerComprobanteComponent;