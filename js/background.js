// Set toggle if isn't availible
toggle = false;
// Set if traffic isn't availible
traffic = 0;
trafficnf = 0;
trafficg = 0;
trafficb = 0;
trafficib = 0;
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
		sendResponse({url: lastPassedurl, test: testifgood(lastPassedurl), trafg: calctraffic("g"), trafb: calctraffic("b"), trafib: calctraffic("ib"), trafnf: calctraffic("nf")});
	};
});

//  Test against array
function testifgood(url) {
	lastPassedurl = url;
	good = ["github\\.com", "stackoverflow\\.com", "buzzfeed\\.com", "att\\.com", "uber\\.com", "lyft\\.com", "expedia\\.com", "peta\\.org", "gap\\.com", "amazon\\.com", "amazon\\.jobs", "twitch\\.tv", "audible\\.com", "dpreview\\.com", "joyo\\.com", "diapers\\.com", "goodreads\\.com", "imdb\\.com", "amazon\\.cn", "z\\.cn", "amazon\\.in", "amazon\\.co\\.jp", "amazon\\.fr", "amazon\\.de", "amazon\\.it", "amazon\\.nl", "amazon\\.es", "amazon\\.co\\.uk", "amazon\\.ca", "amazon\\.com\\.mx", "amazon\\.com\\.au", "amazon\\.com\\.br", "alaskaair\\.com", "airproducts\\.com", "aetna\\.com", "accenture\\.com", "aws-e\\.com", "atkearney\\.com", "alnella\\.com", "apple\\.com", "americanexpress\\.com", "americanapparel\\.net", "cloudflare\\.com", "comcast\\.com", "xfinity\\.com", "coxenterprises\\.com", "valpak\\.com", "coxmediagroup\\.com", "cox\\.com", "manheim\\.com", "autotrader\\.com", "kudzu\\.com", "gamut\\.media", "kbb\\.com", "coxautoinc\\.com", "corning\\.com", "corninggorillaglass\\.com", "cisco\\.com", "citigroup\\.com", "citialumninetwork\\.com", "citibank\\.com", "cgi\\.com", "coca-colacompany\\.com", "coca-cola\\.com", "cocacola\\.com", "us\\.coca-cola\\.com", "dietcoke\\.com", "cokezero\\.com", "coca-colafreestyle\\.com", "mycokerewards\\.com", "icoke\\.ca", "coca-cola\\.ca", "coca-cola\\.com\\.ar", "coca-cola\\.com\\.bz", "coca-cola\\.bs", "coca-cola\\.com\\.bo", "cocacola\\.com\\.br", "caribbean\\.coca-cola\\.com", "coca-cola\\.cl", "coca-cola\\.com\\.co", "coca-cola\\.co\\.cr", "coca-cola\\.com\\.do", "coca-cola\\.com\\.sv", "coca-cola\\.com\\.gt", "coca-cola\\.com\\.hn", "coca-cola\\.com\\.mx", "happiness\\.coca-cola\\.com", "coke\\.ch", "coca-cola\\.az", "coca-cola\\.com\\.qa", "coca-cola\\.by", "coca-cola\\.in", "cocacola\\.co\\.il", "coca-cola\\.kz", "coca-cola\\.com\\.pk", "coca-cola\\.ps", "coca-cola\\.ru", "coca-cola\\.com\\.tr", "coca-cola\\.ua", "coca-cola\\.ae", "coca-cola\\.it", "coca-cola\\.ee", "coca-cola\\.lt", "coca-cola\\.lu", "coke\\.pl", "coca-cola\\.lv", "cocacola\\.pt", "coca-cola\\.ro", "coca-cola\\.rs", "coca-cola\\.sk", "coca-cola\\.si", "cocacola\\.es", "coca-cola\\.com\\.ni", "coca-cola\\.com\\.pa", "coca-cola\\.com\\.py", "coca-cola\\.com\\.pe", "coca-cola\\.com\\.tt", "coca-cola\\.com\\.uy", "coca-cola\\.com\\.ve", "coke\\.at", "coca-cola\\.be", "coca-cola\\.be", "coca-cola\\.ba", "coca-cola\\.bg", "coca-cola\\.hr", "coca-cola\\.cz", "coke\\.de", "coca-cola\\.gr", "secure\\.coca-cola\\.hu", "coca-cola\\.hu", "coke\\.is", "coke\\.eg", "coca-cola\\.co\\.ke", "coca-cola\\.rw", "coke\\.co\\.za", "coca-cola\\.com", "coca-cola\\.co\\.tz", "tunisia\\.coca-cola\\.com", "coca-cola\\.co\\.ug", "coca-cola\\.co\\.zw", "icoke\\.co\\.th", "cocacola\\.com\\.au", "coca-cola\\.com\\.bd", "icoke\\.hk", "coca-cola\\.co\\.id", "cocacola\\.jp", "coke\\.com\\.my", "coca-cola\\.com\\.mv", "coca-cola\\.co\\.nz", "icoke\\.cn", "coca-cola\\.com\\.ph", "cocacola\\.co\\.kr", "coca-cola\\.com\\.sg", "coca-cola\\.lk", "ahh\\.com", "wellsfargo\\.com", "xerox\\.com", "xerox\\.ca", "xeroxcareers\\.com", "xfund\\.com", "yesdesigngroup\\.com", "zoomsystems\\.com", "zynga\\.com", "zyngagames\\.com", "zingermanscommunity\\.com", "zacfirm\\.com", "ypsilantidda\\.org", "wyndhamworldwide\\.com", "wyndham\\.com", "workplaceequalityindex\\.com", "witeck\\.com", "wislgbtchamber\\.com", "wheynaturalusa\\.com", "wmgllc\\.com", "thewaltdisneycompany\\.com", "waltdisneystudios\\.com", "marvel\\.com", "disney\\.com", "go\\.com", "disneystore\\.com", "disneytheatricalgroup\\.com", "disneyonbroadway\\.com", "disneyonice\\.com", "disneylive\\.com", "disneytheatricallicensing\\.com", "disneyanimation\\.com", "pixar\\.com", "hollywoodrecords\\.com", "clubpenguin\\.com", "disneymoviesanywhere\\.com", "disneystorycentral\\.com", "walshwellnesscenter\\.com", "wsdevelopment\\.com", "grainger\\.com", "wmmadv\\.com", "vmware\\.com", "vitaperk\\.com", "visa\\.com", "viacom\\.com", "verizon\\.com", "verizonwireless\\.com", "vcbconsulting\\.biz", "uptownphysiciansgroup\\.com", "twitter\\.com", "tuttabella\\.com", "travelout\\.com", "206inc\\.com", "ubs\\.com", "ultimatesoftware\\.com", "united\\.com", "unither\\.com", "ajleo\\.com", "akamai\\.com", "alcoa\\.com", "aa\\.com", "aig\\.com", "amlawyer\\.info", "appnexus\\.com", "aramark\\.com", "arborbrewing\\.com", "arnoldporter\\.com", "aspensnowmass\\.com", "assemblesound\\.com", "atlascutstone\\.com", "atticuscircle\\.org", "aglcc\\.org", "avanade\\.com", "bacfl\\.org", "bain\\.com", "bakermckenzie\\.com", "bankofamerica\\.com", "bnymellon\\.com", "home\\.barclays", "barclays\\.com", "barclays\\.co\\.uk", "barclaysus\\.com", "barclaycardus\\.com", "barnesandnoble\\.com", "bebe\\.com", "bd\\.com", "bdbiosciences\\.com", "belcampo\\.com", "benjerry\\.com", "bigducknyc\\.com", "amazonprinters\\.com", "billysfarm\\.com", "blackrock\\.com", "bloomberg\\.com", "blueapron\\.com", "blue-heron-ventures\\.com", "winterhavenhotelsobe\\.com", "bluemoonhotel\\.com", "bfslawgroup\\.com", "boehringer-ingelheim\\.com", "bostoncommunitycapital\\.org", "bcg\\.com", "tbf\\.org", "bmc\\.org", "bostonscientific\\.com", "bradymills\\.com", "brandquery\\.com", "bms\\.com", "broadcom\\.com", "brocade\\.com", "cablevision\\.com", "capitalone\\.com", "cardinal\\.com", "careresource\\.org", "cbscorporation\\.com", "executiveboard\\.com", "centralphysicaltherapy\\.com", "charlottebusinessguild\\.org", "chubb\\.com", "cigna\\.com", "citycateringcompany\\.com", "citylightssign\\.com", "a2gov\\.org", "civitaspublicaffairs\\.com", "cleanyield\\.com", "cmitsolutions\\.com", "cohenandassociates\\.com", "colgatepalmolive\\.com", "gayosphere\\.com", "equalityforum\\.com", "iglta\\.com", "aidshealth\\.org", "gaywhistler\\.com", "cvshealth\\.com", "cupcakeroyale\\.com", "cummins\\.com", "credit-suisse\\.com", "crazymisfits\\.com", "corcoran\\.com", "conagrafoods\\.com", "computerbutler\\.net", "hillaryclinton\\.com", "dallasvoice\\.com", "dana-farber\\.org", "danaher\\.com", "glbtchamber\\.org", "dcigroup\\.com", "deloitte\\.com", "delta\\.com", "dtcc\\.com", "desertbusinessassociation\\.org", "db\\.com", "diageo\\.com", "directv\\.com", "docusign\\.com", "domini\\.com", "dow\\.com", "dreamcatcherpublishing\\.ca", "dupont\\.com", "dropbox\\.com", "ebay\\.com", "edelman\\.com", "nwlgbtseniorcare\\.org", "ea\\.com", "enduringhydro\\.com", "ey\\.com", "elcompanies\\.com", "eventrents\\.net", "expressmoversinc\\.com", "facebook\\.com", "fbm\\.com", "fastsigns\\.com", "fenwick\\.com", "firstdata\\.com", "fsbwa\\.com", "1stdibs\\.com", "fittechnologies\\.com", "flanerycpa\\.squarespace\\.com", "fcpcommunications\\.com", "tocaevents\\.com", "tntpromotions\\.biz", "tiwaryent\\.com", "thomsonreuters\\.com", "thirdpoint\\.com", "tcapdesign\\.com", "testtracks\\.com", "techdata\\.com", "tdsecurities\\.com", "tdbank\\.com", "target\\.com", "tampabay\\.rays\\.mlb\\.com", "hobees\\.com", "symantec\\.com", "support\\.com", "sundailyhealth\\.com", "att\\.yahoo\\.com", "minecraft\\.net", "mojang\\.com", "michiganpneumatic\\.com", "glccnv\\.org", "lambdalv\\.com", "ge\\.com", "geappliances\\.com", "generalmills\\.com", "cheerios\\.com", "cascadianfarm\\.com", "chex\\.com", "fiberone\\.com", "kixcereal\\.com", "wheaties\\.com", "totalcereal\\.com", "luckycharms\\.com", "bettycrocker\\.com", "goldmedalflour\\.com", "jusrol\\.co\\.uk", "lasaltena\\.com\\.ar", "pillsbury\\.com", "yoplait\\.fr", "mountainhighyoghurt\\.com", "liberteusa\\.com", "yoplait\\.com", "parampara\\.com\\.au", "progresso\\.com", "totinos\\.com", "plateful\\.com\\.au", "naturevalley\\.com", "bettycrocker\\.com", "muirglen\\.com", "larabar\\.com", "foodshouldtastegood\\.com", "wanchaiferry\\.com", "oldelpaso\\.com", "greengiant\\.com", "annies\\.com", "annieshomegrown\\.ca", "discoverindulgence\\.com", "knackundback\\.de", "immaculatebaking\\.com", "gensler\\.com", "gilt\\.com", "gsk\\.com", "gleasonandassociates\\.com", "go-factory\\.com", "cmtjustice\\.com", "goldmansachs\\.com", "panoramio\\.com", "blogger\\.com", "google\\.com", "google\\.ac", "google\\.ad", "google\\.ae", "google\\.com", "google\\.com", "google\\.com", "google\\.al", "google\\.am", "google\\.co", "google\\.com", "google\\.as", "google\\.at", "google\\.com", "google\\.az", "google\\.ba", "google\\.com", "google\\.be", "google\\.bf", "google\\.bg", "google\\.com", "google\\.bi", "google\\.bj", "google\\.com", "google\\.com", "google\\.com", "google\\.bs", "google\\.bt", "google\\.co", "google\\.by", "google\\.com", "google\\.co", "google\\.com", "google\\.cc", "google\\.cd", "google\\.cf", "google\\.cat", "google\\.cg", "google\\.ch", "google\\.ci", "google\\.co", "google\\.cl", "google\\.cm", "google\\.cn", "g\\.cn", "google\\.com", "google\\.co", "google\\.com", "google\\.cv", "google\\.com", "google\\.cz", "google\\.de", "google\\.dj", "google\\.dk", "google\\.dm", "google\\.com", "google\\.dz", "google\\.com", "google\\.ee", "google\\.com", "google\\.es", "google\\.com", "google\\.fi", "google\\.com", "google\\.fm", "google\\.fr", "google\\.ga", "google\\.ge", "google\\.gf", "google\\.gg", "google\\.com", "google\\.com", "google\\.gl", "google\\.gm", "google\\.gp", "google\\.gr", "google\\.com", "google\\.gy", "google\\.com", "google\\.hn", "google\\.hr", "google\\.ht", "google\\.hu", "google\\.co", "google\\.iq", "google\\.ie", "google\\.co", "google\\.im", "google\\.co", "google\\.io", "google\\.is", "google\\.it", "google\\.je", "google\\.com", "google\\.jo", "google\\.co", "google\\.co", "google\\.ki", "google\\.kg", "google\\.co", "google\\.com", "google\\.kz", "google\\.la", "google\\.com", "google\\.com", "google\\.li", "google\\.lk", "google\\.co", "google\\.lt", "google\\.lu", "google\\.lv", "google\\.com", "google\\.co", "google\\.md", "google\\.me", "google\\.mg", "google\\.mk", "google\\.ml", "google\\.com", "google\\.mn", "google\\.ms", "google\\.com", "google\\.mu", "google\\.mv", "google\\.mw", "google\\.com", "google\\.com", "google\\.co", "google\\.com", "google\\.ne", "google\\.com", "google\\.com", "google\\.com", "google\\.nl", "google\\.no", "google\\.com", "google\\.nr", "google\\.nu", "google\\.co", "google\\.com", "google\\.com", "google\\.com", "google\\.com", "google\\.com", "google\\.pl", "google\\.com", "google\\.pn", "google\\.com", "google\\.ps", "google\\.pt", "google\\.com", "google\\.com", "google\\.ro", "google\\.rs", "google\\.ru", "google\\.rw", "google\\.com", "google\\.com", "google\\.sc", "google\\.se", "google\\.com", "google\\.sh", "google\\.si", "google\\.sk", "google\\.com", "google\\.sn", "google\\.sm", "google\\.so", "google\\.st", "google\\.com", "google\\.td", "google\\.tg", "google\\.co", "google\\.com", "google\\.tk", "google\\.tl", "google\\.tm", "google\\.to", "google\\.tn", "google\\.com", "google\\.com", "google\\.tt", "google\\.com", "google\\.co", "google\\.com", "google\\.co", "google\\.co", "google\\.us", "google\\.com", "google\\.co", "google\\.com", "google\\.co", "google\\.vg", "google\\.co", "google\\.com", "google\\.vu", "google\\.ws", "google\\.co", "google\\.co", "google\\.co", "admob\\.com", "adsense\\.com", "adwords\\.com", "android\\.com", "blogger\\.com", "blogspot\\.com", "chromium\\.org", "chrome\\.com", "chromebook\\.com", "com\\.google", "feedburner\\.com", "doubleclick\\.com", "igoogle\\.com", "foofle\\.com", "froogle\\.com", "googleanalytics\\.com", "analytics\\.com", "googlecode\\.com", "googlesource\\.com", "googledrive\\.com", "googlearth\\.com", "googleearth\\.com", "googlemaps\\.com", "googlepagecreator\\.com", "googlescholar\\.com", "gmail\\.com", "googlemail\\.com", "keyhole\\.com", "madewithcode\\.com", "panoramio\\.com", "picasa\\.com", "sketchup\\.com", "urchin\\.com", "waze\\.com", "youtube\\.com", "youtu\\.be", "yt\\.be", "ytimg\\.com", "youtubeeducation\\.com", "nocookie\\.com", "like\\.com", "Google\\.org", "google\\.org", "google\\.net", "466453\\.com", "gooogle\\.com", "gogle\\.com", "ggoogle\\.com", "gogole\\.com", "goolge\\.com", "googel\\.com", "googlee\\.com", "googil\\.com", "googlr\\.com", "googl\\.com", "ggpht\\.com", "gmodules\\.com", "gtempaccount\\.com", "googleadservices\\.com", "googleapps\\.com", "googleapis\\.com", "goo\\.gl", "googlebot\\.com", "googlecommerce\\.com", "googlesyndication\\.com", "whatbrowser\\.org", "localhost\\.com", "withgoogle\\.com", "goulstonstorrs\\.com", "greatofficiants\\.com", "getmdl\\.io", "ctglc\\.org", "gsdba\\.org", "thegsba\\.org", "greensulate\\.com", "grossmanmarketing\\.com", "ghc\\.org", "groupon\\.com", "growinghope\\.net", "harrell-remodeling\\.com", "thehartford\\.com", "healthline\\.com", "snwh\\.org", "elementary\\.io", "hp\\.com", "hilton\\.com", "hiltonworldwide\\.com", "holdredge\\.com", "homewardpet\\.org", "housepackard\\.com", "hsbc\\.com", "ikardwynne\\.com", "thinkiba\\.com", "inbachamber\\.org", "insala\\.com", "inspirato\\.com", "iarchive\\.com", "fullscreenrickroll\\.com", "integritylawgroup\\.net", "intel\\.com", "mcafee\\.com", "intuit\\.com", "inusgroup\\.com", "jacksonholegroup\\.com", "jagoddesigns\\.com", "jazzpharma\\.com", "sunlife\\.com", "stuffedcakes\\.com", "stonewallcolumbus\\.org", "stonewall-inc\\.com", "stevengravesinsurance\\.com", "statestreet\\.com", "starrtek\\.com", "starbucks\\.com", "staples\\.com", "sjm\\.com", "spryvision\\.com", "jenntgrace\\.com", "jenniferbrownconsulting\\.com", "jetblue\\.com", "henson\\.com", "jnj\\.com", "jkzllp\\.com", "bowman4law\\.com", "jpmorganchase\\.com", "kapchur\\.us", "kazanlaw\\.com", "keirjones\\.com", "kvn\\.com", "keomarketing\\.com", "kimberly-clark\\.com", "kimptonhotels\\.com", "kollmarsheetmetal\\.com", "sancarloschiropractor\\.com", "kpmg\\.com", "spectra-law\\.com", "sowsf\\.com", "sleevesupproductions\\.com", "skyworksinc\\.com", "skellengerbender\\.com", "simonschindler\\.com", "lambdalv\\.com", "ligocourses\\.com", "mhfi\\.com", "larsonmarcom\\.com", "laughton-properties\\.com", "sidetrackchicago\\.com", "dfwshingles\\.com", "seyfarth\\.com", "sempra\\.com", "sdge\\.com", "semprainternational\\.com", "socalgas\\.com", "seattlechamber\\.com", "sanfrancisco\\.giants\\.mlb\\.com", "theseattlelesbian\\.com", "sfchamber\\.com", "sabolegal\\.com", "rainbowchamber\\.com", "joelsogol\\.com", "lisaschuchman\\.com", "burch-law\\.com", "robinbodifordlaw\\.com", "fullerpllc\\.com", "levistrauss\\.com", "levi\\.com", "dockers\\.com", "levistrausssignature\\.com", "denizen\\.com", "givemelibertyburger\\.com", "lieffcabraser\\.com", "link-usa\\.org", "littler\\.com", "lbcbn\\.com", "lorikarbal\\.com", "lwcotrust\\.com", "laglcc\\.org", "marriott\\.com", "mainstreethairshoppe\\.com", "mmc\\.com", "massmutual\\.com", "mckesson\\.com", "mckinsey\\.com", "mercarealestate\\.com", "gogaymiami\\.com", "gaybizmiami\\.com", "microsoft\\.com", "office\\.com", "windowsphone\\.com", "xbox\\.com", "skype\\.com", "msn\\.com", "bing\\.com", "microsoftstore\\.com", "maglcc\\.org", "millerpoliticallaw\\.com", "millersheltongroup\\.com", "millercoors\\.com", "mintz\\.com", "smith-law\\.net", "moodys\\.com", "morganmillerplumbing\\.com", "morganstanley\\.com", "mww\\.com", "namidallas\\.org", "nashvilleglbtchamber\\.org", "nglcc\\.org", "nationwide\\.com", "neumanncapital\\.com", "patriots\\.com", "newleafcolumbus\\.ning\\.com", "newyorklife\\.com", "niftyhoops\\.com", "nike\\.com", "nixonpeabody\\.com", "glbtchamber\\.org", "northropgrumman\\.com", "oboxsolutions\\.com", "officedepot\\.com", "ogilvy\\.com", "ogletreedeakins\\.com", "onecommunity\\.co", "1-sc\\.com", "oracle\\.com", "java\\.com", "mysql\\.com", "orbitz\\.com", "outandequal\\.org", "outerwall\\.com", "coinstar\\.com", "pandora\\.com", "path\\.org", "peabodyarnold\\.com", "pepperlaw\\.com", "pepsico\\.com", "pepsicojobs\\.com", "pepsi\\.com", "fritolay\\.com", "mountaindew\\.com", "gatorade\\.com", "tropicana\\.com", "7up\\.com", "quakeroats\\.com", "mirinda\\.com", "pepsico\\.de", "liptontea\\.com", "aquafina\\.com", "sierramist\\.com", "walkers\\.co\\.uk", "sobe\\.com", "stacyssnacks\\.com", "alvalle\\.es", "h2oh\\.com\\.br", "walkersbakedstars\\.co\\.uk", "wheeloflevy\\.com", "duyvis\\.nl", "propelwater\\.com", "yedigun\\.com\\.tr", "sabritas\\.com\\.mx", "redrockdeli\\.com\\.au", "kurkure\\.co\\.in", "tropicana\\.com", "mullerquaker\\.com", "trop50\\.com", "nakedjuice\\.com", "sabra\\.com", "sunbites\\.pl", "pfizer\\.com", "pixelligent\\.com", "thinkplexus\\.org", "paba\\.com", "pwc\\.com", "seattlepridefest\\.org", "seattlepride\\.org", "theprintingworks\\.biz", "protecinc\\.net", "protrials\\.com", "pg\\.com", "prudential\\.com", "pumasprings\\.com", "qualcomm\\.com", "qualcommventures\\.com", "twincitiesquorum\\.com", "rafiarchitecture\\.com", "sjchamber\\.com", "ralphsregalweddings\\.com", "rbccm\\.com", "replacements\\.com", "re-verberate\\.com", "risingtidebrewing\\.com", "photographybyrjr\\.com", "rockwellautomation\\.com", "rotellahernandezlaw\\.com", "aussiecanada\\.ca", "braun\\.com", "clairol\\.com", "covergirl\\.ca", "gillette\\.com", "gillettevenus\\.ca", "headandshoulders\\.ca", "herbalessences\\.com", "simplyivory\\.ca", "olay\\.ca", "oldspice\\.ca", "pantene\\.com", "secret\\.com", "always\\.com", "clearblue\\.com", "crest\\.com", "fixodent\\.ca", "scope\\.ca", "pepto-bismol\\.ca", "oralb\\.com", "metamucil\\.ca", "tampax\\.ca", "vicks\\.ca", "bouncefresh\\.ca", "bountytowels\\.com", "cascadeclean\\.com", "charmin\\.com", "duracell\\.ca", "downy\\.com", "dawn-dish\\.com", "cheer\\.ca", "febreze\\.com", "ilovegain\\.ca", "ivorysnow\\.ca", "mrclean\\.ca", "tide\\.com", "swiffer\\.com", "puffs\\.com", "pampers\\.ca", "pgproductsafety\\.com", "escada-fragrances\\.com", "headandshoulders\\.com", "londaprofessional\\.com", "rejoice\\.com\\.cn", "vidalsassoon\\.com", "sk-ii\\.com", "olay\\.com", "maxfactor-international\\.com", "fekkai\\.com", "covergirl\\.com", "aussie\\.com", "dolcegabbana\\.com", "gucci\\.com", "ivorysoap\\.tumblr\\.com", "mexx-fragrances\\.com", "oldspice\\.com", "safeguardsoap\\.com", "wella\\.com", "sebastianprofessional\\.com", "naomi-campbell-perfumes\\.com", "lacoste\\.com", "hugoboss\\.com", "luvsdiapers\\.com", "tampax\\.com", "pampers\\.com", "ace\\.info", "dash\\.it", "for-me-online\\.de", "supersavvyme\\.co\\.uk", "dentureliving\\.com", "bouncefresh\\.com", "ariel\\.com\\.mx", "dazwhite\\.co\\.uk", "dreft\\.com", "lenor\\.com", "desiderimagazine\\.it", "mrclean\\.com", "ilovegain\\.com", "eradetergent\\.com", "cheer\\.com", "aligngi\\.com", "pepto-bismol\\.com", "gillettevenus\\.com", "vicks\\.com", "clearblueeasy\\.com", "metawellness\\.com", "prilosecotc\\.com", "scopemouthwash\\.com"];
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

function calctraffic (t) {
	if (t=="g") {
		return trafficg/traffic*100;
	} else if (t=="b") {
		return trafficb/traffic*100;
	} else if (t=="ib") {
		return trafficib/traffic*100;
	} else if (t=="nf") {
		return trafficnf/traffic*100;
	};
}

// Main
function main(url, id) {
	test = testifgood(url);
	// Good Icon and Title
	if (test == "good") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/deafult/icon_19.png", 38: "/img/icons/deafult/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Good Standing - We LGBT"});
		traffic ++;
		trafficg ++;
	};

	// Bad Icon and Title
	if (test == "bad") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/poor/icon_19.png", 38: "/img/icons/poor/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Poor Standing - We LGBT"});
		traffic ++;
		trafficb ++;
	};

	// Inbetween Icon and Title
	if (test == "inbetween") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/inbetween/icon_19.png", 38: "/img/icons/inbetween/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Medium Standing - We LGBT"});
		traffic ++;
		trafficib ++;
	};

	// Notfound Icon and Title
	if (test == "notfound") {
		chrome.browserAction.setIcon({path: {19: "/img/icons/notfound/icon_19.png", 38: "/img/icons/notfound/icon_38.png"}}, function(){});
		chrome.browserAction.setTitle({title: "Not Found - We LGBT"});
		traffic ++;
		trafficnf ++;
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