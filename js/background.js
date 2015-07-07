// Set if nothing is availible
if (typeof toggle === undefined || typeof toggle === null) {
	toggle = false;
	alert();
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
		};
});

// Recive resquests for cards from popup
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
    if (request.message == "open") {
    	sendResponse({url: lastPassedurl, test: testifgood(lastPassedurl)});
    };
});

//  Test against array
function testifgood(url) {
	lastPassedurl = url;
	good = ["github\\.com", "stackoverflow\\.com", "google\\.com", "google\\.co\\.uk", "youtube\\.com", "buzzfeed\\.com", "att\\.com", "uber\\.com", "lyft\\.com", "expedia\\.com", "peta\\.org", "gap\\.com", "amazon\\.com", "amazon\\.jobs", "twitch\\.tv", "audible\\.com", "dpreview\\.com", "joyo\\.com", "diapers\\.com", "goodreads\\.com", "imdb\\.com", "amazon\\.cn", "z\\.cn", "amazon\\.in", "amazon\\.co\\.jp", "amazon\\.fr", "amazon\\.de", "amazon\\.it", "amazon\\.nl", "amazon\\.es", "amazon\\.co\\.uk", "amazon\\.ca", "amazon\\.com\\.mx", "amazon\\.com\\.au", "amazon\\.com\\.br", "alaskaair\\.com", "airproducts\\.com", "aetna\\.com", "accenture\\.com", "aws-e\\.com", "atkearney\\.com", "alnella\\.com", "apple\\.com", "americanexpress\\.com", "americanapparel\\.net", "cloudflare\\.com", "comcast\\.com", "xfinity\\.com", "coxenterprises\\.com", "valpak\\.com", "coxmediagroup\\.com", "cox\\.com", "manheim\\.com", "autotrader\\.com", "kudzu\\.com", "gamut\\.media", "kbb\\.com", "coxautoinc\\.com", "corning\\.com", "corninggorillaglass\\.com", "cisco\\.com", "citigroup\\.com", "citialumninetwork\\.com", "citibank\\.com", "cgi\\.com", "coca-colacompany\\.com", "coca-cola\\.com", "cocacola\\.com", "us\\.coca-cola\\.com", "dietcoke\\.com", "cokezero\\.com", "coca-colafreestyle\\.com", "mycokerewards\\.com", "icoke\\.ca", "coca-cola\\.ca", "coca-cola\\.com\\.ar", "coca-cola\\.com\\.bz", "coca-cola\\.bs", "coca-cola\\.com\\.bo", "cocacola\\.com\\.br", "caribbean\\.coca-cola\\.com", "coca-cola\\.cl", "coca-cola\\.com\\.co", "coca-cola\\.co\\.cr", "coca-cola\\.com\\.do", "coca-cola\\.com\\.sv", "coca-cola\\.com\\.gt", "coca-cola\\.com\\.hn", "coca-cola\\.com\\.mx", "happiness\\.coca-cola\\.com", "coke\\.ch", "coca-cola\\.az", "coca-cola\\.com\\.qa", "coca-cola\\.by", "coca-cola\\.in", "cocacola\\.co\\.il", "coca-cola\\.kz", "coca-cola\\.com\\.pk", "coca-cola\\.ps", "coca-cola\\.ru", "coca-cola\\.com\\.tr", "coca-cola\\.ua", "coca-cola\\.ae", "coca-cola\\.it", "coca-cola\\.ee", "coca-cola\\.lt", "coca-cola\\.lu", "coke\\.pl", "coca-cola\\.lv", "cocacola\\.pt", "coca-cola\\.ro", "coca-cola\\.rs", "coca-cola\\.sk", "coca-cola\\.si", "cocacola\\.es", "coca-cola\\.com\\.ni", "coca-cola\\.com\\.pa", "coca-cola\\.com\\.py", "coca-cola\\.com\\.pe", "coca-cola\\.com\\.tt", "coca-cola\\.com\\.uy", "coca-cola\\.com\\.ve", "coke\\.at", "coca-cola\\.be", "coca-cola\\.be", "coca-cola\\.ba", "coca-cola\\.bg", "coca-cola\\.hr", "coca-cola\\.cz", "coke\\.de", "coca-cola\\.gr", "secure\\.coca-cola\\.hu", "coca-cola\\.hu", "coke\\.is", "coke\\.eg", "coca-cola\\.co\\.ke", "coca-cola\\.rw", "coke\\.co\\.za", "coca-cola\\.com", "coca-cola\\.co\\.tz", "tunisia\\.coca-cola\\.com", "coca-cola\\.co\\.ug", "coca-cola\\.co\\.zw", "icoke\\.co\\.th", "cocacola\\.com\\.au", "coca-cola\\.com\\.bd", "icoke\\.hk", "coca-cola\\.co\\.id", "cocacola\\.jp", "coke\\.com\\.my", "coca-cola\\.com\\.mv", "coca-cola\\.co\\.nz", "icoke\\.cn", "coca-cola\\.com\\.ph", "cocacola\\.co\\.kr", "coca-cola\\.com\\.sg", "coca-cola\\.lk", "ahh\\.com", "wellsfargo\\.com", "xerox\\.com", "xerox\\.ca", "xeroxcareers\\.com", "xfund\\.com", "yesdesigngroup\\.com", "zoomsystems\\.com", "zynga\\.com", "zyngagames\\.com", "zingermanscommunity\\.com", "zacfirm\\.com", "ypsilantidda\\.org", "wyndhamworldwide\\.com", "wyndham\\.com", "workplaceequalityindex\\.com", "witeck\\.com", "wislgbtchamber\\.com", "wheynaturalusa\\.com", "wmgllc\\.com", "thewaltdisneycompany\\.com", "waltdisneystudios\\.com", "marvel\\.com", "disney\\.com", "go\\.com", "disneystore\\.com", "disneytheatricalgroup\\.com", "disneyonbroadway\\.com", "disneyonice\\.com", "disneylive\\.com", "disneytheatricallicensing\\.com", "disneyanimation\\.com", "pixar\\.com", "hollywoodrecords\\.com", "clubpenguin\\.com", "disneymoviesanywhere\\.com", "disneystorycentral\\.com", "walshwellnesscenter\\.com", "wsdevelopment\\.com", "grainger\\.com", "wmmadv\\.com", "vmware\\.com", "vitaperk\\.com", "visa\\.com", "viacom\\.com", "verizon\\.com", "verizonwireless\\.com", "vcbconsulting\\.biz", "uptownphysiciansgroup\\.com", "twitter\\.com", "tuttabella\\.com", "travelout\\.com", "206inc\\.com", "ubs\\.com", "ultimatesoftware\\.com", "united\\.com", "unither\\.com", "ajleo\\.com", "akamai\\.com", "alcoa\\.com", "aa\\.com", "aig\\.com", "amlawyer\\.info", "appnexus\\.com", "aramark\\.com", "arborbrewing\\.com", "arnoldporter\\.com", "aspensnowmass\\.com", "assemblesound\\.com", "atlascutstone\\.com", "atticuscircle\\.org", "aglcc\\.org", "avanade\\.com", "bacfl\\.org", "bain\\.com", "bakermckenzie\\.com", "bankofamerica\\.com", "bnymellon\\.com", "home\\.barclays", "barclays\\.com", "barclays\\.co\\.uk", "barclaysus\\.com", "barclaycardus\\.com", "barnesandnoble\\.com", "bebe\\.com", "bd\\.com", "bdbiosciences\\.com", "belcampo\\.com", "benjerry\\.com", "bigducknyc\\.com", "amazonprinters\\.com", "billysfarm\\.com", "blackrock\\.com", "bloomberg\\.com", "blueapron\\.com", "blue-heron-ventures\\.com", "winterhavenhotelsobe\\.com", "bluemoonhotel\\.com", "bfslawgroup\\.com", "boehringer-ingelheim\\.com", "bostoncommunitycapital\\.org", "bcg\\.com", "tbf\\.org", "bmc\\.org", "bostonscientific\\.com", "bradymills\\.com", "brandquery\\.com", "bms\\.com", "broadcom\\.com", "brocade\\.com", "cablevision\\.com", "capitalone\\.com", "cardinal\\.com", "careresource\\.org", "cbscorporation\\.com", "executiveboard\\.com", "centralphysicaltherapy\\.com", "charlottebusinessguild\\.org", "chubb\\.com", "cigna\\.com", "citycateringcompany\\.com", "citylightssign\\.com", "a2gov\\.org", "civitaspublicaffairs\\.com", "cleanyield\\.com", "cmitsolutions\\.com", "cohenandassociates\\.com", "colgatepalmolive\\.com", "gayosphere\\.com", "equalityforum\\.com", "iglta\\.com", "aidshealth\\.org", "gaywhistler\\.com", "cvshealth\\.com", "cupcakeroyale\\.com", "cummins\\.com", "credit-suisse\\.com", "crazymisfits\\.com", "corcoran\\.com", "conagrafoods\\.com", "computerbutler\\.net", "hillaryclinton\\.com"];
	bad = ["focusonthefamily\\.com", "takebackmarriage\\.org", "2ndvote\\.com"];
	inbetween = ["example\\.com"];
	regood = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + good.join("|") + ")", "i");
	rebad = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + bad.join("|") + ")", "i");
	reinbetween = new RegExp("^(http)?(s)?(:\\/\\/)?(\\w+\\.)*(" + inbetween.join("|") + ")", "i");

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
		if (toggle === true || toggle === "true") {
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