// Event listeners

chrome.tabs.onCreated.addListener(function(tab) {
  console.log("Add event listener for creating new tabs");
  addToTabGroup(tab);
});

chrome.contextMenus.onClicked.addListener((e, tab) => {
  console.log("Context menu item clicked, opening in new tab");
  openNewTab(e.linkUrl, parseInt(e.menuItemId));
})

chrome.tabGroups.onCreated.addListener(function(tabGroup){
  // Need to create a new context item
  // Should also be fired at the beginning of this script?
  addTabGroupContextItem((tabGroup));
});

chrome.tabGroups.onRemoved.addListener(function(tabGroup){
  // Need to remove context item
});

chrome.tabGroups.onUpdated.addListener(function(tabGroup){
  // Need to update context item
  // Should also be fired at the beginning of this script
});

// Tab/tab group functions

function openNewTab(url, groupId){
  var createProperties = {
    "active" : false,
    "url" : url
  };
  chrome.tabs.create(createProperties, tab => addToTabGroup(tab, groupId));
}

function addToTabGroup(tab, tabGroupId = -1){
  console.log("Adding to tab group");
  var openerTabId = null;
  var options = {};
  if (tabGroupId != -1){
    console.log("Adding to existing group");
    options.groupId = tabGroupId;
    options.tabIds = tab.id;
  }
  else{
    openerTabId = tab.openerTabId;
    if (openerTabId != null && tab.active == false){
      chrome.tabs.get(openerTabId, function(openerTab)
      {
        var groupId = openerTab.groupId;
        if (groupId == -1){
          console.log("Creating new group");
          options.tabIds = [openerTabId, tab.id];
        }
      });
    }
  }
  console.log("Grouping tabs now:");
  chrome.tabs.group(options, null);
}

// Context menu functions

function initContextMenuItems(){
  console.log("Adding context menu items");
  chrome.contextMenus.create({
      "title": "Open link in group",
      "id": "1",
      "contexts": ["link", "image"]
  });
  var queryInfo = {"windowId" : chrome.windows.WINDOW_ID_CURRENT}
  chrome.tabGroups.query(queryInfo, tabList =>
    addContextMenuItems(tabList));
}

function addContextMenuItems(tabGroupList){
  tabGroupList.forEach(tabGroup => {
      addTabGroupContextItem(tabGroup);
  })
}

function addTabGroupContextItem(tabGroup){
  var title = tabGroup.title != "" ? tabGroup.title : tabGroup.id.toString();
  console.log("Adding context menu item for "+ title);
  chrome.contextMenus.create({
      "title": title,
      "id": tabGroup.id.toString(),
      "parentId": "1",
      "contexts": ["link", "image"]
  })
}
try {
initContextMenuItems();
} catch(e) {
  console.error(e);
}
