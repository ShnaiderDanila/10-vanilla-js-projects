const notesContainer = document.querySelector('.notes-app__notes');
const createBtn = document.querySelector('.notes-app__create-button');
const noteTemplate = document.getElementById('note-template').content;

function showNotes() {
  const notes = localStorage.getItem('notes');
  notesContainer.innerHTML = notes;
}

function updateLocalStorage() {
  localStorage.setItem('notes', notesContainer.innerHTML);
}

createBtn.addEventListener('click', () => {
  const note = noteTemplate.querySelector('.notes-app__note').cloneNode(true);
  notesContainer.append(note);
  updateLocalStorage()
})

notesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('notes-app__delete-icon')) {
    e.target.parentElement.remove();
    updateLocalStorage()
  } 
  else if(e.target.classList.contains('notes-app__input-box')) {
    e.target.onkeyup = function() {
      e.target.textContent = e.target.value;
      updateLocalStorage();
    }
  }
})

showNotes();