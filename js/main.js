//регулятор
{	
	//иницализация всех размеров для регулятора
	function initDimensions() {
		var hf_maxPx = maxPx/2;
		var hf_window = window.innerWidth/2;
		var min_maxPx = hf_window - hf_maxPx;
		var max_maxPx = hf_window - hf_maxPx;	
		if(window.innerWidth >= 750)
			var maxPx = 750;
		else{
			var maxPx = 750 - (750 - window.innerWidth);
			maxPx = maxPx -50;
		}
		var percent = maxPx/100;
		return [maxPx, percent, hf_maxPx, hf_window, min_maxPx, max_maxPx]
	}
	window.onresize = function(){
	  let [maxPx, percent, hf_maxPx, hf_window, min_maxPx, max_maxPx] = initDimensions();
	}	
	let [maxPx, percent, hf_maxPx, hf_window, min_maxPx, max_maxPx] = initDimensions();

	var slider_img = document.getElementsByClassName('slider_img')[0];
	var regulator = document.getElementsByClassName('regulator')[0];

	var permit_1 = false;
	var permit_2 = true;
	//Событие для установления нажатия мыши на ползунок
	slider_img.addEventListener('mousedown' , function(event) {

		permit_1 = true;
	});
	window.addEventListener('mouseup' , function() {permit_1 = false;});
	//Событие для установления нахождение курсора над элементом regulator
	regulator.addEventListener('mouseenter' , function(event) {
	//если курсор вышел из поля регулятора при удержание нажатой мыши, то решаеться где будет ползунок ,при появление курсора в зоне регулятора
		if(permit_1){
			if(min_maxPx < event.pageX || max_maxPx > event.pageX){
				if( window.innerWidth/2 < event.pageX) slider_img.style.left = '100%';
				else slider_img.style.left = '-1%';
			}				
		}
		permit_2 = true;
	});
	regulator.addEventListener('mouseleave' , function(event) {permit_2 = false;});	
	
	
	//старая кордината
	var oldX;
	window.onmousemove = function(event){
		if(permit_2 && permit_1){
			//получаем текущее количество пикселей
			var strLeft = slider_img.style.left;
			var px = strLeft.slice(0,strLeft.length-1);
			//Если новая кордината больше старой, то прибавляем текущая кордината 
			if(event.pageX>oldX){
				var newX = (event.pageX - oldX);
				nextPercents = Number(px)+(newX/percent);
				if(nextPercents > 98.5) {
					nextPercents = 98.5;
				}
				slider_img.style.left = nextPercents+'%';

							
			}
			//Если новая кордината меньше старой, то прибавляем текущая кордината
			if(event.pageX<oldX){
				var newX = oldX - event.pageX; 
				nextPercents = Number(px)-(newX/percent);
				if(nextPercents < -1) {
					nextPercents = -1;
				}
				
				slider_img.style.left = nextPercents+'%';
			}
		}
		if(permit_2)
			oldX = event.pageX;
	}
}