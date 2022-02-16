const db = require("../db");

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
        let data = {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            outlet_id: req.body.outlet_id
        }
        let sql = "insert into user set ?";
        db.query(sql,data, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: "Success added user.",
                    data
                })
            }
        })        
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
            password: req.body.password,
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