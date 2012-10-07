var worldmanager = new WorldManager();

var handtool;
var drawtool;
var toolbox;

window.onload = function()
{
    paper.setup('myCanvas');

    handtool = new HandTool(document.getElementById('dragObject'));
    drawtool = new DrawTool(document.getElementById('drawObject'), worldmanager);
    toolbox = new ToolBox([drawtool, handtool]);

    paper.view.onFrame = function(event)
    {
        worldmanager.step(event);
    }
}
