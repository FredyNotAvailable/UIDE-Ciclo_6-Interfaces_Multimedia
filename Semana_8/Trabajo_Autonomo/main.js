import * as THREE from 'three';

// 1. Configuración de la Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a); // Fondo gris oscuro para resaltar luces

// 2. Configuración de la Cámara (PerspectiveCamera)
// FOV: 75, Aspect: window width/height, Near: 0.1, Far: 1000
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Mover la cámara en el eje Z para tener distancia
camera.position.z = 5;
camera.position.y = 1;
camera.lookAt(0, 0, 0);

// 3. Configuración del Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Habilitar sombras
document.body.appendChild(renderer.domElement);

// 4. Creación de la Estructura Compuesta
const group = new THREE.Group();
scene.add(group);

// Materiales (MeshStandardMaterial para reaccionar a la luz)
const mainMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ff88, 
    roughness: 0.3,
    metalness: 0.7 
});
const secondaryMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff0055, 
    roughness: 0.5,
    metalness: 0.2 
});
const tertiaryMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0088ff, 
    roughness: 0.2,
    metalness: 0.8 
});

// Figura 1: Cubo Central (Base)
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cube = new THREE.Mesh(cubeGeometry, mainMaterial);
cube.castShadow = true;
cube.receiveShadow = true;
group.add(cube);

// Figura 2: Esfera flotante (Arriba)
const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, secondaryMaterial);
sphere.position.y = 1.5;
sphere.castShadow = true;
sphere.receiveShadow = true;
group.add(sphere);

// Figura 3: Toroide (Anillo alrededor)
const torusGeometry = new THREE.TorusGeometry(1.2, 0.15, 16, 100);
const torus = new THREE.Mesh(torusGeometry, tertiaryMaterial);
torus.rotation.x = Math.PI / 2; // Acostar el anillo
torus.castShadow = true;
torus.receiveShadow = true;
group.add(torus);

// 5. Iluminación
// Luz Ambiental (Suave)
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Color gris suave, intensidad 2
scene.add(ambientLight);

// Luz Direccional (Principal)
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Luz Puntual (Acento de color)
const pointLight = new THREE.PointLight(0xffaa00, 5, 10);
pointLight.position.set(-2, 3, 2);
scene.add(pointLight);

// Manejo de redimensionamiento de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. Ciclo de Animación
function animate() {
    requestAnimationFrame(animate);

    // Rotación de todo el grupo
    group.rotation.x += 0.005;
    group.rotation.y += 0.01;

    // Animación individual de los componentes
    sphere.position.y = 1.5 + Math.sin(Date.now() * 0.002) * 0.2; // La esfera flota arriba y abajo
    torus.rotation.z -= 0.02; // El anillo gira en sentido contrario

    renderer.render(scene, camera);
}

// Iniciar animación
animate();
