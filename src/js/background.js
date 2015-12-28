/* global chrome */
(function() {
	"use strict";

	var supportive;
	var intermediate;
	var notSupportive;
	var notFound;
	var rep;
	var url;
	var traffic;
	var dataParents;

	function setBrowserActionIcon(local) {
		chrome.browserAction.setIcon({
			"path": {
				"19": local["19"],
				"38": local["38"]
			}
		});
	}

	function setBrowserActionTitle(newTitle) {
		chrome.browserAction.setTitle({
			"title": newTitle
		});
	}

	function getJSON(fileUrl, local) {
		return new Promise(function(resolve, reject) {
			function handleError(connectionError) {
				var usingBackup = typeof local !== "undefined";
				var message = (connectionError ? "There was a connection error of some sort" : "We reached our target server, but it returned an error") +
					(usingBackup ? ". Using" : " and there wasn't a") +
					" backup local file.";
				if (usingBackup) {
					console.warn(message);
					resolve(getJSON(local, null));
				} else {
					console.error(message);
					reject();
				}
			}

			var request = new XMLHttpRequest();
			request.open("GET", fileUrl, true);

			request.addEventListener("load", function() {
				if (request.status >= 200 && request.status < 400) {
					// Success!
					var data = JSON.parse(request.response);
					resolve(data);
					return;
				}
				handleError(false);
			});

			request.addEventListener("error", function() {
				handleError(true);
			});

			request.send();
		});
	}

	function getPatterns(data) {
		supportive.data = data.supportive;
		intermediate.data = data.intermediate;
		notSupportive.data = data.notSupportive;
		notFound.data = data.notFound;

		var obj = [supportive, intermediate, notSupportive];
		for (var o in [supportive, intermediate, notSupportive]) {
			for (var i in obj[o].data.domains) {
				if (typeof obj[o].data.domains[i] === "string") {
					obj[o].array.push(obj[o].data.domains[i].replace(/\./g, "\\."));
				} else if (typeof obj[o].data.domains[i] === "object") {
					if (typeof obj[o].data.domains[i].url === "string") {
						obj[o].array.push(obj[o].data.domains[i].url.replace(/\./g, "\\."));
					} else if (Array.isArray(obj[o].data.domains[i].url)) {
						for (var u in obj[o].data.domains[i].url) {
							obj[o].array.push(obj[o].data.domains[i].url[u].replace(/\./g, "\\."));
						}
					}
				}
			}
			if (obj[o].array.length > 0) {
				obj[o].regex = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + obj[o].array.join("|") + ")", "i");
			}
		}
	}

	// Patterns
	if (typeof supportive === "undefined" || typeof intermediate === "undefined" || typeof notSupportive === "undefined") {
		supportive = {
			"data": [],
			"array": [],
			"regex": "",
			"traffic": 0
		};
		intermediate = {
			"data": [],
			"array": [],
			"regex": "",
			"traffic": 0
		};
		notSupportive = {
			"data": [],
			"array": [],
			"regex": "",
			"traffic": 0
		};
		notFound = {
			"data": [],
			"traffic": 0
		};

		dataParents = {
			"supportive": supportive,
			"intermediate": intermediate,
			"notSupportive": notSupportive,
			"notFound": notFound
		};

		// Get Patterns
		getJSON("https://raw.githubusercontent.com/xorprojects/We-LGBT/master/src/js/data.json", "/js/data.json").then(getPatterns);
	}

	function getObjFromData(data) {
		for (var i in data.domains) {
			if (typeof data.domains[i] === "object") {
				var urlsData = data.domains[i].url;
				var urlsDataString = Array.isArray(urlsData) ? urlsData.join("|") : urlsData;
				var regex = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + urlsDataString + ")", "i");
				if (regex.test(url)) {
					return data.domains[i];
				}
			}
		}
	}

	function getObj() {
		if (rep === "notFound") {
			return "notFound";
		}
		return getObjFromData(dataParents[rep].data);
	}

	// Variables
	if (typeof traffic === "undefined") {
		traffic = 0;
	}
	if (typeof rep === "undefined" || typeof url === "undefined") {
		rep = "notFound";
		url = "example.com";
	}

	// Recive requests for cards from popup
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.message === "open") {
			sendResponse({
				"url": url,
				"rep": rep,
				"traffic": traffic,
				"trafficSupportive": supportive.traffic / traffic * 100,
				"trafficIntermediate": intermediate.traffic / traffic * 100,
				"trafficNotSupportive": notSupportive.traffic / traffic * 100,
				"trafficNotFound": notFound.traffic / traffic * 100,
				"obj": getObj()
			});
		} else if (request.message === "update") {
			getJSON("https://raw.githubusercontent.com/xorprojects/We-LGBT/master/src/js/data.json", "/js/data.json").then(getPatterns);
			sendResponse("Updated!");
		};
	});

	// Main
	function main() {
		// Test Against Regular Expression
		if (!supportive.regex == "" && supportive.regex.test(url)) {
			rep = "supportive";
		} else if (!intermediate.regex == "" && intermediate.regex.test(url)) {
			rep = "intermediate";
		} else if (!notSupportive.regex == "" && notSupportive.regex.test(url)) {
			rep = "notSupportive";
		} else {
			rep = "notFound";
		}

		// Browser Action Icon, Title, and Traffic Counter
		traffic++;
		dataParents[rep].traffic++;
		setBrowserActionTitle(dataParents[rep].data.title);
		setBrowserActionIcon(dataParents[rep].data.icon.local)
	}

	// When URL Changed
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.status === "complete") {
			url = tab.url;
			main();
		}
	});

	// When Tab Changed
	chrome.tabs.onActivated.addListener(function() {
		chrome.tabs.query({
			"active": true,
			"lastFocusedWindow": true
		}, function(tabs) {
			url = tabs[0].url;
			main();
		});
	});

	// When Window Focused
	chrome.windows.onFocusChanged.addListener(function() {
		chrome.tabs.query({
			"active": true,
			"lastFocusedWindow": true
		}, function(tabs) {
			url = tabs[0].url;
			main();
		});
	});
})();
