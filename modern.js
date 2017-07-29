function tryOptinalGetRequest(query, onload, timeout) {
	const ajax = new XMLHttpRequest();
	ajax.open('GET', query, true);
	ajax.timeout = timeout;
	ajax.onload = onload;
	ajax.send();
}

function chooseWallpaper() {
	const count = JSON.parse(this.responseText)._embedded.total;
	const QUERY_METADATA = 'https://cloud-api.yandex.net:443/v1/disk/public/resources'
		+ '?public_key=TtRkzUEDRX7oa0doBszPuib3Vok%2BZvro2fnE7gA9aHk%3D'
		+ '&offset=' + Math.floor(Math.random() * count)
		+ '&limit=1'
		+ '&fields=_embedded.items.path';
	tryOptinalGetRequest(QUERY_METADATA, acceptWallpaper, 1000);
}

function chooseWallpaperOf() {
	const grep = window.location.href;
	const grepResult = JSON.parse(this.responseText)._embedded.items.filter(
		item => item.name.includes(window.location.hash.replace(/\-/g,' '))
	);
	const path = '/' + grepResult[Math.floor(Math.random() * grepResult.length)].name;
	const QUERY_URI = 'https://cloud-api.yandex.net:443/v1/disk/public/resources/download'
		+ '?public_key=TtRkzUEDRX7oa0doBszPuib3Vok%2BZvro2fnE7gA9aHk%3D'
		+ '&fields=href&path=' + encodeURIComponent(path);
	tryOptinalGetRequest(QUERY_METADATA, acceptWallpaper, 1000);
}

function grepWallpaper() {
	const count = JSON.parse(this.responseText)._embedded.total;
	const QUERY_LIST = 'https://cloud-api.yandex.net:443/v1/disk/public/resources'
		+ '?public_key=TtRkzUEDRX7oa0doBszPuib3Vok%2BZvro2fnE7gA9aHk%3D'
		+ '&fields=_embedded.items'
		+ '&limit=' + count;
	tryOptinalGetRequest(QUERY_LIST, chooseWallpaperOf, 1000);
}

function acceptWallpaper() {
	const path = JSON.parse(this.responseText)._embedded.items[0].path;
	const QUERY_URI = 'https://cloud-api.yandex.net:443/v1/disk/public/resources/download'
		+ '?public_key=TtRkzUEDRX7oa0doBszPuib3Vok%2BZvro2fnE7gA9aHk%3D'
		+ '&fields=href&path=' + encodeURIComponent(path);
	tryOptinalGetRequest(QUERY_URI, setWallpaper, 1000);
}

function setWallpaper() {
	const wallpaper = document.createElement('div');
	wallpaper.style.backgroundImage = 'url(' + JSON.parse(this.responseText).href + ')';
	wallpaper.className = 'wallpaper';
	document.body.appendChild(wallpaper);
}

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

const QUERY_COUNT = 'https://cloud-api.yandex.net:443/v1/disk/public/resources'
	+ '?public_key=TtRkzUEDRX7oa0doBszPuib3Vok%2BZvro2fnE7gA9aHk%3D'
	+ '&fields=_embedded.total';
tryOptinalGetRequest(QUERY_LIST, window.location.hash ? grepWallpaper : chooseWallpaper, 1000);
document.addEventListener('DOMContentLoaded', handleModalable);
