function WorldManager()
{
    this.objects = [];
    this.dt = 0.1;
}

WorldManager.prototype.step = function()
{
    for (obj in this.objects)
        obj.step(this.dt);
}

WorldManager.prototype.addObject = function()
{
}

WorldManager.prototype.addBall = function(position, radius)
{
    var ball = new PhysicsBall(position, radius)
    this.objects[this.objects.length] = ball;
}

worldmanager = new WorldManager();
