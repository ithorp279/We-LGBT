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
		// ---- WEB LOGOS ----
		// GitHub
		if (/^(http)(s)?(:\/\/)(\w+\.)*github.com/i.test(url)) {
			document.getElementsByClassName('header-logo-invertocat')[0].innerHTML = '<img src="' + chrome.extension.getURL("/img/logos/github.png") + '" width="28" height="28" class="octicon-mark-github pridetocat" alt="GitHub">';
		};
		// StackOverflow
		if (/^(http)(s)?(:\/\/)(\w+\.)*stackoverflow.com/i.test(url)) {
			document.getElementById('hlogo').childNodes[1].style.backgroundImage = 'url(' + chrome.extension.getURL("/img/logos/stackoverflow.svg") + ')';
		};
		// Apple
		if (/^(http)(s)?(:\/\/)(\w+\.)*apple.com/i.test(url)) {
			document.getElementsByClassName('gh-tab-link')[0].style.backgroundImage = 'url(' + chrome.extension.getURL("/img/logos/apple.svg") + ')';
		};

		// ---- TWITTER LOGOS ----
		// Mojang
		if (/^(http)(s)?(:\/\/)(\w+\.)*twitter.com\/Mojang/i.test(url)) {
			document.getElementsByClassName('ProfileAvatar-image')[0].src = chrome.extension.getURL("/img/logos/mojang.png");
		};
		// Reddit
		if (/^(http)(s)?(:\/\/)(\w+\.)*twitter.com\/reddit/i.test(url)) {
			document.getElementsByClassName('ProfileAvatar-image')[0].src = chrome.extension.getURL("/img/logos/reddit.png");
		};

		// ---- GOOGLE+ LOGOS ----
		// Reddit
		if (/^(http)(s)?(:\/\/)plus.google.com\/\+reddit/i.test(url)) {
			document.getElementsByClassName('fa-kz Zxa')[0].src = chrome.extension.getURL("/img/logos/reddit.png");
		};
		// BuzzFeed
		if (/^(http)(s)?(:\/\/)plus.google.com\/\+BuzzFeed/i.test(url)) {
			document.getElementsByClassName('fa-kz Zxa')[0].src = chrome.extension.getURL("/img/logos/buzzfeed.png");
		};

		// ---- FACEBOOK LOGOS ----
});