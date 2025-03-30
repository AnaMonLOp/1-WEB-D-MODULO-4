const maleta = [];

function agregarItem() {
    // 🚀 Completar: Obtener el valor del input y validar que no esté vacío ni duplicado.
    // 🚀 Completar: Agregar el artículo al array maleta y actualizar la lista.
    const input = document.getElementById("item");
    const articulo = input.value.trim();

    if (!articulo) {
        alert("Por favor, ingresa un articulo válido.");
        return; // Detiene la ejecución si el input está vacío
    }

    // Validación: Evitar productos duplicados
    if (maleta.includes(articulo)) {
        alert("❌ Este producto ya está en la lista.");
        return; // Detiene la ejecución si el producto ya existe
    }

    maleta.push(articulo);
    actualizarMaleta(); 
    input.value = "";
}

function ordenarMaleta() {
    // 🚀 Completar: Ordenar los elementos de la maleta alfabéticamente.
    maleta.sort();
    actualizarMaleta();
}

function finalizarEmpaque() {
    // 🚀 Completar: Mostrar alerta si hay menos de 3 artículos, de lo contrario, mensaje de éxito.
    if(maleta.length<3){
        alert("Agrega más artículos.");
    }
    else 
    {
        alert("Finalizado con exito!");
    }
}

function actualizarMaleta() {
    // 🚀 Completar: Renderizar los elementos de la maleta en la lista <ul>.
    const lista = document.getElementById("lista");
    lista.innerHTML = maleta.map((articulo, index) =>
        `<li>${index + 1}. ${articulo}
        <button onclick="eliminarItem('${articulo}')">Eliminar</button></li>`
    ).join("");// Convierte el array en un solo string de HTML
}