import { useNavigate, useParams } from "react-router-dom";

function AddResponsableFinancieroComponent(){
    //React router dom
    const { idResponsableFinanciero } = useParams();
    const navigate = useNavigate();
    
    return(
        <div className="container"></div>
    )
}

export default AddResponsableFinancieroComponent;