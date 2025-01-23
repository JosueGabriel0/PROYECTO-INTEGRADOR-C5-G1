package upeu.edu.pe.mscuentafinancierauniversitaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;

import java.time.LocalDate;

@Repository
public interface SaldoAFavorRepository extends JpaRepository<SaldoAFavor, Long> {
    public SaldoAFavor getSaldoAFavorByAnioSaldoAFavorBetween(LocalDate startDate, LocalDate endDate);
}
