var typed = new Typed('#element', {
    strings: ['Web Developer', 'Graphic Designer','Web Designer',' Freelancer'],
    typeSpeed: 50,
  });

  const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createFirework(x, y, color) {
    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            velocityX: random(-5, 5),
            velocityY: random(-5, 5),
            alpha: 1,
            color: color
        });
    }
    return particles;
}

let fireworks = [];

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.forEach((particle, particleIndex) => {
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.alpha -= 0.02;

            if (particle.alpha <= 0) {
                firework.splice(particleIndex, 1);
            }

            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        if (firework.length === 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(draw);
}

function launchFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(100, canvas.height - 100);
    const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push(createFirework(x, y, color));

    setTimeout(launchFirework, random(500, 1500));
}

launchFirework();
draw();
