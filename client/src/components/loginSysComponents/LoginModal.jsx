import React, { useState } from 'react';
import { logInUser } from '../../api/index';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, isLogin, showLogModal, setVerified, setMail } from '../reducers/loginSys'
const LoginModal = (props) => {
    // redux
    const dispatch = useDispatch();
    //get data from redux
    const modal = useSelector(isLogin);
    // data to redux
    const toggle = () => dispatch(showLogModal(!modal));
    //handle login data to store
    const [inputName, handleInputName] = useState({ value: '', message: '', invalid: false });
    const [rememberUser, handleRemember] = useState(false);
    const [inputPass, handleInputPass] = useState({ value: '', message: '', invalid: false });
    const logIN = () => { if (inputName.value && inputPass.value) { ; logInUser({ login: inputName.value, pass: inputPass.value }).then(response => { if (response.data.isOK) { dispatch(setVerified(true)); dispatch(addUserData({ login: inputName, pass: inputPass })); dispatch(setMail(response.data.data[0].loginSys.email)); if (rememberUser) { localStorage.setItem('login', inputName.value); localStorage.setItem('pass', inputPass.value); } } else if (response.data.login) { handleInputName({ ...inputName, message: response.data.message, invalid: true }); handleInputPass({ ...inputPass, message: '', invalid: false }) } else if (response.data.pass) { handleInputPass({ ...inputPass, message: response.data.message, invalid: true }); handleInputName({ ...inputName, message: '', invalid: false }) } }) } else if (!inputName.value && !inputPass.value) { handleInputName({ ...inputName, message: 'enter login', invalid: true }); handleInputPass({ ...inputPass, message: 'enter password', invalid: true }); } else if (!inputName.value) { handleInputName({ ...inputName, message: 'enter login', invalid: true }); handleInputPass({ ...inputPass, message: '', invalid: false }); } else { handleInputPass({ ...inputPass, message: 'enter password', invalid: true }); handleInputName({ ...inputName, message: '', invalid: false }); } };
    return (
        <div>
            <Button className='custom-btn-red' color='danger' onClick={toggle}>Log in</Button>
            <Modal isOpen={modal} toggle={toggle} className={props.outline ? '' : 'no-outline-on-focus'}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='Username'>Username</Label>
                            <Input invalid={inputName.invalid} className='select-box' type='text' name='username' id='Username' placeholder='Enter Username' value={inputName.value} onChange={e => handleInputName({ ...inputName, value: e.target.value })} />
                            <FormFeedback>{inputName.message}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input invalid={inputPass.invalid} className='select-box' type="password" name="password" id="examplePassword" placeholder="Enter password" value={inputPass.value} onChange={e => handleInputPass({ ...inputPass, value: e.target.value })} />
                            <FormFeedback>{inputPass.message}</FormFeedback>
                        </FormGroup>
                        <FormGroup check >
                            <Label check>
                                <Input type="checkbox" onChange={() => handleRemember(!rememberUser)} />
                                <span style={{ opacity: 0.5 }}>Remember Me</span>
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button tag={Link} to='/' color="danger" onClick={logIN}>Log in</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LoginModal;
