const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const secret = '#$@^%*&%$$@&';

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    login: (req,res) => {
        const { username, password } = req.body;
        if(!username || !password){
            res.status(402).json({
                message: "Email and password required"
            })
        }else{
            return db.query('select * from user where username = ?', username, (err, result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    if(result.length > 0){
                        const user = result[0];
                        if(bcrypt.compareSync(password, user.password)){
                            const token = jwt.sign({ id: user.id }, secret);
                            return res.json({
                                message: "Login success",
                                data: {
                                    token,
                                    user
                                }
                            })
                        }else{
                            return res.status(401).json({
                                message: "Wrong password"
                            })
                        }
                    }else{
                        return res.status(401).json({
                            message: "Email not found"
                        })
                    }
                }
            })
        }
    } 
}