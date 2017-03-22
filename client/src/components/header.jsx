import React from 'react';
import cookie from 'react-cookie';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    getNotLoggedInNav(view) {
        var className = "nav-link clickable"
        var classNameActive = "nav-link clickable active"
        var nav = (
            <nav className="mdl-navigation">
                <a className={view == 'all_books' ? classNameActive:className}
                    onClick={this.props.setViewAllBooks}
                >Browse Books</a>
                <a className={view == 'login' ? classNameActive:className}
                    onClick={this.props.setViewLogin}
                >Login</a>
                <a className={view == 'signup' ? classNameActive:className}
                    onClick={this.props.setViewSignup}
                >Signup</a>
            </nav>
        )
        return nav;
    }
    getLoggedInNav(view) {
        var className = "nav-link clickable"
        var classNameActive = "nav-link clickable active"
        var nav = (
            <nav className="mdl-navigation">
                <a className={view == 'my_books' ? classNameActive:className}
                    onClick={this.props.setViewMyBooks}
                >My Books</a>
                <a className={view == 'my_swaps' ? classNameActive:className}
                    onClick={this.props.setViewMySwaps}
                >My Swaps</a>
                <a className={(view == 'all_books' || view == 'available_books') ? classNameActive:className}
                    onClick={this.props.setViewAvailableBooks}
                >Browse Books</a>
                <a className={view == 'account' ? classNameActive:className}
                    onClick={this.props.setViewAccount}
                ><i className="material-icons">perm_identity</i>{this.props.user.username}</a>
                <a className="nav-link clickable"
                    onClick={this.props.logout}
                >Logout</a>
            </nav>
        )
        return nav;
    }
    render() {
        var nav = []
        if (this.props.nav_view == 'logged_out')
          nav = this.getNotLoggedInNav(this.props.view)
        else if (this.props.nav_view == 'logged_in')
          nav = this.getLoggedInNav(this.props.view)
        else 
          nav = <div></div>
        return (
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Swapper</span>
                <div className="mdl-layout-spacer"></div>
                {nav}
              </div>
            </header>    
        )
    }
}

export default Header;
