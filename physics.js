var physics = function() {	
  
var stage = document.getElementById('stage');
			
var browserX = window.screenX;
var browserY = window.screenY;
var balls = [];
var total = 1;
var currentDrag = null;
var mouseX = 0;
var mouseY = 0;
var stageWidth = $(stage).width();
var stageHeight = $(stage).height();
stage.width = stageWidth;
stage.height = stageHeight;
			
generate();
			
var drawingCanvas = document.getElementById('stage');
if(drawingCanvas.getContext)
{
	var context = drawingCanvas.getContext('2d');
	setInterval(render, 20);
}
			
			
function generate()
{
	for(var i = 0; i < total; i++)
	{
		var ball = {};
		ball.color = "#" + genHex();
		ball.bounce = .4;
		ball.vx = Math.random() * 20 - 5;
		ball.vy = Math.random() * 30 - 10;
		ball.size = 15;
		ball.x = Math.random() * stageWidth;
		ball.y = Math.random() * stageHeight;
		balls[balls.length] = ball;
	}
}
			
function genHex()
{
	colors = new Array(14)
	colors[0]="0"
	colors[1]="1"
	colors[2]="2"
	colors[3]="3"
	colors[4]="4"
	colors[5]="5"
	colors[5]="6"
	colors[6]="7"
	colors[7]="8"
	colors[8]="9"
	colors[9]="a"
	colors[10]="b"
	colors[11]="c"
	colors[12]="d"
	colors[13]="e"
	colors[14]="f"
				
	digit = new Array(5)
	color=""
	for (i=0;i<6;i++)
	{
		digit[i]=colors[Math.round(Math.random()*14)]
		color = color+digit[i]
	}
				
	return color;
}
			
function render()
{
	var isChange = (browserX != window.screenX || browserY != window.screenY);
	if(isChange)
	{
		var diffX = browserX - window.screenX;
		browserX = window.screenX;
					
		var diffY = browserY - window.screenY;
		browserY = window.screenY;
	}
				
	var j = balls.length;
	while(--j > -1)
	{
		update(balls[j]);
					
		if(isChange)
		{
			balls[j].vx += (diffX * .05);
			balls[j].vy += (diffY * .1);
		}
	}
				
	draw();
}
			
function draw()
{
	context.clearRect(0, 0, stageWidth, stageHeight);
	var i = balls.length;
	while(--i > -1)
	{
		context.fillStyle = balls[i].color;
		context.beginPath();
		context.arc(balls[i].x,balls[i].y,balls[i].size,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
}
			
function update(ball)
{
	collisionCheck();
				
	var gravity = 1;
	var drag = .99;
		ball.x += ball.vx;
		ball.y += ball.vy;
					
		if ((ball.x + ball.size) > stageWidth)
		{
			ball.x = stageWidth - ball.size;
			ball.vx = -ball.vx * ball.bounce;
		}
		else if((ball.x - ball.size) < 0)
		{
			ball.x = 0 + ball.size;
			ball.vx = -ball.vx * ball.bounce;
		}
					
		if ((ball.y + ball.size) > stageHeight)
		{
			ball.y = stageHeight - ball.size;
			ball.vy = -ball.vy * ball.bounce;
		}
		else if((ball.y - ball.size) < 0)
		{
			ball.y = 0 + ball.size;
			ball.vy = -ball.vy * ball.bounce;
		}
					
		ball.vx = ball.vx * drag - gravity;
		ball.vy = ball.vy * drag; // + gravity;
    
	  // slow down near edge
    if ((ball.x - ball.size) < (stageWidth / 5)) {
      var extra = (1 / ((ball.x - ball.size) / (stageWidth / 8)));
      if (extra > 5) ball.vx += 5;
      else ball.vx += extra;
    }
    
    // Take to middle
    if (ball.y + ball.size < (stageHeight / 2 - 30)) ball.vy += .3;
    if (ball.y - ball.size > (stageHeight / 2 + 30)) ball.vy -= .3;
}
			
			
			
			
function collisionCheck()
{
	var spring = .5;
				
	for(var i = 0; i < (total-1); ++i)
	{
		var ball0 = balls[i];
					
		for(var j = i + 1; j < total; ++j)
		{
			var ball1 = balls[j];
			var dx = ball1.x - ball0.x;
			var dy = ball1.y - ball0.y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			var minDist = ball0.size + ball1.size;
						
			if(dist < minDist)
			{
				var angle = Math.atan2(dy, dx);
				var tx = ball0.x + dx / dist * minDist;
				var ty = ball0.y + dy / dist * minDist;
				var ax = (tx - ball1.x);
				var ay = (ty - ball1.y);
							
							
				ball0.x -= ax;
				ball0.y -= ay;
							
				ball1.x += ax;
				ball1.y += ay;
							
							
				ball0.vx -= (ax * spring);
				ball0.vy -= (ay * spring);
				ball1.vx += (ax * spring);
				ball1.vy += (ay * spring);
			}
		}
	}
}

};