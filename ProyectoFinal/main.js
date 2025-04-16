// Importamos recetas desde un archivo externo simulado
import { getRecipes } from "./servicess/recipes.js";
 
// Verificamos que los datos recibidos sean un arreglo
const recetas = Array.isArray(getRecipes()) ? getRecipes() : [];

// Referencias a elementos del DOM
const input = document.getElementById("ingredient-input");
const recipesContainer = document.getElementById("recipes");
const sortSelect = document.getElementById("sort");
const suggestionBtn = document.getElementById("suggestion-btn");

// Variables globales para autocompletado y análisis
let currentSuggestionIndex = -1;
let currentSuggestions = [];
let historialIngredientes = [];


// =============================================
// FUNCIÓN: Mostrar recetas en pantalla
// =============================================
function renderRecetas(lista) {
    recipesContainer.innerHTML = ""; // Limpiamos el contenedor

    lista.forEach((receta) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.nombre}" />
        <h3>${receta.nombre}</h3>
        <p><strong>Tiempo:</strong> ${receta.tiempo} min</p>
        <p>${receta.pasos}</p>
      `;
        recipesContainer.appendChild(card);
    });
}


// =============================================
// FUNCIÓN: Filtrar recetas por ingrediente
// =============================================
// TODO: Reemplazar .includes() con implementación manual de búsqueda de subcadenas (como KMP o recorrido carácter por carácter)

function filtrarPorIngrediente(ingrediente) {
    const lower = ingrediente.toLowerCase();
    return recetas.filter((receta) =>
        receta.ingredientes.some((ing) => buscarSubcadena(ing.toLowerCase(),lower))
    );
}

const buscarSubcadena = (texto, patron) => {
    for (let i = 0; i <= texto.length - patron.length; i++) {
        if (texto.slice(i, i + patron.length) === patron) {
            return true;
        }
    }
    return false;
};



// =============================================
// FUNCIÓN: Actualizar historial y análisis
// =============================================
function actualizarHistorial(ingrediente) {
    historialIngredientes.push(ingrediente);

    // Sliding Window: mantenemos máximo 20 ingredientes
    if (historialIngredientes.length > 20) {
        historialIngredientes.shift();
    }

    // Mostrar en texto cuántos ingredientes únicos se han usado
    document.getElementById("analysis").textContent =
        `Usaste ${new Set(historialIngredientes).size} ingrediente${historialIngredientes.length > 1 ? 's' : ''} esta semana.`;

    actualizarSugerenciasRecientes();
}



// =============================================
// FUNCIÓN: Mostrar top ingredientes populares recientes (Sliding Window real)
// =============================================

// TODO: Sliding Window sobre últimas 5 búsquedas para encontrar ingredientes más frecuentes
function actualizarSugerenciasRecientes() {
    let ultimasBusquedas = historialIngredientes.slice(-5) //accede a los últimos 5 elementos del arreglo
    let frecuencia = {};

    for (let i = 0; i < ultimasBusquedas.length; i++) {
        let ingrediente = ultimasBusquedas[i];
        frecuencia[ingrediente] = (frecuencia[ingrediente] || 0) + 1;
    }
    
    let ingredientesOrdenados = Object.entries(frecuencia)
        .sort((a, b) => b[1] - a[1])
        .map(([ingrediente]) => ingrediente);

    document.getElementById("recent-suggestions").textContent =
        `Los ingredientes más usados recientemente: ${ingredientesOrdenados.join(", ")}`;
}


// =============================================
// FUNCIÓN: Mostrar sugerencias de autocompletado
// =============================================
function autocompletar(valor) {
    const autocompletarDiv = document.getElementById("autocomplete-list");
    autocompletarDiv.innerHTML = "";

    if (!valor) return;

    currentSuggestions = [...new Set(recetas.flatMap(r => r.ingredientes))]
        .filter((ing) => ing.toLowerCase().startsWith(valor.toLowerCase()))
        .slice(0, 5);

    currentSuggestionIndex = -1;

    currentSuggestions.forEach((sug) => {
        const item = document.createElement("div");
        item.textContent = sug;
        item.classList.add("autocomplete-item");
        item.onclick = () => {
            input.value = sug;
            input.focus();
        };
        autocompletarDiv.appendChild(item);
    });
}


// =============================================
// FUNCIÓN: Buscar recetas y mostrarlas
// =============================================
function buscarYRenderizar() {
    const valor = input.value.trim();
    if (!valor) return;

    const resultados = filtrarPorIngrediente(valor);
    actualizarHistorial(valor);
    renderRecetas(resultados);
}


// =============================================
// FUNCIÓN: Ordenar recetas por nombre o tiempo
// =============================================
function ordenarRecetas(tipo) {
    let ordenadas = mergeSort(recetas, tipo === "time" ? "time" : "name");
    renderRecetas(ordenadas);
}

// ==============================================================
// FUNCIÓN: Merge Sort para ordenar tanto tiempo como alfabético
// ==============================================================

function mergeSort(arr, criterio) {
    if (arr.length <= 1)  return arr; 

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(
        mergeSort(left, criterio),
        mergeSort(right, criterio),
        criterio
    );
}

function merge(left, right, criterio) {
    let resultado = [];
    let i=0, j=0;
    while (i < left.length && j < right.length) {
        if ((criterio === "time" && left[i].tiempo <= right[j].tiempo) ||
            (criterio === "name" && left[i].nombre.localeCompare(right[j].nombre) <= 0)) {
            resultado.push(left[i]);
            i++;
        } else {
            resultado.push(right[j]);
            j++;
        }
    }
    return resultado.concat(left.slice(i)).concat(right.slice(j));
}


// =============================================
// FUNCIÓN: Resaltar sugerencia seleccionada
// =============================================
function highlightSuggestion(items) {
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSuggestionIndex);
    });
}


// =============================================
// EVENTO: Cuando el usuario escribe en el input
// =============================================
input.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    autocompletar(value); // Solo muestra sugerencias

    if (!value) {
        renderRecetas(recetas); // Si está vacío, mostrar todas
    }
});


// =============================================
// EVENTO: Teclado para navegar sugerencias
// =============================================
input.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".autocomplete-item");

    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentSuggestionIndex < items.length - 1) {
            currentSuggestionIndex++;
            highlightSuggestion(items);
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentSuggestionIndex > 0) {
            currentSuggestionIndex--;
            highlightSuggestion(items);
        }
    } else if (e.key === "Enter") {
        if (currentSuggestionIndex >= 0 && items[currentSuggestionIndex]) {
            input.value = items[currentSuggestionIndex].textContent;
            document.getElementById("autocomplete-list").innerHTML = "";
        }
        buscarYRenderizar(); // Ejecuta búsqueda
    }
});


// =============================================
// EVENTO: Cambiar tipo de ordenamiento
// =============================================
sortSelect.addEventListener("change", (e) => ordenarRecetas(e.target.value));


// =============================================
// EVENTO: Mostrar la receta más rápida
// =============================================
suggestionBtn.addEventListener("click", () => {
    // TODO: Reemplazar .reduce() con una implementación manual de Greedy para encontrar el menor tiempo
    let recetaMasRapida = recetas[0];
    for(let i=1; i<recetas.length; i++){
        if(recetas[i].tiempo < recetaMasRapida.tiempo){
            recetaMasRapida = recetas[i];
        }
    }
    
    renderRecetas([recetaMasRapida]);
});


// =============================================
// Render inicial de todas las recetas
// =============================================
renderRecetas(recetas);