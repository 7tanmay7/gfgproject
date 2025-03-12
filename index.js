const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory notes data
let notes = [
    { id: "1", title: "Meeting Notes", description: "Project roadmap discussion" },
    { id: "2", title: "Shopping List", description: "Buy groceries" }
];

// Update a note by ID
app.put('/notes', (req, res) => {
    const { id, title, description } = req.body;
    const note = notes.find(n => n.id === id);
    
    if (note) {
        note.title = title || note.title;
        note.description = description || note.description;
        res.status(200).json({ message: "Note updated successfully" });
    } else {
        res.status(404).json({ error: "Note not found" });
    }
});

// Delete a note by ID
app.delete('/notes', (req, res) => {
    const { id } = req.body;
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        res.status(200).json({ message: "Note deleted successfully" });
    } else {
        res.status(404).json({ error: "Note not found" });
    }
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});