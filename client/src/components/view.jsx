import React from 'react';

class View extends React.Component {
    constructor(props) {
        super(props)
        this.validateLogin = this.validateLogin.bind(this)
        this.validateSignup = this.validateSignup.bind(this)
        this.handleLoginKeyPress = this.handleLoginKeyPress.bind(this)
        this.handleSignupKeyPress = this.handleSignupKeyPress.bind(this)
        this.getLoginForm = this.getLoginForm.bind(this)
        this.getMyBooks = this.getMyBooks.bind(this)
        this.getAllBooks = this.getAllBooks.bind(this)
        this.getAccount = this.getAccount.bind(this)
    }
    getMyBooks() {
        return 'my books'
    }
    getAllBooks() {
        return 'all books'
    }
    getAccount() {
        return 'account'
    }
    validateLogin() {
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        if (username && password){
            this.props.login(username, password)
        }
        else {
            this.props.setLoginMessage('Missing field')
        }
    }
    validateSignup() {
        var new_username = document.getElementById('new_username').value
        var new_password1 = document.getElementById('new_password1').value
        var new_password2 = document.getElementById('new_password2').value
        if (new_username && new_password1 && new_password2) {
            if (new_password1 == new_password2)
                this.props.signup(new_username, new_password1)
            else
                this.props.setSignupMessage('Passwords do not match.')
        }
        else {
            this.props.setSignupMessage('Missing field.')
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
                <div className="message">{this.props.login_message}</div>
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
                <div className="message">{this.props.signup_message}</div>
            </div>
        )
    }
    render() {
        var view = ''
        switch(this.props.view) {
            case 'login': 
                view = this.getLoginForm(); break;
            case 'signup':
                view = this.getSignupForm(); break;
            case 'my_books':
                view = this.getMyBooks(); break;
            case 'all_books':
                view = this.getAllBooks(); break;
            case 'account':
                view = this.getAccount(); break;
            default:
                view = this.getLoginForm(); break;
        }
            
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
