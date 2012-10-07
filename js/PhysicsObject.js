function PhysicsObject() { }

PhysicsObject.prototype.initiallize = function(shape, defaults)
{
    this.shape = shape;
    this.shape.physics = this;

    this.position = shape.bounds.center;
    this.velocity = defaults.velocity.clone();
    this.angular_vel = defaults.angular_vel;

    this.mass = defaults.mass;
    this.restitution = defaults.restitution;
    this.is_static = defaults.is_static;

    this.grabbed = false;
}

PhysicsObject.prototype.step = function(delta)
{
    if (this.is_static || this.grabbed)
        return;

    this.position = this.position.add(this.velocity.normalize(this.velocity.length*delta));
    this.shape.position = this.position;
    this.shape.rotate(this.angular_vel*delta);
};

function PhysicsBox(top_left, bot_right, defaults)
{
    var shape = new paper.Path.Rectangle(top_left, bot_right);
    shape.fillColor = defaults.fill_color;
    this.initiallize(shape, defaults);
}
PhysicsBox.prototype = new PhysicsObject();
PhysicsBox.prototype.constructor = PhysicsBox;

//Creates a ball with center at given position and with given
//radius
function PhysicsBall(position, radius, defaults)
{
    var shape = new paper.Path.Circle(position, radius);
    shape.fillColor = defaults.fill_color;
    this.initiallize(shape, defaults);
}
PhysicsBall.prototype = new PhysicsObject();
PhysicsBall.prototype.constructor = PhysicsBall;
