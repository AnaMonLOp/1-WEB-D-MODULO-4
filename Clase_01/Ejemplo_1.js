/*var nombre = "Juan Perez";

function mostrarNombre(){
    console.log(nombre);
}

mostrarNombre()*/


/*const nombre = "Juan perez";
nombre = "Tommy";
const mostrarNombre = function(){
    console.log(nombre)
}

mostrarNombre();
*/


// Muestra de la variable let 
/*let nombre = "Tommy";
nombre ="José Alberto"
function mostrarNombre (){
    let nombre_funcion = "Carranza"
    console.log(nombre)
}
console.log(nombre_funcion);
mostrarNombre();
*/

//hoisting -> es como si existiera una variable pero no esta declarada aún
console.log(pais);
var pais="México";
console.log(pais);

//Ejercio ...

function pruebaVar() {
    let ciudad = "Madrid"; //Aquí lo declaramos
    if (true) {
        console.log(ciudad); //Y ya se puede aquí
    }
    console.log(ciudad); // Y aquí :)
}

pruebaVar();