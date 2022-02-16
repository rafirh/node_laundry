const db = require("../db");

module.exports = {
    displayAllData: (req,res) => {
        let sql = "select * from outlet";
        db.query(sql, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    result
                })
            }
        })
    },
    displayData: (req,res) => {
        let id = req.params.id;
        let sql = "select * from outlet where id_outlet = ?";
        db.query(sql,id, (err,result) => {
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
            nama_outlet: req.body.nama_outlet,
            alamat_outlet: req.body.alamat_outlet,
            telp_outlet: req.body.telp_outlet
        }
        let sql = "insert into outlet set ?";
        db.query(sql,data, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: "Succes added outlet.",
                    data
                })
            }
        })        
    }
}