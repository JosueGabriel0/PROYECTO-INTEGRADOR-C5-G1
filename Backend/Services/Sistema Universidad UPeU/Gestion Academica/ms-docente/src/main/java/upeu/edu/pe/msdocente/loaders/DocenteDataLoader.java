package upeu.edu.pe.msdocente.loaders;

import upeu.edu.pe.msdocente.entity.Docente;
import upeu.edu.pe.msdocente.entity.EstadoLaboral;
import upeu.edu.pe.msdocente.entity.RegistroLaboral;
import upeu.edu.pe.msdocente.entity.TipoDocente;
import upeu.edu.pe.msdocente.repository.DocenteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DocenteDataLoader implements CommandLineRunner {

    private final DocenteRepository docenteRepository;

    public DocenteDataLoader(DocenteRepository docenteRepository) {
        this.docenteRepository = docenteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existen docentes en la base de datos
        if (docenteRepository.count() == 0) {
            // Crear docente 1
            Docente docente1 = new Docente();
            docente1.setDepartamento("Ingeniería");
            docente1.setTituloAcatemico("MSc. en Ingeniería de Sistemas");
            docente1.setEspecialidad("Programación");
            docente1.setCursosImpartidos(Arrays.asList("Matemáticas Básicas"));
            docente1.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente1.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente1.setFechaContratacion(LocalDate.of(2020, 1, 10));
            docente1.setTipoContrato("Indefinido");
            docente1.setSalario("S/ 3000");
            docente1.setHorario("Lunes a Viernes 8am - 4pm");
            docente1.setPublicacionesAcademicas(Arrays.asList("Artículo sobre IA", "Libro de Programación"));
            docente1.setProyectosInvestigacion(Arrays.asList("Proyecto de Innovación", "Desarrollo de Software"));
            docente1.setNumeroOficina("A-203");
            docente1.setExtensionTelefonica("123");
            docente1.setSupervisor("Dr. Carlos Gómez");
            docente1.setLogrosAcademicos(Arrays.asList("Mejor Docente 2021", "Reconocimiento a la Innovación"));
            docente1.setFechaJubilacion(null); // No está jubilado
            docente1.setCursos(Arrays.asList(1L, 2L)); // IDs de cursos de ejemplo
            docente1.setIdPersona(3L);

            docenteRepository.save(docente1);

            docente1.setHistorialLaboral(createHistorialLaboral(docente1));
            docenteRepository.save(docente1);

            System.out.println("Docente 1 cargado con su historial laboral.");

            // Crear docente 2
            Docente docente2 = new Docente();
            docente2.setDepartamento("Ciencias Sociales");
            docente2.setTituloAcatemico("PhD en Psicología");
            docente2.setEspecialidad("Psicología Educativa");
            docente2.setCursosImpartidos(Arrays.asList("Introducción a la Programación"));
            docente2.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente2.setTipoDocente(TipoDocente.MEDIO_TIEMPO);
            docente2.setFechaContratacion(LocalDate.of(2021, 8, 1));
            docente2.setTipoContrato("Temporal");
            docente2.setSalario("S/ 2000");
            docente2.setHorario("Lunes y Miércoles 2pm - 6pm");
            docente2.setPublicacionesAcademicas(Arrays.asList("Estudio sobre Aprendizaje", "Investigación en Educación"));
            docente2.setProyectosInvestigacion(Arrays.asList("Proyecto Educativo 1"));
            docente2.setNumeroOficina("B-104");
            docente2.setExtensionTelefonica("456");
            docente2.setSupervisor("Dr. Ana Torres");
            docente2.setLogrosAcademicos(Arrays.asList("Premio a la Excelencia 2022"));
            docente2.setFechaJubilacion(null); // No está jubilado
            docente2.setCursos(Arrays.asList(1L, 2L)); // IDs de cursos de ejemplo
            docente2.setIdPersona(6L);

            docenteRepository.save(docente2);

            docente2.setHistorialLaboral(createHistorialLaboral(docente2));
            docenteRepository.save(docente2);

            System.out.println("Docente 2 cargado con su historial laboral.");

            // Crear docente 3
            Docente docente3 = new Docente();
            docente3.setDepartamento("Ciencias de la Computación");
            docente3.setTituloAcatemico("PhD en Ciencias de la Computación");
            docente3.setEspecialidad("Inteligencia Artificial");
            docente3.setCursosImpartidos(Arrays.asList("Inglés Intermedio"));
            docente3.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente3.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente3.setFechaContratacion(LocalDate.of(2018, 9, 1));
            docente3.setTipoContrato("Indefinido");
            docente3.setSalario("S/ 4000");
            docente3.setHorario("Lunes a Viernes 9am - 5pm");
            docente3.setPublicacionesAcademicas(Arrays.asList("Artículo sobre Deep Learning"));
            docente3.setProyectosInvestigacion(Arrays.asList("Proyecto de IA"));
            docente3.setNumeroOficina("C-105");
            docente3.setExtensionTelefonica("789");
            docente3.setSupervisor("Dr. Luis Pérez");
            docente3.setLogrosAcademicos(Arrays.asList("Investigador del Año 2021"));
            docente3.setFechaJubilacion(null);
            docente3.setCursos(Arrays.asList(301L, 302L));
            docente3.setIdPersona(7L);

            docenteRepository.save(docente3);

            docente3.setHistorialLaboral(createHistorialLaboral(docente3));
            docenteRepository.save(docente3);

            System.out.println("Docente 3 cargado con su historial laboral.");

// Crear docente 4
            Docente docente4 = new Docente();
            docente4.setDepartamento("Matemáticas");
            docente4.setTituloAcatemico("MSc. en Matemáticas Aplicadas");
            docente4.setEspecialidad("Estadística");
            docente4.setCursosImpartidos(Arrays.asList("Cálculo Diferencial"));
            docente4.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente4.setTipoDocente(TipoDocente.MEDIO_TIEMPO);
            docente4.setFechaContratacion(LocalDate.of(2017, 2, 15));
            docente4.setTipoContrato("Temporal");
            docente4.setSalario("S/ 2500");
            docente4.setHorario("Martes y Jueves 10am - 1pm");
            docente4.setPublicacionesAcademicas(Arrays.asList("Investigación en Estadística"));
            docente4.setProyectosInvestigacion(Arrays.asList("Análisis de Datos"));
            docente4.setNumeroOficina("D-102");
            docente4.setExtensionTelefonica("321");
            docente4.setSupervisor("Dr. Ana Ruiz");
            docente4.setLogrosAcademicos(Arrays.asList("Mejor Proyecto de Investigación 2022"));
            docente4.setFechaJubilacion(null);
            docente4.setCursos(Arrays.asList(401L, 402L));
            docente4.setIdPersona(8L);

            docenteRepository.save(docente4);

            docente4.setHistorialLaboral(createHistorialLaboral(docente4));
            docenteRepository.save(docente4);

            System.out.println("Docente 4 cargado con su historial laboral.");

// Crear docente 5
            Docente docente5 = new Docente();
            docente5.setDepartamento("Física");
            docente5.setTituloAcatemico("MSc. en Física Teórica");
            docente5.setEspecialidad("Mecánica Cuántica");
            docente5.setCursosImpartidos(Arrays.asList("Álgebra Lineal"));
            docente5.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente5.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente5.setFechaContratacion(LocalDate.of(2016, 5, 20));
            docente5.setTipoContrato("Indefinido");
            docente5.setSalario("S/ 3500");
            docente5.setHorario("Lunes, Miércoles y Viernes 1pm - 4pm");
            docente5.setPublicacionesAcademicas(Arrays.asList("Teoría Cuántica en la Educación"));
            docente5.setProyectosInvestigacion(Arrays.asList("Experimentos en Física Cuántica"));
            docente5.setNumeroOficina("E-201");
            docente5.setExtensionTelefonica("654");
            docente5.setSupervisor("Dr. Miguel Hernández");
            docente5.setLogrosAcademicos(Arrays.asList("Premio Nacional de Física 2021"));
            docente5.setFechaJubilacion(null);
            docente5.setCursos(Arrays.asList(501L, 502L));
            docente5.setIdPersona(9L);

            docenteRepository.save(docente5);

            docente5.setHistorialLaboral(createHistorialLaboral(docente5));
            docenteRepository.save(docente5);

            System.out.println("Docente 5 cargado con su historial laboral.");

// Crear docente 6
            Docente docente6 = new Docente();
            docente6.setDepartamento("Biología");
            docente6.setTituloAcatemico("MSc. en Biología Molecular");
            docente6.setEspecialidad("Genética");
            docente6.setCursosImpartidos(Arrays.asList("Estructura de Datos"));
            docente6.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente6.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente6.setFechaContratacion(LocalDate.of(2019, 3, 1));
            docente6.setTipoContrato("Indefinido");
            docente6.setSalario("S/ 3700");
            docente6.setHorario("Lunes a Jueves 9am - 3pm");
            docente6.setPublicacionesAcademicas(Arrays.asList("Genética en el Aula"));
            docente6.setProyectosInvestigacion(Arrays.asList("Investigaciones Genéticas"));
            docente6.setNumeroOficina("F-303");
            docente6.setExtensionTelefonica("987");
            docente6.setSupervisor("Dra. Paula Soto");
            docente6.setLogrosAcademicos(Arrays.asList("Investigadora del Año 2020"));
            docente6.setFechaJubilacion(null);
            docente6.setCursos(Arrays.asList(601L, 602L));
            docente6.setIdPersona(10L);

            docenteRepository.save(docente6);

            docente6.setHistorialLaboral(createHistorialLaboral(docente6));
            docenteRepository.save(docente6);

            System.out.println("Docente 6 cargado con su historial laboral.");

// Crear docente 7
            Docente docente7 = new Docente();
            docente7.setDepartamento("Química");
            docente7.setTituloAcatemico("MSc. en Química Orgánica");
            docente7.setEspecialidad("Química Analítica");
            docente7.setCursosImpartidos(Arrays.asList("Sistemas Operativos"));
            docente7.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente7.setTipoDocente(TipoDocente.MEDIO_TIEMPO);
            docente7.setFechaContratacion(LocalDate.of(2020, 1, 1));
            docente7.setTipoContrato("Temporal");
            docente7.setSalario("S/ 2300");
            docente7.setHorario("Martes y Jueves 3pm - 6pm");
            docente7.setPublicacionesAcademicas(Arrays.asList("Métodos de Análisis Químico"));
            docente7.setProyectosInvestigacion(Arrays.asList("Desarrollo de Técnicas Químicas"));
            docente7.setNumeroOficina("G-102");
            docente7.setExtensionTelefonica("258");
            docente7.setSupervisor("Dr. Javier Lima");
            docente7.setLogrosAcademicos(Arrays.asList("Mejor Investigación 2021"));
            docente7.setFechaJubilacion(null);
            docente7.setCursos(Arrays.asList(701L, 702L));
            docente7.setIdPersona(11L);

            docenteRepository.save(docente7);

            docente7.setHistorialLaboral(createHistorialLaboral(docente7));
            docenteRepository.save(docente7);

            System.out.println("Docente 7 cargado con su historial laboral.");

// Crear docente 8
            Docente docente8 = new Docente();
            docente8.setDepartamento("Historia");
            docente8.setTituloAcatemico("MSc. en Historia Contemporánea");
            docente8.setEspecialidad("Historia Política");
            docente8.setCursosImpartidos(Arrays.asList("Redes de Computadoras"));
            docente8.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente8.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente8.setFechaContratacion(LocalDate.of(2018, 8, 15));
            docente8.setTipoContrato("Indefinido");
            docente8.setSalario("S/ 3200");
            docente8.setHorario("Lunes, Miércoles y Viernes 10am - 1pm");
            docente8.setPublicacionesAcademicas(Arrays.asList("Historia de las Revoluciones"));
            docente8.setProyectosInvestigacion(Arrays.asList("Proyecto de Historia Política"));
            docente8.setNumeroOficina("H-201");
            docente8.setExtensionTelefonica("369");
            docente8.setSupervisor("Dra. María Fernández");
            docente8.setLogrosAcademicos(Arrays.asList("Premio a la Investigación Histórica 2022"));
            docente8.setFechaJubilacion(null);
            docente8.setCursos(Arrays.asList(801L, 802L));
            docente8.setIdPersona(12L);

            docenteRepository.save(docente8);

            docente8.setHistorialLaboral(createHistorialLaboral(docente8));
            docenteRepository.save(docente8);

            System.out.println("Docente 14 cargado con su historial laboral.");

// Crear docente 9
            Docente docente9 = new Docente();
            docente9.setDepartamento("Literatura");
            docente9.setTituloAcatemico("MSc. en Literatura Hispanoamericana");
            docente9.setEspecialidad("Narrativa");
            docente9.setCursosImpartidos(Arrays.asList("Inteligencia Artificial"));
            docente9.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente9.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente9.setFechaContratacion(LocalDate.of(2017, 4, 5));
            docente9.setTipoContrato("Indefinido");
            docente9.setSalario("S/ 3100");
            docente9.setHorario("Lunes y Jueves 11am - 2pm");
            docente9.setPublicacionesAcademicas(Arrays.asList("Literatura y Sociedad"));
            docente9.setProyectosInvestigacion(Arrays.asList("Análisis de Narrativa Contemporánea"));
            docente9.setNumeroOficina("I-301");
            docente9.setExtensionTelefonica("852");
            docente9.setSupervisor("Dra. Laura Ruiz");
            docente9.setLogrosAcademicos(Arrays.asList("Reconocimiento a la Excelencia Académica 2021"));
            docente9.setFechaJubilacion(null);
            docente9.setCursos(Arrays.asList(901L, 902L));
            docente9.setIdPersona(13L);

            docenteRepository.save(docente9);

            docente9.setHistorialLaboral(createHistorialLaboral(docente9));
            docenteRepository.save(docente9);

            System.out.println("Docente 9 cargado con su historial laboral.");

// Crear docente 10
            Docente docente10 = new Docente();
            docente10.setDepartamento("Filosofía");
            docente10.setTituloAcatemico("MSc. en Filosofía Contemporánea");
            docente10.setEspecialidad("Ética");
            docente10.setCursosImpartidos(Arrays.asList("Introducción a la Economía"));
            docente10.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente10.setTipoDocente(TipoDocente.MEDIO_TIEMPO);
            docente10.setFechaContratacion(LocalDate.of(2019, 7, 10));
            docente10.setTipoContrato("Temporal");
            docente10.setSalario("S/ 2200");
            docente10.setHorario("Martes y Miércoles 4pm - 7pm");
            docente10.setPublicacionesAcademicas(Arrays.asList("Ética en la Sociedad Actual"));
            docente10.setProyectosInvestigacion(Arrays.asList("Estudio sobre Moralidad"));
            docente10.setNumeroOficina("J-203");
            docente10.setExtensionTelefonica("963");
            docente10.setSupervisor("Dr. Esteban Gómez");
            docente10.setLogrosAcademicos(Arrays.asList("Mejor Tesis de Maestría 2020"));
            docente10.setFechaJubilacion(null);
            docente10.setCursos(Arrays.asList(1001L, 1002L));
            docente10.setIdPersona(14L);

            docenteRepository.save(docente10);

            docente10.setHistorialLaboral(createHistorialLaboral(docente10));
            docenteRepository.save(docente10);

            System.out.println("Docente 10 cargado con su historial laboral.");

// Crear docente 11
            Docente docente11 = new Docente();
            docente11.setDepartamento("Derecho");
            docente11.setTituloAcatemico("MSc. en Derecho Constitucional");
            docente11.setEspecialidad("Derecho Público");
            docente11.setCursosImpartidos(Arrays.asList("Contabilidad Financiera"));
            docente11.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente11.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente11.setFechaContratacion(LocalDate.of(2015, 9, 1));
            docente11.setTipoContrato("Indefinido");
            docente11.setSalario("S/ 4000");
            docente11.setHorario("Lunes, Miércoles y Viernes 8am - 11am");
            docente11.setPublicacionesAcademicas(Arrays.asList("Derecho y Democracia"));
            docente11.setProyectosInvestigacion(Arrays.asList("Investigación en Derecho Constitucional"));
            docente11.setNumeroOficina("K-101");
            docente11.setExtensionTelefonica("741");
            docente11.setSupervisor("Dr. Roberto Lima");
            docente11.setLogrosAcademicos(Arrays.asList("Premio a la Excelencia Legal 2019"));
            docente11.setFechaJubilacion(null);
            docente11.setCursos(Arrays.asList(1101L, 1102L));
            docente11.setIdPersona(15L);

            docenteRepository.save(docente11);

            docente11.setHistorialLaboral(createHistorialLaboral(docente11));
            docenteRepository.save(docente11);

            System.out.println("Docente 11 cargado con su historial laboral.");

// Crear docente 12
            Docente docente12 = new Docente();
            docente12.setDepartamento("Educación");
            docente12.setTituloAcatemico("MSc. en Educación");
            docente12.setEspecialidad("Didáctica");
            docente12.setCursosImpartidos(Arrays.asList("Gestión de Recursos Humanos"));
            docente12.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente12.setTipoDocente(TipoDocente.MEDIO_TIEMPO);
            docente12.setFechaContratacion(LocalDate.of(2020, 1, 15));
            docente12.setTipoContrato("Temporal");
            docente12.setSalario("S/ 2100");
            docente12.setHorario("Martes y Jueves 9am - 12pm");
            docente12.setPublicacionesAcademicas(Arrays.asList("Didáctica y Aprendizaje"));
            docente12.setProyectosInvestigacion(Arrays.asList("Innovación Educativa"));
            docente12.setNumeroOficina("L-304");
            docente12.setExtensionTelefonica("951");
            docente12.setSupervisor("Dra. Clara Martínez");
            docente12.setLogrosAcademicos(Arrays.asList("Reconocimiento a la Innovación Educativa 2021"));
            docente12.setFechaJubilacion(null);
            docente12.setCursos(Arrays.asList(1201L, 1202L));
            docente12.setIdPersona(16L);

            docenteRepository.save(docente12);

            docente12.setHistorialLaboral(createHistorialLaboral(docente12));
            docenteRepository.save(docente12);

            System.out.println("Docente 12 cargado con su historial laboral.");

// Crear docente 13
            Docente docente13 = new Docente();
            docente13.setDepartamento("Arquitectura");
            docente13.setTituloAcatemico("MSc. en Arquitectura");
            docente13.setEspecialidad("Diseño Urbano");
            docente13.setCursosImpartidos(Arrays.asList("Marketing Estratégico"));
            docente13.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente13.setTipoDocente(TipoDocente.TIEMPO_COMPLETO);
            docente13.setFechaContratacion(LocalDate.of(2018, 1, 1));
            docente13.setTipoContrato("Indefinido");
            docente13.setSalario("S/ 3800");
            docente13.setHorario("Lunes a Viernes 10am - 5pm");
            docente13.setPublicacionesAcademicas(Arrays.asList("Diseño y Ciudad"));
            docente13.setProyectosInvestigacion(Arrays.asList("Proyecto de Urbanismo"));
            docente13.setNumeroOficina("M-201");
            docente13.setExtensionTelefonica("258");
            docente13.setSupervisor("Arq. Jorge Salas");
            docente13.setLogrosAcademicos(Arrays.asList("Premio Nacional de Arquitectura 2020"));
            docente13.setFechaJubilacion(null);
            docente13.setCursos(Arrays.asList(1301L, 1302L));
            docente13.setIdPersona(17L);

            docenteRepository.save(docente13);

            docente13.setHistorialLaboral(createHistorialLaboral(docente13));
            docenteRepository.save(docente13);

            System.out.println("Docente 14 cargado con su historial laboral.");

// Crear docente 14
            Docente docente14 = new Docente();
            docente14.setDepartamento("Ingeniería Ambiental");
            docente14.setTituloAcatemico("MSc. en Ingeniería Ambiental");
            docente14.setEspecialidad("Sustentabilidad");
            docente14.setCursosImpartidos(Arrays.asList("Finanzas Corporativas"));
            docente14.setEstadoLaboral(EstadoLaboral.ACTIVO);
            docente14.setTipoDocente(TipoDocente.MEDIO_TIEMPO);
            docente14.setFechaContratacion(LocalDate.of(2022, 3, 1));
            docente14.setTipoContrato("Temporal");
            docente14.setSalario("S/ 2200");
            docente14.setHorario("Martes y Jueves 1pm - 4pm");
            docente14.setPublicacionesAcademicas(Arrays.asList("Sustentabilidad y Medio Ambiente"));
            docente14.setProyectosInvestigacion(Arrays.asList("Proyecto de Energía Renovable"));
            docente14.setNumeroOficina("N-304");
            docente14.setExtensionTelefonica("345");
            docente14.setSupervisor("Ing. Laura Gutiérrez");
            docente14.setLogrosAcademicos(Arrays.asList("Premio a la Investigación Ambiental 2022"));
            docente14.setFechaJubilacion(null);
            docente14.setCursos(Arrays.asList(1401L, 1402L));
            docente14.setIdPersona(18L);

            docenteRepository.save(docente14);

            docente14.setHistorialLaboral(createHistorialLaboral(docente14));
            docenteRepository.save(docente14);

            System.out.println("Docente 14 cargado con su historial laboral.");

            // Guardar docentes en la base de datos
            docenteRepository.saveAll(Arrays.asList(docente1, docente2, docente3, docente4, docente5, docente6, docente7, docente8, docente9, docente10, docente11, docente12, docente13, docente14));
            System.out.println("Docentes de ejemplo cargados en la base de datos.");
        } else {
            System.out.println("Los docentes ya están cargados en la base de datos.");
        }
    }

    private List<RegistroLaboral> createHistorialLaboral(Docente docente) {
        // Crear historial laboral de ejemplo para cada docente
        List<RegistroLaboral> historialLaboral = new ArrayList<>();

        // Ejemplo para Docente 1
        if (docente.getIdDocente() == 1) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Asistente de Investigación");
            registro1.setDepartamento("Investigación");
            registro1.setFechaInicio(LocalDate.of(2019, 1, 1));
            registro1.setFechaFin(LocalDate.of(2020, 12, 31));
            registro1.setDescripcion("Asistente en proyectos de investigación sobre tecnología educativa.");
            historialLaboral.add(registro1);

            RegistroLaboral registro2 = new RegistroLaboral();
            registro2.setDocente(docente);
            registro2.setPuesto("Docente Universitario");
            registro2.setDepartamento("Ingeniería");
            registro2.setFechaInicio(LocalDate.of(2020, 1, 10));
            registro2.setFechaFin(null); // Actualmente empleado
            registro2.setDescripcion("Docente a tiempo completo en el área de ingeniería de sistemas.");
            historialLaboral.add(registro2);
        }
        // Ejemplo para Docente 2
        else if (docente.getIdDocente() == 2) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Profesor Asociado");
            registro1.setDepartamento("Ciencias Sociales");
            registro1.setFechaInicio(LocalDate.of(2015, 3, 1));
            registro1.setFechaFin(LocalDate.of(2018, 6, 30));
            registro1.setDescripcion("Impartiendo cursos de Sociología y Antropología.");
            historialLaboral.add(registro1);

            RegistroLaboral registro2 = new RegistroLaboral();
            registro2.setDocente(docente);
            registro2.setPuesto("Coordinador Académico");
            registro2.setDepartamento("Ciencias Sociales");
            registro2.setFechaInicio(LocalDate.of(2018, 7, 1));
            registro2.setFechaFin(null); // Actualmente empleado
            registro2.setDescripcion("Responsable de la coordinación de programas académicos.");
            historialLaboral.add(registro2);
        }
        // Ejemplo para Docente 3
        else if (docente.getIdDocente() == 3) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Profesor Titular");
            registro1.setDepartamento("Matemáticas");
            registro1.setFechaInicio(LocalDate.of(2010, 1, 1));
            registro1.setFechaFin(LocalDate.of(2015, 12, 31));
            registro1.setDescripcion("Docente titular en el área de Matemáticas.");
            historialLaboral.add(registro1);
        }
        // Continúa para los demás docentes
        else if (docente.getIdDocente() == 4) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Química");
            registro1.setDepartamento("Ciencias Naturales");
            registro1.setFechaInicio(LocalDate.of(2015, 5, 15));
            registro1.setFechaFin(LocalDate.of(2020, 3, 30));
            registro1.setDescripcion("Impartiendo cursos de Química General.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 5) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Profesor de Física");
            registro1.setDepartamento("Ciencias Naturales");
            registro1.setFechaInicio(LocalDate.of(2012, 1, 1));
            registro1.setFechaFin(LocalDate.of(2019, 12, 31));
            registro1.setDescripcion("Impartiendo cursos de Física General.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 6) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Historia");
            registro1.setDepartamento("Humanidades");
            registro1.setFechaInicio(LocalDate.of(2016, 8, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Historia Contemporánea.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 7) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Filosofía");
            registro1.setDepartamento("Humanidades");
            registro1.setFechaInicio(LocalDate.of(2014, 9, 1));
            registro1.setFechaFin(LocalDate.of(2021, 6, 30));
            registro1.setDescripcion("Impartiendo cursos de Filosofía Moderna.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 8) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Profesor de Literatura");
            registro1.setDepartamento("Humanidades");
            registro1.setFechaInicio(LocalDate.of(2013, 10, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Literatura Comparada.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 9) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Biología");
            registro1.setDepartamento("Ciencias Naturales");
            registro1.setFechaInicio(LocalDate.of(2017, 1, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Biología General.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 10) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Profesor de Geografía");
            registro1.setDepartamento("Ciencias Sociales");
            registro1.setFechaInicio(LocalDate.of(2011, 4, 1));
            registro1.setFechaFin(LocalDate.of(2016, 12, 31));
            registro1.setDescripcion("Impartiendo cursos de Geografía Humana.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 11) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Arte");
            registro1.setDepartamento("Arte y Diseño");
            registro1.setFechaInicio(LocalDate.of(2018, 2, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Historia del Arte.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 12) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Música");
            registro1.setDepartamento("Arte y Diseño");
            registro1.setFechaInicio(LocalDate.of(2019, 1, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Música y Teoría Musical.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 13) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Profesor de Ciencias de la Computación");
            registro1.setDepartamento("Ingeniería");
            registro1.setFechaInicio(LocalDate.of(2020, 8, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Programación y Algoritmos.");
            historialLaboral.add(registro1);
        }
        else if (docente.getIdDocente() == 14) {
            RegistroLaboral registro1 = new RegistroLaboral();
            registro1.setDocente(docente);
            registro1.setPuesto("Docente de Idiomas");
            registro1.setDepartamento("Humanidades");
            registro1.setFechaInicio(LocalDate.of(2016, 6, 1));
            registro1.setFechaFin(null); // Actualmente empleado
            registro1.setDescripcion("Impartiendo cursos de Inglés y Español.");
            historialLaboral.add(registro1);
        }

        return historialLaboral;
    }

}
