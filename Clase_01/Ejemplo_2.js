/*function suma (a,b){
    return a+b;
}*/

// const suma = (a,b) => a+b;
// const suma = (a,b) => 

//const suma =  (a,b) => a+b;

/*const suma =  (a,b) => {
    return a+b
}

console.log(suma(4,7));
*/


// -------------------------------------------
// Ejemplo 3. Template literal

// Primer método
/*
const nombre = "José";
const apellido = "Hernandez"

console.log("Hola " + nombre + " " + apellido + " es un placer conocerteeeee")
*/

//Segundo método
/*
const getName = (nombre) => "José";
const getLastName = (apellido) => "Figueroa";  // Corregí el nombre de la función
const nombre = getName();
const apellido = getLastName();

console.log(`hola ${nombre} ${apellido} es un placer conocerte`);
*/

// ______________________________________________
// Clases
class viaje{
    constructor (destino, origen, duracion){
        this.destino = destino;
        this.origen = origen;
        this.duracion = duracion;
    }

    getInfo(){
        console.log(`
            Origen: ${this.origen}
            Destino: ${this.destino}
            Duración: ${this.duracion} min `)
    }

    getCost(){
        console.log(`El costo del viaje ${this.duracion*35} MXN`)
    }
}
const viaje1 = new viaje("Guadalajara", "CDMX", "60")

viaje1.getCost();
viaje1.getInfo();

class usuario{
    constructor (nombre, apellido, correo, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.password = password;
    }

    getInfo(){
        console.log(`
            Nombre: ${this.nombre}
            Apellido: ${this.apellido}
            Correo: ${this.correo} 
            Password: ${this.password} `)
    }
    
}