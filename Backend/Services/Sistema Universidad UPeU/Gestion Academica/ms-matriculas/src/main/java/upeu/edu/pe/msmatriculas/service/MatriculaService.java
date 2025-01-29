package upeu.edu.pe.msmatriculas.service;

import upeu.edu.pe.msmatriculas.entity.Matricula;

import java.util.List;

public interface MatriculaService {

    public Matricula crearMatricula(Matricula matricula);

    public Matricula obtenerMatriculaPorId(Long idMatricula);

    public List<Matricula> obtenerMatriculas();

    public Matricula actualizarMatricula(Matricula matricula);

    public void eliminarMatricula(Long idMatricula);

    public boolean validarEstudiante(Long idInscripcion);

    public Matricula buscarMatriculaPorIdEstudiante(Long idEstudiante);
}