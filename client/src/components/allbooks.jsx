import React from 'react';
import Book from './book.jsx';

class AllBooks extends React.Component {
  render() {
    var allbooks = []
    if (typeof this.props.allbooks == 'object') {
      if (this.props.allbooks.length)
        this.props.allbooks.forEach(
          (book, i) => {
            var id = i + "." + book.id
            var className = "book-button trade-button trade-button-available"
            if (book.swap_status == 'pending')
              className = "book-button trade-button trade-button-pending" 
            var button = (
              <button 
                className={className}
                onClick={this.props.handleClickTrade}
                name={id}>
                <i 
                className="material-icons"
                name={id}>swap_vertical_circle</i>
              </button>
            )
            allbooks.push(
              <div className="relative book-div">
                <Book button={button} book={book}/>
              </div>
            )
          })
      else
        allbooks.push(<div></div>)
    }
    return (
      <div>
        <div className="text-center view-title">All Books</div>
        <div className="float-left">
          {allbooks}
        </div>
      </div>
    )
  }
}

export default AllBooks
