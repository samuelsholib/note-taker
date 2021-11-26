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
app.get('/', (req, res) => {
    res.sendFile(path.json(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.json(__dirname, './public/index.html'));
});

function writeNotes(body, notesArray) {
    const newNotes = body;


}