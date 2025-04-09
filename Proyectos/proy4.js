// Proyecto 4. Algoritmo de Los 2 Punteros

//const invitados = ["Ana", "Carlos", "Kecilia", "Daniel", "Tiana", "Eduardo"];
const invitados = ["Ana", "Carlos", "Kecilia", "Daniel", "Diana", "Eduardo"];

function encontrarPareja(arr) {
    let inicio = 0;
    let siguiente = 1;
    let parejas = [];

    while (siguiente < arr.length) {
        if (arr[siguiente][0] === arr[inicio][0]){
            parejas.push(arr[inicio], arr[siguiente]);
            return parejas;
        }
        inicio ++;
        siguiente++;
    }

    return null; // Si no se encuentra ningún par
}

console.log(encontrarPareja(invitados));
// Resultado: ["Carlos", "Cecilia"]
