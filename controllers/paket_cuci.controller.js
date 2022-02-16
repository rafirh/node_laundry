const db = require("../db");

module.exports = {
    displayAllData: (req,res) => {
        let sql = "select * from paket_cuci";
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
        let sql = "select * from paket_cuci where id_paket = ?";
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
            nama_paket: req.body.nama_paket,
            harga: req.body.harga,
            jenis_paket: req.body.jenis_paket,
            outlet_id: req.body.outlet_id
        }
        let sql = "insert into paket_cuci set ?";
        db.query(sql,data, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: "Succes added packet.",
                    data
                })
            }
        })        
    },
    delete: (req,res) => {
        let id_paket = req.body.id_paket;
        let sql = "delete from paket_cuci where id_paket = ?";
        db.query(sql,id_paket, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully delete packet where id = ${id_paket}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id_paket = req.body.id_paket;
        let data = {
            nama_paket: req.body.nama_paket,
            harga: req.body.harga,
            jenis_paket: req.body.jenis_paket,
            outlet_id: req.body.outlet_id
        }
        let sql = "update paket_cuci set ? where id_paket = ?";
        db.query(sql,[data, id_paket], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully update packet where id = ${id_paket}.`,
                    data
                })
            }
        })        
    }
}