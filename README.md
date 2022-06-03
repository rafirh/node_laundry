# node_laundry

### Cara clone project

1. Buka cmd, tentukan directory untuk menyimpan repo ini. Kemudian ketikkan perintah ini:
```
git clone https://github.com/rafirh/node_laundry.git
```
  Perintah ini digunakan untuk meng-clone repository dari github ke repository local kita.

2. Masuk ke repository yang baru diclone dengan mengetikkan perintah ini:
```
cd node_laundry/
```	
Kemudian install dependencies-dependencies yang dibutuhkan dengan mengetikkan perintah ini:
```
npm install
```
3. Sebelum kita start server, import database laundry ke host local kita, contohnya phpmyadmin. Untuk mengimport kita harus membuat dulu database dengan nama db_laundry. Kemudian pilih opsi import, lalu upload file sql yang ada di repository node_laundry yang bernama db_laundry.sql.

4. Jika sudah berhasil import database, barulah kita start server dengan perintah:
```
npm start
```
  Jika sudah berhasil, kita dapat mengakses endpoint-endpointnya di postman.
