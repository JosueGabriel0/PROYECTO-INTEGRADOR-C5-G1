package upeu.edu.pe.mspagos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.mspagos.entity.*;
import upeu.edu.pe.mspagos.service.PagoService;
import upeu.edu.pe.mspagos.service.PdfService;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/pago")
public class PagoController {
    @Autowired
    private PagoService pagoService;

    @Autowired
    private PdfService pdfService;

    @GetMapping("/pdf/{fileName}")
    public ResponseEntity<FileSystemResource> getPdf(@PathVariable String fileName) {
        // Define el directorio donde están los archivos
        String directorio = "src/main/resources/static";

        // Crea la ruta completa del archivo
        File archivo = new File(directorio, fileName);

        // Verifica si el archivo existe
        if (archivo.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archivo.getName() + "\"")
                    .body(new FileSystemResource(archivo));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/boleta")
    public ResponseEntity<PagoBoletaRequest> crearPagoConBoleta(@RequestBody PagoBoletaRequest pagoBoletaRequest) {
        try {
            PagoBoletaRequest response = pagoService.crearPagoConBoleta(pagoBoletaRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/factura")
    public ResponseEntity<PagoFacturaRequest> crearPagoConFactura(@RequestBody PagoFacturaRequest pagoFacturaRequest) {
        try {
            PagoFacturaRequest response = pagoService.crearPagoConFactura(pagoFacturaRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/pagoConComprobante/{idPago}")
    public ResponseEntity<PagoRequest> actualizarPagoConComprobante(
            @PathVariable Long idPago,
            @RequestBody PagoRequest pagoRequest) {
        try {
            PagoRequest response = pagoService.actualizarPagoConComprobante(idPago, pagoRequest);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Pago> guardarPagoResponseEntity(@RequestBody Pago pago){
        return ResponseEntity.ok(pagoService.guardarPago(pago));
    }

    @GetMapping
    public ResponseEntity<List<Pago>> listarPagoResponseEntity(){
        return ResponseEntity.ok(pagoService.listarPago());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> buscarPagoPorIdResponseEntity(@PathVariable(required = true) Long id){
        return ResponseEntity.ok(pagoService.buscarPagoPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pago> editarPagoResponseEntity(@PathVariable (required = true) Long id,@RequestBody Pago pago){
        pago.setIdPago(id);
        return ResponseEntity.ok(pagoService.editarPago(pago));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> eliminarPago(@PathVariable Long id) {
        try {
            // Lógica para eliminar la Pago
            pagoService.eliminarPago(id);

            // Retornar código 200 OK con mensaje de éxito
            return ResponseEntity.ok("Pago eliminado exitosamente.");
        } catch (Exception e) {
            // En caso de error, retornar un código de error y mensaje apropiado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el Pago: " + e.getMessage());
        }
    }
}
