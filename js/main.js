// =========================================
// INTERACTIVE CANVAS - PRO OPTIMIZED (MOBILE & RETINA READY)
// =========================================

const canvas = document.getElementById('interactive-canvas');
const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true }); // Optimización para baja latencia

let particles = [];
const MAX_PARTICLES = 800; // Límite mucho más alto para no cortar la estela gruesa
let prevMouse = { x: null, y: null };
let moveTimeout;

// Para detectar si es touch y habilitar los eventos, pero SIN quitarle densidad
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Configuración de Canvas para pantallas Retina (iPhone / High DPI)
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

window.addEventListener('resize', () => {
  requestAnimationFrame(resizeCanvas);
});
resizeCanvas();

class Particle {
  constructor(x, y, isClick = false) {
    const spread = isClick ? 80 : 25; // Restaurado al spread original más grueso
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * spread; 
    
    this.x = x + Math.cos(angle) * radius;
    this.y = y + Math.sin(angle) * radius;
    
    // Restaurado al tamaño original grande
    this.size = isClick ? Math.random() * 4 + 2 : Math.random() * 2.5 + 1;
    
    if (isClick) {
      const burstAngle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1;
      this.vx = Math.cos(burstAngle) * speed;
      this.vy = Math.sin(burstAngle) * speed;
    } else {
      this.vx = (Math.random() - 0.5) * 0.8; 
      this.vy = -(Math.random() * 1.5 + 0.3); 
    }
    
    this.life = 1; 
    this.decay = isClick ? Math.random() * 0.02 + 0.01 : Math.random() * 0.015 + 0.005; 
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.size = Math.max(0, this.size - 0.02);
  }

  draw() {
    if (this.size > 0 && this.life > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(17, 17, 17, ${this.life})`; 
      ctx.fill();
    }
  }
}

// Lógica de generación interpolada 
function handlePointerMove(clientX, clientY) {
  if (prevMouse.x !== null && prevMouse.y !== null) {
    const dx = clientX - prevMouse.x;
    const dy = clientY - prevMouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Restaurada la densidad altísima original (1 drop cada 4 píxeles)
    const drops = Math.max(1, Math.floor(distance / 4)); 
    
    for (let i = 0; i < drops; i++) {
      const percent = i / drops;
      const spawnX = prevMouse.x + dx * percent;
      const spawnY = prevMouse.y + dy * percent;
      
      // Restaurado a empujar 2 partículas grandes por cada paso SIEMPRE
      particles.push(new Particle(spawnX, spawnY, false));
      particles.push(new Particle(spawnX, spawnY, false));
    }
  } else {
    particles.push(new Particle(clientX, clientY, false));
  }
  
  prevMouse.x = clientX;
  prevMouse.y = clientY;
  
  // Límite alto para no cortar la estela bruscamente
  if (particles.length > MAX_PARTICLES) {
    particles.splice(0, particles.length - MAX_PARTICLES);
  }
  
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => {
    prevMouse.x = null;
    prevMouse.y = null;
  }, 50);
}

// Escuchadores de Mouse
window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY), { passive: true });
window.addEventListener('click', (e) => {
  const burstCount = isTouchDevice ? 15 : 30;
  for (let i = 0; i < burstCount; i++) {
    particles.push(new Particle(e.clientX, e.clientY, true));
  }
}, { passive: true });

// Escuchadores Táctiles (Celulares)
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

window.addEventListener('touchstart', (e) => {
  if (e.touches.length > 0) {
    prevMouse.x = e.touches[0].clientX;
    prevMouse.y = e.touches[0].clientY;
  }
}, { passive: true });

window.addEventListener('touchend', () => {
  prevMouse.x = null;
  prevMouse.y = null;
}, { passive: true });

// Ciclo de animación optimizado
function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.update();
    p.draw();
    
    if (p.life <= 0 || p.size <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  
  requestAnimationFrame(animate);
}

// Iniciar
requestAnimationFrame(animate);
