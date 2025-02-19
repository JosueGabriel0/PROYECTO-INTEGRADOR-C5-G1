import GeneralInicioComponentCSS from "../../../style-sheets/general/inicioDashboard/GeneralInicioComponentCSS.module.css"
import Spline from '@splinetool/react-spline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function GeneralInicioComponent() {

    return (
        <div className={GeneralInicioComponentCSS["container"]}>
            <Spline scene="https://prod.spline.design/zs09fv-21qL7okCU/scene.splinecode" className={GeneralInicioComponentCSS["splineBackground"]} />

            <div className={GeneralInicioComponentCSS["content"]}>
                <div className={GeneralInicioComponentCSS["contenido-principal"]}>
                    <div className={GeneralInicioComponentCSS["texto-principal"]}>
                        <h1>Bienvenido a al sistema. <br /> UPEU.</h1>
                    </div>
                    <div className={GeneralInicioComponentCSS["mision"]}>
                        <div className={GeneralInicioComponentCSS["mision-container"]}>
                            <div className={GeneralInicioComponentCSS["mision-subtitulo"]}>
                                <h2>Misión</h2>
                                <div className={GeneralInicioComponentCSS["primer-rectangulo"]}></div>
                            </div>
                            <div className={GeneralInicioComponentCSS["mision-icono"]}>
                                <FontAwesomeIcon icon={faBullseye} style={{ color: "#4a8db7", }} size="2x" />
                            </div>
                        </div>
                        <p>Ser reconocidos por la Iglesia Adventista del Séptimo Día y la sociedad como líderes en el desarrollo de investigaciones científicas y tecnológicas
                            en todas las áreas de la ciencia sobre la base de valores cristianos, servicio y en armonía con el medio ambiente, para contribuir a la transformación
                            de una sociedad justa y equitativa.
                        </p>
                    </div>
                    <div className={GeneralInicioComponentCSS["vision"]}>
                        <div className={GeneralInicioComponentCSS["vision-container"]}>
                            <div className={GeneralInicioComponentCSS["vision-subtitulo"]}>
                                <h2>Visión</h2>
                                <div className={GeneralInicioComponentCSS["segundo-rectangulo"]}></div>
                            </div>
                            <div className={GeneralInicioComponentCSS["vision-icono"]}>
                                <FontAwesomeIcon icon={faEye} style={{ color: "#4a8db7", }} size="2x" />
                            </div>
                        </div>
                        <p>Promover, gestionar y apollar el dessarrollo de investigadores capaces de generar conocimientos, en todas las áreas de las ciencias, desde una
                            consmovisión cristiana, preparando una comunidad de expertos y líderes comprometidos con la Iglesia Adventista del Séptimo Día y la sociedad.</p>
                    </div>
                </div>
                <div className={GeneralInicioComponentCSS["contenido-secundario"]}>
                    <div className={GeneralInicioComponentCSS["subtitulo-secundario"]}>
                        <div className={GeneralInicioComponentCSS["cuadradito"]}></div>
                        <div className={GeneralInicioComponentCSS["letras-secundarias"]}>
                            <h2>Licenciamiento y acreditación</h2>
                        </div>
                    </div>
                    <div className={GeneralInicioComponentCSS["imagenes-secundarias"]}>
                        <div className={GeneralInicioComponentCSS["contenedor-imagen-1"]}>
                            <img src="/images/top-10.png" alt="" />
                        </div>
                        <div className={GeneralInicioComponentCSS["contenedor-imagen-2"]}>
                            <img src="/images/logo-sunedu.png" alt="" />
                        </div>
                        <div className={GeneralInicioComponentCSS["contenedor-imagen-3"]}>
                            <img src="/images/logo-sineace.png" alt="" />
                        </div>
                        <div className={GeneralInicioComponentCSS["contenedor-imagen-4"]}>
                            <img src="/images/AAA_logo_blanco.png" alt="" />
                        </div>
                        <div className={GeneralInicioComponentCSS["contenedor-imagen-5"]}>
                            <img src="/images/logo2.png" alt="" />
                        </div>
                        <div className={GeneralInicioComponentCSS["contenedor-imagen-6"]}>
                            <img src="/images/LOGO-EAD-02.png" alt="" />
                        </div>
                    </div>
                    <button className={GeneralInicioComponentCSS["boton-libro-reclamaciones"]}>
                        <p>LIBRO DE RECLAMACIONES</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GeneralInicioComponent;