import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import Spline from '@splinetool/react-spline';
import GeneralProfileCardComponent from './GeneralProfileCardComponent';

import { getUserRole, logout } from '../../../services/authServices/authService';

import GeneralDashboardComponentCSS from "../../../style-sheets/general/dashboard/GeneralDashboardComponentCSS.module.css";

import { FaRegFileLines } from "react-icons/fa6";
import { RiHome3Line } from "react-icons/ri";
import { BsPersonSquare } from "react-icons/bs";
import { PiStudent } from "react-icons/pi";
import { LuPenLine } from "react-icons/lu";

function GeneralDashboardComponent({ titulo = "Dshboard" }) {
  const nombreRol = getUserRole();
  const navigate = useNavigate();
  function opcionesSegunRol() {
    if (nombreRol === "ADMINISTRADOR") {
      return (
        <div>
          <section>
            <Link to="/inscripciones">Inscripciones</Link>&nbsp;&nbsp;
            <Link to="/roles">Roles</Link>&nbsp;&nbsp;
            <Link to="/usuarios">Usuarios</Link>&nbsp;&nbsp;
            <Link to="/personas">Personas</Link>&nbsp;&nbsp;
            <Link to="/administradores">Administradores</Link>&nbsp;&nbsp;
            <Link to="/administrativos">Administrativos</Link>&nbsp;&nbsp;
            <Link to="/docentes">Docentes</Link>&nbsp;&nbsp;
            <Link to="/estudiantes">Estudiantes</Link>&nbsp;&nbsp;
            <Link to="/login-real-time-chat">Chat en linea</Link>
          </section>
        </div>
      )
    } else if (nombreRol === "ADMINISTRATIVO") {
      return (
        <div>
          <section>
            <Link to="/validacion-pagos">Validar Voucher a Pago</Link>
          </section>
        </div>
      )
    } else if (nombreRol === "DOCENTE") {
      return (
        <div>
          <section>
            <Link to="/inscripciones">Inscripciones</Link>&nbsp;&nbsp;
            <Link to="/roles">Roles</Link>&nbsp;&nbsp;
            <Link to="/usuarios">Usuarios</Link>&nbsp;&nbsp;
            <Link to="/personas">Personas</Link>&nbsp;&nbsp;
            <Link to="/administradores">Administradores</Link>&nbsp;&nbsp;
            <Link to="/administrativos">Administrativos</Link>&nbsp;&nbsp;
            <Link to="/docentes">Docentes</Link>&nbsp;&nbsp;
            <Link to="/estudiantes">Estudiantes</Link>&nbsp;&nbsp;
            <Link to="/login-real-time-chat">Chat en linea</Link>
          </section>
        </div>
      )
    } else if (nombreRol === "ESTUDIANTE") {
      return (
        <div className={GeneralDashboardComponentCSS["opciones"]}>
          <Link to="/portal-academico" style={{ textDecoration: "none", height: 0 }}>
            <div className={GeneralDashboardComponentCSS["card"]}>
              <div className={GeneralDashboardComponentCSS["card__border"]} />
              <div className={GeneralDashboardComponentCSS["card_title__container"]}>
                <span className={GeneralDashboardComponentCSS["card_title"]}>PORTAL DEL ESTUDIANTE</span>
                <p className={GeneralDashboardComponentCSS["card_paragraph"]}>Conoce el portal del estudiante para conocer a detalle las opciones del estudiante</p>
              </div>
              <hr className={GeneralDashboardComponentCSS["line"]} />
              <div className={GeneralDashboardComponentCSS["portalAcademico-icon"]}>
                <BsPersonSquare size={150} color="white" />
              </div>
              <button className={GeneralDashboardComponentCSS["button"]}>Ingresar a portal</button>
            </div>
          </Link>
          <Link to="/inicio-matricula-virtual-estudiante" style={{ textDecoration: "none", height: 0 }}>
            <div className={GeneralDashboardComponentCSS["card"]}>
              <div className={GeneralDashboardComponentCSS["card__border"]} />
              <div className={GeneralDashboardComponentCSS["card_title__container"]}>
                <span className={GeneralDashboardComponentCSS["card_title"]}>MATRÍCULA</span>
                <p className={GeneralDashboardComponentCSS["card_paragraph"]}>Realiza una matricula o visualiza los programas en los que estas matriculado</p>
              </div>
              <hr className={GeneralDashboardComponentCSS["line"]} />
              <div className={GeneralDashboardComponentCSS["matricula-icon"]}>
                <FaRegFileLines size={150} color='white' />
              </div>
              <button className={GeneralDashboardComponentCSS["button"]}>Ingresar a matricula</button>
            </div></Link>
          <Link to="/usuarios" style={{ textDecoration: "none", height: 0 }}>
            <div className={GeneralDashboardComponentCSS["card"]}>
              <div className={GeneralDashboardComponentCSS["card__border"]} />
              <div className={GeneralDashboardComponentCSS["card_title__container"]}>
                <span className={GeneralDashboardComponentCSS["card_title"]}>BIENESTAR UNIV.</span>
                <p className={GeneralDashboardComponentCSS["card_paragraph"]}>Descubre los servicios de bienestar universitario que la UPEU ofrese</p>
              </div>
              <hr className={GeneralDashboardComponentCSS["line"]} />
              <div className={GeneralDashboardComponentCSS["bienestarU-icon"]}>
                <RiHome3Line size={150} color="white" />
              </div>
              <button className={GeneralDashboardComponentCSS["button"]}>Ingresar a bienestar U</button>
            </div></Link>
          <Link to="/personas" style={{ textDecoration: "none", height: 0 }}>
            <div className={GeneralDashboardComponentCSS["card"]}>
              <div className={GeneralDashboardComponentCSS["card__border"]} />
              <div className={GeneralDashboardComponentCSS["card_title__container"]}>
                <span className={GeneralDashboardComponentCSS["card_title"]}>B-LEARNING</span>
                <p className={GeneralDashboardComponentCSS["card_paragraph"]}>Ingresa al sistema academico B-LEARNING para conocer tus cursos matriculados, tareas, etc</p>
              </div>
              <hr className={GeneralDashboardComponentCSS["line"]} />
              <div className={GeneralDashboardComponentCSS["blearning-icon"]}>
                <PiStudent size={150} color="white" />
              </div>
              <button className={GeneralDashboardComponentCSS["button"]}>Ingresar a B-learning</button>
            </div></Link>
          <Link to="/administradores" style={{ textDecoration: "none" }}>
            <div className={GeneralDashboardComponentCSS["card"]}>
              <div className={GeneralDashboardComponentCSS["card__border"]} />
              <div className={GeneralDashboardComponentCSS["card_title__container"]}>
                <span className={GeneralDashboardComponentCSS["card_title"]}>LAMB LEARNING</span>
                <p className={GeneralDashboardComponentCSS["card_paragraph"]}>Ingresa al anterrior sistema academico LAMB LEARNING para ver tareas enviadas, cursos anteriores, etc</p>
              </div>
              <hr className={GeneralDashboardComponentCSS["line"]} />
              <div className={GeneralDashboardComponentCSS["lambLearning-icon"]}>
                <LuPenLine size={150} color="white" />
              </div>
              <button className={GeneralDashboardComponentCSS["button"]}>Ingresar a lamb learning</button>
            </div></Link>
        </div>
      )
    }
  }

  function handleLogOut(e){
    e.preventDefault();
    logout();
    navigate('/login');
  }
  
  return (
    <div className={GeneralDashboardComponentCSS["container"]}>
      <div className={GeneralDashboardComponentCSS["fondo"]}>
        <Spline scene="https://prod.spline.design/QHiH5hEWV5v9Y8Vs/scene.splinecode" />
      </div>

      <div className={GeneralDashboardComponentCSS["content"]}>
        <div className={GeneralDashboardComponentCSS["primer-contenido"]}>
          {opcionesSegunRol()}
        </div>
        <div className={GeneralDashboardComponentCSS["segundo-contenido"]}>
          <div className={GeneralDashboardComponentCSS["contenedor-logo"]}>
            <img src="/images/logoo.png" alt="" />
          </div>
          <div className={GeneralDashboardComponentCSS["perfil-card"]}>
            <GeneralProfileCardComponent />
          </div>
          <div className={GeneralDashboardComponentCSS["opcion-cerrar-sesion"]}>
            <button onClick={(e) => {handleLogOut(e)}}>CERRAR SESIÓN</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default GeneralDashboardComponent;