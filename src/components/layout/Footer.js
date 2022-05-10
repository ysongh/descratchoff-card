import React from 'react';

function Footer(){
  return(
    <footer className="bg-success p-3 text-center text-white mt-5 fixed-bottom">
      &copy;{new Date().getFullYear()} DeScratchOff Card
    </footer>
  );
}

export default Footer;