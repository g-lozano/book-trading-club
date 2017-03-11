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
        this.logout = this.logout.bind(this)
        this.setLoggedOut = this.setLoggedOut.bind(this)
        this.setLoggedIn = this.setLoggedIn.bind(this)
        this.setViewMyBooks = this.setViewMyBooks.bind(this)
        this.setViewAllBooks = this.setViewAllBooks.bind(this)
        this.setViewAccount = this.setViewAccount.bind(this)
        this.updateAccount = this.updateAccount.bind(this)
    
        this.state = {
            view: 'login',
            login_message: '',
            signup_message: '',
            nav_view: 'logged_out',
        }
    }
    setLoggedOut() {
        this.setState({
            nav_view: 'logged_out',
            login_message: '',
            signup_message: ''
        })
    }
    setLoggedIn() {
        this.setState({
            nav_view: 'logged_in',
            view: 'my_books'
        })
    }
    setViewLogin() {
        this.clearInputs()
        this.setState({
            view: 'login'
        })
    }
    setViewSignup() {
        this.clearInputs()
        this.setState({
            view: 'signup'
        })
    }
    setViewMyBooks() {
        this.setState({
            view: 'my_books'
        })
    }
    setViewAllBooks() {
        this.setState({
            view: 'all_books'
        })
    }
    setViewAccount() {
        this.setState({
            view: 'account'
        })
    }
    updateAccount() {
        
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
        this.setState({login_message:''})
        axios.post('/login', {
                username: username,
                password: password
            })
            .then((response) => {
                if (!response.data.error) {
                    this.setLoggedIn()
                }
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
                if (!response.data.error) {
                    console.log(JSON.stringify(response.data))
                    this.clearInputs()
                    this.setLoggedIn()
                }
                else
                    this.setState({signup_message:response.data.msg})
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    logout() {
        this.clearInputs()
        this.setState({
            nav_view:'logged_out',
            view: 'login',
        })
    }
    clearInputs() {
        if (document.getElementById('new_username')) {
            document.getElementById('new_username').value = ''
            document.getElementById('new_password1').value = ''
            document.getElementById('new_password2').value = ''
        }
        if (document.getElementById('username')) {
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
        }
    }
    render() {
        
        return (
            <div>
                <Header
                    nav_view={this.state.nav_view}
                    setViewLogin={this.setViewLogin} 
                    setViewSignup={this.setViewSignup}
                    setViewMyBooks={this.setViewMyBooks}
                    setViewAllBooks={this.setViewAllBooks}
                    setViewAccount={this.setViewAccount}
                    logout={this.logout}
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
                    setLoggedIn={this.setLoggedIn}
                    setLoggedOut={this.setLoggedOut}
                /> 
            </div>
        )
    }
}

export default Top;
