function handleModalable() {
	const links = document.getElementsByClassName('modalable');
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			showModal(this.href);
			return false;
		}
	}
}

function fitModal(e) {
	const scroller = document.getElementById('scroller');
	const rotator = {
		'fit': 'zoom',
		'zoom': 'fit',
	};
	scroller.className = rotator[scroller.className];
	e.stopPropagation();
	return false;
}

function hideModal() {
	const grayout = document.getElementById('grayout');
	document.body.removeChild(grayout);
	document.body.style.overflow = 'auto';
	return false;
}

function showModal(url) {
	const grayout = document.createElement('div');
	grayout.id = 'grayout';
	grayout.onclick = hideModal;
	const scroller = document.createElement('div');
	scroller.id = 'scroller';
	scroller.className = 'fit';
	const image = document.createElement('img');
	image.onclick = fitModal;
	image.src = url;
	scroller.appendChild(image);
	grayout.appendChild(scroller);
	document.body.appendChild(grayout);
	document.body.style.overflow = 'hidden';
	return false;
}

document.addEventListener('DOMContentLoaded', handleModalable);
