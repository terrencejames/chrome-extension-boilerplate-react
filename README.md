# Tabby

A Chrome Extension to seamlessly create, add to, and manage tab groups. Open up
a new tab and it will automatically create a group with the tab that opened it,
or use the context menu to open the new tab in the specified group!

[![dependencies Status](https://david-dm.org/lxieyang/chrome-extension-boilerplate-react/status.svg)](https://david-dm.org/lxieyang/chrome-extension-boilerplate-react)
[![devDependencies Status](https://david-dm.org/lxieyang/chrome-extension-boilerplate-react/dev-status.svg)](https://david-dm.org/lxieyang/chrome-extension-boilerplate-react?type=dev)

## Announcements

## Features

- Open up a new tab to automatically create a group with the tab that opened it.
No more interruptions by adding tabs to a group after it's already created!
- Use the context menu to open up a link as a new tab in an already existing
group
- To-do: View list of groups and their tabs from popup / separate page
- To-do: Edit group names and colors from popup / separate page
- To-do: Manage tabs from popup / separate page

This extension was made on top of [this boilerplate](https://github.com/lxieyang/chrome-extension-boilerplate-react) for Chrome Manifest V3.

## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.

Copyright (c) 2021 Terrence James Diaz
