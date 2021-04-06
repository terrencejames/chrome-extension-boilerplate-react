import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';


chrome.contextMenus.create({
    "title": "Open link in tab group",
    "onclick": function(e) {
      openNewTab(e.linkUrl);
    },
    "contexts": ["link"]
})

chrome.contextMenus.create({
    "title": "Open image in tab group",
    "onclick": function(e) {
      console.log(e);
    },
    "contexts": ["image"]
})

function openNewTab(url){
  // need to pass in groupId somehow, and maybe index?
  var createProperties = {
    "active" : false,
    "url" : url
  };
  chrome.tabs.create(createProperties, addToTabGroup);
}

function addToTabGroup(tab){
  console.log(tab);
}

chrome.tabs.onCreated.addListener(function(tab) {
  var openerTabId = tab.openerTabId;
  if (openerTabId != null && tab.active == false){
    chrome.tabs.get(openerTabId, function(openerTab)
    {
      var groupId = openerTab.groupId;
      var options = {};
      if (groupId != -1){
        console.log("Using previous group")
        options.groupId = groupId;
        options.tabIds = tab.id;
      }
      else{
        console.log("Creating new group");
        options.tabIds = [openerTabId, tab.id];
      }
      console.log("Grouping tabs now:");
      chrome.tabs.group(options, null);
    });
  }
});
