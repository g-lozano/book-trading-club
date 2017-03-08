import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Book Worms</span>
                <div className="mdl-layout-spacer"></div>
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                  <a 
                    className="mdl-navigation__link clickable"
                    onClick={this.props.showLogin}
                  >Login</a>
                  <a 
                    className="mdl-navigation__link clickable"
                    onClick={this.props.showSignup}
                  >Signup</a>
                </nav>
              </div>
            </header>    
        )
    }
}

export default Header;
