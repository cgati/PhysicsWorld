function PhysicsTool(button)
{
    this.button = button;
}

PhysicsTool.prototype.select = function()
{
    $(this.button).addClass('selected');
};

PhysicsTool.prototype.deselect = function()
{
    $(this.button).removeClass('selected');
}
