// Form reference
const form = {}
form.noteText = document.querySelector('#formNoteText');
form.addButton = document.querySelector('#formAddButton');
form.color = document.querySelector('#formColor');

const notes = document.querySelector('#notes');

loadNotesFromLocalStorage();
form.noteText.focus();

// Functions
function loadNotesFromLocalStorage() {
  const notesLS = localStorage['notesKeeper'];
  if (notesLS !== undefined && notesLS !== '') {
    const notesObj = JSON.parse(notesLS);
    if (Object.keys(notesObj).length > 0) {
      Object.keys(notesObj).forEach(id => {
        let note = document.createElement('div');
        let deleteButton = document.createElement('span');
        note.classList.add('note');
        note.classList.add(notesObj[id].color);
        note.innerHTML = `<div class='note-text'>${notesObj[id].text}</div>`;
        note.setAttribute('id', id);
        deleteButton.classList.add('note-delete');
        deleteButton.innerHTML = '&times;';

        note.appendChild(deleteButton);
        notes.appendChild(note);
        addListenerDeleteButton(deleteButton);
      });
    }
  }
}

function addNote() {
  let text = form.noteText.value;
  let note = document.createElement('div');
  let deleteButton = document.createElement('span');

  // local storage
  const notesLS = localStorage['notesKeeper'];
  let notesObj;
  if (notesLS == undefined || notesLS == '') {
    notesObj = {};
  } else {
    notesObj = JSON.parse(notesLS)
  }

  const id = uuidv4();
  note.classList.add('note');
  note.classList.add(form.color.value);
  note.innerHTML = `<div class='note-text'>${text}</div>`;
  note.setAttribute('id', id);
  deleteButton.classList.add('note-delete');
  deleteButton.innerHTML = '&times;';

  note.appendChild(deleteButton);  
  notes.appendChild(note);

  // add to localstorage
  notesObj[id] = {
    text: text,
    color: form.color.value
  };
  localStorage['notesKeeper'] = JSON.stringify(notesObj);

  form.noteText.value = '';
  form.noteText.focus();

  addListenerDeleteButton(deleteButton);
}

function addListenerDeleteButton(deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation();      
    deleteNote(e);
  });
}

function deleteNote(e) {
  let eventNote = e.target.parentNode;
  const id = e.target.parentNode.getAttribute('id');
  eventNote.parentNode.removeChild(eventNote);

  // local storage
  const notesLS = localStorage['notesKeeper'];
  if (notesLS !== undefined && notesLS !== '') {
    const notesObj = JSON.parse(notesLS);
    if (notesObj.hasOwnProperty(id)) {
      delete notesObj[id];
      localStorage['notesKeeper'] = JSON.stringify(notesObj);
    }
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Event Listeners
form.addButton.addEventListener('click', function (e) {
  e.preventDefault();  
  if (form.noteText.value != '') {
    addNote();
  }
})



