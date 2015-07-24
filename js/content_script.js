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
		// Spotify
		if (/^(http)(s)?(:\/\/)(\w+\.)*twitter.com\/spotify/i.test(url)) {
			document.getElementsByClassName('ProfileAvatar-image')[0].src = chrome.extension.getURL("/img/logos/spotify.jpg");
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
		// Spotify
		if (/^(http)(s)?(:\/\/)plus.google.com\/\+Spotify/i.test(url)) {
			document.getElementsByClassName('fa-kz Zxa')[0].src = chrome.extension.getURL("/img/logos/spotify.jpg");
		};

		// ---- FACEBOOK LOGOS ----
		// BuzzFeed
		if (/^(http)(s)?(:\/\/)(\w+\.)*facebook.com\/BuzzFeed/i.test(url)) {
			document.getElementsByClassName('profilePic img')[0].src = chrome.extension.getURL("/img/logos/buzzfeed.png");
		};

		// ---- In Page Badges ----
		// Facebook
		if (/^(http)(s)?(:\/\/)(\w+\.)*facebook.com\/BuzzFeed/i.test(url)) {
			badge = document.createElement("span");
			badge.class = "_5rqu";
			badge.innerHTML = '<span data-hover="tooltip" data-tooltip-position="right" class="_56_f _5dzy _5d-1 _5d-3" id="u_0_x" aria-label="Pro-LGBT Page"></span>';
			document.getElementsByClassName('_5rqt')[0].appendChild(badge);
		};
});