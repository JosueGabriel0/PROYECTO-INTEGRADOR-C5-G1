package upeu.edu.pe.msnivelesdeensenanza.loaders;

import upeu.edu.pe.msnivelesdeensenanza.entity.*;
import upeu.edu.pe.msnivelesdeensenanza.repository.NivelEnsenanzaRepository;
import upeu.edu.pe.msnivelesdeensenanza.repository.OpcionNivelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;

@Component
public class OpcionNivelDataLoader implements CommandLineRunner {

    private final OpcionNivelRepository opcionNivelRepository;
    private final NivelEnsenanzaRepository nivelEnsenanzaRepository;

    public OpcionNivelDataLoader(OpcionNivelRepository opcionNivelRepository, NivelEnsenanzaRepository nivelEnsenanzaRepository) {
        this.opcionNivelRepository = opcionNivelRepository;
        this.nivelEnsenanzaRepository = nivelEnsenanzaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (opcionNivelRepository.count() == 0) {
            NivelEnsenanza pregrado = nivelEnsenanzaRepository.findByNombre("Pregrado").orElse(null);
            NivelEnsenanza postgrado = nivelEnsenanzaRepository.findByNombre("Postgrado").orElse(null);

            if (pregrado != null && postgrado != null) {
                // Crear Opción Nivel para Pregrado
                OpcionNivel opcion1 = new OpcionNivel();
                opcion1.setNivelEnsenanza(pregrado);
                opcion1.setTipoEstudio("Ingeniería");
                opcion1.setSemestre("2024-I");
                opcion1.setCampus("Campus Central");
                opcion1.setIdCarrera(1L);
                opcion1.setIdPLanificacionAcademica(1L);
                opcion1.setModalidad("Presencial");
                opcion1.setEstado("Activo");
                opcion1.setCostoDeMatricula(1500.0);
                opcion1.setCostoPorCredito(300.0);
                opcion1.setConsentimientoInformado(true);
                opcion1.setFechaCreacionOpcionNivel(LocalDateTime.now());

                // Crear Ciclo Detalle asociado
                CicloDetalle cicloDetalle1 = new CicloDetalle();
                cicloDetalle1.setOpcionNivel(opcion1);
                cicloDetalle1.setIdCiclo(201L);
                cicloDetalle1.setNumeroDeGrupos(3);
                cicloDetalle1.setFechaCreacionCicloDetalle(LocalDateTime.now());

                // Crear Curso Detalle asociado al Ciclo Detalle
                CursoDetalle cursoDetalle1 = new CursoDetalle();
                cursoDetalle1.setCicloDetalle(cicloDetalle1);
                cursoDetalle1.setIdCurso(301L);
                cursoDetalle1.setGrupo("A");
                cursoDetalle1.setIdsDocentes(Arrays.asList(401L, 402L));
                cursoDetalle1.setFechaCreacionCursoDetalle(LocalDateTime.now());

                // Crear Horario para el Curso Detalle
                Horario horario1 = new Horario();
                horario1.setFechaInicio(LocalDate.of(2024, 3, 1));
                horario1.setFechaFin(LocalDate.of(2024, 7, 15));

                // Crear Detalles de Horario
                HorarioDetalle detalleHorario1 = new HorarioDetalle();
                detalleHorario1.setHorario(horario1);
                detalleHorario1.setDia("Lunes");
                detalleHorario1.setHoraInicio(LocalTime.of(8, 0));
                detalleHorario1.setHoraFin(LocalTime.of(10, 0));

                HorarioDetalle detalleHorario2 = new HorarioDetalle();
                detalleHorario2.setHorario(horario1);
                detalleHorario2.setDia("Miércoles");
                detalleHorario2.setHoraInicio(LocalTime.of(8, 0));
                detalleHorario2.setHoraFin(LocalTime.of(10, 0));

                horario1.setHorarioDetalles(Arrays.asList(detalleHorario1, detalleHorario2));
                cursoDetalle1.setHorario(horario1);
                cicloDetalle1.setCursoDetalles(Arrays.asList(cursoDetalle1));
                opcion1.setCicloDetalle(Arrays.asList(cicloDetalle1));

                // Crear Opción Nivel para Postgrado (similar a la anterior)
                OpcionNivel opcion2 = new OpcionNivel();
                opcion2.setNivelEnsenanza(postgrado);
                opcion2.setTipoEstudio("MBA");
                opcion2.setSemestre("2024-II");
                opcion2.setCampus("Campus Sur");
                opcion2.setIdCarrera(2L);
                opcion2.setIdPLanificacionAcademica(102L);
                opcion2.setModalidad("Semipresencial");
                opcion2.setEstado("Activo");
                opcion2.setCostoDeMatricula(2000.0);
                opcion2.setCostoPorCredito(400.0);
                opcion2.setConsentimientoInformado(true);
                opcion2.setFechaCreacionOpcionNivel(LocalDateTime.now());

                opcionNivelRepository.saveAll(Arrays.asList(opcion1, opcion2));
                System.out.println("Opciones de nivel y datos relacionados cargados en la base de datos.");
            } else {
                System.out.println("No se encontraron niveles de enseñanza para asociar con las opciones.");
            }
        } else {
            System.out.println("Las opciones de nivel ya están cargadas en la base de datos.");
        }
    }
}