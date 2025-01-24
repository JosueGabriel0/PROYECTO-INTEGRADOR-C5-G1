package upeu.edu.pe.msnivelesdeensenanza.service;

import upeu.edu.pe.msnivelesdeensenanza.entity.OpcionNivel;

import java.util.List;

public interface OpcionNivelService {
    public List<OpcionNivel> obtenerOpcionesPorNivel(Long nivelId);
    public List<OpcionNivel> listarTodos();
    public OpcionNivel obtenerPorId(Long id);
    public OpcionNivel crear(OpcionNivel opcionNivel);
    public OpcionNivel actualizar(OpcionNivel opcionNivel);
    public void eliminar(Long id);
    public List<OpcionNivel> listarOpcionesPorCarreras(List<Long> carrerasIds);
}
