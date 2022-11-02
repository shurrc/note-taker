const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("../helper/uuid")
const utils = require("../helper/fsUtils")

router.get("/notes", ( req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))
    console.log(typeof savedNotes)
    res.status(200).json(savedNotes) 
});
//req.body to create new object push object into savednotes
router.post("/notes", (req, res) => {

    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    }

    savedNotes.push(newNote)
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(savedNotes))
    console.log(req.body)
    res.status(200).json(savedNotes)
    console.log(savedNotes)

    });
router.delete("/notes/:id", ( req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))
    const filteredNotes = savedNotes.filter(note => note.id !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes))
    console.log(filteredNotes)
    res.status(200).json(filteredNotes) 
});


module.exports = router