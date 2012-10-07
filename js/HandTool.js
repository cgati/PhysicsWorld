function HandTool(button)
{
    this.button = button;
    this.draggedObj = null;
    this.last_vel = new paper.Point(0,0);
    this.throwing_speed = 10;
}
HandTool.prototype = new PhysicsTool();
HandTool.prototype.constructor = HandTool;

HandTool.prototype.onMouseDown = function(event)
{
    var hitResult = paper.project.hitTest(event.point);
    if(hitResult)
    {
        this.draggedObj = hitResult.item;
        this.draggedObj.physics.grabbed = true;
    }
}

HandTool.prototype.onMouseDrag  = function(event)
{
    if(this.draggedObj !== null)
    {
        this.draggedObj.position = event.point;
        this.draggedObj.physics.position = event.point;
        this.last_vel.x = event.delta.x;
        this.last_vel.y = event.delta.y;
    }
}

HandTool.prototype.onMouseUp = function(event)
{
    if (this.draggedObj)
    {
        this.draggedObj.physics.grabbed = false;
        this.draggedObj.physics.velocity.x = this.last_vel.x*this.throwing_speed;
        this.draggedObj.physics.velocity.y = this.last_vel.y*this.throwing_speed;
        this.draggedObj = null;
    }
}
