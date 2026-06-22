// script.js

//Hidden Pages:
document.getElementById("notes").style.display = "none";

//Variables:
const notes_btn = document.getElementById("notes_btn");
const noteBox = document.getElementById("noteBox");
const noteTitle = document.getElementById("noteTitle")

//Notes:
notes_btn.addEventListener("click", function () {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("notes").style.display = "block";
});

noteBox.value = localStorage.getItem("hexa_notes") || "";

noteBox.addEventListener("input", function () {
    localStorage.setItem("hexa_notes", noteBox.value);
});

noteTitle.value = localStorage.getItem("hexa_note_title") || "";

noteTitle.addEventListener("input", function () {
    localStorage.setItem("hexa_note_title", noteTitle.value);
});