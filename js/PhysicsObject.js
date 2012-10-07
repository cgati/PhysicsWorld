function PhysicsAttributes(is_static, velocity, angular_vel,
                           mass, restitution, fill_color)
{
    this.is_static    =  is_static;
    this.velocity     =  velocity ? velocity.clone() : undefined;
    this.angular_vel  =  angular_vel;
    this.mass         =  mass;
    this.restitution  =  restitution;
    this.fill_color   =  fill_color;
}

PhysicsAttributes.prototype.merge = function(other)
{
    this.is_static    = (other.is_static===null    ||  other.is_static===undefined  ) ?  this.is_static    :  other.is_static;
    this.velocity     = (other.velocity===null     ||  other.velocity===undefined   ) ?  this.velocity     :  other.velocity;
    this.angular_vel  = (other.angular_vel===null  ||  other.angular_vel===undefined) ?  this.angular_vel  :  other.angular_vel;
    this.mass         = (other.mass===null         ||  other.mass===undefined       ) ?  this.mass         :  other.mass;
    this.restitution  = (other.restitution===null  ||  other.restitution===undefined) ?  this.restitution  :  other.restitution;
    this.fill_color   = (other.fill_color===null   ||  other.fill_color===undefined ) ?  this.fill_color   :  other.fill_color;
};

function PhysicsObject(shape, defaults) {}
PhysicsObject.prototype.initiallize = function(shape, defaults)
{
    this.shape = shape;
    this.shape.physics = this;
    this.position = shape.bounds.center;
    this.setAttributes(defaults);
    this.grabbed = false;
}

PhysicsObject.prototype.getAttributes = function()
{
    return new PhysicsAttributes(
        this.is_static,
        this.velocity,
        this.angular_vel,
        this.mass,
        this.restitution,
        this.shape.fillColor
    );
}

PhysicsObject.prototype.setAttributes = function(attributes)
{
    this.is_static = attributes.is_static;
    this.velocity = attributes.velocity.clone();
    this.angular_vel = attributes.angular_vel;
    this.mass = attributes.mass;
    this.restitution = attributes.restitution;
    this.shape.fillColor = attributes.fill_color;
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


function PhysicsTriangle(position, radius, defaults){
    var shape = new paper.Path.RegularPolygon(position, 3, radius);
    shape.fillColor = defaults.fill_color;
    this.initiallize(shape, defaults);
}
PhysicsTriangle.prototype = new PhysicsObject();
PhysicsTriangle.prototype.constructor = PhysicsTriangle;
