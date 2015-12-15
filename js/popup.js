function main() {
	mainfilter = ["2ndvote\\.com", "minecraft\\.net", "mojang\\.com"]
	remainfilter = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + mainfilter.join("|") + ")", "i");
	if (remainfilter.test(url)) {
		// Do filter for cards
		// Hide All
		document.getElementById('basic-about-notfound').style.display = "none";
		document.getElementById('basic-about-good').style.display = "none";
		document.getElementById('basic-about-poor').style.display = "none";
		document.getElementById('basic-about-medium').style.display = "none";
		document.getElementById('basic-about-custom').style.display = "block";
		if (/^(http)?(s)?(:\/\/)?(\w+\.)*(2ndvote\.com)"/i.test(url)) {
			// 2ndVote
			document.getElementById('custom-title').innerHTML = "About 2ndVote";
			document.getElementById('custom-text').innerHTML = "Wrote in an unbiased format, this site contains phrases including \"see exactly how corporations are supporting the erosion of traditional values\". We consider this not supportive.";
			document.getElementById('custom-action').innerHTML = "Tweet";
			document.getElementById('custom-action').href = "https://twitter.com/intent/tweet?text=Bummer that @2ndVote is against gay marriage. I hope they'll change their mind some time.&hashtags=WeLGBT";
		} else if (/^(http)?(s)?(:\/\/)?(\w+\.)*(minecraft\.net)|(mojang\.com)/i.test(url)){
			// Mojang and Minecraft
			document.getElementById('custom-title').innerHTML = "About Mojang and Minecraft";
			document.getElementById('custom-text').innerHTML = "Mojang changed their Twitter profile picture to a rainbow version of their logo for many weeks but offered no statement and didn't sign any petitions that we could find.";
			document.getElementById('custom-action').innerHTML = "Tweet";
			document.getElementById('custom-action').href = "https://twitter.com/intent/tweet?text=I'm glad that @mojang seems to support gay rights!&hashtags=WeLGBT";
		};
	} else {
		// Hide All
		document.getElementById('basic-about-notfound').style.display = "none";
		document.getElementById('basic-about-good').style.display = "none";
		document.getElementById('basic-about-poor').style.display = "none";
		document.getElementById('basic-about-medium').style.display = "none";
		document.getElementById('basic-about-custom').style.display = "none";
		if (rep === "su") {
			// Good basic card
			document.getElementById('basic-about-good').style.display = "block";
		} else if (rep === "it") {
			// Inbetween basic card
			document.getElementById('basic-about-medium').style.display = "block";
		} else if (rep === "ns") {
			// Bad basic card
			document.getElementById('basic-about-poor').style.display = "block";
		} else {
			// Not Found
			document.getElementById('basic-about-notfound').style.display = "block";
		};
	};

	document.getElementById('webtraffic').innerHTML = "Your web traffic this session is " + Math.round(trafficSu) + "% supportive, " + Math.round(trafficIt) + "% intermediate, " + Math.round(trafficNs) + "% not supportive and, " + Math.round(trafficNf) + "% with no found standing. We don't record your web traffic, this is only calculated by our URL filter. (Rounded)";
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.runtime.sendMessage({message: "open"}, function(response) {
		url = response.url;
		rep = response.rep;
		trafficSu = response.trafficSu;
		trafficIt = response.trafficIt;
		trafficNs = response.trafficNs;
		trafficNf = response.trafficNf;
		main();
	});
	document.getElementById('closepopup').addEventListener('click', function() {window.close()})
});
