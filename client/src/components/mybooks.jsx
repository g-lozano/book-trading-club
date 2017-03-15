import React from 'react';
import Book from './book.jsx';

class MyBooks extends React.Component {
  render() {
    var mybooks = []
    if (typeof this.props.mybooks == 'object') {
      if (this.props.mybooks.length)
        this.props.mybooks.forEach(
          (book) => {
            mybooks.push(<div><Book book={book}/></div>)
          })
      else
        mybooks.push(<div className="text-center">You have no books in your collection.</div>)
    }
    return (
      <div>
        <div className="text-center view-title">My Books</div>
        {mybooks}
      </div>
    )
  }
}

export default MyBooks
