import { browser } from 'webextension-polyfill-ts';
import { Message } from '../../types';

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

const links = getMagnetLinks();

async function getBadge() {
  const response = await links;
  const length = response.length;
  return length > 0 ? length.toString() : '';
}

async function onMessage(message: Message) {
    switch (message) {
      case 'background':
        const badge = getBadge();
        return Promise.resolve(badge);
      case 'popup':
        return Promise.resolve(links);
      default:
        return Promise.reject('Message not recognized.');
    }
}

browser.runtime.onMessage.addListener(onMessage);
