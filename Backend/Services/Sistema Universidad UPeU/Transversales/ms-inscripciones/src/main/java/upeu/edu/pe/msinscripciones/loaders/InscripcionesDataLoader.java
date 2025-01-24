package upeu.edu.pe.msinscripciones.loaders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import upeu.edu.pe.msinscripciones.entity.Inscripcion;
import upeu.edu.pe.msinscripciones.repository.InscripcionesRepository;

import java.time.LocalDateTime;

@Configuration
public class InscripcionesDataLoader {

    @Bean
    CommandLineRunner initInscripciones(@Autowired InscripcionesRepository inscripcionesRepository) {
        return args -> {
            // Verificar si ya existen datos en la base de datos
            if (inscripcionesRepository.count() == 0) {
                System.out.println("No se encontraron inscripciones. Creando datos predeterminados...");

                // Crear y guardar inscripciones predeterminadas
                Inscripcion inscripcion1 = new Inscripcion();
                inscripcion1.setIdInscripcion(null); // Se generará automáticamente
                inscripcion1.setInscripcionRol("Con Rol");
                inscripcion1.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion1.setIdRol(1L);
                inscripcion1.setIdUsuario(1L);
                inscripcion1.setIdPersona(1L);
                inscripcion1.setIdAdministrador(1L);
                inscripcionesRepository.save(inscripcion1);

                Inscripcion inscripcion2 = new Inscripcion();
                inscripcion2.setIdInscripcion(null); // Se generará automáticamente
                inscripcion2.setInscripcionRol("Con Rol");
                inscripcion2.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion2.setIdRol(2L);
                inscripcion2.setIdUsuario(5L);
                inscripcion2.setIdPersona(2L);
                inscripcion2.setIdAdministrativo(1L);
                inscripcionesRepository.save(inscripcion2);

                Inscripcion inscripcion3 = new Inscripcion();
                inscripcion3.setIdInscripcion(null); // Se generará automáticamente
                inscripcion3.setInscripcionRol("Con Rol");
                inscripcion3.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion3.setIdRol(4L);
                inscripcion3.setIdUsuario(9L);
                inscripcion3.setIdPersona(3L);
                inscripcion3.setIdDocente(1L);
                inscripcionesRepository.save(inscripcion3);

                Inscripcion inscripcion4 = new Inscripcion();
                inscripcion4.setIdInscripcion(null); // Se generará automáticamente
                inscripcion4.setInscripcionRol("Con Rol");
                inscripcion4.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion4.setIdRol(3L);
                inscripcion4.setIdUsuario(23L);
                inscripcion4.setIdPersona(4L);
                inscripcion4.setIdEstudiante(2L);
                inscripcionesRepository.save(inscripcion4);

                Inscripcion inscripcion5 = new Inscripcion();
                inscripcion5.setIdInscripcion(null); // Se generará automáticamente
                inscripcion5.setInscripcionRol("Con Rol");
                inscripcion5.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion5.setIdRol(5L);
                inscripcion5.setIdUsuario(2L);
                inscripcion5.setIdPersona(5L);
                inscripcion5.setIdAdministrador(2L);
                inscripcionesRepository.save(inscripcion5);

                Inscripcion inscripcion6 = new Inscripcion();
                inscripcion6.setIdInscripcion(null); // Se generará automáticamente
                inscripcion6.setInscripcionRol("Con Rol");
                inscripcion6.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion6.setIdRol(6L);
                inscripcion6.setIdUsuario(6L);
                inscripcion6.setIdPersona(6L);
                inscripcion6.setIdAdministrativo(2L);
                inscripcionesRepository.save(inscripcion6);

                Inscripcion inscripcion7 = new Inscripcion();
                inscripcion7.setIdInscripcion(null); // Se generará automáticamente
                inscripcion7.setInscripcionRol("Con Rol");
                inscripcion7.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion7.setIdRol(7L);
                inscripcion7.setIdUsuario(7L);
                inscripcion7.setIdPersona(7L);
                inscripcion7.setIdEstudiante(1L);
                inscripcionesRepository.save(inscripcion7);

                Inscripcion inscripcion8 = new Inscripcion();
                inscripcion8.setIdInscripcion(null); // Se generará automáticamente
                inscripcion8.setInscripcionRol("Con Rol");
                inscripcion8.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion8.setIdRol(8L);
                inscripcion8.setIdUsuario(8L);
                inscripcion8.setIdPersona(8L);
                inscripcion8.setIdDocente(2L);
                inscripcionesRepository.save(inscripcion8);

                Inscripcion inscripcion9 = new Inscripcion();
                inscripcion9.setIdInscripcion(null); // Se generará automáticamente
                inscripcion9.setInscripcionRol("Con Rol");
                inscripcion9.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion9.setIdRol(9L);
                inscripcion9.setIdUsuario(3L);
                inscripcion9.setIdPersona(9L);
                inscripcion9.setIdAdministrador(3L);
                inscripcionesRepository.save(inscripcion9);

                Inscripcion inscripcion10 = new Inscripcion();
                inscripcion10.setIdInscripcion(null); // Se generará automáticamente
                inscripcion10.setInscripcionRol("Con Rol");
                inscripcion10.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion10.setIdRol(10L);
                inscripcion10.setIdUsuario(10L);
                inscripcion10.setIdPersona(10L);
                inscripcion10.setIdAdministrativo(3L);
                inscripcionesRepository.save(inscripcion10);

                Inscripcion inscripcion11 = new Inscripcion();
                inscripcion11.setIdInscripcion(null); // Se generará automáticamente
                inscripcion11.setInscripcionRol("Con Rol");
                inscripcion11.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion11.setIdRol(11L);
                inscripcion11.setIdUsuario(11L);
                inscripcion11.setIdPersona(11L);
                inscripcion11.setIdEstudiante(3L);
                inscripcionesRepository.save(inscripcion11);

                Inscripcion inscripcion12 = new Inscripcion();
                inscripcion12.setIdInscripcion(null); // Se generará automáticamente
                inscripcion12.setInscripcionRol("Con Rol");
                inscripcion12.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion12.setIdRol(12L);
                inscripcion12.setIdUsuario(12L);
                inscripcion12.setIdPersona(12L);
                inscripcion12.setIdDocente(3L);
                inscripcionesRepository.save(inscripcion12);

                Inscripcion inscripcion13 = new Inscripcion();
                inscripcion13.setIdInscripcion(null); // Se generará automáticamente
                inscripcion13.setInscripcionRol("Con Rol");
                inscripcion13.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion13.setIdRol(13L);
                inscripcion13.setIdUsuario(13L);
                inscripcion13.setIdPersona(13L);
                inscripcion13.setIdAdministrador(4L);
                inscripcionesRepository.save(inscripcion13);

                Inscripcion inscripcion14 = new Inscripcion();
                inscripcion14.setIdInscripcion(null); // Se generará automáticamente
                inscripcion14.setInscripcionRol("Con Rol");
                inscripcion14.setFechaCreacionInscripcion(LocalDateTime.now());
                inscripcion14.setIdRol(14L);
                inscripcion14.setIdUsuario(14L);
                inscripcion14.setIdPersona(14L);
                inscripcion14.setIdAdministrativo(4L);
                inscripcionesRepository.save(inscripcion14);


                System.out.println("Datos predeterminados creados con éxito.");
            } else {
                System.out.println("Ya existen inscripciones en la base de datos. No se generarán datos predeterminados.");
            }

            // Verificar los datos guardados
            inscripcionesRepository.findAll().forEach(inscripcion -> {
                System.out.println("Inscripción en la base de datos: " + inscripcion);
            });
        };
    }
}