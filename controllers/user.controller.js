const db = require("../db");
const md5 = require("md5");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    displayAllData: (req,res) => {
        let sql = "select * from user";
        db.query(sql, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    data: result
                })
            }
        })
    },
    displayData: (req,res) => {
        let id_user = req.params.id_user;
        let sql = "select * from user where id_user = ?";
        db.query(sql, id_user, (err,result) => {
            if(err){
                throw err;
            }else{
                if(result[0]){
                    res.json({
                        data: result[0]
                    })
                }else{
                    res.json({
                        message: "Data not found."
                    })
                }
            }
        })        
    },
    add: (req,res) => {
        const { nama_user, username, password, outlet_id, role } = req.body;
        if(!nama_user || !username || !password || !outlet_id || !role) {
            res.status(402).json({
                message: "Data required"
            })
        }else{
            return db.query('insert into user set ?', { nama_user, username, password: hashPassword(password), outlet_id, role}, (err, result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "Registration success",
                        data: result
                    })
                }
            })
        }
    },
    delete: (req,res) => {
        let id_user = req.body.id_user;
        let sql = "delete from user where id_user = ?";
        db.query(sql,id_user, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully delete packet where id = ${id_user}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id_user = req.body.id_user;
        let data = {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: hashPassword(req.body.password),
            role: req.body.role,
            outlet_id: req.body.outlet_id
        }
        let sql = "update user set ? where id_user = ?";
        db.query(sql,[data, id_user], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully update user where id = ${id_user}.`,
                    data
                })
            }
        })        
    }
}
