const express = require("express");
const db = require("./db");
const app = express();
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
);

app.get("/laundry", (req,res) => {
    res.send({
        message: "Selamat datang di Aplikasi Laundry."
    })
})

app.use("/laundry", require("./routes/auth.router"))
app.use("/laundry/user", require("./routes/user.router"))
app.use("/laundry/outlet", require("./routes/outlet.router"))
app.use("/laundry/paket", require("./routes/paket_cuci.router"))
app.use("/laundry/pelanggan", require("./routes/pelanggan.router"))
app.use("/laundry/transaksi", require("./routes/transaksi.router"))

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





