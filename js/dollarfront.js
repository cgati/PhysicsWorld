// This is for mouse and button events
//
// Startup
//
var _isDown, _points, _r, _g, _rc;
function onLoadEvent()
{
	document.onselectstart = function() { return false; }
	document.onmousedown = function() { return false; }
	_points = new Array();
	_r = new DollarRecognizer();

	var canvas = document.getElementById('myCanvas');
	_g = canvas.getContext('2d');
	_g.fillStyle = "rgb(0,0,225)";
	_g.strokeStyle = "rgb(0,0,225)";
	_g.lineWidth = 3;
	_g.font = "16px Gentilis";
	_rc = getCanvasRect(canvas); // canvas rect on page
	_g.fillStyle = "rgb(255,255,136)";
	_g.fillRect(0, 0, _rc.width, 20);

	_isDown = false;
}

function getCanvasRect(canvas)
{
	var w = canvas.width;
	var h = canvas.height;

	var cx = canvas.offsetLeft;
	var cy = canvas.offsetTop;
	while (canvas.offsetParent != null)
	{
		canvas = canvas.offsetParent;
		cx += canvas.offsetLeft;
		cy += canvas.offsetTop;
	}
	return {x: cx, y: cy, width: w, height: h};
}

function getScrollY()
{
	var scrollY = 0;
	if (typeof(document.body.parentElement) != 'undefined')
	{
		scrollY = document.body.parentElement.scrollTop; // IE
	}
	else if (typeof(window.pageYOffset) != 'undefined')
	{
		scrollY = window.pageYOffset; // FF
	}
	return scrollY;
}
//
// Mouse Events
//
function mouseDownEvent(x, y)
{
	x -= _rc.x;
	y -= _rc.y - getScrollY();
	if (_points.length > 0)
	{
		_g.clearRect(0, 0, _rc.width, _rc.height);
	}
	_points.length = 1;
	_points[0] = new Point(x, y);
	drawText("Recording unistroke...");
	_g.fillRect(x - 4, y - 3, 9, 9);
	_isDown = true;
}

function mouseMoveEvent(x, y)
{
	if (_isDown)
	{
		x -= _rc.x;
		y -= _rc.y - getScrollY();
		_points[_points.length] = new Point(x, y); // append
		drawConnectedPoint(_points.length - 2, _points.length - 1);
	}
}

//_points[i] = segement[i].point

function mouseUpEvent(x, y)
{
	if (_isDown)
	{
		_isDown = false;
		if (_points.length >= 10)
		{
			var result = _r.Recognize(_points, true);
			drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");
			grabName(result.Name);
		}
		else // fewer than 10 points were inputted
		{
			drawText("Too few points made. Please try again.");
		}
	}
}

function drawText(str)
{
	_g.fillStyle = "rgb(255,255,136)";
	_g.fillRect(0, 0, _rc.width, 20);
	_g.fillStyle = "rgb(0,0,255)";
	_g.fillText(str, 1, 14);
}

function drawConnectedPoint(from, to)
{
	_g.beginPath();
	_g.moveTo(_points[from].X, _points[from].Y);
	_g.lineTo(_points[to].X, _points[to].Y);
	_g.closePath();
	_g.stroke();
}

function round(n, d) // round 'n' to 'd' decimals
{
	d = Math.pow(10, d);
	return Math.round(n * d) / d
}
//
// Template Adding and Clearing
//
function onClickAddExisting()
{
	if (_points.length >= 10)
	{
		var templates = document.getElementById('templates');
		var name = templates[templates.selectedIndex].value;
		var num = _r.AddTemplate(name, _points);
		drawText("\"" + name + "\" added. Number of \"" + name + "\"s defined: " + num + ".");
	}
}

function onClickAddCustom()
{
	var name = document.getElementById('custom').value;
	if (_points.length >= 10 && name.length > 0)
	{
		var num = _r.AddTemplate(name, _points);
		drawText("\"" + name + "\" added. Number of \"" + name + "\"s defined: " + num + ".");
	}
}

function onClickCustom()
{
	document.onselectstart = function() { return true; }
	document.onmousedown = function() { return true; }
	document.getElementById('custom').select();
	document.onselectstart = function() { return false; }
	document.onmousedown = function() { return false; }
}

function onClickDelete()
{
	var num = _r.DeleteUserTemplates(); // deletes any user-defined templates
	alert("All user-defined templates have been deleted. Only the 1 predefined unistroke gesture remains for each of the " + num + " gesture types.");
}
