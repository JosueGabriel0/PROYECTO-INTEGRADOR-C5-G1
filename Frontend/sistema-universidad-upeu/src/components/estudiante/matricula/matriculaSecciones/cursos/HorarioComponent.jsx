import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../../../style-sheets/generalMomentaneo.css";

function HorarioComponent({ cicloDetalleConMayorNumero, campus, nombre, horariosSeleccionados, cursosSeleccionados, setEstadoValidacion }) {
    // Datos de Ciclo Detalle
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    // Estado para las celdas coloreadas
    const [celdasColoreadas, setCeldasColoreadas] = useState({});

    // Días y horarios de referencia
    const dias = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
    const horarios = [
        {
            turno: "MAÑANA",
            horas: ["07:30 AM - 08:20 AM", "08:25 AM - 09:15 AM", "09:20 AM - 10:10 AM", "10:20 AM - 11:10 AM", "11:15 AM - 12:05 PM", "12:10 PM - 01:00 PM"],
        },
        {
            turno: "TARDE",
            horas: ["01:10 PM - 02:00 PM", "02:05 PM - 02:55 PM", "03:00 PM - 03:50 PM", "04:00 PM - 04:50 PM", "04:55 PM - 05:45 PM", "05:50 PM - 06:40 PM"],
        },
        {
            turno: "NOCHE",
            horas: ["06:45 PM - 07:35 PM", "07:40 PM - 08:30 PM", "08:35 PM - 09:25 PM", "09:30 PM - 10:20 PM", "10:25 PM - 11:25 PM"],
        },
    ];

    // Formatear fecha
    function formatFechaManual(fechaString) {
        const meses = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const [anio, mes, dia] = fechaString.split("-");
        return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${anio}`;
    }

    // Mapear días al formato abreviado
    const mapearDia = (diaCompleto) => {
        const mapa = {
            "Lunes": "LU",
            "Martes": "MA",
            "Miercoles": "MI",
            "Jueves": "JU",
            "Viernes": "VI",
            "Sabado": "SA",
            "Domingo": "DO",
        };
        return mapa[diaCompleto] || "";
    };

    function convertirAHorasEnMinutos(hora) {
        const [hh, mm] = hora.split(":").map(Number);
        return hh * 60 + mm; // Convertir horas y minutos a minutos totales
    }

    function convertirAHora24(hora12) {
        // Separar la hora y el sufijo (AM/PM)
        const [hora, minutosSufijo] = hora12.split(":");
        const [minutos, sufijo] = minutosSufijo.split(" ");

        let hora24 = parseInt(hora); // Convertir hora a número
        const minutos24 = parseInt(minutos); // Convertir minutos a número

        // Si es "AM" y la hora es 12 (medianoche), cambiar a 00
        if (sufijo === "AM" && hora24 === 12) {
            hora24 = 0;
        }

        // Si es "PM" y la hora no es 12, sumar 12 a la hora
        if (sufijo === "PM" && hora24 !== 12) {
            hora24 += 12;
        }

        // Formatear la hora en formato 24 horas (con ceros a la izquierda si es necesario)
        return `${hora24.toString().padStart(2, "0")}:${minutos24.toString().padStart(2, "0")}`;
    }

    function calcularCeldasColoreadas() {
        const celdas = {};
        const colores = asignarColoresACursos(cursosSeleccionados);
        const conflictos = {}; // Almacena los conflictos detectados

        cursosSeleccionados.forEach((curso, index) => {
            const { curso: cursoInfo, horario } = curso;
            const nombreCurso = cursoInfo.nombre;
            const colorCurso = colores[nombreCurso];

            horario.horarioDetalles.forEach(({ dia, horaInicio, horaFin }) => {
                const horaInicioFormateado = horaInicio.split(":").slice(0, 2).join(":");
                const horaFinFormateado = horaFin.split(":").slice(0, 2).join(":");
                const diaAbreviado = mapearDia(dia);

                horarios.forEach(({ horas }) => {
                    horas.forEach((rangoHora) => {
                        const [inicio, fin] = rangoHora.split(" - ");
                        const inicioFormateado = convertirAHora24(inicio);
                        const finFormateado = convertirAHora24(fin);

                        const horaInicioFormateadoComparacion = convertirAHorasEnMinutos(horaInicioFormateado);
                        const horaFinFormateadoComparacion = convertirAHorasEnMinutos(horaFinFormateado);
                        const horaInicioComparacion = convertirAHorasEnMinutos(inicioFormateado);
                        const horaFinComparacion = convertirAHorasEnMinutos(finFormateado);

                        if (horaInicioFormateadoComparacion <= horaInicioComparacion && horaFinComparacion <= horaFinFormateadoComparacion) {
                            if (!celdas[diaAbreviado]) {
                                celdas[diaAbreviado] = {};
                            }

                            // Si ya hay un curso en la misma celda, se detecta un conflicto
                            if (celdas[diaAbreviado][rangoHora]) {
                                conflictos[diaAbreviado] = conflictos[diaAbreviado] || {};
                                conflictos[diaAbreviado][rangoHora] = [
                                    ...(conflictos[diaAbreviado][rangoHora] || []),
                                    nombreCurso,
                                ];
                                celdas[diaAbreviado][rangoHora].color = "red"; // Marcar en rojo si hay conflicto
                            } else {
                                // Asigna el color si no hay conflicto
                                celdas[diaAbreviado][rangoHora] = {
                                    nombreCurso,
                                    color: colorCurso,
                                    index,
                                };
                            }
                        }
                    });
                });
            });
        });

        setCeldasColoreadas(celdas);

        if (Object.keys(conflictos).length > 0) {
            setEstadoValidacion("CONFLICTOS");
            Swal.fire({
                title: "⚠️ Conflicto detectado",
                text: `El curso que acaba de seleccionar acaba de generar un conflicto de horarios. Verifícalo.`,
                icon: "warning",
                confirmButtonText: "Revisar",
            });
            console.warn("Conflictos detectados:", conflictos);
        } else {
            setEstadoValidacion("SINCONFLICTOS");
        }
    }

    const coloresPredefinidos = [
        "#BBDEFB", // Azul claro
        "#C5E1A5", // Verde claro
        "#FFAB91", // Naranja claro
        "#D1C4E9", // Morado claro
        "#F48FB1", // Rosa claro
        "#FFF59D", // Amarillo claro
        "#FFCDD2", // Rojo claro
    ];

    function asignarColoresACursos(cursos) {
        const colores = {};
        cursos.forEach((curso, index) => {
            colores[curso.curso.nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });
        return colores;
    }

    // Actualizar fechas y celdas coloreadas
    useEffect(() => {
        if (cicloDetalleConMayorNumero) {
            setFechaInicio(formatFechaManual(cicloDetalleConMayorNumero.fechaInicio));
            setFechaFin(formatFechaManual(cicloDetalleConMayorNumero.fechaFin));
        }
        calcularCeldasColoreadas();
    }, [cicloDetalleConMayorNumero, horariosSeleccionados, cursosSeleccionados]);

    return (
        <div className="container">
            <h3>Horario</h3>
            <h3>REGULAR - PREGRADO</h3>
            <div>
                <div>
                    <p>{`${fechaInicio} - ${fechaFin}`}</p>
                    <p>{`${campus} - ${nombre}`}</p>
                </div>
                <div>
                    <div className="horario-container">
                        <table className="horario-table">
                            <tbody>
                                {horarios.map((turno) => (
                                    <React.Fragment key={turno.turno}>
                                        <tr>
                                            <td className="horario-turno">{turno.turno}</td>
                                            {dias.map((dia) => (
                                                <td key={dia + turno.turno} className="horario-header">
                                                    {dia}
                                                </td>
                                            ))}
                                        </tr>
                                        {turno.horas.map((hora) => (
                                            <tr key={hora}>
                                                <td className="horario-hora">{hora}</td>
                                                {dias.map((dia) => (
                                                    <td
                                                        key={dia + hora}
                                                        className={"horario-celda"}
                                                        style={{
                                                            backgroundColor: celdasColoreadas[dia]?.[hora]?.color || "transparent",
                                                        }}
                                                    >
                                                        {celdasColoreadas[dia]?.[hora] && (
                                                            <div>
                                                                <div className="tooltip">
                                                                    {`#${celdasColoreadas[dia][hora].index + 1}: ${celdasColoreadas[dia][hora].nombreCurso}`}
                                                                </div>
                                                                <div>
                                                                    <span>{`#${celdasColoreadas[dia][hora].index + 1}`}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HorarioComponent;