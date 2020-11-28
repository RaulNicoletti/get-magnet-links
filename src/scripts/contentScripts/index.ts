import { browser } from 'webextension-polyfill-ts';

async function getMagnetLinks() {
  const regex = /(magnet:[^"']*)/gmi;
  let links: string[] | null;
  links = document.body.innerHTML.match(regex);
  if (!links) {
    const response = await fetch(document.URL);
    const text = await response.text();
    links = text.match(regex);
  }

  return links || [];
}

getMagnetLinks().then((links) => browser.runtime.onMessage.addListener(() => Promise.resolve(links)));
