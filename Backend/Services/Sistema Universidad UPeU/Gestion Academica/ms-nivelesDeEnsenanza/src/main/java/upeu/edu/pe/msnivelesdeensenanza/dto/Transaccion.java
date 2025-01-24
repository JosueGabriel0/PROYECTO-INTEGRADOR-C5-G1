package upeu.edu.pe.msnivelesdeensenanza.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Transaccion {
    private Long id;

    private Pago pago;

    private String estadoTransaccion; // Completado, En proceso, Fallido, etc.
    private LocalDateTime fechaTransaccion;

    // Getters y setters
}