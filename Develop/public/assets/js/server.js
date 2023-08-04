
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(notesData);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notesData = JSON.parse(fs.readFileSync('db.json', 'utf8'));


  newNote.id = generateUniqueId();

  notesData.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notesData));

  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});



// ...

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notesData = JSON.parse(fs.readFileSync('db.json', 'utf8'));

  newNote.id = uuidv4();

  notesData.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notesData));

  res.json(newNote);
});
