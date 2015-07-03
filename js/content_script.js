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
		if (/^https:\/\/github.com/i.test(url)) {
			document.getElementsByClassName('header-logo-invertocat')[0].innerHTML = '<img src="chrome-extension://affgcnnkppghdeajoheclcgjbcceonij/img/logos/pridetocat.png" width="28" height="28" class="octicon-mark-github pridetocat" alt="GitHub">';
		};
});