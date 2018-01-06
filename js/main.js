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
		return [maxPx, percent, hf_maxPx, hf_window, min_maxPx, max_maxPx];
	}
	window.onresize = function(){
	  [maxPx, percent, hf_maxPx, hf_window, min_maxPx, max_maxPx] = initDimensions();
	  console.log('sdf');
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
//чекбоксы с одним варинтом
{
	var only_choice_checkbox = document.getElementsByClassName('only_choice_checkbox');
	for (var i = only_choice_checkbox.length - 1; i >= 0; i--) {
		only_choice_checkbox[i].addEventListener('click' , function () {
			var checkboxAct = document.getElementsByClassName('checked')[0];
			if(checkboxAct){
				checkboxAct.checked = false;
				checkboxAct.classList.remove("checked");
			}
			this.classList.add("checked");
		});
	}
}
//Календарь
{
	function calendar(id, year, month) {
		var Dlast = new Date(year,month+1,0).getDate(),
		    D = new Date(year,month,Dlast),
		    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
		    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
		    calendar = '<tr>',
		    month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
		if (DNfirst != 0) {
		  for(var  i = 1; i < DNfirst; i++) calendar += '<td class="day_cal">';
		}else{
		  for(var  i = 0; i < 6; i++) calendar += '<td class="day_cal">';
		}
		for(var  i = 1; i <= Dlast; i++) {
		  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
		    calendar += '<td class="today day_cal">' + i;
		  }else{
		    calendar += '<td class="day_cal">' + i;
		  }
		  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
		    calendar += '<tr>';
		  }
		}
		for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
		document.querySelector('#'+id+' tbody').innerHTML = calendar;
		document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = '<span id="month">'+month[D.getMonth()]+'</span>'+' '+ '<span id="year">'+D.getFullYear()+'</span>';
		document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
		document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
		if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
		    document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
		}
				
		var day_cal = document.getElementsByClassName('day_cal');
		for (var i = day_cal.length - 1; i >= 0; i--) {
		day_cal[i].addEventListener('click' , function () {
			var day = this.innerHTML;
			var month = document.getElementById('month').innerHTML;
			var year = document.getElementById('year').innerHTML;
			document.getElementById('date').value = day+' '+month+' '+year;
			document.getElementById('calendar').style.display = 'none';
		});
	}		
	}
	calendar("calendar", new Date().getFullYear(), new Date().getMonth());
	// переключатель минус месяц
	document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
	  calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
	}
	// переключатель плюс месяц
	document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
	  calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
	}
	var date = document.getElementById('date');
	date.addEventListener('focus',function() {
		document.getElementById('calendar').style.display = 'block';
	});

}