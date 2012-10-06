function PhysicsObject(position)
{
    this.position = null;
    this.velocity = null;

    this.rotation = null;
    this.rot_vel = null;

    this.mass = 0;
    this.restitution = 1;
    this.is_static = false;

    this.shape = null;
}

PhysicsObject.prototype.step = function(dt)
{
    this.position.add(velocity.normalize(velocity.length*dt));
    this.shape.moveTo(position);
    this.rotation += rot_vel*dt;
}

function PhysicsBall(position, radius)
{
    PhysicsObject.apply(this, [position]);
    this.shape = new paper.Path.Circle(position, radius);
    this.shape.fillColor = 'black';
}
PhysicsBall.prototype = new PhysicsObject();
PhysicsBall.prototype.constructor = PhysicsBall;
