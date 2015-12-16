/* global chrome */
(function() {
  "use strict";

  var su;
  var it;
  var ns;
  var rep;
  var url;
  var traffic;
  var trafficSu;
  var trafficIt;
  var trafficNs;
  var trafficNf;
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
    su.data = data.supportive;
    it.data = data.intermediate;
    ns.data = data["not supportive"];

    var obj = [su, it, ns];
    for (var o in [su, it, ns]) {
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
  if (typeof su === "undefined" || typeof it === "undefined" || typeof ns === "undefined") {
    su = {
      "data": [],
      "array": [],
      "regex": ""
    };
    it = {
      "data": [],
      "array": [],
      "regex": ""
    };
    ns = {
      "data": [],
      "array": [],
      "regex": ""
    };

    // Get Patterns
    getJSON("https://raw.githubusercontent.com/xorprojects/We-LGBT/master/js/rep.json", "/js/rep.json").then(getPatterns);
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
    var dataParents = {
      "su": su,
      "it": it,
      "ns": ns
    };
    return getObjFromData(dataParents[rep].data);
  }

  // Variables
  if (typeof traffic === "undefined" || typeof trafficSu === "undefined" || typeof trafficIt === "undefined" || typeof trafficNs === "undefined" || typeof trafficNf === "undefined") {
    traffic = 0;
    trafficSu = 0;
    trafficIt = 0;
    trafficNs = 0;
    trafficNf = 0;
  }
  if (typeof rep === "undefined" || typeof url === "undefined") {
    rep = "nf";
    url = "example.com";
  }

  // Recive requests for cards from popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "open") {
      trafficPercents = [trafficSu / traffic * 100, trafficIt / traffic * 100, trafficNs / traffic * 100, trafficNf / traffic * 100];
      sendResponse({
        "url": url,
        "rep": rep,
        "traffic": traffic,
        "trafficSu": trafficPercents[0],
        "trafficIt": trafficPercents[1],
        "trafficNs": trafficPercents[2],
        "trafficNf": trafficPercents[3],
        "obj": getObj()
      });
    }
  });

  // Main
  function main(id) {
    // Test Against Regular Expression
    if (!su.regex == "" && su.regex.test(url)) {
      rep = "su";
    } else if (!it.regex == "" && it.regex.test(url)) {
      rep = "it";
    } else if (!ns.regex == "" && ns.regex.test(url)) {
      rep = "ns";
    } else {
      rep = "nf";
    }
    traffic++;

    // Browser Action Icon and Title
    // Supportive
    if (rep === "su") {
      setBrowserActionIcon("supportive");
      setBrowserActionTitle("Supportive - We LGBT");
      trafficSu++;
    }
    // Intermediate
    if (rep === "it") {
      setBrowserActionIcon("intermediate");
      setBrowserActionTitle("Intermediate - We LGBT");
      trafficIt++;
    }
    // Not Supportive
    if (rep === "ns") {
      setBrowserActionIcon("not-supportive");
      setBrowserActionTitle("Not Supportive - We LGBT");
      trafficNs++;
    }
    // Not Found
    if (rep === "nf") {
      setBrowserActionIcon("not-found");
      setBrowserActionTitle("Not Found - We LGBT");
      trafficNf++;
    }
  }

  // When URL Changed
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
      url = tab.url;
      main(tabId);
    }
  });

  // When Tab Changed
  chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({
      "active": true,
      "lastFocusedWindow": true
    }, function(tabs) {
      url = tabs[0].url;
      main(tabs[0].id);
    });
  });
})();
