const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scoreDisplay = document.getElementById("score");
const ui = document.getElementById("ui");
const startBtn = document.getElementById("startBtn");
const sprintBar = document.getElementById("sprintBar");

let keys = {}, gameRunning = false, score = 0;
let sprintTime = 0, sprintCooldown = 0;
const SPRINT_DURATION = 1000, SPRINT_COOLDOWN = 3000;
let sprinting = false, sprintUsed = false;

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);


let player, foods, enemies, lastTime;
function startGame() {
  ui.style.display = 'none';
  scoreDisplay.style.display = 'block';
  score = 0; gameRunning = true;
  sprintTime = 0; sprintCooldown = 0;
  sprinting = false; sprintUsed = false;

  player = new Player();
  foods = Array.from({ length: 40 }, () => new Food());
  enemies = Array.from({ length: 10 }, () => new Enemy());
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function endGame(msg) {
  gameRunning = false;
  scoreDisplay.style.display = 'none';
  ui.innerHTML = `<h1>${msg}</h1><p>Wynik: ${score}</p><button id='replayBtn'>Zagraj ponownie</button>`;
  document.getElementById('replayBtn').onclick = startGame;
  ui.style.display = 'flex';
}

function gameLoop(now) {
  if (!gameRunning) return;
  const delta = now - lastTime; lastTime = now;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update(delta); player.draw();
  foods.forEach(f => f.draw());

  enemies.forEach((e, i) => {
    e.update(delta, player, enemies, foods);
    e.draw();
    if (e.active && e.collidesWith(player)) {
      if (player.radius > e.radius * 1.1) {
        player.radius += e.radius * 0.3; score += 50;
        enemies.splice(i, 1); enemies.push(new Enemy());
      } else {
        endGame("Przegrana!");
        return;
      }
    }
  });

  foods.forEach((f, i) => {
    if (player.collidesWith(f)) {
      player.radius += f.radius * 0.2; score += 10;
      foods.splice(i, 1); foods.push(new Food());
    }
  });

  if (score >= 2000) return endGame("Wygrałeś!");

  sprintBar.style.width = `${Math.min((sprintCooldown <= 0 ? 100 : 100 - (sprintCooldown / SPRINT_COOLDOWN) * 100), 100)}%`;
  scoreDisplay.textContent = `Wynik: ${score}`;
  requestAnimationFrame(gameLoop);
}

startBtn.onclick = startGame;