const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 25 + 10;
    this.speed = Math.random() * 2 + 1;
    this.color = `rgba(${Math.floor(Math.random()*255)}, 
                       ${Math.floor(Math.random()*100)}, 
                       ${Math.floor(Math.random()*150)}, 0.8)`;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y - this.size,
                      this.x - this.size, this.y + this.size / 2,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 2,
                      this.x + this.size, this.y - this.size,
                      this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.y -= this.speed;
    this.draw();
  }
}

let hearts = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hearts.length < 150) {
    hearts.push(new Heart());
  }
  hearts.forEach((heart, index) => {
    heart.update();
    if (heart.y < -30) {
      hearts.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

animate();
