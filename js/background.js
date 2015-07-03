chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		alert(tab.url);
		alert(tabId);
		// chrome.tabs.executeScript({
		// 	code: ''
		// });
	}
}); 