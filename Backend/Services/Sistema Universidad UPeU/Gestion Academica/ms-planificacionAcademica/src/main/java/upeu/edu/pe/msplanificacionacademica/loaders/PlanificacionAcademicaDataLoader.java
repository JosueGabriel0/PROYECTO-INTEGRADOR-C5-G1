package upeu.edu.pe.msplanificacionacademica.loaders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import upeu.edu.pe.msplanificacionacademica.entity.*;
import upeu.edu.pe.msplanificacionacademica.repository.PlanificacionAcademicaRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class PlanificacionAcademicaDataLoader implements CommandLineRunner {

    private final PlanificacionAcademicaRepository planificacionAcademicaRepository;

    public PlanificacionAcademicaDataLoader(PlanificacionAcademicaRepository planificacionAcademicaRepository) {
        this.planificacionAcademicaRepository = planificacionAcademicaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existen planificaciones en la base de datos
        if (planificacionAcademicaRepository.count() == 0) {
            // Crear planificación para Ingeniería de Sistemas
            PlanificacionAcademica planificacionIngenieriaSistemas2024_1 = new PlanificacionAcademica();
            planificacionIngenieriaSistemas2024_1.setNombrePlanEstudio("Plan de Estudios Ingeniería de Sistemas 2024-1");
            planificacionIngenieriaSistemas2024_1.setCodigoPlanEstudio("PLAN-ING-SIS-2024");
            planificacionIngenieriaSistemas2024_1.setVersionPlanEstudio("2024-1");
            planificacionIngenieriaSistemas2024_1.setSemestre("2024-1");
            planificacionIngenieriaSistemas2024_1.setModo("REGULAR");
            planificacionIngenieriaSistemas2024_1.setIdCarrera(1L);
            planificacionIngenieriaSistemas2024_1.setDescripcionGeneral("Planificación académica para Ingeniería de Sistemas.");
            planificacionIngenieriaSistemas2024_1.setEstado(EstadoPlanificacion.ACTIVO);
            planificacionIngenieriaSistemas2024_1.setCursosProgramadosIds(List.of(1L, 2L, 3L, 4L)); // IDs de cursos de ejemplo
            planificacionIngenieriaSistemas2024_1.setCalendarioAcademicoIds(List.of(1L, 2L)); // IDs de eventos del calendario

            // Crear ciclos asociados a la planificación
            Ciclo ciclo1 = new Ciclo();
            ciclo1.setNumeroCiclo(1);
            ciclo1.setEstado(EstadoCiclo.ACTIVO);
            ciclo1.setCursosIds(List.of(1L, 2L));
            ciclo1.setPlanificacionAcademica(planificacionIngenieriaSistemas2024_1);

            Ciclo ciclo2 = new Ciclo();
            ciclo2.setNumeroCiclo(2);
            ciclo2.setEstado(EstadoCiclo.ACTIVO);
            ciclo2.setCursosIds(List.of(3L, 4L));
            ciclo2.setPlanificacionAcademica(planificacionIngenieriaSistemas2024_1);

            planificacionIngenieriaSistemas2024_1.setCiclos(List.of(ciclo1, ciclo2));

            // Crear planificación para Administración
            PlanificacionAcademica planificacionAdministracion2024_1 = new PlanificacionAcademica();
            planificacionAdministracion2024_1.setNombrePlanEstudio("Plan de Estudios Administración 2024-1");
            planificacionAdministracion2024_1.setCodigoPlanEstudio("PLAN-ADM-2024");
            planificacionAdministracion2024_1.setVersionPlanEstudio("2024-1");
            planificacionIngenieriaSistemas2024_1.setSemestre("2024-1");
            planificacionIngenieriaSistemas2024_1.setModo("REGULAR");
            planificacionIngenieriaSistemas2024_1.setIdCarrera(1L);
            planificacionAdministracion2024_1.setDescripcionGeneral("Planificación académica para Administración.");
            planificacionAdministracion2024_1.setEstado(EstadoPlanificacion.ACTIVO);
            planificacionAdministracion2024_1.setCursosProgramadosIds(List.of(5L, 6L, 7L)); // IDs de cursos de ejemplo
            planificacionAdministracion2024_1.setCalendarioAcademicoIds(List.of(3L)); // IDs de eventos del calendario

            // Crear ciclos asociados a la planificación
            Ciclo ciclo3 = new Ciclo();
            ciclo3.setNumeroCiclo(1);
            ciclo3.setEstado(EstadoCiclo.ACTIVO);
            ciclo3.setCursosIds(List.of(5L, 6L));
            ciclo3.setPlanificacionAcademica(planificacionAdministracion2024_1);

            Ciclo ciclo4 = new Ciclo();
            ciclo4.setNumeroCiclo(2);
            ciclo4.setEstado(EstadoCiclo.ACTIVO);
            ciclo4.setCursosIds(List.of(7L));
            ciclo4.setPlanificacionAcademica(planificacionAdministracion2024_1);

            planificacionAdministracion2024_1.setCiclos(List.of(ciclo3, ciclo4));

            // Guardar las planificaciones en la base de datos
            planificacionAcademicaRepository.saveAll(List.of(planificacionIngenieriaSistemas2024_1, planificacionAdministracion2024_1));

            System.out.println("Planificaciones académicas de ejemplo cargadas en la base de datos.");
        } else {
            System.out.println("Las planificaciones académicas ya están cargadas en la base de datos.");
        }
    }
}