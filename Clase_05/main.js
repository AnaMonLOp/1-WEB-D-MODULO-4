// ---------------- Recursividad -----------------------

/* 
Cuando usar recursividad: Usar cuando el problema se pueda dividir
                         que tenga un caso base! 
                         Super claro cuando debe de terminar la ejecución.
Cuando no usar la recursividad: Evitarla cuando el stack puede crecer demasiado 
                                (pila de llamadas).
*/

/*  Conteo regresivo    */ 
/*function timer(n){
    if( n === 0){
        console.log("¡Despegue!");
        return;
    }
    setTimeout(() =>{
        timer(n-1)
    }, 1000)
    console.log(n);
}

console.log(timer(5));
*/
/*  Suma    */
function sum(n){
    if(n===10) return 0;
    return n + sum ( n + 1 );
}

console.log(sum(5));

/*  Factorial   */
function factorial(n){
    if(n===0) return 1;
    return n*factorial(n-1);
}
console.log("Factorial: ", factorial(5));

// EJERCICIO: 
//Sumar dentro del array

console.log("---------Ejercicio 1 ----------");
const arrayN=[1,
                [2,3],
                [4,
                    [5],
                    [6,
                        [10,5]
                    ]
                ]
            ];

function sumArr(arr, iteracion){
    let sum=0;
    for(let item of arr){
        if(Array.isArray(item)){
            sum += sumArr(item, iteracion+1);
        }
        else {
            sum += item;
        }
    }
    console.log(`Subtarea ${iteracion}: ${sum}`);
    return sum;
}

console.log(sumArr(arrayN, 1));

/*
const arr = [1,2,3,4,5];
let left  =0;
let right = arr.length-1;
*/

function isPalindrome(str){
    // Deninir los dos punteros
    let left  =0;
    let right = str.length-1;

    while(left<right){
        if(str[left] !== str[right]) return false;

        left++;
        right--;
    }

    return true;
}

console.log("Es palindromo: ", isPalindrome(("anitalavalatina").replaceAll(" ", "")));

function tieneParconSuma(arr, target){
    let left = 0;
    let right = arr.length;

    while(left < right){
        const sum = arr[left] + arr[right];
        if(sum === target) return true;
        if(sum < target) left++;
        else right--;
    }
    return false;
}

const arreglo = [1,2,3,4,5,6];

console.log("Suma par arreglo: ", tieneParconSuma(arreglo, 6));

// Se usa en operacion de inversión, ordenamiento, busqueda.
// Set() -> evita duplicados

// Quitando duplicados utilizando doble punteros (arreglo de cadena, numeros)
function eliminarDuplicados(arr1){
    let puntero = 0;
    for(let i=1; i<arr1.length; i++){
        if (arr1[i] !== arr1[puntero]){
            puntero++;
            arr1[puntero] = arr1[i];
        }
    }
    return arr1.slice(0, puntero +1);  
    //Se usa para extraer una parte de un array o cadena de texto, sin modificar el original.
}

console.log("Elimina Duplicados: ",eliminarDuplicados([1, 1, 2, 2, 3, 4, 4]));


// Invertir una cadena!

function invertirCadena(str){
    let arr2 = str.split(""); //Covierte la cadena en un array
    let left  =0;
    let right = arr2.length-1;
    while (left < right ){
        [arr2[left], arr2[right]] = [arr2[right], arr2[left]];
        left++;
        right--;
    }
    return arr2.join(""); //Convierte en cadena
}
console.log("Frase invertida: ", invertirCadena("Gelatina de San LALa"));


// -------------------------------------------
// Asegurar que los corchetes están cerrados
const corchetes = [
    "ab[c[d]e]f",
    "ab[c[d]e"
];

const comparaRec = (str, index = 0, open = 0) => {

    if (index === str.length) {
        return open === 0;
    }

    const char = str[index];

    if (char === '[') {
        return comparaRec(str, index + 1, open + 1);
    } else if (char === ']') {
        if (open === 0) return false; // bracket cerrado sin abrir
        return comparaRec(str, index + 1, open - 1);
    } else {
        return comparaRec(str, index + 1, open);
    }
}

const comparaPunt = (str) => {
    let left = 0;
    let right = str.length - 1;
    let balance = 0;

    while (left <= right) {
        if (str[left] === '[') {
            balance++;

            // Buscar cierre correspondiente desde la derecha
            while (right > left) {
                if (str[right] === ']') {
                    balance--;
                    right--; // Cerramos este ] y lo ignoramos después
                    break;
                }
                right--;
            }

            // Si no encontramos un cierre adecuado
            if (balance > 0 && right <= left) return false;
        }

        // Si encontramos un cierre sin apertura previa
        if (str[left] === ']' && balance <= 0) {
            return false;
        }

        left++;
    }

    return balance === 0;
}
console.log('---------------------------------------------------------------------------');
console.log("Función Recursiva:")
corchetes.forEach(item => console.log(`${comparaRec(item) ? `Exito al procesar cadena ${item}` : `Error de sintaxis ${item}`}`)); 


console.log('---------------------------------------------------------------------------');
console.log("Función de dobles punteros:")
corchetes.forEach(item => console.log(`${comparaPunt(item) ? `Exito al procesar cadena ${item}` : `Error de sintaxis ${item}`}`));