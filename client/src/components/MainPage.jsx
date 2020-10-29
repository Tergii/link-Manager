import React from 'react';
import './CSS/mainPage.css';
import exmpleApp from './CSS/icons/exmpl-app.JPG';
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
            <section className='model-sct'>

                <div id='bc-img'></div>
                <div className='infoFrame'>
                    <div className='description'>
                        <h2>Manage your links <br /> with LinkManager </h2>
                        <p>Store all your important links in one place. Give them a name open many links at once and much more.</p>
                        <div>
                            {isLoged ? <Link className='jumpButton' to='/links'>GET STARTED</Link> : <a className='jumpButton' onClick={showModal}>GET STARTED</a>}
                        </div>
                    </div>
                    <div className='photos'>
                        <div>
                            <img className='scale-img' src={exmpleApp} alt="obrazek aplikacji" />
                        </div>
                    </div>
                </div>

            </section>


        </>);
}

export default MainPage;

