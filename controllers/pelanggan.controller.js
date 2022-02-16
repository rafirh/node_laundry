const db = require("../db");

module.exports = {
    displayAllData: (req,res) => {
        let sql = "select * from pelanggan";
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
        let id_pelanggan = req.params.id_pelanggan;
        let sql = "select * from pelanggan where id_pelanggan = ?";
        db.query(sql, id_pelanggan, (err,result) => {
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
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            jenis_kelamin: req.body.jenis_kelamin,
            telp_pelanggan: req.body.telp_pelanggan,
            no_ktp: req.body.no_ktp
        }
        let sql = "insert into pelanggan set ?";
        db.query(sql,data, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: "Success added pelanggan.",
                    data
                })
            }
        })        
    },
    delete: (req,res) => {
        let id_pelanggan = req.body.id_pelanggan;
        let sql = "delete from pelanggan where id_pelanggan = ?";
        db.query(sql,id_pelanggan, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully delete pelanggan where id = ${id_pelanggan}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id_pelanggan = req.body.id_pelanggan;
        let data = {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            outlet_id: req.body.outlet_id
        }
        let sql = "update pelanggan set ? where id_pelanggan = ?";
        db.query(sql,[data, id_pelanggan], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully update pelanggan where id = ${id_pelanggan}.`,
                    data
                })
            }
        })        
    }
}