import { browser } from 'webextension-polyfill-ts';

const setBadgeText = (text: string) => browser.browserAction.setBadgeText({ text });

async function sendMessage(tabId: number) {
  try {
    const response: string[] = await browser.tabs.sendMessage(tabId, '');
    const text = response.length > 0 ? response.length.toString() : '';
    setBadgeText(text);
  } catch (err) {
    if (browser.runtime.lastError) 
      console.log(browser.runtime.lastError.message);
    else
      console.log(err);

    setBadgeText('');
  }
}

browser.tabs.onUpdated.addListener((tabId) => sendMessage(tabId));
browser.tabs.onActivated.addListener((activeInfo) => sendMessage(activeInfo.tabId));
