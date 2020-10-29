import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { sendMessage } from '../api/index';

const ContactPage = () => {
    const [input, handleInput] = useState('');
    const [message, handleMess] = useState('');
    const [color, handleColor] = useState('red');
    return (<>
        <h1>Send us a message</h1>
        <div id='mail' style={{ width: '80%' }}>
            <div style={{ width: '80%', marginTop: '20px' }}>
                <div className='save-sct'>
                    <textarea onChange={(e) => { handleInput(e.target.value) }} value={input} style={{ background: '#2F2F32', border: 'none', color: 'white' }} name="" id="mail" cols="100" rows="10"></textarea>
                </div>
            </div>
            <div className='save-sct'>
                <span style={{ marginRight: '20px', color: color }} >{message}</span>
                <div className='flex-col'>
                    <Button onClick={() => { sendMessage({ message: input }).then(response => { if (response.data.success) { handleMess('message sent'); handleColor('green'); handleInput('') } else { handleMess('message not sent'); handleColor('red'); } }) }} className='secondary' style={{ marginRight: '20px' }}>Send</Button>
                </div>
            </div>
        </div>
    </>
    );
}

export default ContactPage;
