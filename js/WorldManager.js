function WorldManager()
{
    this.objects = new Array();
    this.paused = false;

    this.defaults = {
        is_static: false,
        velocity: new paper.Point(0, 0),
        angular_vel: 0,
        mass: 0,
        restitution: 0,

        fill_color: 'black'
    };

    this.world_settings = {
        gravity: new paper.Point(0, 2)
    };
}

WorldManager.prototype.step = function(event)
{
    if (!this.paused)
    {
        var len = this.objects.length;
        for (i=0; i<len; i++)
        {
            this.objects[i].step(event.delta);
            this.objects[i].velocity = this.objects[i].velocity.add(this.world_settings.gravity);
        }
    }
}

WorldManager.prototype.addBall = function(position, radius)
{
    var ball = new PhysicsBall(position, radius, this.defaults)
    this.objects[this.objects.length] = ball;
}

WorldManager.prototype.addBox = function(top_left, bot_right)
{
    var box = new PhysicsBox(top_left, bot_right, this.defaults)
    this.objects[this.objects.length] = box;
}

WorldManager.prototype.addTri = function(position, radius)
{
    var tri = new PhysicsTriangle(position, radius, this.defaults)
    this.objects[this.objects.length] = tri;
}

worldmanager = new WorldManager();
