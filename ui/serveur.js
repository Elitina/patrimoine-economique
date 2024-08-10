const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
const port = 3001;

const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'data.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Parser les corps de requêtes JSON
app.use(cors());
app.use(express.json());

app.post('/submitData', (req, res) => {
  const data = req.body;
  console.log('Données reçues:', data);

  const fileUrl = `http://localhost:${port}/data/data.json`;
  res.json({ url: fileUrl });

  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier:', err);
    } else {
      console.log('Données enregistrées avec succès');
    }
  });
});

app.use('/data', express.static(dataDir));

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

