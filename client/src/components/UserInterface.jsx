import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserName, getEmail, getPass, addUserData, setMail } from './reducers/loginSys';
import './CSS/interface.css';
import { Button } from 'reactstrap';
import { updateUserData } from '../api/index';
import { validator } from './validator/validator'
const UserInterface = () => {
    const dispatch = useDispatch();
    const userName = useSelector(getUserName);
    const userPass = useSelector(getPass);
    const userMail = useSelector(getEmail);
    const [inputName, handleInputName] = useState('');
    const [inputMail, handleMail] = useState('');
    const [message, handleMessage] = useState('');
    return (
        <div className='flex-col'>
            <div style={{ fontSize: '30px', marginBottom: '20px' }}>Settings</div>
            <div className='int-sct'>
                <span style={{ width: '20%', marginLeft: '10px' }}>
                    User Name
                </span>
                <div style={{ width: '80%', marginTop: '20px' }}>
                    <div>
                        <input className='int-inp' type="text" placeholder={userName.value} value={inputName} onChange={(e) => { handleInputName(e.target.value); let valid = validator({ type: 'login', value: inputName }); if (!valid.isOk) { handleMessage(valid.message) } else { handleMessage('') } }} />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span>You can change your User Name</span>
                    </div>
                </div>
            </div>
            <div className='int-sct'>
                <span style={{ width: '20%', marginLeft: '10px' }}>
                    Contact  Mail
                </span>
                <div style={{ width: '80%', marginTop: '20px' }}>
                    <div>
                        <input className='int-inp' type="text" placeholder={userMail} value={inputMail} onChange={(e) => { handleMail(e.target.value); let valid = validator({ type: 'mail', value: inputMail }); if (!valid.isOk) { handleMessage(valid.message) } else { handleMessage('') } }} />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <span>You can change your Contact Mail</span>
                    </div>
                </div>
            </div>
            <div className='save-sct'>
                <div className='flex-col'>
                    <Button className='secondary' style={{ marginRight: '20px' }} onClick={() => { if (!message) { if (inputName || inputMail) { updateUserData({ newLogin: inputName, mail: inputMail, login: userName }).then(response => { if (response.data.login) { dispatch(addUserData({ login: { invalid: false, message: '', value: inputName }, pass: userPass })); if (localStorage.getItem('login')) { localStorage.setItem('login', inputName) } } else if (response.data.mail) { dispatch(setMail(inputMail)); handleMail('') } }) } } }}>Save Changes</Button>
                    <div>
                        <span style={{ color: 'red', }}>{message}</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserInterface;