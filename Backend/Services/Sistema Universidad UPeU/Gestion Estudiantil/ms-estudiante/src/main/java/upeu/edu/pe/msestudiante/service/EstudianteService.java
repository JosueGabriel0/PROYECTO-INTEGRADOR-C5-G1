package upeu.edu.pe.msestudiante.service;

import upeu.edu.pe.msestudiante.entity.Estudiante;

import java.util.List;

public interface EstudianteService {

    public Estudiante guardarEstudiante(Estudiante Estudiante);

    public List<Estudiante> listarEstudiante();

    public Estudiante buscarEstudiantePorId(Long id);

    public Estudiante editarEstudiante(Estudiante Estudiante);

    public void eliminarEstudiante(Long id);

    public Estudiante buscarPorCuentaFinanciera(Long id);

    public Estudiante actualizarCodigo(Long idEstudiante, String codigo);
}
