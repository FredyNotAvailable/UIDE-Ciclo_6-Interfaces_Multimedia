/**
 * Canvas Experimentation - Sistema de Partículas Interactivas
 * 
 * Este script implementa un sistema de partículas en HTML5 Canvas.
 * Genera figuras geométricas que se mueven aleatoriamente y reaccionan
 * a la posición del mouse del usuario (efecto de repulsión).
 */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Configuración global del tamaño del canvas para que ocupe toda la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray; // Arreglo para almacenar todas las partículas

// Objeto para manejar la posición del mouse
let mouse = {
    x: null,
    y: null,
    radius: 100 // Radio de interacción del mouse
}

// Evento para rastrear el movimiento del mouse
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

/**
 * Clase Particle
 * Define las propiedades y comportamientos de cada partícula individual.
 */
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX; // Velocidad en X
        this.directionY = directionY; // Velocidad en Y
        this.size = size;
        this.color = color;
    }

    /**
     * Dibuja la partícula en el canvas.
     */
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath(); // Buena práctica cerrar el path
    }

    /**
     * Actualiza la posición de la partícula y maneja la interacción.
     */
    update() {
        // 1. Revisar si la partícula está dentro del canvas (limites)
        // Si toca los bordes izquiero o derecho, invierte la velocidad X
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        // Si toca los bordes superior o inferior, invierte la velocidad Y
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // 2. Detección de colisión/proximidad con el mouse (INTERACCIÓN)
        // Utilizamos Pitágoras para calcular la distancia entre el mouse y la partícula
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Si la distancia es menor al radio de interacción del mouse + tamaño de partícula
        if (distance < mouse.radius + this.size) {
            // Lógica de REPULSIÓN
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10; // Mover a la derecha si el mouse está a la izquierda
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10; // Mover a la izquierda si el mouse está a la derecha
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10; // Mover abajo
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10; // Mover arriba
            }
        }

        // 3. Mover la partícula sumando la velocidad a la posición
        this.x += this.directionX;
        this.y += this.directionY;

        // 4. Dibujar la partícula en su nueva posición
        this.draw();
    }
}

/**
 * Función init
 * Inicializa el sistema de partículas creando instancias y llenando el arreglo.
 */
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000; // Densidad dinámica
    // Aseguramos un mínimo de 50 partículas según requerimiento
    if (numberOfParticles < 50) numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1; // Tamaño aleatorio entre 1 y 6
        // Posición inicial aleatoria dentro del canvas (respetando los tamaños para no aparecer fuera)
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        // Velocidad aleatoria
        let directionX = (Math.random() * 2) - 1; // Entre -1 y 1
        let directionY = (Math.random() * 2) - 1;

        // Color aleatorio
        let color = '#e94560'; // Color base
        // Variación opcional de color
        // let color = 'rgba(255, 255, 255, ' + Math.random() + ')';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

/**
 * Función animate
 * Bucle de animación principal.
 */
function animate() {
    // requestAnimationFrame es más eficiente que setInterval para animaciones
    requestAnimationFrame(animate);

    // Limpiar el canvas en cada frame para dibujar las nuevas posiciones
    // Se puede usar clearRect completo:
    // ctx.clearRect(0, 0, innerWidth, innerHeight);

    // O usar un rectángulo semitransparente para efecto de estela (trail effect)
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)'; // Color de fondo con baja opacidad
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    // Actualizar cada partícula
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    // Opcional: Conectar partículas con líneas si están cerca
    // connect(); 
}

/**
 * Evento resize
 * Asegura que el canvas se adapte si cambia el tamaño de la ventana.
 */
window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init(); // Reiniciar partículas para ajustar posiciones
});

// Detectar cuando el mouse sale de la pantalla para evitar que las partículas se queden pegadas
window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})

// Iniciar el sistema
init();
animate();
