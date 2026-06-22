// script.js

//Hidden Pages:

//Variables:
let saved = localStorage.getItem("hexa_notes");

let notes = [];

try {
    notes = saved ? JSON.parse(saved) : [];
} catch (e) {
    notes = [];
}

let currentNoteId = null;

const noteList = document.getElementById("notesList");
const noteBox = document.getElementById("noteBox");
const noteTitle = document.getElementById("noteTitle"); 

function createNote() {
    const newNote = {
        id: Date.now(),
        title: "New Note",
        content: ""
    };

    notes.push(newNote);
    saveNotes();
    renderNotes();
    openNote(newNote.id);
}

function renderNotes() {
    noteList.innerHTML = "<h2>Hexa Notes</h2><button onclick=\"createNote()\">New Note</button>";

    notes.forEach(note => {
        const div = document.createElement("div");

        div.innerText = note.title;
        div.classList.add("note-item");

        div.onclick = () => openNote(note.id);

        noteList.appendChild(div);
    });
}

function openNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    currentNoteId = id;

    noteTitle.value = note.title;
    noteBox.value = note.content;
}

function saveNotes() {
    localStorage.setItem("hexa_notes", JSON.stringify(notes));
}

noteTitle.addEventListener("input", () => {
    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    note.title = noteTitle.value;
    saveNotes();
    renderNotes();
});

noteBox.addEventListener("input", () => {
    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    note.content = noteBox.value;
    saveNotes();
});

function init() {
    renderNotes();

    if (notes.length > 0) {
        openNote(notes[0].id);
    } else {
        const newNote = {
            id: Date.now(),
            title: "New Note",
            content: ""
        };

        notes.push(newNote);
        saveNotes();
        renderNotes();
        openNote(newNote.id);
    }
}

init();