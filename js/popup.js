function toggle(func) {
	if (window.localStorage == null) {
		alert('Local storage is required for changing settings.');
		return;
	}
	if (func == "on" && window.localStorage.on == "true") {
		window.localStorage.on = "false";
	} else if (func == "on") {
		window.localStorage.on = "true";
	};
	main();
}

function main() {
	if (window.localStorage == null) {
		alert("LocalStorage must be enabled for changing settings.");
		return;
	}

	if (window.localStorage.on == "true") {
		document.getElementById('on').innerHTML = "On";
		document.getElementById('oninput').checked = true;
	}
	if (window.localStorage.on == "false") {
		document.getElementById('on').innerHTML = "Off";
		document.getElementById('oninput').checked = false;
	}
}
function checkError(error) {
	if (error) {
		Materialize.toast('Error', 4000);
	} else {
		Materialize.toast('Sucsess', 4000);
	};
}

function sync() {
	// set
	chrome.storage.sync.set({'on': window.localStorage.on});
	chrome.storage.sync.set({'title': "true"}, function() {checkError(chrome.runtime.lastError)});
}

function get() {
	// get
	chrome.storage.sync.get(['on', 'title'], function (obj) {
		window.localStorage.on = obj.on;
		console.log(obj.on);
		window.localStorage.title = obj.title;
		console.log(obj.title);
		checkError(chrome.runtime.lastError);
	});
}

document.addEventListener('DOMContentLoaded', function () {
	main();
	document.getElementById('closepopup').addEventListener('click', function() {window.close()})
	document.getElementById('fab').addEventListener('mouseenter', function() {
		document.getElementsByClassName('showonfabhover')[0].style.display = "initial";
	});
	document.getElementById('fab').addEventListener('mouseleave', function() {
		document.getElementsByClassName('showonfabhover')[0].style.display = "none";
	});
	document.getElementById('sync').addEventListener('click', function() {sync()});
	document.getElementById('get').addEventListener('click', function() {get()});
	document.getElementById('onparent').addEventListener('click', function() {toggle("on")});
	document.getElementById('oninput').addEventListener('click', function() {toggle("on")});
});
