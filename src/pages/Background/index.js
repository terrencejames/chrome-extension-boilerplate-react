import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

console.log('Yooo');
chrome.tabs.onCreated.addListener(function(tab) {
  console.log("hello");
  console.log(tab);
  var openerTabId = tab.openerTabId;
  if (openerTabId != null && tab.active == false){
    console.log("Entering if statement");
    chrome.tabs.get(openerTabId, function(openerTab)
    {
      var groupId = openerTab.groupId;
      console.log(openerTab);
      var options = {};
      if (groupId != -1){
        console.log("Using previous group")
        options.groupId = groupId;
        options.tabIds = tab.id;
        console.log(groupId);
        console.log(tab.id);
        console.log("options:");
        console.log(options);
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
