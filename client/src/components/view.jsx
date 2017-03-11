import React from 'react';
import Login from './login.jsx'
import Signup from './signup.jsx'

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
        return(
            <Login
                handleLoginKeyPress={this.handleLoginKeyPress}
                validateLogin={this.validateLogin}
                login_message={this.props.login_message}
            />    
        )
    }
    getSignupForm() {
        return (
            <Signup
                handleSignupKeyPress={this.handleSignupKeyPress}
                validateSignup={this.validateSignup}
                signup_message={this.props.signup_message}
            />
        )
    }
    render() {
        var view = []
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
                    <div className="page-content center">
                        {view}
                    </div>
                </div> 
            </div>
        )
    }
}

export default View;
