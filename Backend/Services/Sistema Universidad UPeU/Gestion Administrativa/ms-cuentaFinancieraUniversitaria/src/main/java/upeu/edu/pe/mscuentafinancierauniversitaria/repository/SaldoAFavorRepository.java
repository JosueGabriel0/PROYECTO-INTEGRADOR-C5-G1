package upeu.edu.pe.mscuentafinancierauniversitaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SaldoAFavorRepository extends JpaRepository<SaldoAFavor, Long> {
    List<SaldoAFavor> findByCuentaFinancieraIdCuentaFinancieraAndFechaSaldoAFavorBetween(Long idCuentaFinanciera, LocalDate startDate, LocalDate endDate);
    List<SaldoAFavor> findByCuentaFinancieraIdCuentaFinanciera(Long cuentaFinanciera);
}
