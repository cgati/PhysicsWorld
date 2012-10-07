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

WorldManager.prototype.addBall = function(position, radius)
{
    var ball = new PhysicsBall(position, radius)
    this.objects[this.objects.length] = ball;
}

WorldManager.prototype.addBox = function(top_left, bot_right)
{
    var box = new PhysicsBox(top_left, bot_right)
    this.objects[this.objects.length] = box;
}

worldmanager = new WorldManager();
