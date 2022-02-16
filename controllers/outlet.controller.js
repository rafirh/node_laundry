const db = require("../db");

module.exports = {
    displayAllData: (req,res) => {
        let sql = "select * from outlet";
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
    },
    delete: (req,res) => {
        let id_outlet = req.body.id_outlet;
        let sql = "delete from outlet where id_outlet = ?";
        db.query(sql,id_outlet, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully delete outlet where id = ${id_outlet}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id_outlet = req.body.id_outlet;
        let data = {
            nama_outlet: req.body.nama_outlet,
            alamat_outlet: req.body.alamat_outlet,
            telp_outlet: req.body.telp_outlet
        }
        let sql = "update outlet set ? where id_outlet = ?";
        db.query(sql,[data, id_outlet], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully update outlet where id = ${id_outlet}.`,
                    data
                })
            }
        })        
    }
}