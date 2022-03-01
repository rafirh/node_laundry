const db = require("../db");
//$kode = "CLN" . date('Ymdsi');
//CLN202202194337
//CLN202202272722
let date = new Date();
let y = date.getFullYear();
let m = ("0" + (date.getMonth() + 1)).slice(-2);
let d = ("0" + date.getDate()).slice(-2);
let h = ("0" + date.getHours()).slice(-2);
let s = ("0" + date.getSeconds()).slice(-2);
let i = ("0" + date.getMinutes()).slice(-2);
let kode_invoice = `CLN${y}${m}${d}${s}${i}`;
let tgl = `${y}-${m}-${d} ${h}:${i}:${s}`;

const date2 = new Date();
d.setDate(date2.getDate() + 7);
let y2 = date2.getUTCFullYear();
let m2 = date.getUTCMonth();
let d2 = date.getUTCDay();
let batas_waktu = `${y2}-${m2}-${d2}`;
console.log(batas_waktu);


module.exports = {
    displayAllData: (req,res) => {
        let sql = "SELECT transaksi.*, detail_transaksi.* from transaksi join detail_transaksi on transaksi.id_transaksi = detail_transaksi.id_transaksi";
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
    displayAllData2: (req,res) => {
        let sql = "SELECT transaksi.kode_invoice, transaksi.tgl, transaksi.tgl_pembayaran, transaksi.status, transaksi.status_bayar, detail_transaksi.total_harga, pelanggan.nama_pelanggan, outlet.nama_outlet, user.nama_user FROM transaksi JOIN detail_transaksi ON transaksi.id_transaksi = detail_transaksi.id_transaksi JOIN pelanggan ON transaksi.id_pelanggan = pelanggan.id_pelanggan JOIN outlet ON transaksi.outlet_id = outlet.id_outlet JOIN user ON transaksi.id_user = user.id_user";
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
        let sql = "select transaksi.*,detail_transaksi.* from transaksi join detail_transaksi on transaksi.id_transaksi = detail_transaksi.id_transaksi where transaksi.id_transaksi = ?";
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
        let transaksi;
        let data1 = {
            outlet_id: req.body.outlet_id,
            id_pelanggan: req.body.id_pelanggan,
            id_user: req.body.id_user,
            kode_invoice: kode_invoice,
            tgl: req.body.tgl,
            tgl_pembayaran: req.body.tgl_pembayaran,
            batas_waktu: req.body.batas_waktu,
            diskon: req.body.diskon,
            biaya_tambahan: req.body.biaya_tambahan,
            pajak: req.body.pajak,
            status: req.body.status,
            status_bayar: req.body.status_bayar
        }
        let data2 = {
            id_transaksi: transaksi.id_transaksi,
            id_paket: req.body.id_paket,
            qty: req.body.qty,
            total_harga: req.body.total_harga,
            keterangan: req.body.keterangan
        }
        let sql1 = "INSERT INTO transaksi SET ?";
        db.query(sql1,data1, (err,result) => {
            if(err){
                throw err;
            }else{
                transaksi = result;
            }
        })
        setTimeout(() => {
            let sql2 = "INSERT INTO detail_transaksi SET ?";
            db.query(sql2,data2, (err,result) => {
                if(err){
                    throw err;
                }else{
                    res.json({
                        message: "Data has been added.",
                        data: transaksi + result
                    })
                }
            })
        }, 1000);
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