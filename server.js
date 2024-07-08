const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(cors()); // Mengizinkan semua origin untuk mengakses API

// Middleware untuk parsing body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mahasiswa_db'
});

// Koneksi ke database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Endpoint untuk mendapatkan semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
  let sql = 'SELECT * FROM mahasiswa';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Endpoint untuk mendapatkan mahasiswa berdasarkan ID
app.get('/mahasiswa/:id', (req, res) => {
  const id = req.params.id;
  let sql = `SELECT * FROM mahasiswa WHERE id = ${db.escape(id)}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Endpoint untuk menambahkan data mahasiswa baru
app.post('/mahasiswa', (req, res) => {
  const { nama, prodi, universitas, deskripsi } = req.body;
  let sql = `INSERT INTO mahasiswa (nama, prodi, universitas, deskripsi) VALUES (${db.escape(nama)}, ${db.escape(prodi)}, ${db.escape(universitas)}, ${db.escape(deskripsi)})`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Data mahasiswa telah ditambahkan.');
  });
});

// Endpoint untuk mengupdate data mahasiswa berdasarkan ID
app.put('/mahasiswa/:id', (req, res) => {
  const id = req.params.id;
  const { nama, prodi, universitas, deskripsi } = req.body;
  let sql = `UPDATE mahasiswa SET nama = ${db.escape(nama)}, prodi = ${db.escape(prodi)}, universitas = ${db.escape(universitas)}, deskripsi = ${db.escape(deskripsi)} WHERE id = ${db.escape(id)}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(`Data mahasiswa dengan ID ${id} telah diupdate.`);
  });
});

// Endpoint untuk menghapus data mahasiswa berdasarkan ID
app.delete('/mahasiswa/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM mahasiswa WHERE id = ${db.escape(id)}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(`Data mahasiswa dengan ID ${id} telah dihapus.`);
  });
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
