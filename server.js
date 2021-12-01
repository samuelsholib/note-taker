const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const writeNote = require('./db/db.json');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(writeNote.slice(1));
});
// calls to get HTML files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function writeNotes(body, notesArray) {
    const newNotes = body;

    if (!Array.isArray(notesArray))
        notesArray = [];
    body.id = notesArray[0]
    notesArray[0]++;

    notesArray.push(newNotes);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNotes;
}

app.post('/api/notes', (req, res) => {
    const newNote = writeNotes(req.body, writeNote);
    res.json(newNote);
});

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }

}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, writeNote);
    res.json(true);
});

app.listen(PORT, () => {
    console.log('');
});