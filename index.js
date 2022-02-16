const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/laundry", (req,res) => {
    res.send({
        message: "Selamat datang di Aplikasi Laundry."
    })
})

app.use("/laundry/outlet", require("./routes/outlet.router"))
// app.use("/laundry/user", require("./routes/user.router"))
// app.use("/laundry/paket", require("./routes/paket_cuci.router"))
// app.use("/laundry/pelanggan", require("./routes/pelanggan.router"))
// app.use("/laundry/transaksi", require("./routes/transaksi.router"))
// app.use("/laundry/detail-transaksi", require("./routes/detail_transaksi.router"))

db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Mysql Connected")
    }
})

app.listen(8080, () => {
    console.log(`Server 8080`);
});


