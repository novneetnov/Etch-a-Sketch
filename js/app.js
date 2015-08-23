$(document).ready(function(){
	var numSquare = 8;
	var settings = {standard: true, randColor: false, opacity: false, randOpacity: false, trail: false};
	var currSetting = 'standard';

	makeGrid(numSquare); 
	
	var setSettings = function(param){
		for(key in settings){
			settings[key] = false;
			if(key == param){
				settings[key] = true;
				currSetting = param;
			}
		}
		console.log(settings);
	};

	$('#squareSide').click(function () {
		new_numSquare = Number(prompt('Please enter a grid size [1-64]', 8));
		if (new_numSquare){
			numSquare = new_numSquare;
			makeGrid(numSquare);
			mouseHandler();
		}
	});	

	$('#standard').click(function(){
		setSettings('standard');
		mouseHandler();
	});

	$('#randColor').click(function(){
		setSettings('randColor');
	});

	$('#opacity').click(function(){
		setSettings('opacity');
	});
	
	$('#randOpacity').click(function(){
		setSettings('randOpacity');
	});

	$('#trail').click(function(){
		setSettings('trail');
	});
	$('#clear').click(function(){
		makeGrid(numSquare);
		mouseHandler();
	});

	var mouseHandler = function(){
		$('.square').hover(function(evt) {
			switch(currSetting){
				case 'standard':
					$(this).css('background-color', 'white');
					break;
				case 'randColor':
					$(this).css('background-color', genRandColor());
					break;
				case 'opacity':
					var curr_color = $(this).css('background-color');
					var new_color = makeOpaque(curr_color);
					$(this).css('background-color', new_color);
					break;
				case 'randOpacity':
					var th = $(this);
					if(!th.hasClass("randOpa")){
						th.css('background-color', genRandColor());
						th.addClass("randOpa");
					} else {
						var curr_color = $(this).css('background-color');
						var new_color = makeOpaque(curr_color);
						$(this).css('background-color', new_color);
					}
					break;
				case 'trail':	
					$(this).css('opacity', 0);
					break;
			}
	
		},	
		function(evt){
			switch(currSetting){
				case 'trail':
					$(this).animate({opacity: 1}, 400, 'linear');
					break;
			}
		});
	};
	mouseHandler();
});

var makeGrid = function(numSquare){
	console.log(numSquare);
	var square = "";
	for (var i = 0; i < numSquare * numSquare; i++) {
			square += '<div class="square"></div>';
	}

	var grid = $('#grid');
	grid.empty();
	grid.append(square);
	grid.width(grid.height());
	var gridWidth = grid.width();
	var squareId = $('.square');
	var squareWidth = (gridWidth - 2*numSquare - 1) / numSquare ;
	squareId.width(squareWidth);	
	squareId.height(squareWidth);
};

var genRandColor = function(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
	return 'rgb(' + red + ',' + green + ',' + blue + ')';
};

var makeOpaque = function(color){
	var new_rgb = color.substring(4, color.length-1).split(',');
	for (var i = 0; i < new_rgb.length; i++){
		new_rgb[i] = Math.min(Number(new_rgb[i]) + 40, 255);
	}
	var new_color = 'rgb(' + new_rgb.join() + ')';
	return new_color;
};


