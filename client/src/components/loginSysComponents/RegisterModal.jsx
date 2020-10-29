import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, isRegister, isLogin, showRegModal, showLogModal, setVerified, setMail } from '../reducers/loginSys';
import { registerUser } from '../../api/index';
import { validator } from '../validator/validator';
const RegisterModal = (props) => {

    const dispatch = useDispatch();

    const modal = useSelector(isRegister);
    const login = useSelector(isLogin);

    const toggle = () => dispatch(showRegModal(!modal));
    const switchLog = () => { dispatch(showRegModal(!modal)); dispatch(showLogModal(!login)) }

    const [inputName, handleInputName] = useState({ value: '', valid: '' });
    const [inputEmail, handleInputEmail] = useState({ value: '', valid: '' });
    const [inputPass, handleInputPass] = useState({ value: '', valid: '' });
    const [showPass, show] = useState(false);
    const storeData = () => { if (inputName.valid.isOk && inputPass.valid.isOk && inputEmail.valid.isOk) { dispatch(addUserData({ login: inputName, pass: inputPass, })); dispatch(setMail(inputEmail.value)); registerUser({ linkManager: { sectionsNumber: '', cos: '', links: { 0: [] }, config: [], sectionTitles: [] }, loginSys: { login: inputName.value, password: inputPass.value, email: inputEmail.value } }).then(response => { if (response.data.mail) { handleInputEmail({ ...inputEmail, valid: { isOk: false, message: response.data.mail } }) } else if (response.data.login) { handleInputName({ ...inputName, valid: { isOk: false, message: response.data.login } }) } else { toggle(); dispatch(setVerified(true)); alert('suces') } }) } }


    return (
        <div style={{ display: "flex", alignItems: 'center' }}>
            <div>
                <button style={{ fontSize: '16px' }} className='custom-btn-links' onClick={toggle}>Sing In</button>
            </div>
            <Modal isOpen={modal} toggle={toggle} className={props.outline ? '' : 'no-outline-on-focus'}>
                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='Username'>Username</Label>
                            <Input invalid={false === inputName.valid.isOk} valid={inputName.valid.isOk} className='select-box' type='text' name='username' id='Username' placeholder='Enter Username' value={inputName.value} onChange={e => { handleInputName({ valid: validator({ type: 'login', value: e.target.value }), value: e.target.value }); }} />
                            <FormFeedback>{inputName.valid.message}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input invalid={false === inputPass.valid.isOk} valid={inputPass.valid.isOk} className='select-box' type={showPass ? 'input' : 'password'} name="password" id="examplePassword" placeholder="Enter password" value={inputPass.value} onChange={e => { handleInputPass({ valid: validator({ type: 'pass', value: e.target.value }), value: e.target.value }); }} />
                            <FormFeedback style={{ cursor: "pointer" }} valid onClick={() => { show(!showPass); }} >{showPass ? 'hide password' : 'show password'}</FormFeedback>
                            <FormFeedback style={{ cursor: "pointer" }} onClick={() => { show(!showPass) }} >{showPass ? 'hide password' : 'show password'}</FormFeedback>
                            <FormFeedback>{inputPass.valid.message}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input invalid={false === inputEmail.valid.isOk} valid={inputEmail.valid.isOk} className='select-box' type="email" name="email" id="exampleEmail" placeholder="Enter Email" value={inputEmail.value} onChange={e => { handleInputEmail({ valid: validator({ type: 'mail', value: e.target.value }), value: e.target.value }); }} />
                            <FormFeedback>{inputEmail.valid.message}</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={switchLog}>Have acc?</Button>
                    <Button tag={Link} to='/' color="danger" onClick={storeData}>Sing in</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default RegisterModal;
