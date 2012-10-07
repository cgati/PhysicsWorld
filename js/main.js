getting_path = false;
moveObj = false;

window.onload = function()
{
    paper.setup('myCanvas');

    var path;
    var box;
    var draggedObj;
    var tool = new paper.Tool();
    tool.onMouseDown = function(event)
    {
        if(moveObj){
            var hitResult = paper.project.hitTest(event.point);
            if(hitResult){
                draggedObj = hitResult.item;
                draggedObj.physics.grabbed = true;
            }
        }
        else if (getting_path)
        {
            path = new paper.Path();
            path.strokeColor = 'blue';
            path.strokeWidth = 20;
            path.add(event.point);
            path.strokeWidth = 5;
        }
        else
        {
            worldmanager.addBall(event.point, Math.random()*10);
            console.log("Got Ball!");
        }

    }

    tool.onMouseDrag = function(event)
    {
        if(getting_path && !moveObj)
        {
            path.add(event.point);
        }

        else if(draggedObj)
        {
            draggedObj.position = event.point;
            draggedObj.physics.position = event.point;
        }
    }

    tool.onMouseUp = function(event)
    {
        if (draggedObj)
        {
            draggedObj.physics.grabbed = false;
            draggedObj.physics.velocity.x = 0;
            draggedObj.physics.velocity.y = 0;
            draggedObj = null;
        }

        if (getting_path)
        {
            var seg_points = new Array();

            //The path object gives back an arrau of segment objects which have a
            //point property. The recognizer needs an array of points, so we have
            //to construct a new array here.
            for(var i = 0; i < path.segments.length; i++)
                seg_points[i] = path.segments[i].point;

            //Run the recognizer to check if it's a circle
            var recog = new DollarRecognizer();
            var result = recog.Recognize(seg_points, true);
            console.log("Recognizer result:" + result.Name + ", " +
                        Math.round(result.Score*100)/100);

            //Insert a new ball if the drawing is a circle
            switch (result.Name)
            {
                case 'circle':
                    var b = path.bounds;
                    var radius = (b.width + b.height)/4;
                    worldmanager.addBall(b.center, radius);
                    break;
                case 'rectangle':
                    var b = path.bounds;
                    worldmanager.addBox(b.topLeft, b.bottomRight);
                    break;
                case 'triangle':
                    var b = path.bounds;
                    var radius = (b.width + b.height)/4;
                    worldmanager.addTri(b.center, radius);
            }

            path.remove();
        }
        
    }

    paper.view.onFrame = function(event)
    {
        worldmanager.step(event);
    }
}
