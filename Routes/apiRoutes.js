const fs = require('fs');
const express = require('express');
const notes = require('../db/db.json');

init();

module.exports = function(app) {
    //setup the get route
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    //setup post route
    app.post("/api/index", function(req, res) {
        req.body.id = parseInt(lastId);
        notes.push(req.body);
        fs.writeFileSync(notes);
        res.json(true);
    });

    //Show a note by ID
    app.get("/api/notes/:id", function(req, res) {
        res.json(notes[req.params.id]);
    });

    //Delete a note by ID
    app.delete("/api/index/:id", function(req, res) {
        var filteredNotes = notes.filter(note => note.id !== parseInt(req.params.id)); 
        fs.writeFileSync(filteredNotes);
        notes = filteredNotes;
        res.json(true);
    });
};

function init() {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) {
             throw err;
        }
        let notesJSON = JSON.parse(data);
        notesJSON.forEach(function (note) {
            notes.push(note);
        });
        astId = Math.max(...notes.map(obj => obj.id), 0) + 1;
    });
};

function writeToJsonFile(notes) {
    let notesJSON = JSON.stringify(notes, null, 2);
    fs.writeFileSync("./db/db.json", notesJSON, function (err) {
        if (err) {
            throw err;
         }
    });
};

