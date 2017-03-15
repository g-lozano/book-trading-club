import Books from '../models/books.js';
import Book from '../models/books.js';

function BookFunctions() {
    this.getAllBooks = (req, res) => {
        Books.find({},
            (err, books) => {
                if (err) throw err
                if (books) {
                    res.send({
                        empty: false,
                        books: books
                    })
                }
                else
                    res.send({
                        empty: true,
                        msg: 'No books.'
                    })
            })
    }

    this.getMyBooks = (req, res) => {
        Books.find({
                owner: req.session.username
            },
            (err, books) => {
                if (err) throw err
                if (books) {
                    res.send({
                        empty: false,
                        books: books
                    })
                }
                else
                    res.send({
                        empty: true,
                        msg: 'No books.'
                    })
            })
    }

    this.addBook = (req, res) => {

    }

    this.removeBook = (req, res) => {

    }

    this.updateBook = (req, res) => {

    }
}

module.exports = BookFunctions;
