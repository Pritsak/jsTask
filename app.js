const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');


let lastId = 100;

function getNextId () {
    lastId += 1;
    return lastId;
}

const notes = [
    {
        id: 1,
        title: 'Monday',
        description: 'Watch film',
        date: null
    },
    {
        id: 2,
        title: 'Tuesday',
        description: 'Play fortnite',
        date: null 
    },
    {
        id: 3,
        title: 'Wensday',
        description: 'Buy coffe',
        date: null 
    },
    {
        id: 4,
        title: 'Thursday',
        description: 'Play football',
        date: null 
    },
    {
        id: 5,
        title: 'Friday',
        description: 'Go to swimingpool',
        date: null 
    },
    {
        id: 6,
        title: 'Monday',
        description: 'Start to look for a job',
        date: null 
    }];

function createNote () {
    addNote(
        {
            id: getNextId(),
            title: 'Name',
            description: 'Text',
            date: null 
        }
    );
};

function displayNotes(notes) {
    notes.map(el => {
        addNote(el);
    });
};

displayNotes(notes);

function addNote (el) {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.innerHTML = `
    <div id="note-${el.id}">
        <div class="note-header">
            <p id="note-title-${el.id}">${el.title}</p>
            <textarea id="note-title-input-${el.id}" class="hidden" placeholder="Name"></textarea>
            <div>
                <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        <p id="note-text-${el.id}">${el.description}</p>
        <textarea type="text" id="note-textarea-${el.id}" class="note-textarea-style hidden" placeholder="Write something..."></textarea>
        <div class="archive-note">
            <button class="note-archive"><i class="fa-solid fa-box-archive"></i></button>
            <button class="note-save"><i class="fa-solid fa-circle-check"></i></button>
        </div>
        <div class="note-calendar">
            <input class="date" type="date" id="date-${el.id}">
        </div>
    </div>
    `
    
    const editBtn = noteEl.querySelector('.note-edit');
    editBtn.addEventListener('click', (e) => {
        document.getElementById(`note-title-input-${el.id}`).style.display === 'block'?
        document.getElementById(`note-title-input-${el.id}`).style.display = 'none': 
        document.getElementById(`note-title-input-${el.id}`).style.display = 'block'

        document.getElementById(`note-title-${el.id}`).style.display === 'none'?
        document.getElementById(`note-title-${el.id}`).style.display = 'block': 
        document.getElementById(`note-title-${el.id}`).style.display = 'none' 
        
        document.getElementById(`note-text-${el.id}`).style.display === 'none'?
        document.getElementById(`note-text-${el.id}`).style.display = 'block': 
        document.getElementById(`note-text-${el.id}`).style.display = 'none'  

        document.getElementById(`note-textarea-${el.id}`).style.display === 'block'?
        document.getElementById(`note-textarea-${el.id}`).style.display = 'none': 
        document.getElementById(`note-textarea-${el.id}`).style.display = 'block'
    });

    const deleteBtn = noteEl.querySelector('.note-delete');
    deleteBtn.addEventListener('click', (e) => {
        noteEl.remove();
    });
    notesEl.appendChild(noteEl);
    
    const selectBtn = noteEl.querySelector('.note-save');
    selectBtn.addEventListener('click', (e) => {
        document.getElementById(`note-title-${el.id}`).innerHTML = document.getElementById(`note-title-input-${el.id}`).value

        document.getElementById(`note-text-${el.id}`).innerHTML = document.getElementById(`note-textarea-${el.id}`).value 

        document.getElementById(`date-${el.id}`).innerHTML = document.getElementById(`date-${el.id}`).value 
    });

    const archieveBtn = noteEl.querySelector('.note-archive');
    archieveBtn.addEventListener('click', (e) => {
        const table = document.getElementById('archive');
        var row = table.insertRow(1);
        row.insertCell(0).innerHTML = el.id

        const title = row.insertCell(1) 
        title.setAttribute('id', `title-record-${el.id}`)
        title.innerHTML = document.getElementById(`note-title-${el.id}`).innerHTML

        const text = row.insertCell(2) 
        text.innerHTML = document.getElementById(`note-text-${el.id}`).innerHTML

        const date = row.insertCell(3) 
        date.innerHTML = document.getElementById(`date-${el.id}`).value

        row.insertCell(4).innerHTML = `
        <div class="archieve-container">
            <button class="note-archive-button">
                <i class="fa-solid fa-box-archive"></i>
            </button>
            <button onclick="deleteFromArchive(this)" class="note-delete-button">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `

        const archiveBtn = document.querySelector('.note-archive-button');

        archiveBtn.addEventListener('click', (e) => {
            addNote({
            id: el.id,
            title: title.innerHTML,
            description: text.innerHTML,
            date: new Date(date.innerHTML)
            })

            document.getElementById(`title-record-${el.id}`).parentElement.remove()
        });

        noteEl.remove();
    }); 
    notesEl.appendChild(noteEl); 
}



addBtn.addEventListener('click', (e) => {
    createNote();
});

function deleteFromArchive(e) {
    console.log(e)
    var row = e.parentNode.parentNode.parentNode;
    row.parentNode.removeChild(row);
};

function getElementById(id) {
    return document.getElementById(id);
}