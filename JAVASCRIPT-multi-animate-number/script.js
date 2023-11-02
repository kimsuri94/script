var target = document.querySelectorAll('div');

for(var i = 0; i<target.length;i++){
	init(i);
	function init(x){
		var num = 0;
		var timer = setInterval(function(){
			++num;
			target[x].innerHTML = num;
			if(num == target[x].getAttribute('data-rate')){
				clearInterval(timer);
			}
		},10);
	}
}