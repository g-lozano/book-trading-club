import React from 'react';
import Header from './header.jsx';
import View from './view.jsx';

class Top extends React.Component {
    constructor(props) {
        super(props)
        this.setViewLogin = this.setViewLogin.bind(this)
        this.setViewSignup = this.setViewSignup.bind(this)
        this.state = {
            view: 'login'
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
    login(username, password) {
        
    }
    signup(username, password) {
        
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
                    login={this.login}
                /> 
            </div>
        )
    }
}

export default Top;
