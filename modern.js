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

const QUERY_COUNT = 'https://cloud-api.yandex.net:443/v1/disk/public/resources'
	+ '?public_key=TtRkzUEDRX7oa0doBszPuib3Vok%2BZvro2fnE7gA9aHk%3D'
	+ '&fields=_embedded.total';

tryOptinalGetRequest(QUERY_COUNT, chooseWallpaper, 1000);
