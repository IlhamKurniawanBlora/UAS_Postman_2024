// Logika JavaScript untuk mengambil data, menampilkan data, menambah, mengubah, dan menghapus data menggunakan API

    // Base URL API
    const baseURL = 'http://localhost:3000/mahasiswa';

    // Fungsi untuk mengambil semua data mahasiswa
    const fetchAllMahasiswa = async () => {
      try {
        const response = await fetch(`${baseURL}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fungsi untuk menampilkan semua data mahasiswa
    const showAllMahasiswa = async () => {
      const allMahasiswaList = document.getElementById('allMahasiswaList');
      const mahasiswaData = await fetchAllMahasiswa();

      // Bersihkan data sebelum menampilkan hasil baru
      allMahasiswaList.innerHTML = '';

      // Tampilkan data mahasiswa
      mahasiswaData.forEach((mahasiswa) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>ID:</strong> ${mahasiswa.id}, <strong>Nama:</strong> ${mahasiswa.nama}, <strong>Prodi:</strong> ${mahasiswa.prodi}, <strong>Universitas:</strong> ${mahasiswa.universitas}, <strong>Deskripsi:</strong> ${mahasiswa.deskripsi}`;
        allMahasiswaList.appendChild(listItem);
      });
    };

    // Panggil fungsi untuk menampilkan semua data mahasiswa saat halaman dimuat
    showAllMahasiswa();

    // Fungsi untuk menampilkan data mahasiswa berdasarkan ID
    const fetchDataById = async (id) => {
      try {
        const response = await fetch(`${baseURL}/${id}`);
        const data = await response.json();
        return data[0];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fungsi untuk menampilkan hasil pemilihan data berdasarkan ID
    const showSelectedData = async (id) => {
      const data = await fetchDataById(id);
      const mahasiswaData = document.getElementById('mahasiswaData');

      // Bersihkan data sebelum menampilkan hasil baru
      mahasiswaData.innerHTML = '';

      // Tampilkan data mahasiswa
      if (data) {
        console.log(data);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Nama:</strong> ${data.nama}, <strong>Prodi:</strong> ${data.prodi}, <strong>Universitas:</strong> ${data.universitas}, <strong>Deskripsi:</strong> ${data.deskripsi}`;
        mahasiswaData.appendChild(listItem);
      } else {
        const messageItem = document.createElement('li');
        messageItem.textContent = 'Data tidak ditemukan.';
        mahasiswaData.appendChild(messageItem);
      }
    };

    // Event listener untuk form pemilihan data berdasarkan ID
    const selectForm = document.getElementById('selectForm');
    selectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('idSelect').value;
      showSelectedData(id);
    });

    // Fungsi untuk menambah atau mengubah data mahasiswa
    document.addEventListener("DOMContentLoaded", function() {
      const mahasiswaForm = document.getElementById("mahasiswaForm");
      const toggleButton = document.getElementById("toggleButton");
      const formTitle = document.getElementById("formTitle");
      const submitButton = document.getElementById("submitButton");
      const searchForm = document.getElementById("searchForm");
      const searchButton = document.getElementById("searchButton");
    
      let isEditMode = false;
    
      toggleButton.addEventListener("click", function() {
        isEditMode = !isEditMode;
    
        if (isEditMode) {
          formTitle.innerText = "Ubah Data Mahasiswa:";
          submitButton.innerText = "Update";
          toggleButton.innerText = "Tambah Data Mahasiswa";
          searchForm.style.display = "block";
        } else {
          formTitle.innerText = "Tambah Data Mahasiswa:";
          submitButton.innerText = "Simpan";
          toggleButton.innerText = "Ubah Data Mahasiswa";
          searchForm.style.display = "none";
          mahasiswaForm.reset();
        }
      });
    
      searchButton.addEventListener("click", function() {
        const searchId = document.getElementById("searchId").value;
        if (searchId) {
          // Implementasi logika pencarian mahasiswa berdasarkan ID
          // Contoh: Mengambil data dari server menggunakan fetch API
          fetch(`http://localhost:3000/mahasiswa/${searchId}`)
            .then(response => response.json())
            .then(data => {
              console.log(data); // Menampilkan data di console
      
              // Asumsikan data adalah array dan kita ingin mengambil elemen pertama
              if (data && data.length > 0) {
                const mahasiswa = data[0];
      
                document.getElementById("nama").value = mahasiswa.nama;
                document.getElementById("prodi").value = mahasiswa.prodi;
                document.getElementById("universitas").value = mahasiswa.universitas;
                document.getElementById("deskripsi").value = mahasiswa.deskripsi;
              } else {
                console.error('Data tidak ditemukan atau data kosong');
              }
            })
            .catch(error => console.error('Error:', error));
        }
      });
    
      mahasiswaForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(mahasiswaForm);
        const data = Object.fromEntries(formData.entries());
    
        if (isEditMode) {
          const searchId = document.getElementById("searchId").value;
          fetch(`http://localhost:3000/mahasiswa/${searchId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.text()) // Menggunakan text() untuk melihat seluruh respons
          .then(text => {
            console.log('Raw response:', text); // Logging respons mentah
            alert('Data berhasil diupdate');
            console.log(data); // Tambahkan ini jika Anda ingin melihat data yang diupdate di console
            mahasiswaForm.reset();
            searchForm.reset();
            showAllMahasiswa();
          })
          .catch(error => console.error('Fetch error:', error));
        } else {
          fetch('http://localhost:3000/mahasiswa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.text()) // Menggunakan text() untuk melihat seluruh respons
          .then(text => {
            console.log('Raw response:', text); // Logging respons mentah
            let data;
            alert('Data berhasil disimpan');
            console.log(data); // Tambahkan ini jika Anda ingin melihat data yang disimpan di console
            mahasiswaForm.reset();
            searchForm.reset();
            showAllMahasiswa();
          })
          .catch(error => console.error('Fetch error:', error));
        }

      });
    });

   

    // Fungsi untuk menghapus data mahasiswa berdasarkan ID
    const deleteDataById = async (id) => {
      try {
        const response = await fetch(`${baseURL}/${id}`, {
          method: 'DELETE',
        });

        const result = await response.text();
        alert(result);

        // Refresh tampilan semua data setelah menghapus data
        showAllMahasiswa();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Event listener untuk form hapus data mahasiswa
    const deleteForm = document.getElementById('deleteForm');
    deleteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('idDelete').value;
      deleteDataById(id);

      // Membersihkan form setelah submit
      deleteForm.reset();
    });
