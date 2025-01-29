package upeu.edu.pe.msmatriculas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.msmatriculas.entity.Matricula;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long> {

    // Buscar todas las matrículas de un estudiante por su ID
    Matricula findByIdEstudiante(Long idEstudiante);

    // Buscar matrículas por estado
    List<Matricula> findByEstado(String estado);

    // Buscar matrículas por carrera y calendario académico
    List<Matricula> findByIdCarreraAndIdCalendarioAcademico(Long idCarrera, Long idCalendarioAcademico);

    // Buscar matrículas creadas después de una fecha específica
    List<Matricula> findByFechaMatriculaAfter(LocalDateTime fecha);

    // Buscar matrículas por un rango de fechas
    List<Matricula> findByFechaMatriculaBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);

    /**
     * Verifica si existe una matrícula única para un estudiante, carrera y calendario académico.
     *
     * @param idEstudiante ID del estudiante.
     * @param idCarrera ID de la carrera.
     * @param idCalendarioAcademico ID del calendario académico.
     * @return true si ya existe una matrícula con los mismos datos, false en caso contrario.
     */
    boolean existsByIdEstudianteAndIdCarreraAndIdCalendarioAcademico(Long idEstudiante, Long idCarrera, Long idCalendarioAcademico);
}