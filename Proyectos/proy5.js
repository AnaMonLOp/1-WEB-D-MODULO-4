// Proyecto 5. Algoritmo Sliding Window

function findLongestWord(text) {
    const words = text.split(" ");
    let longestWord = '';   // Inicializar la palabra más larga
    
    for (let i=0; i<words.length; i++){
        if(longestWord.length < words[i].length){
            longestWord = words[i]
        }
    }
    return longestWord;
}

// Ejemplo de uso
const text = "JavaScript es un lenguaje de programación increíble para aprender.";
// TODO: Llama a la función y muestra el resultado
console.log(findLongestWord(text)); // Resultado esperado: "programación"

