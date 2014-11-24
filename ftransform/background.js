var senderTab;

var clientId = localStorage.getItem('clientId') || "";

function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('facebook') > -1) {
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg == "show"){
    console.info("show");
    senderTab = sender.tab.id;
    chrome.pageAction.show(sender.tab.id);
  }

  if (typeof sendResponse == "function") sendResponse({}); //podobno działa onRequest
});

chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({ url: "options.html" });
})

























