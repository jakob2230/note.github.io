const addBox = document.querySelector(".addbox"),
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addbtn = popupBox.querySelector("button ");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];  

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
   
addBox.addEventListener("click", () =>{
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () =>{
    titleTag.value ="";
    descTag.value ="";
    addbtn.innerText = "Add a Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description.replace(/\\n/g, '<br>')}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="setting">
                                <i onclick= "showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                <li onclick= "updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pencil"></i>edit</li>
                                <li onclick= "deleteNote(${index})"><i class="fa-solid fa-trash"></i>delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        // remove note from settings
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    notes.splice(noteId,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    addBox.click();
    titleTag.value =title;
    descTag.value =desc;
    addbtn.innerText = "Update Note";
    popupTitle.innerText = "Update Note";
    notes.splice(noteId,1);
}

addbtn.addEventListener("click", e =>{
    e.preventDefault();
    let noteTitle= titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date();
        month = months[dateObj.getMonth()];
        day = dateObj.getDate();
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc.replace(/\n/g,'\\n'),
            date: `${month} ${day}, ${year}`
          }

        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }   
});