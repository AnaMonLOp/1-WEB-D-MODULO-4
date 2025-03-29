// Array para guardar los destinos
const destinos = [];

// Función para registrar un destino de viaje
class Viaje{
    constructor(destino, fecha, transporte){
        this.destino = destino;
        this.fecha = fecha;
        this.transporte = transporte;
        this.costo = this.calcularCosto();
    }

    calcularCosto(){
        let costoBase = 0;
        if (this.destino === "Paris") {
            costoBase = 500;
        }
        else if (this.destino === "Londres") {
            costoBase = 400;
        } 
        else if (this.destino === "New York") {
            costoBase = 600;
        }
    
        // Costo adicional por tipo de transporte
        if (this.transporte === "Avión") {
            costoBase += 200;
        }
        else if (this.transporte === "Tren") {
            costoBase += 100;
        }

        return costoBase;
    }
}

export const registrarDestino = (destino, fecha, transporte) => {
    const nuevoViaje = new Viaje(destino, fecha, transporte);
    destinos.push(nuevoViaje);
}

// Función para mostrar el itinerario de los viajes registrados
export const mostrarItinerario = () => {
    console.log("Itinerario de Viajes");
    destinos.forEach((viaje,index) => {

        console.log(`Viaje #${index + 1}`);
        console.log(`Destino: ${viaje.destino}`);
        console.log(`Fecha: ${viaje.fecha}`);
        console.log(`Transporte: ${viaje.transporte}`);
        console.log(`Costo: $${viaje.costo}`);
        console.log('----------------------------');
    });

    if(destinos.length === 0){
        console.log("No hay viajes registrados.");
    }
} 