//Preg 1: ¿Qué diferencia hay entre let y const? 
//Respuesta: Que let permite que sus valores cambien y const 
// una vez que se asigna su valor ya no se puede modificar.

//Preg 2: ¿Qué hace map()?
//Respuesta: Permite recorrer un arreglo y devolver uno nuevo con los
//resultados de aplicar una función a cada uno de los elementos del arreglo original! 

//Preg 3:  ¿Qué hace JSON.parse() y Object.assign()?
//Respuesta: JSON.parse() -> traduce y convierte un formato JSON a objeto o estructura de datos
// Object.assign() ->  Método que copia todas las propiedades enumerables de uno o más objetos 
// a un objeto destino.

//Preg 4: ¿Cuál es la diferencia entre for...in y for...of?
//Respuesta: La diferencia es que for ... in se utiliza principalmente para recorrer propiedades 
// de un objecto y for ... of se usa para recorrer arrays, mapas, etc.   

//Preg 5: ¿Qué hace esta línea? → const [a, b] = [1, 2, 3];
//Respuesta: asigna el valor 1 a "a", el valor 2 a "b" y el valor 3 es ignorado 😲



// ---- Clase principal que representa un viaje ----
class Viaje {
    constructor(nombre, origen, destino, duracion, pais) {
        this.nombre = nombre;
        this.origen = origen;
        this.destino = destino;
        this.duracion = Number(duracion);//Lo convierte en número!
        // Se pone por que puede llegar como un tipo string! 
        this.pais = pais;
        this.tareas = []; // Lista de tareas relacionadas con el viaje
    }
    //Solo es eficiente si es un tipo de dato sencillo
    // números, carácteres ...
    // Los objetos nunca van a ser iguales, ya que se compara la dirección
    //Si queremos que dos objetos marque que son iguales podemos poner un identificador
    


    // Método para agregar una tarea al viaje
    agregarTarea(tarea) {
        // Evitamos duplicados verificando si la tarea ya existe
        if (this.tareas.includes(tarea)) {
            mostrarModal("La tarea ya está en la lista.");
            return;
        }

        // Si no existe, la agregamos
        this.tareas.push(tarea);
        mostrarModal(`Tarea "${tarea}" añadida al viaje "${this.nombre}".`);
    }


    // Método para eliminar una tarea específica
    eliminarTarea(tarea) {
        const index = this.tareas.indexOf(tarea); // Buscamos el índice
        if (index !== -1) {
            this.tareas.splice(index, 1); // Eliminamos por índice
            mostrarModal(`Tarea "${tarea}" eliminada.`);
        } else {
            mostrarModal("Tarea no encontrada.");
        }
    }
    //Va a buscar la incidencia dentro del arreglo y devuelve el indice 
    // para realizar el borrado
    // Devuelve el -1 significa que no tiene nada, ya que el indice comienza 
    // en cero, con que sea negativo ... 
    // SPLICE -> recibe dos parametros, el primero es el incio, la posicion para 
    // empezar a cortar y el siguiente parámero es la posicion de 
    // elementos que debe de cortar



    // Muestra un resumen del viaje en consola
    mostrarResumen() {
        const { nombre, destino, duracion, pais, tareas } = this;

        console.log(`✈️ Viaje "${nombre}" a ${destino}, ${pais} por ${duracion} días.`);

        if (tareas.length === 0) {
            console.log("No hay tareas asignadas.");
        } else {
            console.log("Tareas:");
            tareas.forEach((t, i) => console.log(`${i + 1}. ${t}`)); // Mostramos tareas enumeradas
        }
    }
}

//Creamos un obj para poder checar en la terminal!
/* const objViaje = new Viaje("Viaje de la familia Hernández", "CDMX", "Guadalajara", "15.4", "México");

objViaje.agregarTarea("Llamar a reservar al hotel Holiday Inn");
objViaje.agregarTarea("Reservar Automóvil");
objViaje.eliminarTarea("Llamar a reservar al hotel Holiday Inn")
objViaje.mostrarResumen(); */




// ---- Funciones para guardar y cargar datos (persistencia en localStorage) ----

// Carga los viajes almacenados y los convierte nuevamente a objetos de tipo "Viaje"
const cargarViajes = () => {
    // JSON alamcena y transmite información entre servicios! :)
    // parse -> traduce y convierte a objeto o estructura de datos
    // get -> leer
    // set -> guardar
    // || -> es para que cuando no funcione creé un arreglo vacio, y si sí tiene 
    // info de JSON traducida
    const data = JSON.parse(localStorage.getItem('viajes')) || [];
    // Crea un arreglo con esos datos
    return data.map(v => Object.assign(new Viaje(), v)); // Recuperamos las propiedades en una nueva instancia
};

// Guarda todos los viajes en localStorage
//Guardar un JSON 
//Promise (reject, resolve) -> si son más de dos parámetros se pone en ()
// Se utilizan en procesos donde uno no tiene el control de hacerlo, 
// p.e. llamada a internet (lo espero pero no sabes en cuánto tiempo). . .
// Guardar un viaje en la nube
const guardarViajes = () => {
    localStorage.setItem('viajes', JSON.stringify(viajes));
};

