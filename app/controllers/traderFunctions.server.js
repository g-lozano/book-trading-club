import Traders from '../models/traders.js';
import Trader from '../models/traders.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

function TraderFunctions() {
    this.login = (req, res) => {
        Traders.findOne({
                username: req.body.username
            },
            '-_id',
            (err, trader) => {
                if (err) throw err
                if (trader) {
                    bcrypt.compare(req.body.password, trader.hash)
                        .then((isUser) => {
                            if (isUser) {
                                req.session.username = req.body.username
                                res.json({
                                    error: false,
                                    msg: 'login success',
                                    user: trader
                                })
                            }
                            else
                                res.json({
                                    error: true,
                                    msg: 'Invalid username and/or password.'
                                })
                        })
                }
                else
                    res.json({
                        error: true,
                        msg: 'Invalid username and/or password.'
                    });
            }
        )
    }

    this.signup = (req, res) => {
        Traders.findOne({
                username: req.body.username
            },
            (err, trader) => {
                if (err) throw err
                if (trader)
                    res.json({
                        error: true,
                        msg: 'Username is taken.'
                    });
                else {
                    var new_trader = new Trader()

                    bcrypt.hash(req.body.password, saltRounds)
                        .then(
                            (hash) => {
                                new_trader.hash = hash
                                new_trader.username = req.body.username
                                new_trader.city = ''
                                new_trader.state = ''
                                new_trader.first_name = ''
                                new_trader.last_name = ''
                                new_trader.save()
                                delete new_trader.hash
                                res.json({
                                    error: false,
                                    msg: 'User created.',
                                    user: new_trader
                                });
                            })
                }
            }
        )
    }

    this.updateInfo = (req, res) => {
        Traders.findOne({
                username: req.session.username
            },
            (err, trader) => {
                if (err) throw err
                if (trader) {
                    trader.first_name = req.body.first_name
                    trader.last_name = req.body.last_name
                    trader.city = req.body.city
                    trader.state = req.body.state
                    trader.save()
                    res.json({error: false, msg: 'saved', user: trader})
                }
                else
                    res.json({
                        error: true,
                        msg: 'Invalid session.'
                    });
            }
        )
    }
}

module.exports = TraderFunctions;
