import React from 'react';
import Header from './header.jsx';
import View from './view.jsx';
import axios from 'axios'
import cookie from 'react-cookie'

class Top extends React.Component {
    constructor(props) {
        super(props)
        this.setViewLogin = this.setViewLogin.bind(this)
        this.setViewSignup = this.setViewSignup.bind(this)
        this.setLoginMessage = this.setLoginMessage.bind(this)
        this.setSignupMessage = this.setSignupMessage.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.setLoggedOut = this.setLoggedOut.bind(this)
        this.setLoggedIn = this.setLoggedIn.bind(this)
        this.setViewMyBooks = this.setViewMyBooks.bind(this)
        this.setViewAllBooks = this.setViewAllBooks.bind(this)
        this.setViewAccount = this.setViewAccount.bind(this)
        this.updateAccount = this.updateAccount.bind(this)
        this.setMyBooks = this.setMyBooks.bind(this)
        this.setAllBooks = this.setAllBooks.bind(this)
        
        this.state = {
            view: '',
            user: cookie.load('trader'),
            updated: false,
        }
    }
    componentDidMount() {
        var view = ''
        var nav_view = ''
        
        this.setAllBooks()

        if (this.state.user) {
            view = 'my_books',
            nav_view = 'logged_in'
            this.setMyBooks()
        }
        else {
            view = 'all_books'
            nav_view = 'logged_out'
        }

        this.setState({
            view: view,
            login_message: '',
            signup_message: '',
            nav_view: nav_view,
        })
    }
    setAllBooks() {
        axios.post('/allbooks')
            .then((response) => {
                this.setState({
                    allbooks: response.data.books
                })
            })
    }
    setMyBooks() {
        axios.post('/mybooks')
            .then((response) => {
                if (!response.data.empty)
                    this.setState({
                        mybooks: response.data.books
                    })
            })
    }
    setLoggedOut() {
        this.clearInputs()
        axios.post('/logout')
            .then((response) => {
                this.setState({
                    nav_view: 'logged_out',
                    view: 'all_books',
                    login_message: '',
                    signup_message: '',
                    mybooks: [],
                    allbooks: []
                })
                cookie.remove('trader')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setLoggedIn(user) {
        this.setState({
            nav_view: 'logged_in',
            view: 'my_books',
            user: user
        })
        this.setMyBooks()
        this.setAllBooks()
        cookie.save('trader', user)
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
        var first_name = document.getElementById('first_name').value
        var last_name = document.getElementById('last_name').value
        var city = document.getElementById('city').value
        var state = document.getElementById('state').value

        axios.post('/update', {
                first_name: first_name,
                last_name: last_name,
                city: city,
                state: state
            })
            .then((response) => {
                this.setState({
                    user: response.data.user,
                    updated: true
                })
                cookie.save('trader', response.data.user)
            })
            .catch(function(error) {
                console.log(error)
            });
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
        this.setState({
            login_message: ''
        })
        axios.post('/login', {
                username: username,
                password: password
            })
            .then((response) => {
                if (!response.data.error) {
                    this.setLoggedIn(response.data.user)
                }
                else
                    this.setState({
                        login_message: response.data.msg
                    })
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
                    this.setLoggedIn(response.data.user)
                }
                else
                    this.setState({
                        signup_message: response.data.msg
                    })
            })
            .catch(function(error) {
                console.log(error);
            });
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
                    logout={this.setLoggedOut}
                    user={this.state.user}
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
                    updateAccount={this.updateAccount}
                    user={this.state.user}
                    updated={this.state.updated}
                    mybooks={this.state.mybooks}
                    allbooks={this.state.allbooks}
                /> 
            </div>
        )
    }
}

export default Top;