// Guarda un solo viaje con una pequeña demora (simula petición asíncrona)
const guardarViaje = viaje => new Promise(resolve => {
    setTimeout(() => {
        viajes.push(viaje);     // Lo agregamos al arreglo principal
        guardarViajes();        // Guardamos todos los viajes
        resolve();              // Indicamos que terminó
    }, 1000); // 1000 ms de delay (simulación)
});



// ---- Variables globales e inicialización ----

const viajes = cargarViajes(); // Cargamos los viajes al iniciar
console.log(viajes);

// Limpia los inputs del formulario para crear un nuevo viaje
const limpiarInputs = () => {
    ['nombre', 'destino', 'duracion', 'pais'].forEach(id => {
        document.getElementById(id).value = "";
    });
};



// Crea un nuevo viaje con los datos del formulario
const crearViaje = async () => {
    const campos = ['nombre', 'origen', 'destino', 'duracion', 'pais'];
    const valores = campos.map(id => document.getElementById(id).value.trim());

    // Verificamos que no haya campos vacíos
    if (valores.some(v => !v)) {
        mostrarModal("Por favor llena todos los campos.");
        return;
    }

    const [nombre, origen, destino, duracion, pais] = valores;
    const nuevoViaje = new Viaje(nombre, origen, destino, duracion, pais);

    await guardarViaje(nuevoViaje); // Lo guardamos en la "base de datos"

    renderizarViajes();             // Actualizamos la lista visual
    limpiarInputs();                // Limpiamos los inputs
};


// Función para eliminar un viaje
const eliminarViaje = index => {
    const confirmacion = confirm(`¿Estás seguro de eliminar el viaje $${viajes[index].nombre}"`)
    if (confirmacion) {
        viajes.splice(index, 1);
        guardarViajes();
        renderizarViajes();
        mostrarModal("Viaje eliminado correctamente")
    }
}

// Agrega una tarea a un viaje específico
const agregarTarea = index => {
    abrirPrompt(index, (i, tarea) => {
        viajes[i].agregarTarea(tarea);
        guardarViajes();
        renderizarViajes();
    });
};

// Elimina una tarea de un viaje
const eliminarTarea = (index, tareaIndex) => {
    const tarea = viajes[index].tareas[tareaIndex];
    viajes[index].eliminarTarea(tarea);
    guardarViajes();
    renderizarViajes();
};


// Muestra todos los viajes en pantalla
const renderizarViajes = () => {
    const contenedor = document.getElementById('lista-viajes');
    contenedor.innerHTML = ""; // Limpiamos contenido anterior

    // Ordenamos por duración (de menor a mayor)
    viajes.sort((a, b) => a.duracion - b.duracion);

    // Creamos la estructura visual para cada viaje
    viajes.forEach((v, i) => {
        const div = document.createElement('div');
        div.className = 'viaje-card';

        // Generamos la lista de tareas en HTML
        const tareasHTML = v.tareas.map((t, ti) =>
            `<li>${t} <button onclick="eliminarTarea(${i}, ${ti})">Eliminar</button></li>`
        ).join('');



        // Insertamos los datos del viaje en la tarjeta
        div.innerHTML = `
            <h3 id="test">${v.nombre}</h3>
            <p>Origen: ${v.origen}</p>
            <p>Destino: ${v.destino}, ${v.pais}</p>
            <p>Duración: ${v.duracion} días</p>
            <button class="danger-button" onclick="eliminarViaje(${i})">Eliminar viaje</button>
            <button onclick="agregarTarea(${i})">Agregar tarea</button>
            <ul class="tareas">${tareasHTML}</ul>
        `;

        contenedor.appendChild(div); // Lo añadimos al DOM
    });
};



// ---- Modal de mensajes ----

// Muestra un mensaje en el modal
const mostrarModal = mensaje => {
    document.getElementById("modal-text").textContent = mensaje;
    document.getElementById("modal").style.display = "flex";
};

// Cierra el modal
const cerrarModal = () => {
    document.getElementById("modal").style.display = "none";
};

// ---- Prompt personalizado para agregar tareas ----

let promptCallback = null;
let promptIndex = null;

// Abre el prompt para ingresar una tarea
const abrirPrompt = (index, callback) => {
    promptIndex = index;
    promptCallback = callback;

    const input = document.getElementById("prompt-input");
    input.value = "";

    document.getElementById("prompt-modal").style.display = "flex";
    input.focus();
};

// Cierra el prompt
const cerrarPrompt = () => {
    document.getElementById("prompt-modal").style.display = "none";
    promptCallback = null;
    promptIndex = null;
};

// Confirma el prompt y ejecuta la acción correspondiente
const confirmarPrompt = () => {
    const tarea = document.getElementById("prompt-input").value.trim();
    if (tarea && typeof promptCallback === 'function') {
        promptCallback(promptIndex, tarea);
    }
    cerrarPrompt();
};


renderizarViajes();