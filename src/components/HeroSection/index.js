import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import HeroImg from '../../images/harsh.png'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { FaWhatsapp } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div id="about">
            <div className="hero-container">
                <div className="hero-bg">
                    <HeroBgAnimation />
                </div>
                <div className="hero-inner-container">
                    <div className="hero-left-container">
                        <h1 className="hero-title">Hi, I am <br /> {Bio.name}</h1>
                        <div className="text-loop">
                            I am a
                            <span className="highlight-span">
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </div>
                        <div className="subtitle">{Bio.description}</div>
                        <div className="button-container">
                            <a className="resume-button" href={Bio.resume} target='display'>Check Resume</a>
                            <a className="whatsapp-button" href={Bio.whatsapp} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp size={20} /> WhatsApp</a>
                        </div>
                    </div>

                    <div className="hero-right-container">
                        <img className="hero-img" src={HeroImg} alt="hero-image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection