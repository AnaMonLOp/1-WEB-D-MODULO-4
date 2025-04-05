/*
¿Cuál es la complejidad temporal de Merge Sort?
¿Por qué Merge Sort es un algoritmo estable?
¿Cuándo no usarías Merge Sort en un proyecto real?
¿Merge Sort es recursivo o iterativo?
*/
console.log("Función Merge Sort, ejercicios");

const arregloPrueba = [8, 3, 51, 15, 9, 1, 6, 8]
function mergeSort(arr){
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));
    // slice() -> extraer una parte de un array sin
    //  modificar el original.
    return merge(left, right);
}

function merge(left, right){
    const result = []
    let i=0, j=0;
    while(i<left.length && j< right.length){
        if(left[i] < right[j]){
            result.push(left[i++]);
        }
        else{
            result.push(right[j++]);
        }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort(arregloPrueba));
console.log("_________________________________________");

// Ejemplo de operador de propagación"..."
const persona={
    name:"Iñigo",
    edad: 15
}
const ob={
    ...persona,
    hobby: "play"
}
console.log(ob);

console.log("_________________________________________");

// Ejemplo Merge Sort con Objetos
const usuarios = [
    {name: "Ana", age: 32},
    {name: "Luis", age: 25},
    {name: "Luis", age: 26},
    {name: "Pedro", age: 28},
];

// usuario[0][name]

function mergeSortByProp(arr, prop){
    if(arr.length<=1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortByProp(arr.slice(0, mid), prop);
    const right = mergeSortByProp(arr.slice(mid), prop);
    return mergeByProp(left, right, prop);
}

function mergeByProp(left, right, prop){
    const result = [];
    let i=0, j=0;
    while(i<left.length && j<right.length){
        if(left[i][prop] < right[j][prop]){
            result.push(left[i++]);
        }
        else{
            result.push(right[j++])
        }
    }
    return [...result, ...left.slice(i), ...right.slice(j)]
    // slice -> Por si algunos de los lados es más grande
}

console.log(mergeSortByProp(usuarios, 'age'));

// Método slidding window

console.log("--------------------------------------------------");
console.log("Función Sliding Window, ejercicios");
function maxSubarraySum(arr, k){
    let maxSum = 0;
    let windowSum =0;
    
    for(let i=0; i<k; i++){
        windowSum += arr[i];
    }

    maxSum = windowSum;

    for(let i=k; i<arr.length; i++){
        windowSum += arr[i] - arr[i-k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

const arraySum = [2,1,5,4,3,2,5,1]
console.log(maxSubarraySum(arraySum, 3));

// -----------------Segundo ejemplo, dinámico---------------------------------

function lengthOfLongest(str){
    let seen = new Set();
    let left = 0, maxLength=0;

    for( let right  = 0; right < str.length; right++){
        while(seen.has(str[right])){
            seen.delete(str[left++])
        }
        seen.add(str[right]);
        maxLength = Math.max(maxLength, right-left + 1);
    }
    return maxLength;
}
console.log(lengthOfLongest("dfghdfghdfgddddfg12fggfgfhddfgh1234"));

