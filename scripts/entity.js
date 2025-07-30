class Entity {
  constructor(x, y, radius, color) {
    this.x = x; this.y = y; this.radius = radius;
    this.color = color;
  }

  draw(alpha = 1) {
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  distanceTo(other) {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }

  collidesWith(other) {
    return this.distanceTo(other) < this.radius + other.radius;
  }
}