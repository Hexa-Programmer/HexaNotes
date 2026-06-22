// script.js

//Hidden Pages:

//Variables:
const notes_btn = document.getElementById("notes_btn");
const noteBox = document.getElementById("noteBox");
const noteTitle = document.getElementById("noteTitle")



noteBox.value = localStorage.getItem("hexa_notes") || "";

noteBox.addEventListener("input", function () {
    localStorage.setItem("hexa_notes", noteBox.value);
});

noteTitle.value = localStorage.getItem("hexa_note_title") || "";

noteTitle.addEventListener("input", function () {
    localStorage.setItem("hexa_note_title", noteTitle.value);
});