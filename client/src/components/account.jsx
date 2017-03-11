import React from 'react';

export default ({updateAccount, handleKeyPress}) => (
  <div>
    <h4 className="center">Update account information:</h4>
    <input id="first_name" placeholder="First Name" type="text" onKeyPress={handleKeyPress}></input>
    <input id="last_name" placeholder="Last Name" type="text" onKeyPress={handleKeyPress}></input>
    <input id="city" placeholder="City" type="text" onKeyPress={handleKeyPress}></input>
    <input id="state" placeholder="State" type="text" onKeyPress={handleKeyPress}></input>
    <button onClick={updateAccount} className="mdl-button mdl-js-button mdl-button--primary submit-button center">Update</button>
  </div>
);
