package upeu.edu.pe.msmatriculas.loaders;

import upeu.edu.pe.msmatriculas.entity.Matricula;
import upeu.edu.pe.msmatriculas.entity.EstadoMatricula;
import upeu.edu.pe.msmatriculas.repository.MatriculaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class MatriculaDataLoader implements CommandLineRunner {

    private final MatriculaRepository matriculaRepository;

    public MatriculaDataLoader(MatriculaRepository matriculaRepository) {
        this.matriculaRepository = matriculaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existen matrículas en la base de datos
        if (matriculaRepository.count() == 0) {
            Matricula matricula1 = new Matricula();
            matricula1.setIdNivelEnsenanza(1L);
            matricula1.setIdOpcionNivel(1L);
            matricula1.setIdEstudiante(1L);
            matricula1.setIdCarrera(1L);
            matricula1.setIdCalendarioAcademico(1L);
            matricula1.setIdPago(1L);
            matricula1.setIdRequisito(1L);
            matricula1.setIdAdministrativo(1L);
            matricula1.setTipoAlumno("Regular");
            matricula1.setNumeroDeCreditos(22);
            matricula1.setHoras(22);
            matricula1.setCostoTotal(3000);
            matricula1.setCursosDetalleIds(Arrays.asList(1L, 2L, 3L));
            matricula1.setEstado(EstadoMatricula.PENDIENTE);
            matricula1.setFechaMatricula(LocalDate.now());
            matricula1.setObservaciones("Primera matrícula del estudiante.");

            Matricula matricula2 = new Matricula();
            matricula2.setIdNivelEnsenanza(2L);
            matricula2.setIdEstudiante(1002L);
            matricula2.setIdCarrera(2L);
            matricula2.setIdCalendarioAcademico(2002L);
            matricula2.setIdPago(3002L);
            matricula2.setIdRequisito(4002L);
            matricula2.setIdAdministrativo(5002L);
            matricula2.setTipoAlumno("Regular");
            matricula2.setNumeroDeCreditos(22);
            matricula2.setCostoTotal(3000);
            matricula2.setHoras(22);
            matricula2.setCursosDetalleIds(Arrays.asList(1L, 2L, 3L));
            matricula2.setEstado(EstadoMatricula.PAGADO);
            matricula2.setFechaMatricula(LocalDate.now());
            matricula2.setObservaciones("Pago confirmado.");

            Matricula matricula3 = new Matricula();
            matricula3.setIdNivelEnsenanza(1L);
            matricula3.setIdEstudiante(1003L);
            matricula3.setIdCarrera(1L);
            matricula3.setIdCalendarioAcademico(2003L);
            matricula3.setIdPago(3003L);
            matricula3.setIdRequisito(4003L);
            matricula3.setIdAdministrativo(5003L);
            matricula3.setTipoAlumno("Regular");
            matricula3.setNumeroDeCreditos(22);
            matricula3.setCostoTotal(3000);
            matricula3.setCursosDetalleIds(Arrays.asList(1L, 2L, 3L));
            matricula3.setEstado(EstadoMatricula.COMPLETADO);
            matricula3.setFechaMatricula(LocalDate.now());
            matricula3.setObservaciones("Matrícula completada exitosamente.");

            // Guardar las matrículas en la base de datos
            List<Matricula> matriculas = Arrays.asList(matricula1, matricula2, matricula3);
            matriculaRepository.saveAll(matriculas);

            System.out.println("Matrículas de ejemplo cargadas en la base de datos.");
        } else {
            System.out.println("Las matrículas ya están cargadas en la base de datos.");
        }
    }
}