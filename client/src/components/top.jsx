import React from 'react';
import Header from './header.jsx';
import View from './view.jsx';

class Top extends React.Component {
    constructor(props) {
        super(props)
        this.setViewLogin = this.setViewLogin.bind(this)
        this.setViewSignup = this.setViewSignup.bind(this)
        this.state = {
            view: ''
        }
    }
    setViewLogin() {
        this.setState({
            view: 'login'
        })
    }
    setViewSignup() {
        this.setState({
            view: 'signup'
        })
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
                /> 
            </div>
        )
    }
}

export default Top;
