class Food extends Entity {
  constructor() {
    super(Math.random()*canvas.width, Math.random()*canvas.height, 4+Math.random()*4, '#28a745');
  }
}