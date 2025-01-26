package upeu.edu.pe.msestudiante.service;

import upeu.edu.pe.msestudiante.entity.ResponsableFinanciero;

import java.util.List;

public interface ResponsableFinancieroService {
    public ResponsableFinanciero guardarResponsableFinanciero(ResponsableFinanciero responsableFinanciero);

    public List<ResponsableFinanciero> listarResponsablesFinancieros();

    public ResponsableFinanciero buscarResponsableFinancieroPorId(Long id);

    public ResponsableFinanciero editarResponsableFinanciero(ResponsableFinanciero responsableFinanciero);

    public void eliminarEstudiante(Long id);

    public ResponsableFinanciero guardarResponsableFinancieroParaEstudiante(Long idEstudiante, ResponsableFinanciero responsableFinanciero);
}