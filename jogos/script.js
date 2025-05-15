const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");

let playerX = window.innerWidth / 2;
const speed = 10;
let bullets = [];
let enemies = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    playerX -= speed;
  } else if (e.key === "ArrowRight") {
    playerX += speed;
  } else if (e.key === " ") {
    shoot();
  }
  player.style.left = playerX + "px";
});

function shoot() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = player.offsetLeft + 20 + "px";
  bullet.style.top = player.offsetTop + "px";
  gameArea.appendChild(bullet);
  bullets.push(bullet);
}

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.random() * (window.innerWidth - 50) + "px";
  gameArea.appendChild(enemy);
  enemies.push(enemy);
}

function update() {
  // Mover balas
  bullets.forEach((bullet, index) => {
    bullet.style.top = bullet.offsetTop - 15 + "px";
    if (bullet.offsetTop < 0) {
      bullet.remove();
      bullets.splice(index, 1);
    }
  });

  // Mover inimigos
  enemies.forEach((enemy, eIndex) => {
    enemy.style.top = enemy.offsetTop + 5 + "px";
    if (enemy.offsetTop > window.innerHeight) {
      enemy.remove();
      enemies.splice(eIndex, 1);
    }

    // Detectar colisão com balas
    bullets.forEach((bullet, bIndex) => {
      if (
        bullet.offsetLeft < enemy.offsetLeft + 40 &&
        bullet.offsetLeft + 5 > enemy.offsetLeft &&
        bullet.offsetTop < enemy.offsetTop + 40 &&
        bullet.offsetTop + 10 > enemy.offsetTop
      ) {
        bullet.remove();
        enemy.remove();
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });
  });

  requestAnimationFrame(update);
}

setInterval(createEnemy, 2000);
update();