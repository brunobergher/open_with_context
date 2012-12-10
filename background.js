// Copyright (c) 2012 Bruno Bergher. All rights reserved.
// Licensing for this code is TBD. Please don't use it right now.

/**
 * The main context menu callback
 */
function handleMenuClick(info, tabOrigin) {
  var link = info.linkUrl;
  chrome.tabs.duplicate(tabOrigin.id, function(tabNew){
    watchedTabs[tabNew.id] = {
      favicon: tabOrigin.favIconUrl,
      title: tabOrigin.title,
      selectionText: info.selectionText,
      url: link,
    };
    chrome.tabs.onUpdated.addListener(handleUpdated);
    chrome.tabs.update(tabNew.id, { url: link, active: false });
  });
  return false;
}

/**
 * Listens to when the new tab finishes navigating to the new URL
 */
function handleUpdated(tabId, changeInfo, tab){
  if(watchedTabs[tabId] && changeInfo.status == "loading") {
    chrome.tabs.executeScript(null, { file: "content.js" });
    chrome.tabs.insertCSS(null, { file: "content.css" });
  } else if(watchedTabs[tabId] && changeInfo.status == "complete") {
    chrome.tabs.sendMessage(tabId, watchedTabs[tabId]);
    delete watchedTabs[tabId];
  }
}

/**
 * Setup
 */
var title = "Open in new tab with context";
var id = chrome.contextMenus.create({
  "title": title,
  "contexts":["link"],
  "onclick": handleMenuClick
});
var watchedTabs = {};
