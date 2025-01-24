package upeu.edu.pe.msnivelesdeensenanza.repository;

import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.msnivelesdeensenanza.entity.NivelEnsenanza;

import java.util.Optional;

@Repository
public interface NivelEnsenanzaRepository extends JpaRepository<NivelEnsenanza, Long> {
    Optional<NivelEnsenanza> findByNombre(String nombre);

    @Query("SELECT n FROM NivelEnsenanza n JOIN n.opcionesNivel o WHERE o.idOpcionNivel = :idOpcionNivel")
    NivelEnsenanza findNivelEnsenanzaByOpcionNivelId(@Param("idOpcionNivel") Long idOpcionNivel);
}