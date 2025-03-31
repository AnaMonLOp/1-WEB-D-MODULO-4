/* He basado mi código en lo que he aprendido mediante los ejercicios
    resueltos en clase :) */

const listaDeCompras = [];
const agregarProducto = () => {
    const input = document.getElementById("producto");
    const nombreProducto = input.value.trim();

    // Validación de que no se permitan entradas vacías
    if(nombreProducto === ""){
        alert("Por favor, ingresa un producto.");
        return;
    }

    //Evitar productos duplicados
    if(listaDeCompras.includes(nombreProducto)){
        alert("Este producto ya está agregado a la lista.");
        return;
    }

    listaDeCompras.push(nombreProducto);
    mostrarLista();
    input.value = "";
};

const eliminarProducto = (producto)  => {
    const index = listaDeCompras.indexOf(producto);
    if(index !== -1){
        listaDeCompras.splice(index, 1);
        mostrarLista();
    }
};

const mostrarLista = () => {
    const lista = document.getElementById("lista");
    lista.innerHTML = listaDeCompras.map((producto, index) =>
        `<li>${index + 1}. ${producto} 
        <button class="delete" onclick="eliminarProducto('${producto}')">Eliminar</button></li>`
    ).join("");
};
