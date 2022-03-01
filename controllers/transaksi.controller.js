const db = require("../db");
//$kode = "CLN" . date('Ymdsi');
//CLN202202194337
//CLN202202272722



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
        date2.setDate(date2.getDate() + 7);
        let y2 = date2.getFullYear();
        let m2 = ("0" + (date2.getMonth() + 1)).slice(-2);
        let d2 = ("0" + date2.getDate()).slice(-2);
        let batas_waktu = `${y2}-${m2}-${d2} ${h}:${i}:${s}`;

        let data1 = {
            outlet_id: req.body.outlet_id,
            id_pelanggan: req.body.id_pelanggan,
            id_user: req.body.id_user,
            kode_invoice: kode_invoice,
            tgl: tgl,
            batas_waktu: batas_waktu,
            diskon: req.body.diskon,
            biaya_tambahan: req.body.biaya_tambahan,
            pajak: req.body.pajak,
            status: "baru",
            status_bayar: "belum"
        }
        let sql1 = "INSERT INTO transaksi SET ?";
        db.query(sql1,data1, (err,result) => {
            if(err){
                throw err;
            }else{
                let sql2 = "SELECT * FROM paket_cuci WHERE id_paket = ?";
                db.query(sql2,req.body.id_paket, (err,result) => {
                    if(err){
                        throw err;
                    }else{
                        let harga = result[0].harga;
                        let sql4 = "SELECT * FROM transaksi WHERE kode_invoice = ?";
                        db.query(sql4,kode_invoice, (err,result) => {
                            if(err){
                                throw err;
                            }else{
                                let total_harga = harga * req.body.qty;
                                let data2 = {
                                    id_transaksi: result[0].id_transaksi,
                                    id_paket: req.body.id_paket,
                                    qty: req.body.qty,
                                    total_harga: total_harga,
                                    keterangan: req.body.keterangan
                                }
                                let sql3 = "INSERT INTO detail_transaksi SET ?";
                                db.query(sql3,data2, (err,result) => {
                                    if(err){
                                        throw err;
                                    }else{
                                        res.json({
                                            message: "Data transaction inserted successfully."
                                        })
                                    }
                                })
                            }
                        })    
                    }
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