const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let notes = [];
let id = 0;

app.get('/api/notes', (req, res) => {
    res.send(notes);
});

app.post('/api/notes', (req, res) => {
    id = id + 1;
    let datetime = new Date();
    let note = {id:id, text:req.body.text, important:req.body.important};
    notes.push(note);
    res.send(note);
});

app.put('/api/notes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let blogMap = notes.map(note => { return note.id; });
    let index = blogMap.indexOf(id);
    let note = notes[index];
    let datetime = new Date();
    note.important = req.body.important;
    note.text = req.body.text;
    console.log(datetime);
    console.log(note);
    console.log(req.body);
    res.send(note);
});

app.delete('/api/notes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = notes.map(note => { return note.id; }).indexOf(id);
    if (removeIndex === -1) {
	res.status(404).send("Sorry, that note doesn't exist");
	return;
    }
    notes.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.listen(8000, () => console.log('Server listening on port 8000!'))
