import React from 'react';
import Header from './header.jsx';
import View from './view.jsx';
import axios from 'axios'
import cookie from 'react-cookie'
import Book from './book.jsx'

class Top extends React.Component {
    constructor(props) {
        super(props)
        this.setViewLogin = this.setViewLogin.bind(this)
        this.setViewSignup = this.setViewSignup.bind(this)
        this.setLoginMessage = this.setLoginMessage.bind(this)
        this.setSignupMessage = this.setSignupMessage.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.setLoggedOut = this.setLoggedOut.bind(this)
        this.setLoggedIn = this.setLoggedIn.bind(this)
        this.setViewMyBooks = this.setViewMyBooks.bind(this)
        this.setViewAllBooks = this.setViewAllBooks.bind(this)
        this.setViewAccount = this.setViewAccount.bind(this)
        this.updateAccount = this.updateAccount.bind(this)
        this.setMyBooks = this.setMyBooks.bind(this)
        this.setAllBooks = this.setAllBooks.bind(this)
        this.showNewBook = this.showNewBook.bind(this)
        this.addBook = this.addBook.bind(this)
        this.removeBook = this.removeBook.bind(this)
        this.handleClickTrade = this.handleClickTrade.bind(this)
        this.setViewMySwaps = this.setViewMySwaps.bind(this)
        this.setSwapViewIn = this.setSwapViewIn.bind(this)
        this.setSwapViewOut = this.setSwapViewOut.bind(this)
        this.setSwapViewHistory = this.setSwapViewHistory.bind(this)
        this.setViewAvailableBooks = this.setViewAvailableBooks.bind(this)
        this.handleAcceptIncoming = this.handleAcceptIncoming.bind(this)
        this.handleRejectIncoming = this.handleRejectIncoming.bind(this)
        this.handleCancelOutgoing = this.handleCancelOutgoing.bind(this)

        this.state = {
            view: '',
            user: cookie.load('trader'),
            updated: false,
            swapview: 'incoming',
        }
    }
    componentDidMount() {
        var view = ''
        var nav_view = ''

        this.setAllBooks()

        if (this.state.user) {
            view = 'my_books',
            nav_view = 'logged_in'
            this.setMyBooks()
        }
        else {
            // this.login('Demo', 'Demo') // Demo auto-login
            view = 'all_books'
            nav_view = 'logged_out'
        }

        this.setState({
            view: view,
            login_message: '',
            signup_message: '',
            nav_view: nav_view,
        })
    }
    setAllBooks() {
        axios.post('/allbooks')
            .then((response) => {
                var available_books = []
                var incoming = []
                var outgoing = []
                var history = []
                response.data.books.forEach((book) => {
                    if (this.state.user) {
                        if (book.swap_status == 'available' && book.owner != this.state.user.username)
                            available_books.push(book)
                        else if (book.swap_status == 'pending') {
                            if (book.owner == this.state.user.username)
                                incoming.push(book)
                            else if (book.swapper == this.state.user.username)
                                outgoing.push(book)
                        }
                        else if (book.swap_status == 'traded') {
                            history.push(book)
                        } 
                    }
                })

                this.setState({
                    allbooks: response.data.books,
                    available_books: available_books,
                    incoming: incoming,
                    outgoing: outgoing,
                    history: history
                })
            })
    }
    setMyBooks() {
        axios.post('/mybooks')
            .then((response) => {
                if (!response.data.empty)
                    this.setState({
                        mybooks: response.data.books
                    })
            })
    }
    setLoggedOut() {
        this.clearInputs()
        axios.post('/logout')
            .then((response) => {
                this.setState({
                    nav_view: 'logged_out',
                    view: 'all_books',
                    login_message: '',
                    signup_message: '',
                    mybooks: [],
                    newbook: '',
                    searching: false,
                    user: null
                })
                cookie.remove('trader')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    setLoggedIn(user) {
        cookie.save('trader', user)
        this.setState({
            nav_view: 'logged_in',
            view: 'my_books',
            user: user
        })
        this.setMyBooks()
        this.setAllBooks()
    }
    setViewLogin() {
        this.clearInputs()
        this.setState({
            view: 'login'
        })
    }
    setViewSignup() {
        this.clearInputs()
        this.setState({
            view: 'signup'
        })
    }
    setViewMyBooks() {
        this.setState({
            view: 'my_books'
        })
    }
    setViewAllBooks() {
        this.setState({
            view: 'all_books'
        })
    }
    setViewAccount() {
        this.setState({
            view: 'account'
        })
    }
    setViewMySwaps() {
        this.setState({
            view: 'my_swaps'
        })
    }
    updateAccount() {
        var first_name = document.getElementById('first_name').value
        var last_name = document.getElementById('last_name').value
        var city = document.getElementById('city').value
        var state = document.getElementById('state').value

        axios.post('/update', {
                first_name: first_name,
                last_name: last_name,
                city: city,
                state: state
            })
            .then((response) => {
                this.setState({
                    user: response.data.user,
                    updated: true
                })
                cookie.save('trader', response.data.user)
            })
            .catch(function(error) {
                console.log(error)
            });
    }
    setLoginMessage(message) {
        this.setState({
            login_message: message
        })
    }
    setSignupMessage(message) {
        this.setState({
            signup_message: message
        })
    }
    login(username, password) {
        this.setState({
            login_message: ''
        })
        axios.post('/login', {
                username: username,
                password: password
            })
            .then((response) => {
                if (!response.data.error) {
                    this.setLoggedIn(response.data.user)
                }
                else
                    this.setState({
                        login_message: response.data.msg
                    })
            })
            .catch(function(error) {
                console.log(error)
            });
    }
    signup(username, password) {
        axios.post('/signup', {
                username: username,
                password: password
            })
            .then((response) => {
                if (!response.data.error) {
                    console.log(JSON.stringify(response.data))
                    this.clearInputs()
                    this.setLoggedIn(response.data.user)
                }
                else
                    this.setState({
                        signup_message: response.data.msg
                    })
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    setNewBook(book) {
        this.setState({
            newbook: <Book book={book}/>,
            newbookdata: book,
            added_newbook: false,
            searching: false
        })
    }
    addBook() {
        axios.post('/addbook', this.state.newbookdata)
            .then((response) => {
                if (response.data.msg == 'saved') {
                    var new_mybooks = this.state.mybooks
                    var new_allbooks = this.state.allbooks
                    new_mybooks.push(response.data.new_book)
                    new_allbooks.push(response.data.new_book)
                    var temp = {
                        title: null,
                    }
                    this.setState({
                        mybooks: new_mybooks,
                        added_newbook: true,
                        newbook: "",
                    })
                }
                else
                    console.log('error')
            })
    }
    showNewBook(e) {
        var book_title = document.getElementById('newbook').value
        if (e.key == 'Enter' && book_title) {
            this.setState({
                searching: true
            })
            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(book_title))
                .then((response) => {
                    var thumbnail = 'img/thumbnail_not_found.png'
                    var book = response.data.items[0]
                    if (book.volumeInfo.imageLinks)
                        thumbnail = book.volumeInfo.imageLinks.thumbnail.replace('&edge=curl', '')
                    var book_data = {
                        img: thumbnail,
                        title: book.volumeInfo.title,
                        author: book.volumeInfo.authors[0],
                        id: book.id
                    }
                    this.setNewBook(book_data)
                    document.getElementById('newbook').value = ''
                })
        }
    }
    removeBook(e) {
        if (confirm('Remove book?')) {
            var index = e.target.getAttribute('name').split('.')[1]
            var id = e.target.getAttribute('name').split('.')[0]
            var new_mybooks = this.state.mybooks
            new_mybooks.splice(index, 1)
            
            this.setState({
                mybooks: new_mybooks
            })
            
            axios.post('/removebook', {
                id: id
            })
            .then((response) => {
                this.setAllBooks()
            })
        }
    }
    clearInputs() {
        if (document.getElementById('new_username')) {
            document.getElementById('new_username').value = ''
            document.getElementById('new_password1').value = ''
            document.getElementById('new_password2').value = ''
        }
        if (document.getElementById('username')) {
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
        }
    }
    handleClickTrade(e) {
        if (!this.state.user) {
            this.setViewLogin()
            this.setLoginMessage('Login to swap.')
        }
        else {
            var index = e.target.getAttribute('name').split('.')[0]
            var id = e.target.getAttribute('name').split('.')[1]
            var new_allbooks = this.state.allbooks
            var updated_book = this.state.allbooks[index]

            if (updated_book.swap_status == 'available') {
                updated_book.swap_status = 'pending'
            }
            else {
                updated_book.swap_status = 'available'
            }
            new_allbooks.splice(index, 1, updated_book)
            
            var book_info = {
                id: id,
                swap_status: updated_book.swap_status
            }
            axios.post('/updatebook', book_info)
                .then((response) => {
                    this.setAllBooks()
                })
        }
    }
    setSwapViewIn() {
        this.setState({
            swapview: 'incoming'
        })
    }
    setSwapViewOut() {
        this.setState({
            swapview: 'outgoing'
        })
    }
    setSwapViewHistory() {
        this.setState({
            swapview: 'history'
        })
    }
    setViewAvailableBooks() {
        this.setState({
            view: 'available_books'
        })
    }
    handleAcceptIncoming(e) {
        var index = e.target.getAttribute('name').split('.')[0]
        var id = e.target.getAttribute('name').split('.')[1]
        
        var book_info = {
            id: id
        }

        var new_incoming = this.state.incoming
        new_incoming.splice(index, 1)
        
        this.setState({
            incoming: new_incoming
        })
        
        axios.post('/acceptrequest', book_info)
            .then((response) => {
                alert(response.data.msg)
            })
    }
    handleRejectIncoming(e) {
        var index = e.target.getAttribute('name').split('.')[0]
        var id = e.target.getAttribute('name').split('.')[1]
        
        var book_info = {
            id: id
        }
        
        var new_incoming = this.state.incoming
        new_incoming.splice(index, 1)
        
        this.setState({
            incoming: new_incoming
        })
        
        axios.post('/rejectrequest', book_info)
            .then((response) => {
                alert(response.data.msg)
            })
    }
    handleCancelOutgoing(e) {
        var index = e.target.getAttribute('name').split('.')[0]
        var id = e.target.getAttribute('name').split('.')[1]
        
        var book_info = {
            id: id
        }
        
        var new_outgoing = this.state.outgoing
        new_outgoing.splice(index, 1)
        
        this.setState({
            outgoing: new_outgoing
        })
        
        axios.post('/cancelrequest', book_info)
            .then((response) => {
                alert(response.data.msg)
            })
    }
    render() {

        return (
            <div>
                <Header
                    view={this.state.view}
                    nav_view={this.state.nav_view}
                    setViewLogin={this.setViewLogin} 
                    setViewSignup={this.setViewSignup}
                    setViewMyBooks={this.setViewMyBooks}
                    setViewAllBooks={this.setViewAllBooks}
                    setViewAccount={this.setViewAccount}
                    setViewMySwaps={this.setViewMySwaps}
                    setViewAvailableBooks={this.setViewAvailableBooks}
                    logout={this.setLoggedOut}
                    user={this.state.user}
                />
                <br/><br/><br/>
                <View 
                    state={this.state}
                    view={this.state.view}
                    setLoginMessage={this.setLoginMessage}
                    setSignupMessage={this.setSignupMessage}
                    login_message={this.state.login_message}
                    signup_message={this.state.signup_message}
                    login={this.login}
                    signup={this.signup}
                    updateAccount={this.updateAccount}
                    user={this.state.user}
                    updated={this.state.updated}
                    mybooks={this.state.mybooks}
                    allbooks={this.state.allbooks}
                    available_books={this.state.available_books}
                    showNewBook={this.showNewBook}
                    newbook={this.state.newbook}
                    newbookdata={this.state.newbookdata}
                    addBook={this.addBook}
                    added_newbook={this.state.added_newbook}
                    searching={this.state.searching}
                    removeBook={this.removeBook}
                    handleClickTrade={this.handleClickTrade}
                    swapview={this.state.swapview}
                    setSwapViewIn={this.setSwapViewIn}
                    setSwapViewOut={this.setSwapViewOut}
                    setSwapViewHistory={this.setSwapViewHistory}
                    setViewAvailableBooks={this.setViewAvailableBooks}
                    setViewAllBooks={this.setViewAllBooks}
                    handleAcceptIncoming={this.handleAcceptIncoming}
                    handleRejectIncoming={this.handleRejectIncoming}
                    handleCancelOutgoing={this.handleCancelOutgoing}
                /> 
            </div>
        )
    }
}

export default Top;
