const miArreglo=[1, 3, 5, 7, 11, 15, 25, 36, 102, 150];

const miArregloAlt = ["agua", "aire", "barco", "cielo", "luna", "sol", "Taza", "Tetera"]
//Busqueda lineal: O(n)
const linearSearch = (arreglo, target) => {
    for(let i=0; i<arreglo.length; i++){
        if(arreglo[i] === target){
            return i;
        }
    }
    return -1;
}

//Búsqueda Binaria: O(log n) (solo con arrays ordenados)
const binarySearch=(arreglo, target)=>{
    let _left=0;
    let _right=arreglo.length-1;
    while(_left<=_right){
        const mid = Math.floor((_left + _right)/2);
        if(arreglo[mid]==target){
            return mid;
        }
        else if(arreglo[mid]<target){
            _left = mid+1;
        }
        else{
            _right= mid-1;
        }
    }
    return -1;
}

// Recursiva (Busqueda binaria)
const binarySearchR = (arreglo, target, _left=0, _right=arreglo.length - 1) =>{
    // No encuentro el valor
    if(_left > _right) return -1; //Cuando ya se pasaron pero no hay nada

    //Encuentro el valor
    const mid = Math.floor((_left + _right)/2);
    if(arreglo[mid] === target) return mid;
    
    // Busco a la derecha
    if(arreglo[mid] < target) binarySearchR(arreglo, target, mid + 1, _right);
    
    // Busco a la izquierda
    return binarySearchR(arreglo, target, _left, mid - 1);
}

//JsBench.Me
console.time('lineal');
console.log(linearSearch(miArreglo, 11));
console.timeEnd('lineal');

console.time('binaria');
console.log(binarySearch(miArreglo, 11));
console.timeEnd('binaria');

console.time('binariaR');
console.log(binarySearch(miArreglo, 11));
console.timeEnd('binariaR');


console.time('linealT');
console.log(linearSearch(miArregloAlt, "aire"));
console.timeEnd('linealT');

console.time('binariaT');
console.log(binarySearch(miArregloAlt, "aire"));
console.timeEnd('binariaT');

console.time('binariaRT');
console.log(binarySearch(miArregloAlt, "aire"));
console.timeEnd('binariaRT');
