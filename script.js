let frases = [];
let reproduciendo = false;
let floresPosiciones = []; // Para llevar un registro de las posiciones de las flores

// Cargar frases desde frases.txt
fetch("frases.txt")
    .then(response => response.text())
    .then(text => {
        frases = text.split("\n").map(f => f.trim()).filter(f => f !== "");
    })
    .catch(error => console.error("Error al cargar las frases:", error));

function generarFlor() {
    if (frases.length === 0) {
        alert("Las frases aún no se han cargado. Intenta nuevamente.");
        return;
    }

    const contenedor = document.querySelector('.contenedor-flores');

    // Selecciona una frase aleatoria
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

    // Crea la flor
    const flor = document.createElement('div');
    flor.classList.add('flor');

    // Agrega pétalos
    for (let i = 0; i < 5; i++) {
        const petalo = document.createElement('div');
        petalo.classList.add('petalo');
        flor.appendChild(petalo);
    }

    // Crea el centro con la frase
    const centro = document.createElement('div');
    centro.classList.add('centro');
    centro.innerText = fraseAleatoria;

    // Agrega el centro a la flor
    flor.appendChild(centro);

    // Verificar si la flor no se amontona
    let posicionValida = false;
    let posicionX, posicionY;

    while (!posicionValida) {
        // Genera una nueva posición aleatoria para la flor
        posicionX = Math.random() * (window.innerWidth - 120); // Limita al tamaño de la pantalla
        posicionY = Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2); // En la mitad inferior de la pantalla

        // Verifica que no haya flores en esa posición
        posicionValida = true;
        for (let i = 0; i < floresPosiciones.length; i++) {
            const posicionExistente = floresPosiciones[i];
            const distancia = Math.sqrt(Math.pow(posicionX - posicionExistente.x, 2) + Math.pow(posicionY - posicionExistente.y, 2));
            if (distancia < 120) { // Si la distancia entre las flores es menor a 120px, es una posición inválida
                posicionValida = false;
                break;
            }
        }
    }

    // Añadir la posición de la flor al registro de posiciones
    floresPosiciones.push({ x: posicionX, y: posicionY });

    // Asignar las coordenadas a la flor
    flor.style.left = `${posicionX}px`;
    flor.style.top = `${posicionY}px`;

    contenedor.appendChild(flor);

    // Reproducir música de Spotify solo una vez
    if (!reproduciendo) {
        const spotifyPlayer = document.getElementById('spotify-player');
        if (spotifyPlayer) {
            spotifyPlayer.src += "?autoplay=1";
            reproduciendo = true;
        }
    }
}
