const { v4: uuidv4 } = require('uuid');

// ...

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notesData = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  newNote.id = uuidv4(); // Generate a unique ID

  notesData.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notesData));

  res.json(newNote);
});
