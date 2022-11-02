const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("../helper/uuid")


router.get("/notes", ( req, res) => {  //get route
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))
    console.log(typeof savedNotes)
    res.status(200).json(savedNotes) 
});

router.post("/notes", (req, res) => {  //Post route

    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")) //reads db.JSON and converts it into an object
    let newNote = {  //creates new object from request object and adds id value.
        title: req.body.title,
        text: req.body.text,
        id: uuid() //automatically generates unique id
    }

    savedNotes.push(newNote)  //pushes new object into savedNotes
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(savedNotes))
    res.status(200).json(savedNotes)

    });
router.delete("/notes/:id", ( req, res) => { //delete route
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))
    const filteredNotes = savedNotes.filter(note => note.id !== req.params.id) //creates new object out of notes without the id of the deleted note.
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes))
    console.log(filteredNotes)
    res.status(200).json(filteredNotes) 
});


module.exports = router