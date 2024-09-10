// Configurazione di Multer per l'upload dei file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // nome del file è il timestamp (data)
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Endpoint per l'upload della foto
  app.post('/upload', upload.single('photo'), (req, res) => {
    const photoPath = req.file.path; // Ottieni il percorso del file caricato
    const photoName = req.file.filename; // Ottieni il nome del file caricato
  
    // Query SQL per salvare il percorso nel database
    const sql = 'INSERT INTO Galleria (NomeFoto, PercorsoFoto) VALUES (?, ?)';
    db.query(sql, [photoName, photoPath], (err, result) => {
      if (err) throw err;
      res.send('File caricato e percorso salvato nel database!');
    });
  });