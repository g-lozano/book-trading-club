import React from 'react';
import Book from './book.jsx';

class MyBooks extends React.Component {
  constructor(props) {
    super(props)
    this.getClassNameMyBooks = this.getClassNameMyBooks.bind(this)
  }
  getClassNameMyBooks() {
    if (typeof this.props.mybooks == 'object')
      return this.props.mybooks.length ? "float-left" : ""
    return ""
  }
  render() {
    var mybooks = []
    var addnewbook = []
    
    if (typeof this.props.mybooks == 'object') {
      if (this.props.mybooks.length)
        this.props.mybooks.forEach(
          (book) => {
            mybooks.push(<div><Book book={book}/></div>)
          })
      else
        mybooks.push(<div className="text-center">You have no books in your collection.</div>)
    }
    
    if (this.props.searching) {
      addnewbook = (
        <div className="text-center">searching...</div>
      )
    }
    else if (typeof this.props.newbook == 'object') {
      addnewbook = (
        <div className="center text-center">
          <div>{this.props.newbook}</div>
          <u>{this.props.newbookdata.title}</u>
          <br/>
          by {this.props.newbookdata.author}
          <div>
            <button 
              onClick={this.props.addBook} 
              className="mdl-button mdl-js-button mdl-button--primary add-book-button" 
              disabled={this.props.added_newbook}>
              {this.props.added_newbook ? "Added" : "Add"}
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="center">
          Add a book:
          <input id="newbook" onKeyPress={this.props.showNewBook} type="text" placeholder="Enter title"/>
          {addnewbook}
        </div>
        <div className="text-center view-title center">My Books</div>
        <div className={this.getClassNameMyBooks()}>
          {mybooks}
        </div>
      </div>
    )
  }
}

export default MyBooks
