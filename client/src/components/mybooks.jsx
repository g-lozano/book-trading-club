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
    return "none"
  }
  render() {
    var mybooks = []
    var addnewbook = []
    
    if (typeof this.props.mybooks == 'object') {
      if (this.props.mybooks.length)
        this.props.mybooks.forEach(
          (book, index) => {
            var bookid = book.id + '.' + index
            mybooks.push(
              <div className="relative book-div">
                <button className="remove-button">
                  <i onClick={this.props.removeBook} 
                    id={bookid}
                    className="material-icons clickable">highlight_off</i>
                </button>
                <Book book={book}/>
              </div>
            )
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
    else
      addnewbook = <div></div>
    return (
      <div>
        <div className="center">
          Find a book to add:
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
