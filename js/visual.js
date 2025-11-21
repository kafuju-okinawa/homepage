// Three.js Setup
const container = document.getElementById('canvas-container');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Particles (Embers/Bubbles)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 300; // Number of particles

const posArray = new Float32Array(particlesCount * 3);
const speedArray = new Float32Array(particlesCount); // Individual speed for varying movement

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles widely
    posArray[i] = (Math.random() - 0.5) * 20; 
}

for(let i = 0; i < particlesCount; i++) {
    speedArray[i] = Math.random() * 0.02 + 0.005; // Random upward speed
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material (Warm, Amber Color)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.08,
    color: 0xea580c, // Kohaku (Amber) color
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending // Glow effect
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const positions = particlesGeometry.attributes.position.array;

    for(let i = 0; i < particlesCount; i++) {
        // Move Y position up
        positions[i * 3 + 1] += speedArray[i];

        // Reset if goes too high
        if(positions[i * 3 + 1] > 10) {
            positions[i * 3 + 1] = -10;
            // Randomize X and Z slightly on reset for variation
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    // Subtle rotation of the whole system
    particlesMesh.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


