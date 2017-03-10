import React from 'react';
import Header from './header.jsx';
import View from './view.jsx';
import axios from 'axios'

class Top extends React.Component {
    constructor(props) {
        super(props)
        this.setViewLogin = this.setViewLogin.bind(this)
        this.setViewSignup = this.setViewSignup.bind(this)
        this.setLoginMessage = this.setLoginMessage.bind(this)
        this.setSignupMessage = this.setSignupMessage.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.state = {
            view: 'login',
            login_message: '',
            signup_message: ''
        }
    }
    setViewLogin() {
        if (document.getElementById('new_username')) {
            document.getElementById('new_username').value = ''
            document.getElementById('new_password1').value = ''
        }
        this.setState({
            view: 'login'
        })
    }
    setViewSignup() {
        if (document.getElementById('username')) {
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
        }
        this.setState({
            view: 'signup'
        })
    }
    setLoginMessage(message) {
        this.setState({
            login_message: message
        })
    }
    setSignupMessage(message) {
        this.setState({
            signup_message: message
        })
    }
    login(username, password) {
        axios.post('/login', {
                username: username,
                password: password
            })
            .then((response) => {
                if (!response.data.error)
                    console.log(JSON.stringify(response.data))
                else
                    this.setState({login_message:response.data.msg})
                
            })
            .catch(function(error) {
                console.log(error)
            });
    }
    signup(username, password) {
        axios.post('/signup', {
                username: username,
                password: password
            })
            .then((response) => {
                if (!response.data.error)
                    console.log(JSON.stringify(response.data))
                else
                    this.setState({signup_message:response.data.msg})
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <Header view={this.state.view}
                    showLogin={this.setViewLogin} 
                    showSignup={this.setViewSignup}
                />
                <br/><br/><br/>
                <View 
                    view={this.state.view}
                    setLoginMessage={this.setLoginMessage}
                    setSignupMessage={this.setSignupMessage}
                    login_message={this.state.login_message}
                    signup_message={this.state.signup_message}
                    login={this.login}
                    signup={this.signup}
                /> 
            </div>
        )
    }
}

export default Top;
