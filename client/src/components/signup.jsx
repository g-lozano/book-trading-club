import React from 'react'

export default ({handleSignupKeyPress, validateSignup, signup_message}) => (
    <div id="signup_form" className="form">
        <input onKeyPress={handleSignupKeyPress} id="new_username" type="text" className="center" placeholder="New Username"/>
        <input onKeyPress={handleSignupKeyPress} id="new_password1" type="password" className="center" placeholder="New Password"/>
        <input onKeyPress={handleSignupKeyPress} id="new_password2" type="password" className="center" placeholder="Retype New Password"/>
        <button onClick={validateSignup} className="mdl-button mdl-js-button mdl-button--primary submit-button">Sign Up</button>
        <div className="message">{signup_message}</div>
    </div>
);