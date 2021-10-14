import { StorageService } from "./shared/storage.service";
import { Common } from "./shared/common";

const rules = [
  {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        css: ["img"]  //has img element
      }),
      new chrome.declarativeContent.PageStateMatcher({
        css: ["input[type='text']"]  //has input type="text" element
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'google.com', schemes: ['https']}
      })      
    ],
    actions: [
      new chrome.declarativeContent.ShowPageAction()
    ]
  }
]

chrome.runtime.onInstalled.addListener(async (details) => {
  
  if (details.reason === "install") {
    //clear any existing storage
    StorageService.reset();
    console.log("The extension's storage has been cleared");

    //show the welcome page
    const url = chrome.runtime.getURL('welcome.html');
    const tab = await chrome.tabs.create({ url });

  }

  
  //setup the default color
  StorageService.get('color', (result) => {
    if (!result) {
      StorageService.set('color', Common.color, () => {
        console.log('Default background color has been set to %cTHIS', `color: ${Common.color}`);
      });
    }
  });

  //setup the declarativeContent rules (clearing any existing)
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules(rules);
    console.log('Reset declarativeContent rules')
  });

});



StorageService.onChanged((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `UPDATED - Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`,
      {namespace, key, oldValue, newValue, changes}
    );
  }
});


