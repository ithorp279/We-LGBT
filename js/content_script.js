chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (! request.url) {
			url = document.URL;
		} else {
			url = request.url;
		}
		if (! request.id) {
			// nothing
		} else {
			id = request.id;
		}
		// alert(url + id);

		// GitHub
		if (/^https:\/\/github.com|^http:\/\/github.com/i.test(url)) {
			document.getElementsByClassName('header-logo-invertocat')[0].innerHTML = '<img src="' + chrome.extension.getURL("/img/logos/github.png") + '" width="28" height="28" class="octicon-mark-github pridetocat" alt="GitHub">';
		};

		// StackOverflow
		if (/^http:\/\/stackoverflow.com|^https:\/\/stackoverflow.com/i.test(url) {
			document.getElementById('hlogo').childNodes[1].style.backgroundImage = 'url(' + chrome.extension.getURL("/img/logos/stackoverflow.svg") + ')';
		};
});