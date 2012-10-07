function replaceDiv(hide, show){
	document.getElementById(hide).style.display="none";
	document.getElementById(show).style.display="block";
	moveObj=!moveObj;
}