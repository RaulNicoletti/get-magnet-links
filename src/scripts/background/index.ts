import { browser } from 'webextension-polyfill-ts';
import { Message } from '../../types';

const setBadgeText = (text: string) => browser.browserAction.setBadgeText({ text });

async function sendMessage(tabId: number) {
  try {
    const message: Message = 'background';
    const response: string = await browser.tabs.sendMessage(tabId, message);
    setBadgeText(response);
  } catch (err) {
    if (browser.runtime.lastError) {
      console.log(browser.runtime.lastError.message);
      setBadgeText('');
    }
    else
      console.log(err);
  }
}

browser.tabs.onUpdated.addListener((tabId) => sendMessage(tabId));
browser.tabs.onActivated.addListener((activeInfo) => sendMessage(activeInfo.tabId));
