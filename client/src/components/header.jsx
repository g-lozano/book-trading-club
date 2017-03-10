import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    getNotLoggedInNav() {
        var nav = (
            <nav className="mdl-navigation mdl-layout--large-screen-only">
                <a className="mdl-navigation__link clickable"
                    onClick={this.props.setViewLogin}
                >Login</a>
                <a className="mdl-navigation__link clickable"
                    onClick={this.props.setViewSignup}
                >Signup</a>
            </nav>
        )
        return nav;
    }
    getLoggedInNav() {
        var nav = (
            <nav className="mdl-navigation mdl-layout--large-screen-only">
                <a className="mdl-navigation__link clickable"
                    onClick={this.props.setViewMyBooks}
                >My Books</a>
                <a className="mdl-navigation__link clickable"
                    onClick={this.props.setViewAllBooks}
                >All Books</a>
                <a className="mdl-navigation__link clickable"
                    onClick={this.props.setViewAccount}
                >Account</a>
                <a className="mdl-navigation__link clickable"
                    onClick={this.props.logout}
                >Logout</a>
            </nav>
        )
        return nav;
    }
    render() {
        var nav = []
        if (this.props.nav_view == 'logged_out')
          nav = this.getNotLoggedInNav()
        else if (this.props.nav_view == 'logged_in')
          nav = this.getLoggedInNav()
        else 
          nav = this.getNotLoggedInNav()
        return (
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Book Worms</span>
                <div className="mdl-layout-spacer"></div>
                {nav}
              </div>
            </header>    
        )
    }
}

export default Header;
