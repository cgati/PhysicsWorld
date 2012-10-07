function PhysicsObject() { }

PhysicsObject.prototype.initiallize = function(shape)
{
    this.shape = shape;
    this.shape.physics = this;

    this.position = shape.bounds.center;
    this.velocity = new paper.Point(0, 0);

    this.angular_vel = 0;

    this.mass = 0;
    this.restitution = 1;
    this.is_static = false;
}

PhysicsObject.prototype.step = function(delta)
{
    this.position = this.position.add(this.velocity.normalize(this.velocity.length*delta));
    this.shape.position = this.position;
    this.shape.rotate(this.angular_vel*delta);
};

function PhysicsBox(top_left, bot_right)
{
    var shape = new paper.Path.Rectangle(top_left, bot_right);
    shape.fillColor = 'black';
    this.initiallize(shape);
}
PhysicsBox.prototype = new PhysicsObject();
PhysicsBox.prototype.constructor = PhysicsBox;

//Creates a ball with center at given position and with given radius
function PhysicsBall(position, radius)
{
    var shape = new paper.Path.Circle(position, radius);
    shape.fillColor = 'black';
    this.initiallize(shape);
}
PhysicsBall.prototype = new PhysicsObject();
PhysicsBall.prototype.constructor = PhysicsBall;
