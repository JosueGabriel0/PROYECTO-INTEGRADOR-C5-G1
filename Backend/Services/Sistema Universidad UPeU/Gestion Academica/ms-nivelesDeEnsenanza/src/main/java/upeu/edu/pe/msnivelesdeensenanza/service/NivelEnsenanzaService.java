package upeu.edu.pe.msnivelesdeensenanza.service;

import upeu.edu.pe.msnivelesdeensenanza.entity.NivelEnsenanza;

import java.util.List;

public interface NivelEnsenanzaService {
    public List<NivelEnsenanza> obtenerNiveles();
    public NivelEnsenanza obtenerPorId(Long id);
    public NivelEnsenanza crear(NivelEnsenanza nivelEnsenanza);
    public NivelEnsenanza actualizar(Long id, NivelEnsenanza nivelEnsenanzaActualizado);
    public void eliminar(Long id);
    public NivelEnsenanza obtenerNivelEnsenanzaPorIdOpcionNivel(Long idOpcionNivel);
}
