const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const express = require('express');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//setting routes for api
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// post functions to add new notes to db.json
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
});

// delete function to delete notes by id
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = note.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
});
//CallS HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.listen(PORT, () => {
    console.log("app listening on" + PORT);
});