function settings() {
	URL = document.URL;
	on = window.localStorage.on;
	oids = ["104578301064881681948", "105555694224602845621"]; // Array from settings
	names = ["Badass Programmer", "MKBHD"]; //
	pictures = [""]; //
	orginalNames = ["Daniel Hickman", "Marques Brownlee"]; //
	orginalPictures = [""]; //
	settings = [1,1,1,1,1,1]; //
}; // predefined

settings();

function loop() {
	// Post Header
	obtvUbHf = document.getElementsByClassName('ob tv Ub Hf');
	for (var i = obtvUbHf.length - 1; i >= 0; i--) {
		oid = obtvUbHf[i].getAttribute("oid");
		if (oids.indexOf(oid) != -1) {
			// replace
			obtvUbHf[i].innerHTML = names[oids.indexOf(oid)];
		};
		delete oid; // clear variable
		// repeat or continue
	}; // obtvUbHf

	// Post Comments
	obtvUbTD = document.getElementsByClassName('ob tv Ub TD');
	for (var i = obtvUbTD.length - 1; i >= 0; i--) {
		oid = obtvUbTD[i].getAttribute("oid");
		if (oids.indexOf(oid) != -1) {
			// replace
			obtvUbTD[i].innerHTML = names[oids.indexOf(oid)];
		};
		delete oid; // clear variable
		// repeat or continue
	}; // obtvUbTD

	// Mentions
	proflinkaaTEdf = document.getElementsByClassName('proflink aaTEdf');
	for (var i = proflinkaaTEdf.length - 1; i >= 0; i--) {
		oid = proflinkaaTEdf[i].getAttribute("oid");
		if (oids.indexOf(oid) != -1) {
			// replace
			proflinkaaTEdf[i].innerHTML = names[oids.indexOf(oid)];
		};
		delete oid; // clear variable
		// repeat or continue
	}; // proflinkaaTEdf

	// See Who +1'd this
	obtvUb = document.getElementsByClassName('ob tv Ub');
	for (var i = obtvUb.length - 1; i >= 0; i--) {
		oid = obtvUb[i].getAttribute("oid");
		if (oids.indexOf(oid) != -1) {
			// replace
			obtvUb[i].innerHTML = names[oids.indexOf(oid)];
		};
		delete oid; // clear variable
		// repeat or continue
	}; // obtvUb

	// Hover Cards
	vFrj = document.getElementsByClassName('vF rj');
	for (var i = vFrj.length - 1; i >= 0; i--) {
		oid = vFrj[i].parentElement.getAttribute("oid");
		if (oids.indexOf(oid) != -1) {
			// replace
			vFrj[i].innerHTML = names[oids.indexOf(oid)];
		};
		delete oid; // clear variable
		// repeat or continue
	}; // vFrj

	// Profile Page
	if (document.getElementsByClassName('d-s Cy k4c aSc d-xc d-xc-L P4').length > 0) {
		oid = document.getElementsByClassName('d-s Cy k4c aSc d-xc d-xc-L P4')[0].id.replace(/-\w+-\w+$/, "");
		if (oids.indexOf(oid) != -1) {
			oidNum = oids.indexOf(oid);
			firstName = names[oidNum].replace(/(\w+)(\s+\w+)+$/, "$1");
			orginalFirstName = orginalNames[oidNum].replace(/(\w+)(\s+\w+)+$/, "$1");
			// replace
			document.getElementsByClassName("rna KXa Xia fn")[0].innerHTML = names[oidNum];
			// replace document title
			document.title = names[oidNum] + " - Google+";
			// add to "Basic Information"
			var re = new RegExp('<div class="wna DVb"><div class="E9a G9a Rqc">Original name</div><div class="y4 G9a">' + orginalNames[oidNum] + '</div></div>$',"i");
			if (document.getElementsByClassName("Qqc").length > 0 && re.test(document.getElementsByClassName('Qqc')[0].innerHTML) === false) {document.getElementsByClassName('Qqc')[0].innerHTML = document.getElementsByClassName('Qqc')[0].innerHTML + '<div class="wna DVb"><div class="E9a G9a Rqc">Original name</div><div class="y4 G9a">' + orginalNames[oidNum] + '</div></div>';};
			// rename collections with first name
			if (document.getElementsByClassName("A3xvkf").length > 0) {document.getElementsByClassName("A3xvkf")[0].innerHTML = firstName + "'s Collections";};
			// Rename tagged photos
			if (document.getElementsByClassName("d-s TYml9c").length > 0) {document.getElementsByClassName("d-s TYml9c")[0].innerHTML = "Photos of " + firstName;};
			// no tagged photos
			if (document.getElementsByClassName("Cab").length > 0) {document.getElementsByClassName("Cab")[0].innerHTML = "There are no photos of " + firstName;};
			// YouTube channel header
			if (document.getElementsByClassName("dEc d-k-l").length > 0) {document.getElementsByClassName("dEc d-k-l")[0].innerHTML = firstName + "'s YouTube Videos";};
			// YouTube channel description
			if (document.getElementsByClassName("ifc Dab").length > 0) {document.getElementsByClassName("ifc Dab")[0].innerHTML = document.getElementsByClassName("ifc Dab")[0].innerHTML.replace(orginalFirstName, firstName);};
			// Profile Header
			if (document.getElementsByClassName("fpd KXa").length > 0) {document.getElementsByClassName("fpd KXa")[0].innerHTML = names[oidNum];};
			// Plusones Description
			if (document.getElementsByClassName("fa-V9c Cxc o5").length > 0) {document.getElementsByClassName("fa-V9c Cxc o5")[0].innerHTML = document.getElementsByClassName("fa-V9c Cxc o5")[0].innerHTML.replace(orginalNames[oidNum], names[oidNum]);};
		} else {
			// continue
		}; //oidCheck
		delete oid; // clear variable
		delete oidNum; //
	} else {
		profile = 0; // not profile page
	}; // Profile Page
}; // loop

function looper() {
	setInterval(function() {loop();}, 1000);
}; // looper

function get() {
	chrome.storage.sync.get("on,title" , function (obj) {
		console.log(obj);
	});
}

if (on == "true") {looper();};