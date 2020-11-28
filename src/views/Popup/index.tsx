import { useState, useEffect } from 'react';
import '../App.css';
import { browser } from 'webextension-polyfill-ts';
import { Message } from '../../types';

function Popup() {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    async function query() {
      try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const message: Message = 'popup';
        const response: string[] = await browser.tabs.sendMessage(tabs[0].id!, message);
        setLinks(response);
      } catch (err) {
        if (browser.runtime.lastError) setLinks([]);
        else console.log(err);
      }
    }

    query();
  }, [links]);

  return (
    <div>
      <ul>
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </div>
  );
}

export default Popup;
