function HandTool(button)
{
    this.button = button;
    this.draggedObj = null;
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
    }
}

HandTool.prototype.onMouseUp = function(event)
{
    if (this.draggedObj)
    {
        this.draggedObj.physics.grabbed = false;
        this.draggedObj.physics.velocity.x = 0;
        this.draggedObj.physics.velocity.y = 0;
        this.draggedObj = null;
    }
}
