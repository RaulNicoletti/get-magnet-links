import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ListLink } from './components/List';
import { sendMessage } from './services';

const Popup: React.FC = () => {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    async function getLinks() {
      const response = await sendMessage();
      setLinks(response);
    }

    getLinks();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ListLink links={links} />
      <Footer />
    </React.Fragment>
  );
}

export default Popup;
