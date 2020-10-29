import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LinkManager from './LinkManager';
import Navbar from './Navbar';
import MainPage from './MainPage';
import userInrerface from './UserInterface';
import { addUserData, setVerified, setMail } from './reducers/loginSys';
import { logInUser } from '../api/index';
import ContactPage from "./contactPage";

class App extends Component {
   state = {
      enableOutline: false,
      isRemembered: { login: localStorage.getItem('login'), pass: localStorage.getItem('pass') },
   }
   _handleKeydown = (e) => {
      const isTabEvent = e.keyCode === 9;

      if (isTabEvent) {
         this.setState({ enableOutline: true });
      }
   }

   componentDidMount() {
      window.addEventListener('keydown', this._handleKeydown);
      const login = this.state.isRemembered.login;
      const pass = this.state.isRemembered.pass
      if (login && pass) {
         this.props.addUser({ login: { value: login, message: '', invalid: false }, pass: { value: pass, message: '', invalid: false } })
         logInUser({ login, pass }).then(response => { if (response.data.isOK) { this.props.verify(true); this.props.setMail(response.data.data[0].loginSys.email) } })
      }
   }
   render() {
      return (
         <>
            <Router>
               <div id='wrapper' className={this.state.enableOutline ? '' : 'no-outline-on-focus'}>
                  <Navbar outline={this.state.enableOutline} />
                  <Route path='/' exact component={MainPage} />
                  <Route path='/links' component={LinkManager} />
                  <Route path='/contact' component={ContactPage} />
                  {this.props.mystate.loginSys.verified ? <Route path='/userPanel' component={userInrerface} /> : null}
                  <span>version 2.0</span>
               </div>
            </Router>
         </>)
   }
}
const mapStateToProps = state => ({
   mystate: state
})
const mapDispatchToProps = dispatch => {
   return {
      addUser: payload => dispatch(addUserData(payload)),
      verify: payload => dispatch(setVerified(payload)),
      setMail: payload => dispatch(setMail(payload)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
