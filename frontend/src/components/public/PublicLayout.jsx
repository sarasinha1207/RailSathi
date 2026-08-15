import React from 'react';
import Header from './Header';
import Footer from './Footer';


export default function PublicLayout({ activePage, setActivePage, loggedIn, onLogout, children }) {
  return (
    <div className="app-container">
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        loggedIn={loggedIn}
        onLogout={onLogout}
      />
      <div className="main-wrapper">
        {children}
      </div>
      <Footer />
    </div>
  );
}
