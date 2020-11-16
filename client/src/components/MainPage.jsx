import React from 'react';
import './CSS/mainPage.css';
import linkIco from './CSS/icons/link-ico.png';
import { useDispatch, useSelector } from 'react-redux';
import { isRegister, showRegModal, getVerify } from './reducers/loginSys';
import { Link } from 'react-router-dom';

const MainPage = () => {
    const dispatch = useDispatch();
    const modal = useSelector(isRegister);
    const isLoged = useSelector(getVerify)
    const showModal = () => dispatch(showRegModal(!modal));
    return (
        <>
            <main className='model-sct'>
                {/* <div id='bc-img'></div> */}
                <div className='infoFrame'>
                    <div className='description'>
                        <h2>Manage your links <br /> with LinkManager </h2>
                        <p>Store all your important links in one place. Give them a name open many links at once and much more.</p>
                        <div>
                            {isLoged ? <Link className='jumpButton' to='/links'>GET STARTED</Link> : <a className='jumpButton' onClick={showModal}>GET STARTED</a>}
                        </div>
                    </div>
                    <div className='photos'>
                    </div>
                </div>
                <section className='amazing-section' >
                    <div className='fsft'>
                        <h2>Amazing Features</h2>
                        <p>Get familiar with awesome features which LinkManager provide</p>
                    </div>
                    <div className='features'>
                        <div className='feature'>
                            <div className='ico'>
                                <div className="ico-div">...</div>
                            </div>
                            <div className='title'>URL shortener</div>
                            <div className='descriptionn'>Coming soon ...</div>
                        </div>
                        <div id='primary' className='feature infoFrame'>
                            <div className='ico'>
                                <div className="ico-div">
                                    <img src={linkIco} alt="link icon" />
                                </div>
                            </div>
                            <div className='title'>LinkManager </div>
                            <p className='descriptionn'>Create sections where your links will be storage . Give your links a name and open them all at once</p>
                        </div>
                        <div className='feature'>
                            <div className='ico'>
                                <div className="ico-div">...</div>
                            </div>
                            <div className='title'>...</div>
                            <div className='descriptionn'>...</div>
                        </div>
                    </div>
                </section>
            </main>
        </>);
}

export default MainPage;

