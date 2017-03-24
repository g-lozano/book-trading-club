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
        var new_book = new Book()
    
        new_book.owner = req.session.username
        new_book.title = req.body.title
        new_book.img = req.body.img
        new_book.id = req.body.id
        new_book.swap_status = 'available'
        new_book.swapper = ''
    
        new_book.save()
            .then(
                (book) => {
                    if (book)
                        res.send({
                            msg: 'saved',
                            new_book: book
                        })
    
                    else
                        res.send({
                            msg: 'error'
                        })
                })
    }
    
    this.removeBook = (req, res) => {
        Books.findOneAndRemove({
                id: req.body.id,
                owner: req.session.username
            },
            (err) => {
                if (err)
                    res.send({
                        msg: 'error'
                    })
                else
                    res.send({
                        msg: 'ok'
                    })
            })
    }

    this.updateBook = (req, res) => {
        var swapper = req.session.username
        if (req.body.swap_status == 'available')
            swapper = ''
        Books.findOneAndUpdate({
            id: req.body.id
        }, {
            swap_status: req.body.swap_status,
            swapper: swapper
        },
        (err) => {
            if (err) throw err
            res.send({msg: 'ok'})
        })
    }
    
    this.acceptRequest = (req, res) => {
        
    }
    
    this.rejectRequest = (req, res) => {
        
    }
}

module.exports = BookFunctions;
