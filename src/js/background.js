/* global chrome */
(function() {
	"use strict";

	var supportive;
	var intermedate;
	var notSupportive;
	var rep;
	var url;
	var traffic;
	var trafficSupportive;
	var trafficIntermediate;
	var trafficNotSupportive;
	var trafficNotFound;
	var trafficPercents;

	function setBrowserActionIcon(iconName) {
		chrome.browserAction.setIcon({
			"path": {
				"19": "/img/icons/" + iconName + "/icon_19.png",
				"38": "/img/icons/" + iconName + "/icon_38.png"
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
				var usingBackup = typeof local === "undefined";
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
		intermedate.data = data.intermediate;
		notSupportive.data = data["not supportive"];

		var obj = [supportive, intermedate, notSupportive];
		for (var o in [supportive, intermedate, notSupportive]) {
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
			}
			if (obj[o].array.length > 0) {
				obj[o].regex = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + obj[o].array.join("|") + ")", "i");
			}
		}
	}

	// Patterns
	if (typeof supportive === "undefined" || typeof intermedate === "undefined" || typeof notSupportive === "undefined") {
		supportive = {
			"data": [],
			"array": [],
			"regex": ""
		};
		intermedate = {
			"data": [],
			"array": [],
			"regex": ""
		};
		notSupportive = {
			"data": [],
			"array": [],
			"regex": ""
		};

		// Get Patterns
		getJSON("https://raw.githubusercontent.com/xorprojects/We-LGBT/master/src/js/rep.json", "/js/rep.json").then(getPatterns);
	}

	function getObjFromData(data) {
		for (var i in data) {
			if (typeof data[i] === "object") {
				var urlsData = data[i].url;
				var urlsDataString = Array.isArray(urlsData) ? urlsData.join("|") : urlsData;
				var regex = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + urlsDataString + ")", "i");
				if (regex.test(url)) {
					return data[i];
				}
			}
		}
	}

	function getObj() {
		if (rep === "notFound") {
			return "notFound";
		}
		var dataParents = {
			"supportive": supportive,
			"intermedate": intermedate,
			"notSupportive": notSupportive
		};
		return getObjFromData(dataParents[rep].data);
	}

	// Variables
	if (typeof traffic === "undefined" || typeof trafficSupportive === "undefined" || typeof trafficIntermediate === "undefined" || typeof trafficNotSupportive === "undefined" || typeof trafficNotFound === "undefined") {
		traffic = 0;
		trafficSupportive = 0;
		trafficIntermediate = 0;
		trafficNotSupportive = 0;
		trafficNotFound = 0;
	}
	if (typeof rep === "undefined" || typeof url === "undefined") {
		rep = "notFound";
		url = "example.com";
	}

	// Recive requests for cards from popup
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.message === "open") {
			trafficPercents = [trafficSupportive / traffic * 100, trafficIntermediate / traffic * 100, trafficNotSupportive / traffic * 100, trafficNotFound / traffic * 100];
			sendResponse({
				"url": url,
				"rep": rep,
				"traffic": traffic,
				"trafficSupportive": trafficPercents[0],
				"trafficIntermediate": trafficPercents[1],
				"trafficNotSupportive": trafficPercents[2],
				"trafficNotFound": trafficPercents[3],
				"obj": getObj()
			});
		}
	});

	// Main
	function main() {
		// Test Against Regular Expression
		if (!supportive.regex == "" && supportive.regex.test(url)) {
			rep = "supportive";
		} else if (!intermedate.regex == "" && intermedate.regex.test(url)) {
			rep = "intermedate";
		} else if (!notSupportive.regex == "" && notSupportive.regex.test(url)) {
			rep = "notSupportive";
		} else {
			rep = "notFound";
		}
		traffic++;

		// Browser Action Icon and Title
		// Supportive
		if (rep === "supportive") {
			setBrowserActionIcon("supportive");
			setBrowserActionTitle("Supportive - We LGBT");
			trafficSupportive++;
		}
		// Intermediate
		if (rep === "intermedate") {
			setBrowserActionIcon("intermediate");
			setBrowserActionTitle("Intermediate - We LGBT");
			trafficIntermediate++;
		}
		// Not Supportive
		if (rep === "notSupportive") {
			setBrowserActionIcon("notSupportive");
			setBrowserActionTitle("Not Supportive - We LGBT");
			trafficNotSupportive++;
		}
		// Not Found
		if (rep === "notFound") {
			setBrowserActionIcon("notFound");
			setBrowserActionTitle("Not Found - We LGBT");
			trafficNotFound++;
		}
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
})();
