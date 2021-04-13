import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

let list = [];
let tabGroupList = [];

function getTabs(){
  console.log("Getting tabs");
  var queryOptions = {
    "populate": true
  };
  chrome.windows.getCurrent(queryOptions, (window) => getTabsFromWindow(window));
}

function getTabsFromWindow(window){
  let tabs = window.tabs;
  tabs.forEach((tab) => {
    list.push({
      id: tab.id,
      groupId: tab.groupId,
      favIconUrl: tab.favIconUrl,
      text: tab.title
    })
  });
}

function getTabGroups(){
  console.log("Getting tab groups");
  var queryInfo = {
    "windowId": chrome.windows.WINDOW_ID_CURRENT
  };
  chrome.tabGroups.query(queryInfo, (tabGroups) => sortTabsAndGroups(tabGroups));
}

function sortTabsAndGroups(tabGroups) {
  tabGroups.forEach((group) => {
    tabGroupList.push({
      id: group.id,
      text: group.title
    });
    let groupedTabs = list.filter(tab => tab.groupId == group.id);
    tabGroupList = tabGroupList.concat(groupedTabs);
  });
  console.log("inside sort tabs and groups");
  console.log(tabGroupList);
}

getTabs();
getTabGroups();
console.log("before rendering");
console.log(tabGroupList);

render(<Popup tabAndGroupList={tabGroupList} />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
