$(document).ready(function()
{
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var cw = 20;
	var dir;
	var foodBlock;
	var score;
	var snake_array;
	var headImg = new Image();
	headImg.src = 'tile.png';
	game_loop = setInterval(paint, 61);

	function init()
	{
		snake_array = [];
		for (var i = 0; i < 5; i++) {
			snake_array.push({ x: 4-i, y: 0 });
		}
		addFood();

		dir = "right";
		score = 0;
	}
	init();

	function addFood()
	{
		foodBlock = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw),
		};
	}

	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		if      (dir == "right") nx++;
		else if (dir == "left")  nx--;
		else if (dir == "up")    ny--;
		else if (dir == "down")  ny++;

		if (nx == -1 || nx == w/cw ||
			ny == -1 || ny == h/cw ||
			check_collision(nx, ny, snake_array)) {
			init();
			return;
		}

		if (nx == foodBlock.x && ny == foodBlock.y) {
			var tail = { x: nx, y: ny };
			score++;
			addFood();
		} else {
			var tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
		}

		snake_array.unshift(tail);

		for(var i = 1; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			ctx.fillStyle = "green";
			ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		}
		var head = snake_array[0];
		ctx.drawImage(headImg, head.x*cw, head.y*cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(head.x*cw, head.y*cw, cw, cw);

		ctx.fillStyle = "red";
		ctx.fillRect(foodBlock.x*cw, foodBlock.y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(foodBlock.x*cw, foodBlock.y*cw, cw, cw);
		$("#score").text("Счёт: " + score);

		ctx.strokeStyle = "#444";
		ctx.strokeRect(0, 0, w, h);
	}

	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}

	$(document).keydown(function(e) {
		var key = e.which;

		if      (key == "65" && dir != "right") dir = "left";
		else if (key == "87" && dir != "down")  dir = "up";
		else if (key == "68" && dir != "left")  dir = "right";
		else if (key == "83" && dir != "up")    dir = "down";
	})
})

