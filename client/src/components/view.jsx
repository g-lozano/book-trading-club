import React from 'react';

class View extends React.Component {
    constructor(props) {
        super(props)
    }
    getLoginForm() {
        return (
            <div className="form">
                <input type="text" className="center" placeholder="Username"/>
                <input type="password" className="center" placeholder="Password"/>
                <button className="mdl-button mdl-js-button mdl-button--primary submit-button" onClick={this.props.login}>Login</button>
            </div>
            )
    }
    getSignupForm() {
        return (
            <div className="form">
                <input type="text" className="center" placeholder="New Username"/>
                <input type="password" className="center" placeholder="New Password"/>
                <input type="password" className="center" placeholder="Retype New Password"/>
                <button className="mdl-button mdl-js-button mdl-button--primary submit-button" onClick={this.props.login}>Sign Up</button>
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
                <main className="mdl-layout__content center">
                    <div className="page-content center">{view}</div>
                </main> 
            </div>
        )
    }
}

export default View;
