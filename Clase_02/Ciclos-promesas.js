//Como destructurar un arreglo!
const destinos = ["Roma", "París", "Tokio"];

// indica que la destructuración será de arreglos
/*const [primero, segundo] = destinos;
console.log(primero);
console.log(segundo);*/

// Si quiero leer solamemte la tercera posición
const [,,tercer]=destinos
console.log(tercer);


//Cómo destructurar Objeto
const viaje={
    destino: "Londres",
    duracion : 300,
    precio: 1200
}

//Las llaves indican cuando es un objeto
const {duracion} = viaje;
console.log(duracion);

// ------------------------------------------------
/*       CICLOS        */
// Usamos el arreglo "destinos"

console.log("---------------")
for (let i=0; i<destinos.length; i++){
    console.log(destinos[i]);
}
console.log("---------------")
console.log("FOR OF ---- Para arreglos")
for(let destino of destinos){
    console.log(destino);
}

console.log("---------------")
console.log("FOR IN ---- Para objetos ")
for(let clave in viaje){
   // console.log(clave);
    /*Salida:   destino
                duracion
                precio
    */
   console.log(`${viaje[clave]}`);
   //Cada valor lo pinto en la UI o se lo inyecto a un html
   /* Salida:   Londres
                300
                1200
   */
}

console.log("---------------");
console.log("FOR EACH ");
//Son funciones que se le pueden pasar para ver cada elemento

function paraElForEach(elemento){
    console.log(elemento);
    /* Mandar Llamar a otra función*/
}

destinos.forEach(paraElForEach);

/*
for (let destino of destinos){
    console.log(destino);
}

setTimeout*/

// ------------------------------------------------
/*       PROMESAS        */
// Tres estados de una promesa : pending, fullfilled y rejected*/

console.log("---------------");
console.log("PROMESAS");

const obtenerDestino = (destino) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(destino){
                resolve(`Destino confirmado: ${destino}`);
            }
            else{
                reject("Error: No se especificio un destino")
            }
        }, 3000);
    });
}

function notificarUsuario(destino){
    console.log(destino);
}

function manejarError(error){
    console.log(error);
}

// Llamar a la promesa
obtenerDestino("Londres").then(notificarUsuario).catch(manejarError)
//then -> para cuando se resuelve
//catch -> Para cuando no se resuelve