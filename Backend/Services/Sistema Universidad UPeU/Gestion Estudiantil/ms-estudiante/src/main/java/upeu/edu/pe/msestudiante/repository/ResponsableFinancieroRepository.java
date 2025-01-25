package upeu.edu.pe.msestudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.msestudiante.entity.ResponsableFinanciero;

@Repository
public interface ResponsableFinancieroRepository extends JpaRepository<ResponsableFinanciero, Long> {
}