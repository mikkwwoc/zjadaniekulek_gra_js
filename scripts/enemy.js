class Enemy extends Entity {
  constructor() {
    super(Math.random()*canvas.width, Math.random()*canvas.height, 30+Math.random()*20, '#dc3545');
    this.spawnTime = 2000;
    this.active = false;
    this.speed = 3.2;
    this.lastDirChange = 0;
    this.vx = 0;
    this.vy = 0;
  }

  update(delta, player, allEnemies, foods) {
    this.spawnTime -= delta;
    if (this.spawnTime <= 0) this.active = true;

    this.lastDirChange -= delta;
    if (this.lastDirChange <= 0) {
      this.lastDirChange = 2000 + Math.random()*1000;

      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 300) {
        if (this.radius > player.radius * 1.1) {
          this.vx = (dx / dist) * this.speed;
          this.vy = (dy / dist) * this.speed;
        } else if (this.radius < player.radius * 0.9) {
          this.vx = -(dx / dist) * this.speed;
          this.vy = -(dy / dist) * this.speed;
        }
      } else {
        this.vx = (Math.random() - 0.5) * this.speed;
        this.vy = (Math.random() - 0.5) * this.speed;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
    if (this.x < this.radius || this.x > canvas.width - this.radius) this.vx *= -1;
    if (this.y < this.radius || this.y > canvas.height - this.radius) this.vy *= -1;

    if (!this.active) return;
    foods.forEach((f, i) => {
      if (this.collidesWith(f) && this.radius > f.radius * 1.1) {
        this.radius += f.radius * 0.2;
        foods.splice(i, 1);
        foods.push(new Food());
      }
    });

    allEnemies.forEach((e, i) => {
      if (e !== this && this.collidesWith(e) && this.radius > e.radius * 1.1 && e.active && this.active) {
        this.radius += e.radius * 0.3;
        allEnemies.splice(i, 1);
        allEnemies.push(new Enemy());
      }
    });
  }

  draw() { super.draw(this.active ? 1 : 0.3); }
}