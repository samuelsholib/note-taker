const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();

const writeNote = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(writeNote.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.json(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.json(__dirname, './public/index.html'));
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
    console.log('generate');
});