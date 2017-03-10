
import Traders from '../models/traders.js';
import bcrypt from 'bcrypt';

function TraderFunctions() {
    this.login = (req, res) => {
        Traders.findOne({
                username: req.body.username
            },
            (err, trader) => {
                if (err) throw err
                if (trader)
                    res.json({error: false, msg: 'User exists'});
                else
                    res.json({error: true, msg: 'Username does not exist.'});
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
                    res.json({error: true, msg: 'User exists'});
                else
                    res.json({error: false, msg: 'User does not exist.'});
            }
        )
    }
    
    this.updateInfo = (req, res) => {
        
    }
}

module.exports = TraderFunctions;
