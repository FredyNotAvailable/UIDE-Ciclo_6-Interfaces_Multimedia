# Escena 3D Interactiva con Three.js

Esta actividad presenta una escena 3D "estudio" compuesta por una estructura abstracta. La composición central consiste en un cubo metálico base, sobre el cual levita una esfera que oscila verticalmente, todo rodeado por un anillo toroidal giratorio.

## Decisiones Técnicas

### Materiales
Se optó por utilizar **`MeshStandardMaterial`** para todas las geometrías. Este material basado en física (PBR - Physically Based Rendering) fue elegido porque responde de manera realista a la luz, permitiendo apreciar propiedades como la `roughness` (rugosidad) y `metalness` (metalicidad). A diferencia de `MeshBasicMaterial`, este permite que se generen sombras y brillos especulares que dan volumen y realismo a la composición.

### Iluminación
El esquema de iluminación es mixto e incluye:
1.  **`AmbientLight`**: Provee una iluminación base uniforme para asegurar que ninguna parte de la escena quede en oscuridad total.
2.  **`DirectionalLight`**: Actúa como la luz principal (key light), simulando una fuente potente y distante (como el sol) que proyecta sombras definidas y resalta el volumen de las figuras.
3.  **`PointLight`**: Una luz puntual cálida añadida para generar contraste y brillos interesantes desde un ángulo lateral.
