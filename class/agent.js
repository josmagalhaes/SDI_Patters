class Agent {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
    this.acc_limit = random(0.23, 0.35);
    this.speed_limit = random(2, 3.5);

    this.cohesion = createVector();
    this.repulsion = createVector();
  }

  jumpscare() {
    this.getMouse(createVector(random(width), random(height)));
    this.vel = createVector(10, 10);
  }

  update() {
    this.move();
    this.checkEdge();
    this.display();
  }

  updatecooldown() {
    this.move(true);
    this.checkEdge();
    this.display();
  }

  move(cooldown) {
    if (!cooldown) {
      this.getMouse(epicenter);
      this.vel.limit(this.speed_limit);
    }
    this.keepCohesion();
    //this.keepRepulsion();

    this.acc.limit(this.acc_limit);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  keepRepulsion() {
    for (let other of agents) {
      let dist = p5.Vector.sub(other.pos, this.pos);
      let dist_v = dist.mag();
      if (dist_v < 5 && other != this) {
        let f = map(dist_v, 0, 5, 1, 0)
        dist.mult(-f);
        this.repulsion.add(dist);
      }
    }
    this.acc.add(this.repulsion)
  }

  keepCohesion() {
    let count = 0;
    for (let other of agents) {
      let dist = p5.Vector.sub(other.pos, this.pos);
      let dist_v = dist.mag();
      if (dist_v < 80 && other != this) {
        this.cohesion.add(dist);
        count++;
      }
    }
    if (count > 0) {
      this.cohesion.mult(1 / count);
      this.acc.add(this.cohesion)
    }
  }

  getMouse(epicenter) {
    let mouse_pos = epicenter;
    let force = p5.Vector.sub(mouse_pos, this.pos);
    //force.mult(-1)
    this.acc.add(force)
  }

  display() {
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }

  checkEdge() {
    if (this.pos.x < 0) {
      this.pos.x = width
    }
    if (this.pos.x > width) {
      this.pos.x = 0
    }
    if (this.pos.y < 0) {
      this.pos.y = height
    }
    if (this.pos.y > height) {
      this.pos.y = 0
    }
  }
}