function PhysicsObject(){}

function PhysicsAttributes(is_static, velocity, angular_vel, mass, 
                    restitution, fill_color)
{
    this.velocity = velocity === null || velocity === undefined ? null : velocity.clone();
    this.is_static = is_static;
    this.angular_vel = angular_vel;
    this.mass = mass;
    this.restitution = restitution;
    this.fill_color = fill_color;
}

PhysicsAttributes.prototype.merge = function(other)
{
    console.log(other);
    this.is_static = other.is_static === null ? this.is_static : other.is_static;
    this.velocity = other.velocity === null ? this.velocity : other.velocity.clone();
    this.angular_vel = other.angular_vel === null ? this.angular_vel : other.angular_vel;
    this.mass = other.mass === null ? this.mass : other.mass;
    this.fill_color = other.fill_color === null ? this.fill_color : other.fill_color;
};

PhysicsObject.prototype.initiallize = function(shape, defaults)
{
    this.position = shape.bounds.center;
    this.shape = shape;
    this.shape.physics = this;
    this.grabbed = false;
    this.attributes = new PhysicsAttributes();
    this.attributes.merge(defaults);
    console.log(this.attributes);
};

PhysicsObject.prototype.step = function(delta)
{
    if (this.attributes.is_static || this.grabbed)
        return;

    this.position = this.position.add(this.attributes.velocity.normalize(this.attributes.velocity.length*delta));
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

function PhysicsTriangle(position, radius, defaults){
    var shape = new paper.Path.RegularPolygon(position, 3, radius);
    shape.fillColor = defaults.fill_color;
    this.initiallize(shape, defaults);
}

PhysicsTriangle.prototype = new PhysicsObject();
PhysicsTriangle.prototype.constructor = PhysicsTriangle;
