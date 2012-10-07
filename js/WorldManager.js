function WorldManager()
{
    this.objects = new Array();
    this.gravity = new paper.Point(0,2);
    this.paused = false;
}

WorldManager.prototype.step = function(event)
{
    if (!this.paused)
    {
        var len = this.objects.length;
        for (i=0; i<len; i++)
        {
            this.objects[i].step(event.delta);
            this.objects[i].velocity = this.objects[i].velocity.add(this.gravity);
        }
    }
}

WorldManager.prototype.pause = function()
{
    this.paused = true;
}

WorldManager.prototype.play = function()
{
    this.paused = false;
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
