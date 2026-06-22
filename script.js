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
    noteList.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");

        div.innerText = note.title.trim() === "" ? "New Note" : note.title;
        div.classList.add("note-item");

        if (note.id === currentNoteId) {
            div.classList.add("active");
        }

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

    const items = noteList.querySelectorAll('.note-item');
    notes.forEach((n, idx) => {
        if(items[idx]) {
            if (n.id === id) items[idx].classList.add('active');
            else items[idx].classList.remove('active');
        }
    });
}

function saveNotes() {
    localStorage.setItem("hexa_notes", JSON.stringify(notes));
}

noteTitle.addEventListener("input", () => {
    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    note.title = noteTitle.value;
    saveNotes();
    
    const activeItem = noteList.querySelector('.note-item.active');
    if (activeItem) {
        activeItem.innerText = noteTitle.value.trim() === "" ? "New Note" : noteTitle.value;
    }
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

    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hide-loader');
    }, 2200);
}

init();