import React from 'react'

export default ({book, button}) => (
    <div className="book">
      {button}
      <img className="book-cover" src={book.img} title={book.title}/>
    </div>
)