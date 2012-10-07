function PhysicsObject(position)
{
    this.position = position;
    this.velocity = new Point(0, 0);

    this.rotation = 0;
    this.rot_vel = 0;

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

function PhysicsBox(top_left, bot_right)
{
    var position = new paper.Point((top_left.x + bot_right.x)/2, 
                                   (top_left.y + bot_right.y)/2);
    PhysicsObject.apply(this, [position]);
    this.shape = new paper.Path.Rectangle(top_left, bot_right);
    this.shape.fillColor = 'black';
}
PhysicsBox.prototype = new PhysicsObject();
PhysicsBox.prototype.constructor = PhysicsBox;

//Creates a ball with center at given position and with given radius
function PhysicsBall(position, radius)
{
    PhysicsObject.apply(this, [position]);
    this.shape = new paper.Path.Circle(position, radius);
    this.shape.fillColor = 'black';
}
PhysicsBall.prototype = new PhysicsObject();
PhysicsBall.prototype.constructor = PhysicsBall;
