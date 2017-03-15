import React from 'react';

export default ({updateAccount, handleKeyPress, user, updated}) => (
  <div>
    <h4 className="center">Update account information:</h4>
    <br/>
    First name:
    <input id="first_name" defaultValue={user.first_name} type="text" onKeyPress={handleKeyPress} disabled={updated}></input>
    <br/>
    Last name:
    <input id="last_name" defaultValue={user.last_name} type="text" onKeyPress={handleKeyPress} disabled={updated}></input>
    <br/>
    City: 
    <input id="city" defaultValue={user.city} type="text" onKeyPress={handleKeyPress} disabled={updated}></input>
    <br/>
    State: 
    <input id="state" defaultValue={user.state} type="text" onKeyPress={handleKeyPress} disabled={updated}></input>
    <button onClick={updateAccount} className="mdl-button mdl-js-button mdl-button--primary submit-button center" disabled={updated}>{updated ? 'Account Info Updated':'Update'}</button>
  </div>
);
