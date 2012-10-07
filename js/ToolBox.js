function ToolBox(toollist)
{
    this.selected_tool = null;
    this.tool = new paper.Tool();

    if (!toollist)
        this.toollist = [];
    else
        this.toollist = toollist;

    // I would have subclassed paper.Tool, but the within the on* event
    // handelers of a tool, 'this' refers to an internal private variable of
    // paper.js
    var me = this;
    this.tool.onMouseDown = function(event)
    {
        if (me.selected_tool.onMouseDown)
            me.selected_tool.onMouseDown(event);
    }

    this.tool.onMouseUp = function(event)
    {
        if (me.selected_tool.onMouseUp)
            me.selected_tool.onMouseUp(event);
    }

    this.tool.onMouseDrag = function(event)
    {
        if (me.selected_tool.onMouseDrag)
            me.selected_tool.onMouseDrag(event);
    }
}

ToolBox.prototype.select = function(tool)
{
    if (this.selected_tool === tool)
    {
        this.selected_tool = null;
        tool.deselect();
    }
    else
    {
        this.selected_tool = tool;
        tool.select();

        //Tell the gui to deselect all the other tool buttons
        var len =this.toollist.length
        for (i=0; i<len; i++)
        {
            if (this.toollist[i] !== tool)
                this.toollist[i].deselect();
        }
    }
}
