import React, { useState } from 'react';
import RegisterModal from './loginSysComponents/RegisterModal';
import LoginModal from './loginSysComponents/LoginModal';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVerify, getUserName, getEditing, addUserData, setVerified, } from './reducers/loginSys';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from 'reactstrap';

const AppNavbar = (props) => {
    let isEditing = useSelector(getEditing);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    let loged = useSelector(getVerify);
    const userName = useSelector(getUserName);
    const toggle = () => setIsOpen(!isOpen);
    const logOut = () => { dispatch(addUserData({ login: '', pass: '' })); dispatch(setVerified(false)); if (localStorage.getItem('login')) { localStorage.removeItem('login'); localStorage.removeItem('pass') } }
    const [preventEditing, prevent] = useState('');
    const preventMessage = 'end editing element';
    const preventFunction = () => {
        if (isEditing) {
            prevent(preventMessage); setTimeout(() => {
                prevent('');
            }, 4000);
        }
    }


    return (
        <div>
            <Navbar color='#26252D' dark expand="md">
                <NavbarBrand onClick={preventFunction} tag={Link} to={isEditing ? '/links' : '/'}>LinkManager</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink onClick={preventFunction} tag={Link} to={isEditing ? '/links' : '/'}>About us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={preventFunction} tag={Link} to={isEditing ? '/links' : '/contact'}>Contact</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={preventFunction} tag={Link} to='/links'>Links</NavLink>
                        </NavItem>
                        {loged ? <NavItem>
                            <NavLink onClick={preventFunction} tag={Link} to={isEditing ? '/links' : '/userPanel'}>User Panel</NavLink>
                        </NavItem> : null}
                        <NavItem style={{ color: 'red', fontSize: '20px', marginLeft: '20px' }}>{preventEditing}</NavItem>
                    </Nav>
                    <NavbarText>
                        {loged ?
                            <div onClick={preventFunction} className='flex-row'>
                                <span> loged as <Link to={isEditing ? '/links' : '/userPanel'}>{` ${userName.value}`}</Link>
                                </span>
                                <div onClick={preventFunction} style={{ marginLeft: '20px' }}>
                                    <Link to={isEditing ? '/links' : '/'}
                                        style={{ color: 'black', padding: '5px' }}
                                        className='custom-btn-red'
                                        onClick={isEditing ? () => null : () => logOut()}>Log Out
                                    </Link>
                                </div>
                            </div>
                            :
                            <div className='flex-row'>
                                <RegisterModal outline={props.outline} />
                                <LoginModal outline={props.outline} />
                            </div>}
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavbar;
