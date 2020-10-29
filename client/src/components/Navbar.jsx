import React, { useState } from 'react';
import RegisterModal from './loginSysComponents/RegisterModal';
import LoginModal from './loginSysComponents/LoginModal';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVerify, getUserName, addUserData, setVerified } from './reducers/loginSys';
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
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    let loged = useSelector(getVerify);
    const userName = useSelector(getUserName);
    const toggle = () => setIsOpen(!isOpen);
    const logOut = () => { dispatch(addUserData({ login: '', pass: '' })); dispatch(setVerified(false)); if (localStorage.getItem('login')) { localStorage.removeItem('login'); localStorage.removeItem('pass') } }

    return (
        <div>
            <Navbar color='#26252D' dark expand="md">
                <NavbarBrand tag={Link} to='/'>LinkManager</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to='/'>About us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/contact'>Contact</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/links'>Links</NavLink>
                        </NavItem>
                        {loged ? <NavItem>
                            <NavLink tag={Link} to='/userPanel'>User Panel</NavLink>
                        </NavItem> : null}
                    </Nav>
                    <NavbarText>
                        {loged ? <div className='flex-row'><span>{`loged as `}<Link to='/userPanel'>{`${userName.value}`}</Link></span><div style={{ marginLeft: '20px' }}><Link to='/' style={{ color: 'black', padding: '5px' }} className='custom-btn-red' onClick={() => { logOut() }}>Log Out</Link></div></div> : <div className='flex-row'>
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
