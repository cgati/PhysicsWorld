function WorldManager()
{
    this.objects = new Array();
    this.gravity = new paper.Point(0,10);
}

WorldManager.prototype.step = function(event)
{
    var len = this.objects.length;
    for (i=0; i<len; i++)
    {
        this.objects[i].step(event.delta);
        this.objects[i].velocity = this.objects[i].velocity.add(this.gravity);
    }
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
