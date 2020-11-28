import { useState, useEffect } from 'react';
import { browser } from 'webextension-polyfill-ts';
import '../App.css';
import { List } from './List';

const Popup: React.FC = () => {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    async function query() {
      try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const response: string[] = await browser.tabs.sendMessage(tabs[0].id!, '');
        setLinks(response);
      } catch (err) {
        if (browser.runtime.lastError) setLinks([]);
        else console.log(err);
      }
    }

    query();
  }, []);

  return (
    <div>
      <ul>
        <List links={links}/>
      </ul>
    </div>
  );
}

export default Popup;
