function toggle(func) {
	if (window.localStorage == null) {
		Materialize.toast('LocalStorage must be enabled for changing settings', 4000);
		return;
	}
	if (func == "toggle" && window.localStorage.toggle == "true") {
		window.localStorage.toggle = "false";
	} else if (func == "toggle") {
		window.localStorage.toggle = "true";
	};
	chrome.storage.sync.set({'toggle': window.localStorage.toggle}, function() {checkError(chrome.runtime.lastError)});
	chrome.runtime.sendMessage({toggle: window.localStorage.toggle})
	main();
}

function main() {
	if (window.localStorage == null) {
		Materialize.toast('LocalStorage must be enabled for changing settings', 4000);
		return;
	}

	if (window.localStorage.toggle == "true") {
		document.getElementById('toggle').innerHTML = "On";
		document.getElementById('toggleinput').checked = true;
	}
	if (window.localStorage.toggle == "false") {
		document.getElementById('toggle').innerHTML = "Off";
		document.getElementById('toggleinput').checked = false;
	}

	mainfilter = ["example\\.com"]
	remainfilter = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + mainfilter.join("|") + ")", "i");
	if (remainfilter.test(url)) {
		// Do filter for cards
	} else {
		// Hide All
		document.getElementById('basic-about-notfound').style.display = "none";
		document.getElementById('basic-about-good').style.display = "none";
		document.getElementById('basic-about-poor').style.display = "none";
		document.getElementById('basic-about-medium').style.display = "none";
		if (test === "good") {
			// Good basic card
			document.getElementById('basic-about-good').style.display = "block";
		} else if (test === "bad") {
			// Bad basic card
			document.getElementById('basic-about-poor').style.display = "block";
		} else if (test === "inbetween") {
			// Inbetween basic card
			document.getElementById('basic-about-medium').style.display = "block";
		} else {
			// Not Found
			document.getElementById('basic-about-notfound').style.display = "block";
		};
	};	
}

function checkError(error) {
	if (error) {
		Materialize.toast('Error', 4000);
	} else {
		Materialize.toast('Sucsess', 4000);
	};
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.sync.get(['toggle'], function (obj) {
		window.localStorage.toggle = obj.toggle;
		// checkError(chrome.runtime.lastError);
		chrome.runtime.sendMessage({message: "open"}, function(response) {
			url = response.url;
			test = response.test;
			main();
		});
		document.getElementById('closepopup').addEventListener('click', function() {window.close()})
		document.getElementById('toggleparent').addEventListener('click', function() {toggle("toggle")});
		document.getElementById('toggleinput').addEventListener('click', function() {toggle("toggle")});
	});
});
