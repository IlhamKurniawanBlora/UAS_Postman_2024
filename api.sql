-- Buat database baru
CREATE DATABASE mahasiswa_db;

-- Gunakan database yang baru dibuat
USE mahasiswa_db;

-- Buat tabel mahasiswa
CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    prodi VARCHAR(100) NOT NULL,
    universitas VARCHAR(100) NOT NULL,
    deskripsi TEXT
);

-- Insert 10 data ke dalam tabel mahasiswa
INSERT INTO mahasiswa (nama, prodi, universitas, deskripsi) VALUES
('Ilham Kurniawan', 'Informatika', 'Universitas Nahdlatul Ulama Yogyakarta', 'Mahasiswa Informatika dengan minat pada pengembangan web dan kecerdasan buatan.'),
('Ahmad Santoso', 'Teknik Mesin', 'Universitas Gadjah Mada', 'Mahasiswa Teknik Mesin dengan fokus pada mekanika dan robotika.'),
('Budi Hartono', 'Sistem Informasi', 'Institut Teknologi Bandung', 'Mahasiswa Sistem Informasi dengan minat pada analisis data dan manajemen proyek IT.'),
('Chandra Wijaya', 'Teknik Elektro', 'Universitas Indonesia', 'Mahasiswa Teknik Elektro dengan ketertarikan pada sistem tenaga listrik dan elektronik.'),
('Dewi Sartika', 'Teknik Kimia', 'Universitas Diponegoro', 'Mahasiswa Teknik Kimia yang fokus pada penelitian bahan kimia dan proses industri.'),
('Eko Prasetyo', 'Arsitektur', 'Universitas Brawijaya', 'Mahasiswa Arsitektur dengan minat pada desain bangunan dan arsitektur hijau.'),
('Fajar Setiawan', 'Teknik Sipil', 'Universitas Sebelas Maret', 'Mahasiswa Teknik Sipil yang tertarik pada pembangunan infrastruktur dan perencanaan kota.'),
('Gita Permata', 'Teknik Lingkungan', 'Universitas Airlangga', 'Mahasiswa Teknik Lingkungan dengan fokus pada pengelolaan limbah dan konservasi lingkungan.'),
('Hadi Saputra', 'Teknik Informatika', 'Institut Teknologi Sepuluh Nopember', 'Mahasiswa Teknik Informatika dengan minat pada pengembangan perangkat lunak dan keamanan siber.'),
('Indah Lestari', 'Biologi', 'Universitas Padjadjaran', 'Mahasiswa Biologi yang tertarik pada penelitian genetika dan konservasi satwa.');

-- Verifikasi data yang telah dimasukkan
SELECT * FROM mahasiswa;
