class Player extends Entity {
  constructor() {
    super(canvas.width/2, canvas.height/2, 20, '#007BFF');
    this.baseSpeed = 3.2;
  }
  update(delta) {
    let speed = this.baseSpeed;
    if (!sprintUsed && keys['shift'] && sprintCooldown <= 0) {
      sprinting = true; sprintTime = SPRINT_DURATION;
      sprintCooldown = SPRINT_COOLDOWN; sprintUsed = true;
    }
    if (sprinting) {
      sprintTime -= delta;
      if (sprintTime <= 0) { sprinting = false; sprintUsed = false; }
      else speed *= 1.8;
    } else if (sprintCooldown > 0) sprintCooldown -= delta;

    let dx = 0, dy = 0;
    if (keys['w'] || keys['arrowup']) dy -= 1;
    if (keys['s'] || keys['arrowdown']) dy += 1;
    if (keys['a'] || keys['arrowleft']) dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;
    const len = Math.hypot(dx, dy);
    if (len) { this.x += (dx / len) * speed; this.y += (dy / len) * speed; }
  }
}