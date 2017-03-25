import React from 'react';
import Login from './login.jsx'
import Signup from './signup.jsx'
import AllBooks from './allbooks.jsx'
import MyBooks from './mybooks.jsx'
import Account from './account.jsx'
import SwapView from './swapview.jsx'

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
        this.handleAccountKeyPress = this.handleAccountKeyPress.bind(this)
        this.getMySwaps = this.getMySwaps.bind(this)
    }
    getMyBooks() {
        return (
            <MyBooks
                showNewBook = {this.props.showNewBook}
                mybooks = {this.props.mybooks}
                newbook = {this.props.newbook}
                newbookdata = {this.props.newbookdata}
                addBook = {this.props.addBook}
                added_newbook = {this.props.added_newbook}
                searching = {this.props.searching}
                removeBook = {this.props.removeBook}
            />
        )
    }
    getAllBooks() {
        return (
            <AllBooks
                allbooks = {this.props.allbooks}
                available_books={this.props.available_books}
                handleClickTrade = {this.props.handleClickTrade}
                user={this.props.user}
                setViewAvailableBooks={this.props.setViewAvailableBooks}
                setViewAllBooks={this.props.setViewAllBooks}
                view={this.props.view}
            />
        )
    }
    getAccount() {
        return (
            <Account
                updateAccount = {this.props.updateAccount}
                handleKeyPress = {this.handleAccountKeyPress}
                user = {this.props.user}
                updated = {this.props.updated}
            />
        )
    }
    validateLogin() {
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value

        if (username && password){
            this.props.login(username, password)
        }
        else if (!username) {
            this.props.setLoginMessage('Username is missing.')
        }
        else if (!password) {
            this.props.setLoginMessage('Password is missing.')
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
        else if (!new_username) {
            this.props.setSignupMessage('New username is missing.')
        }
        else if (!new_password1 || !new_password2) {
            this.props.setSignupMessage('New password is missing.')
        }
    }
    handleAccountKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.updateAccount()
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
    getMySwaps() {
        return (
            <SwapView
                setSwapViewIn={this.props.setSwapViewIn}
                setSwapViewOut={this.props.setSwapViewOut}
                setSwapViewHistory={this.props.setSwapViewHistory}
                state={this.props.state}
                handleAcceptIncoming={this.props.handleAcceptIncoming}
                handleRejectIncoming={this.props.handleRejectIncoming}
                handleCancelOutgoing={this.props.handleCancelOutgoing}
            />
        )
    }
    render() {
        var view = []
        var title = []
        switch(this.props.view) {
            case 'login': 
                view = this.getLoginForm(); break;
            case 'signup':
                view = this.getSignupForm(); break;
            case 'my_books':
                view = this.getMyBooks(); break;
            case 'available_books':
            case 'all_books':
                view = this.getAllBooks(); break;
            case 'account':
                view = this.getAccount(); break;
            case 'my_swaps':
                view = this.getMySwaps(); break;
            default:
                view = <div></div>; break;
        }
            
        return (
            <div id="layout" className="center">
                <div className="center">
                    {view}
                </div> 
            </div>
        )
    }
}

export default View;
