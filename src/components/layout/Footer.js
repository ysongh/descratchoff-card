import React from 'react';

function Footer(){
  return(
    <footer className="footer-bg p-3 text-center text-dark mt-5 fixed-bottom ">
      &copy;{new Date().getFullYear()} DeScratchOff Card
    </footer>
  );
}

export default Footer;