// Set if nothing is availible
if (typeof toggle === undefined || typeof toggle === null) {
	toggle = false;
};
// First toggle set
chrome.storage.sync.get(['toggle'], function (obj) {
	toggle = obj.toggle;
});
// Set toggle when changed on popup while running
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.toggle == "true") {
			toggle = true;
		} else if (request.toggle == "false") {
			toggle = false;
		}
});

//  Test against array
function testifgood(url) {
	good = ["^https:\/\/github.com"];
	bad = ["http:\/\/www.focusonthefamily.com"];
	inbetween = ["https:\/\/www.hillaryclinton.com"];
	regood = new RegExp(good.join("|"), "i");
	rebad = new RegExp(bad.join("|"), "i");
	reinbetween = new RegExp(inbetween.join("|"), "i");
	
	if (regood.test(url)) {
		return "good";
	} else if (rebad.test(url)) {
		return "bad";
	} else if (reinbetween.test(url)) {
		return "inbetween";
	} else {
		return "notfound";
	};  
}

// Main
function main(url, id) {
	test = testifgood(url);
	// Good Icon and Title
	if (test == "good") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/deafult/icon_19.png", 38: "/img/icons/deafult/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Good Standing - We LGBT"});
	};

	// Bad Icon and Title
	if (test == "bad") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/poor/icon_19.png", 38: "/img/icons/poor/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Poor Standing - We LGBT"});
	};

	// Inbetween Icon and Title
	if (test == "inbetween") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/inbetween/icon_19.png", 38: "/img/icons/inbetween/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Medium Standing - We LGBT"});
	};

	// Notfound Icon and Title
	if (test == "notfound") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/notfound/icon_19.png", 38: "/img/icons/notfound/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Not Found - We LGBT"});
	};
}

// When URL Changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		if (toggle) {
			// Replace Logos
			chrome.tabs.sendMessage(tabId, {url: tab.url, id: tabId})
			chrome.tabs.executeScript(null, {file: "/js/content_script.js"});
		};
		main(tab.url, tabId);
	}
});

// When Tab Changed
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		main(tabs[0].url, tabs[0].id);
	});
});