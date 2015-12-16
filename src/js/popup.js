doc = document;
doc.addEventListener('DOMContentLoaded', function () {
	chrome.runtime.sendMessage({message: "open"}, function(response) {
		url = response.url;
		rep = response.rep;
		obj = response.obj;
		traffic = response.traffic;
		trafficSu = response.trafficSu;
		trafficIt = response.trafficIt;
		trafficNs = response.trafficNs;
		trafficNf = response.trafficNf;
		domain = url.replace(/^(http)?(s)?(:\/\/)?(www\.)?/i, "").replace(/(\/.*)$/i, "");
		
		at = doc.getElementById('about-title');
		ap = doc.getElementById('about-p');
		aa = doc.getElementById('about-a');
		cc = doc.getElementById('contribute-card');
		cp = doc.getElementById('contribute-p');
		ca = doc.getElementById('contribute-a');

		if (typeof obj === "undefined") {
			at.innerHTML = "About This Site";
			aa.parentElement.classList.add("hidden");
			cc.classList.remove("hidden");
			cp.innerHTML = "We don't have any information for " + domain +", could you contribute what you know about it?";
			ca.href = "https://github.com/xorprojects/We-LGBT/issues/new?title=Missing%20Information%20For:" + encodeURIComponent(domain) + "&body=-%20Name:%20%0A-%20Description:%20";
			if (rep == "su") {
				ap.innerHTML = "This site is supportive."
			};
			if (rep == "it") {
				ap.innerHTML = "This site is intermediate."
			};
			if (rep == "ns") {
				ap.innerHTML = "This site is not supportive."
			};
			if (rep == "nf") {
				ap.innerHTML = "This site isn't in our filter."
			};
		} else {
			at.innerHTML = obj.name;
			cc.classList.add("hidden");
			ap.innerHTML = obj.description;
			if (typeof obj["custom action"] === "undefined") {
				aa.parentElement.classList.add("hidden");
			} else {
				aa.parentElement.classList.remove("hidden");
				aa.href = obj["custom action"].href;
				aa.innerHTML = obj["custom action"].innerHTML;
			};
		}

		if (typeof traffic === "number" && traffic > 0) {
			doc.getElementById('webtraffic').innerHTML = "Your web traffic this session is " + Math.round(trafficSu) + "% supportive, " + Math.round(trafficIt) + "% intermediate, " + Math.round(trafficNs) + "% not supportive and, " + Math.round(trafficNf) + "% with no found standing. We don't record your web traffic, this is only calculated by our URL filter. (Rounded)";
		};
	});
	document.getElementById('closepopup').addEventListener('click', function() {window.close()})
});
