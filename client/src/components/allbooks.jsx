import React from 'react';
import Book from './book.jsx';

class AllBooks extends React.Component {
  render() {
    var allbooks = []
    var options = []
    var view = []
    if (typeof this.props.allbooks == 'object') {
      var books = this.props.allbooks
      if (this.props.view == 'available_books')
        books = this.props.available_books

      if (books.length) {
        
        books.forEach(
          (book, i) => {
            var button = []
            var id = i + "." + book.id
            var className = "book-button trade-button trade-button-available"
            if (book.swap_status == 'pending')
              className = "book-button trade-button trade-button-pending" 
            if (this.props.user)
              // show trade button if (user does not own book) and (the book is not requested by another user)
              if (this.props.user.username != book.owner && (book.swap_status != 'pending' || this.props.user.username == book.swapper))
                button = (
                  <button 
                    className={className}
                    onClick={this.props.handleClickTrade}
                    name={id}>
                    <i 
                    className="material-icons"
                    name={id}>swap_vertical_circle</i>
                  </button>
                )
            else
              button = (
                <div></div>
              )
            
            allbooks.push(
              <div className="relative book-div">
                <Book 
                button={button}
                book={book}/>
              </div>
            )
          })
      }
      else {
        allbooks = <div className="text-center"><br/><br/><br/>No books available for swap.</div>
      }
      view = (
        <div className={books.length?"float-left":"text-center"}>
          {allbooks}
        </div>
      )
    }

    if (this.props.user) {
      var active = "mdl-button mdl-js-button mdl-button--raised options-active"
      var normal = "mdl-button mdl-js-button mdl-button--raised"
      options = (
        <div className="text-center">
          <button 
            focus="true"
            onClick={this.props.setViewAvailableBooks}
            className={this.props.view == 'available_books'?active:normal}>
            Available Books</button>
          <button 
            onClick={this.props.setViewAllBooks}
            className={this.props.view == 'all_books'?active:normal}>
            All Books</button>
        </div>  
      )
    }
    return (
      <div>
        <div className="text-center view-title">Collection</div>
        {options}
        {view}
      </div>
    )
  }
}

export default AllBooks
