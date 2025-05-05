import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Bio } from '../../data/constants';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <h1 className="footer-logo">Harsh Raj Mishra</h1>
        <nav className="footer-nav">
          <a className="footer-nav-link" href="#about">About</a>
          <a className="footer-nav-link" href="#skills">Skills</a>
          <a className="footer-nav-link" href="#experience">Experience</a>
          <a className="footer-nav-link" href="#projects">Projects</a>
          <a className="footer-nav-link" href="#education">Education</a>
        </nav>
        <div className="social-media-icons">
          <a className="social-media-icon" href={Bio.facebook} target="display"><FacebookIcon /></a>
          <a className="social-media-icon" href={Bio.twitter} target="display"><TwitterIcon /></a>
          <a className="social-media-icon" href={Bio.linkedin} target="display"><LinkedInIcon /></a>
          <a className="social-media-icon" href={Bio.insta} target="display"><InstagramIcon /></a>
        </div>
        <p className="copyright">
          &copy; {currentYear} Harsh Raj Mishra. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;