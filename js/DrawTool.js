function DrawTool(button, worldmanager)
{
    this.button = button;
    this.path = null;
    this.worldmanager = worldmanager;
}
DrawTool.prototype = new PhysicsTool();
DrawTool.prototype.constructor = DrawTool;

DrawTool.prototype.onMouseDown = function(event)
{
    this.path = new paper.Path();
    this.path.strokeColor = 'blue';
    this.path.strokeWidth = 20;
    this.path.add(event.point);
    this.path.strokeWidth = 5;
}

DrawTool.prototype.onMouseDrag  = function(event)
{
    this.path.add(event.point);
}

DrawTool.prototype.onMouseUp = function(event)
{
    var seg_points = new Array();

    //The path object gives back an arrau of segment objects which have a
    //point property. The recognizer needs an array of points, so we have
    //to construct a new array here.
    for(var i = 0; i < this.path.segments.length; i++)
        seg_points[i] = this.path.segments[i].point;

    //Run the recognizer to check if it's a circle
    var recog = new DollarRecognizer();
    var result = recog.Recognize(seg_points, true);
    console.log("Recognizer result:" + result.Name + ", " +
            Math.round(result.Score*100)/100);

    //Insert a new ball if the drawing is a circle
    var b = this.path.bounds;
    var radius = (b.width + b.height)/4;
    switch (result.Name)
    {
        case 'circle':
            this.worldmanager.addBall(b.center, radius);
            break;
        case 'rectangle':
            this.worldmanager.addBox(b.topLeft, b.bottomRight);
            break;
        case 'triangle':
            // Don't know why the above radius works so well
            // here. It only makes/takes equalateral triangles
            this.worldmanager.addTri(b.center, radius);
            break;
    }

    this.path.remove();
}
