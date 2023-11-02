const tabMenu = document.querySelectorAll('.tab-menu li');
const tabContent = document.querySelectorAll('#tab-content > div');
const highLight = document.querySelector('.highlight');
console.log(tabContent);

tabMenu.forEach(function(item, idx){
	item.addEventListener('click', function(e){
		e.preventDefault();
		showContent(idx);
		moveHightlight(idx);
	});
});
function showContent(num){
	tabContent.forEach(function(item){
		item.style.display = 'none';
	});
	tabContent[num].style.display = 'block';
}
function moveHightlight(num){
	const newLeft = tabMenu[num].offsetLeft;
	const newWidth = tabMenu[num].offsetWidth;
	console.log(newWidth);
	highLight.style.left = newLeft + 'px';
	highLight.style.width = newWidth + 'px';
}