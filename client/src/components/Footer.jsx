import React from 'react';
import ghIco from './CSS/icons/github-ico.png';
import fbIco from './CSS/icons/facebook-ico.png';
import twIco from './CSS/icons/twitter-ico.png';
import mailIco from './CSS/icons/mail-ico.png';
import phoneIco from './CSS/icons/phone-ico.png';


const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-section  title-footer'>
                <div className='footer-container'>About me</div>
                <div className='footer-container description-footer'>I am MERN stack developer who creates cool and useful applications</div>
            </div>
            <div className='footer-section title-footer'>
                <div className='footer-container'>
                    Connect With Me
                </div>
                <div className='footer-container description-footer'>
                    <a className='contact-ico' href="https://github.com/Tergii">
                        <img src={ghIco} alt="github ico" />
                    </a>
                    <a className='contact-ico' href="#">
                        <img src={fbIco} alt="facebook ico" />
                    </a>
                    <a className='contact-ico' href="#">
                        <img src={twIco} alt="twitter ico" />
                    </a>
                </div>
            </div>
            <div className='footer-section title-footer'>
                <div className='footer-container'>
                    Contact with Me
                </div>
                <div id='contact-footer' className='footer-description-footer'>
                    <div className='contact-footer-row description-footer'>
                        <div>
                            <img src={mailIco} alt="mail ico" />
                        </div>
                        <span style={{ paddingLeft: '20px' }}>tergos51@gmail.com</span>
                    </div>
                    <div className='contact-footer-row description-footer' style={{ marginTop: '10px' }}>
                        <div>
                            <img src={phoneIco} alt="phone ico" />
                        </div>
                        <span style={{ paddingLeft: '20px' }}>123-456-789</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;