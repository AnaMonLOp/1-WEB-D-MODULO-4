const productos = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" },
];

// Función para mostrar en pantalla
function MostrarArray(array){
    array.forEach(producto => 
        console.log(`- Nombre: ${producto.nombre} || Precio:$${producto.precio} || Categoria:${producto.categoria}`));
}


console.log("------------------------------------------------");
console.log("Filtro: Productos con precio menor de $100");
const precio = productos.filter (costo => costo.precio < 100);
MostrarArray(precio);

console.log("------------------------------------------------");
console.log("Productos ordenados alfabéticamente por su nombre");

console.log("Orden Descendente (Z-A)");
const ordenDescendente = productos.sort((a,b) => b.nombre.localeCompare(a.nombre));
MostrarArray(ordenDescendente);

console.log("- - - - -");

console.log("Orden Ascendente (A-Z)");
const ordenAscendente = productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
MostrarArray(ordenAscendente);

console.log("------------------------------------------------");
console.log("Nombre de los Productos");
const nombresProductos = productos.map(producto => producto.nombre);
nombresProductos.forEach(function(nombre){
    console.log(nombre);
});

console.log("------------------------------------------------");
const precioTotal = productos.reduce((acumulador, actual) => acumulador + actual.precio, 0);
console.log(`Precio total de la lista de Productos: $${precioTotal}`);