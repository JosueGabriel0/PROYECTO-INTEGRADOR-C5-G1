package upeu.edu.pe.msnivelesdeensenanza.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.msnivelesdeensenanza.entity.OpcionNivel;

import java.util.List;

@Repository
public interface OpcionNivelRepository extends JpaRepository<OpcionNivel, Long> {
    List<OpcionNivel> findByNivelEnsenanzaIdNivelEnsenanza(Long nivelId);
    List<OpcionNivel> findByIdCarreraIn(List<Long> carrerasIds);
}
