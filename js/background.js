// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse) {
// 		if (request.toggle == "true") {
// 			toggle = true;
// 		} else if (request.toggle == "false") {
// 			toggle = false;
// 		}
// });

// if (toggle === undefined || toggle === null) {
// 	toggle = false;
// };

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		// if (toggle) {
			chrome.tabs.sendMessage(tabId, {url: tab.url, id: tabId})
			chrome.tabs.executeScript(null, {file: "/js/content_script.js"});
		// };
	}
}); 