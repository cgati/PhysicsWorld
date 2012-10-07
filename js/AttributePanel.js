function AttributeOnClick()
{
	var is_static = document.getElementById('is_static').checked;
	var velocity_x = document.getElementById('vel-x').value;
	var velocity_y = document.getElementById('vel-y').value;
	var mass = document.getElementById('mass').value;
	var restitution = document.getElementById('rest').value;
	var angular_vel = document.getElementById('angvel').value;
	var color = document.getElementById('color').value;

	if(!isNumber(is_static))
		is_static = 0;
	if(!isNumber(velocity_x))
		velocity_x = 0;
	if(!isNumber(velocity_y))
		velocity_y = 0;
	if(!isNumber(mass))
		mass = 0;
	if(!isNumber(restitution))
		restitution = 0;
	if(!isNumber(angular_vel))
		angular_vel = 0;
	if(color == "")
		color = 'black';

	worldmanager.defaults.merge(new PhysicsAttributes(
		is_static,
		new paper.Point(velocity_x, velocity_y),
		mass,
		restitution,
		angular_vel,
		color));
}

function isNumber(n)
{
	return !isNaN(parseFloat(n)) && isFinite(n);
}