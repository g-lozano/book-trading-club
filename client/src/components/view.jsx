import React from 'react';

class View extends React.Component {
    constructor(props) {
        super(props)
        this.validateLogin = this.validateLogin.bind(this)
        this.validateSignup = this.validateSignup.bind(this)
        this.handleLoginKeyPress = this.handleLoginKeyPress.bind(this)
        this.handleSignupKeyPress = this.handleSignupKeyPress.bind(this)
        this.getLoginForm = this.getLoginForm.bind(this)
        this.state = {
            login_message: '',
            signup_message: '',
        }
    }
    validateLogin() {
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        if (username && password){
            this.setState({
                login_message: ''
            })
            this.props.login(username, password)
        }
        else {
            this.setState({
                login_message: 'Missing field.'
            })
        }
    }
    validateSignup() {
        var new_username = document.getElementById('new_username').value
        var new_password1 = document.getElementById('new_password1').value
        var new_password2 = document.getElementById('new_password2').value
        if (new_username && new_password1 && new_password2) {
            if (new_password1 == new_password2)
                this.props.signup(new_username && new_password1)
            else
                this.setState({
                    signup_message: 'Passwords do not match.'
                })
        }
        else {
            this.setState({
                signup_message: 'Missing field.'
            })
        }
    }
    handleLoginKeyPress(e) {
        if (e.key === 'Enter') {
          this.validateLogin()
        }
    }
    handleSignupKeyPress(e) {
        if (e.key === 'Enter') {
          this.validateSignup()
        }
    }
    getLoginForm() {
        return (
            <div id="login_form" className="form">
                <input onKeyPress={this.handleLoginKeyPress} id="username" type="text" className="center" placeholder="Username"/>
                <input onKeyPress={this.handleLoginKeyPress} id="password" type="password" className="center" placeholder="Password"/>
                <button onClick={this.validateLogin}  className="mdl-button mdl-js-button mdl-button--primary submit-button">Login</button>
                <div>{this.state.login_message}</div>
            </div>
        )
    }
    getSignupForm() {
        return (
            <div id="singup_form" className="form">
                <input onKeyPress={this.handleSignupKeyPress} id="new_username" type="text" className="center" placeholder="New Username"/>
                <input onKeyPress={this.handleSignupKeyPress} id="new_password1" type="password" className="center" placeholder="New Password"/>
                <input onKeyPress={this.handleSignupKeyPress} id="new_password2" type="password" className="center" placeholder="Retype New Password"/>
                <button onClick={this.validateSignup} className="mdl-button mdl-js-button mdl-button--primary submit-button">Sign Up</button>
                <div>{this.state.signup_message}</div>
            </div>
        )
    }
    render() {
        var view = ''
        if (this.props.view == 'login')
            view = this.getLoginForm()
        else if (this.props.view == 'signup')
            view = this.getSignupForm()
            
        return (
            <div id="layout" className="center">
                <div className="mdl-layout__content center">
                    <div className="page-content center">{view}</div>
                </div> 
            </div>
        )
    }
}

export default View;
