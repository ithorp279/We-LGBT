/* global chrome */
(function() {
  "use strict";

  function init() {
    chrome.runtime.sendMessage({
      "message": "open"
    }, function(response) {
      var url = response.url;
      var rep = response.rep;
      var obj = response.obj;
      var traffic = response.traffic;
      var trafficSu = response.trafficSu;
      var trafficIt = response.trafficIt;
      var trafficNs = response.trafficNs;
      var trafficNf = response.trafficNf;
      var domain = url.replace(/^(http)?(s)?(:\/\/)?(www\.)?/i, "").replace(/(\/.*)$/i, "");

      var at = document.getElementById("about-title");
      var ap = document.getElementById("about-p");
      var aa = document.getElementById("about-a");
      var cc = document.getElementById("contribute-card");
      var cp = document.getElementById("contribute-p");
      var ca = document.getElementById("contribute-a");

      if (typeof obj === "undefined") {
        at.innerHTML = "About This Site";
        aa.parentElement.classList.add("hidden");
        cc.classList.remove("hidden");
        cp.innerHTML = "We don't have any information for " + domain + ", could you contribute what you know about it?";
        ca.href = "https://github.com/xorprojects/We-LGBT/issues/new?title=Missing%20Information%20For:" + encodeURIComponent(domain) + "&body=-%20Name:%20%0A-%20Description:%20";
        if (rep === "su") {
          ap.textContent = "This site is supportive.";
        }
        if (rep === "it") {
          ap.textContent = "This site is intermediate.";
        }
        if (rep === "ns") {
          ap.textContent = "This site is not supportive.";
        }
        if (rep === "nf") {
          ap.textContent = "This site isn't in our filter.";
        }
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
        }
      }

      if (typeof traffic === "number" && traffic > 0) {
        document.getElementById("webtraffic").innerHTML = "Your web traffic this session is " + Math.round(trafficSu) + "% supportive, " + Math.round(trafficIt) + "% intermediate, " + Math.round(trafficNs) + "% not supportive and, " + Math.round(trafficNf) + "% with no found standing. We don't record your web traffic, this is only calculated by our URL filter. (Rounded)";
      }
    });
    document.getElementById("closepopup").addEventListener("click", function() {
      window.close();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
