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

// Particles (Golden Embers)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 350; // 少し増やしました

const posArray = new Float32Array(particlesCount * 3);
const speedArray = new Float32Array(particlesCount);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20; 
}

for(let i = 0; i < particlesCount; i++) {
    speedArray[i] = Math.random() * 0.01 + 0.002; // ゆっくりと立ち上る
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material (Gold / Amber Color)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.06,
    color: 0xfbbf24, // Gold color
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
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
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    // Subtle rotation
    particlesMesh.rotation.y += 0.0003;

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


