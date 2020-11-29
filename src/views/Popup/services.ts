import { browser } from 'webextension-polyfill-ts';

async function sendMessage() {
  let links: string[] = [];
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    links = await browser.tabs.sendMessage(tabs[0].id!, '');
  } catch (err) {
    if (browser.runtime.lastError) {
      console.log(browser.runtime.lastError.message);
    } else {
      console.log(err);
    }

    return links;
  }

  return links;
}

export { sendMessage };
