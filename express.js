const express = require('express');
const fetch = require('node-fetch'); // Menggunakan node-fetch versi 2
const app = express();
const port = 3000;

// Endpoint untuk mencari username Roblox
app.get('/', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.send(`
      <html>
        <head>
          <title>Cari Profil Roblox</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              width: 100%;
              max-width: 500px;
            }
            h2 {
              color: #333;
              margin-bottom: 20px;
            }
            form {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            input[type="text"] {
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              width: 100%;
              max-width: 400px;
              margin-bottom: 10px;
              box-sizing: border-box;
            }
            button {
              padding: 10px 20px;
              border: none;
              background-color: #007bff;
              color: #fff;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background-color 0.3s;
            }
            button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Cari Profil Roblox</h2>
            <form action="/" method="get">
              <input type="text" name="username" placeholder="Masukkan Username Roblox" required>
              <button type="submit">Cari</button>
            </form>
          </div>
        </body>
      </html>
    `);
  }

  try {
    // Fetch profil pengguna dari Roblox API
    const response = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const userInfo = data.data[0]; // Ambil pengguna pertama dari hasil pencarian

      // Fetch gambar avatar pengguna dari Roblox Avatar API
      const avatarResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userInfo.id}&size=150x150&format=Png`);
      const avatarData = await avatarResponse.json();
      const avatarUrl = avatarData.data[0].imageUrl;

      // Fetch jumlah pengikut dan teman
      const userDetailsResponse = await fetch(`https://users.roblox.com/v1/users/${userInfo.id}`);
      const userDetails = await userDetailsResponse.json();

      // Tampilkan hasil dalam format HTML
      res.send(`
        <html>
          <head>
            <title>Profil Roblox - ${userInfo.displayName}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                background-color: #f0f0f0;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              img {
                border-radius: 50%;
                width: 150px;
                height: 150px;
              }
              h1 {
                color: #333;
              }
              p {
                font-size: 18px;
                color: #666;
              }
              .button {
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 4px;
              }
              .button:hover {
                background-color: #0056b3;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="${avatarUrl}" alt="Avatar" />
              <h1>${userInfo.displayName}</h1>
              <p><strong>Nama Pengguna:</strong> ${userInfo.name}</p>
              <p><strong>ID Pengguna:</strong> ${userInfo.id}</p>
              <p><strong>Lencana Terverifikasi:</strong> ${userInfo.hasVerifiedBadge ? "Ya" : "Tidak"}</p>
              <p><strong>Pengikut:</strong> ${userDetails.followersCount || 0}</p>
              <p><strong>Teman:</strong> ${userDetails.friendsCount || 0}</p>
              <a href="/" class="button">Cari Pengguna Lain</a>
            </div>
          </body>
        </html>
      `);
    } else {
      res.send(`
        <p>Pengguna tidak ditemukan.</p>
        <style>
            p {
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 10vh;
            }
            a {
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            a {
  background-color: #4CAF50; /* Hijau */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

            h2 {
              color: #333;
              margin-bottom: 20px;
            }
            form {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            input[type="text"] {
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              width: 100%;
              max-width: 400px;
              margin-bottom: 10px;
              box-sizing: border-box;
            }
            button {
              padding: 10px 20px;
              border: none;
              background-color: #007bff;
              color: #fff;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background-color 0.3s;
            }
            button:hover {
              background-color: #0056b3;
            }
          </style>
          <center>
        <a href="/">Coba Lagi</a>
        <center>
      `);
    }
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

// Jalankan server di port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});