/*
Supportive: su
Intermediate: it
Not Supportive: ns
Not Found: nf
*/

function getJSON(url, local, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
		// Success!
		var data = JSON.parse(this.response);
		callback(data);
		return;
		} else {
		if (typeof local === "undefined") {
			console.log("Error: We reached our target server, but it returned an error and there wasn't a backup local file.");
		} else {
			console.log("Warning: We reached our target server, but it returned an error. Using backup local file.");
			getJSON(local, null, callback);
		};
		}
	};

	request.onerror = function() {
		if (typeof local === "undefined") {
			console.log("Error: There was a connection error of some sort and there wasn't a backup local file.");
		} else {
			console.log("Warning: There was a connection error of some sort. Using backup local file.");
			getJSON(local, null, callback);
		};
	};

	request.send();
}


// Patterns
if (typeof su === "undefined" || typeof it === "undefined" || typeof ns === "undefined") {
	su = {
		data: [],
		array: [],
		regex: ""
	};
	it = {
		data: [],
		array: [],
		regex: ""
	};
	ns = {
		data: [],
		array: [],
		regex: ""
	};

	// Get Patterns
	getJSON("/js/rep.json", "/js/rep.json", getPatterns);
};
function getPatterns(data) {
	su.data = data.supportive;
	it.data = data.intermediate;
	ns.data = data["not supportive"];

	var obj = [su, it, ns];
	for (var o in [su, it, ns]) {
		for (var i in obj[o].data) {
			if (typeof obj[o].data[i] === "string") {
				obj[o].array.push(obj[o].data[i].replace(/\./g, "\\."));
			} else if (typeof obj[o].data[i] === "object") {
				if (typeof obj[o].data[i].url === "string") {
					obj[o].array.push(obj[o].data[i].url.replace(/\./g, "\\."));
				} else if (Array.isArray(obj[o].data[i].url)) {
					for (var u in obj[o].data[i].url) {
						obj[o].array.push(obj[o].data[i].url[u].replace(/\./g, "\\."));
					}
				}
			}
		};
		if (obj[o].array.length > 0) {
			obj[o].regex = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + obj[o].array.join("|") + ")", "i");
		}
	}
}

// Variables
if (typeof traffic === 'undefined' || typeof trafficSu === 'undefined' || typeof trafficIt === 'undefined' || typeof trafficNs === 'undefined' || typeof trafficNf === 'undefined') {
	traffic = 0;
	trafficSu = 0;
	trafficIt = 0;
	trafficNs = 0;
	trafficNf = 0;
};
if (typeof rep === 'undefined' || typeof url === 'undefined') {
	rep = "nf";
	url = "example.com"
}

// Recive requests for cards from popup
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	if (request.message == "open") {
		trafficPercents = [trafficSu/traffic*100, trafficIt/traffic*100, trafficNs/traffic*100, trafficNf/traffic*100];
		sendResponse({url: url, rep: rep, trafficSu: trafficPercents[0], trafficIt: trafficPercents[1], trafficNs: trafficPercents[2], trafficNf: trafficPercents[3]});
	};
});

// Main
function main(id) {
	// Test Against Regular Expression
	if (!su.regex == "" && su.regex.test(url)) {
		rep = "su";
	} else if (!it.regex == "" && it.regex.test(url)) {
		rep = "it";
	} else if (!ns.regex == "" && ns.regex.test(url)) {
		rep = "ns";
	} else {
		rep = "nf";
	};
	traffic ++;

	// Browser Action Icon and Title
	// Supportive
	if (rep == "su") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/supportive/icon_19.png", 38: "/img/icons/supportive/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Supportive - We LGBT"});
		trafficSu ++;
	};
	// Intermediate
	if (rep == "it") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/intermediate/icon_19.png", 38: "/img/icons/intermediate/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Intermediate - We LGBT"});
		trafficIt ++;
	};
	// Not Supportive
	if (rep == "ns") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/not-supportive/icon_19.png", 38: "/img/icons/not-supportive/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Not Supportive - We LGBT"});
		trafficNs ++;
	};
	// Not Found
	if (rep == "nf") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/not-found/icon_19.png", 38: "/img/icons/not-found/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Not Found - We LGBT"});
		trafficNf ++;
	};
}

// When URL Changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		url = tab.url;
		main(tabId);
	}
});

// When Tab Changed
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		url = tabs[0].url;
		main(tabs[0].id);
	});
});