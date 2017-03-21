
import React from 'react';

export default ({handleLoginKeyPress, validateLogin, login_message}) => (
  <div id="login_form" className="form">
    Demo username: "Demo" <br/>
    Demo password: "Demo"
    <input onKeyPress={handleLoginKeyPress} id="username" type="text" className="center" placeholder="Username"/>
    <input onKeyPress={handleLoginKeyPress} id="password" type="password" className="center" placeholder="Password"/>
    <button onClick={validateLogin}  className="mdl-button mdl-js-button mdl-button--primary submit-button">Login</button>
    <div className="message">{login_message}</div>
  </div>
);
