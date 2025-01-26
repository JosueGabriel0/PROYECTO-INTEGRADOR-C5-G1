import OpcionNivelService from "../../../../../services/nivelDeEnsenanzaServices/OpcionNivelService";
import "../../../../../style-sheets/generalMomentaneo.css";

function CursosComponent({idOpcionNivel = "0", cambiarOpcion}) {

    function listarDatosOpcionNivel(){
        OpcionNivelService.getOpcionNivelById(idOpcionNivel).then((response) => {

        })
    }
    return (
        <div className="container">
            <h1>CURSOS</h1>
            <div class="containerCursos">
                <div class="columnCursos"><h3>Cursos</h3></div>
                <div class="columnCursos"><h3>Cursos seleccionados</h3></div>
                <div class="columnCursos"><h3>Horario</h3></div>
            </div>
        </div>
    )
}

export default CursosComponent;