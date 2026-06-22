// script.js

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
const appContainer = document.getElementById("appContainer");

function createNote() {
    const newNote = {
        id: Date.now(),
        title: "New Note",
        content: ""
    };

    notes.push(newNote);
    saveNotes();
    renderNotes();
    openNote(newNote.id, true); 
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

        div.onclick = () => openNote(note.id, true);

        noteList.appendChild(div);
    });
}

function openNote(id, isUserAction = false) {
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

    if (isUserAction && window.innerWidth <= 768) {
        appContainer.classList.add('note-open');
    }
}

function closeNote() {
    appContainer.classList.remove('note-open');
}

function deleteNote() {
    if (!currentNoteId) return;

    // Small prompt to prevent accidental deletions
    if (!confirm("Are you sure you want to delete this note?")) return;

    // Filter out the active note
    notes = notes.filter(n => n.id !== currentNoteId);
    saveNotes();

    // If on mobile, slide back out of the editor view automatically
    if (window.innerWidth <= 768) {
        closeNote();
    }

    // Refresh UI and open the next available note
    renderNotes();
    
    if (notes.length > 0) {
        openNote(notes[0].id, false);
    } else {
        createNote(); // Generate a blank slate if the user deleted their last note
    }
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
        openNote(notes[0].id, false); 
    } else {
        const newNote = {
            id: Date.now(),
            title: "New Note",
            content: ""
        };

        notes.push(newNote);
        saveNotes();
        renderNotes();
        openNote(newNote.id, false);
    }

    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hide-loader');
    }, 2200);
}

init();