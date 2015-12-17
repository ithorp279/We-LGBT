/* global chrome */
(function() {
	"use strict";

	var repAboutPData = {
		"su": "This site is supportive.",
		"it": "This site is intermediate.",
		"ns": "This site is not supportive.",
		"nf": "This site isn't in our filter."
	};

	function init() {
		chrome.runtime.sendMessage({
			"message": "open"
		}, function(response) {
			var url = response.url;
			var rep = response.rep;
			var obj = response.obj;
			var traffic = response.traffic;
			var trafficSupportive = response.trafficSupportive;
			var trafficIntermediate = response.trafficIntermediate;
			var trafficNotSupportive = response.trafficNotSupportive;
			var trafficNotFound = response.trafficNotFound;
			var domain = url.replace(/^(http)?(s)?(:\/\/)?(www\.)?/i, "").replace(/(\/.*)$/i, "");

			var aboutTitle = document.getElementById("about-title");
			var aboutP = document.getElementById("about-p");
			var aboutA = document.getElementById("about-a");
			var contributeCard = document.getElementById("contribute-card");
			var contributeP = document.getElementById("contribute-p");
			var contributeA = document.getElementById("contribute-a");

			if (typeof obj === "undefined") {
				aboutTitle.textContent = "About This Site";
				aboutA.parentElement.classList.add("hidden");
				contributeCard.classList.remove("hidden");
				contributeP.textContent = "We don't have any information for " + domain + ", could you contribute what you know about it?";
				contributeA.href = "https://github.com/xorprojects/We-LGBT/issues/new?title=Missing%20Information%20For:" + encodeURIComponent(domain) + "&body=-%20Name:%20%0A-%20Description:%20";
				aboutP.textContent = repAboutPData[rep];
			} else {
				aboutTitle.innerHTML = obj.name;
				contributeCard.classList.add("hidden");
				aboutP.innerHTML = obj.description;
				if (typeof obj["custom action"] === "undefined") {
					aboutA.parentElement.classList.add("hidden");
				} else {
					aboutA.parentElement.classList.remove("hidden");
					aboutA.href = obj["custom action"].href;
					aboutA.innerHTML = obj["custom action"].innerHTML;
				}
			}

			if (typeof traffic === "number" && traffic > 0) {
				document.getElementById("webtraffic").textContent = "Your web traffic this session is " + Math.round(trafficSupportive) + "% supportive, " + Math.round(trafficIntermediate) + "% intermediate, " + Math.round(trafficNotSupportive) + "% not supportive and, " + Math.round(trafficNotFound) + "% not found in our filter. We don't record your web traffic, this is only calculated by our URL filter. (Rounded)";
			}
		});
		document.getElementById("closepopup").addEventListener("click", function() {
			window.close();
		});
	}

	document.addEventListener("DOMContentLoaded", init);
})();
