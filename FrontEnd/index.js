document.addEventListener("DOMContentLoaded", () => {

  const userNotesContainer = document.getElementById("userNotes")
  const sideBar = document.getElementById("sideBar")
  const noteForm = document.getElementById("createNoteForm")
  const deleteButton = document.querySelector(".deleteNote")
  const editFormContainer = document.getElementById("editForm")


  fetch('http://localhost:3000/api/v1/notes')
    .then((response) => {
      return response.json()
    })
    .then((notejsonObject) => {
      console.log(notejsonObject)

      notejsonObject.forEach((note) => {
        const newNote = new Note(note)
        sideBar.innerHTML += newNote.renderAll() //renders to the page
      })
    })

  sideBar.addEventListener('click', function(event) {
    if (event.target.tagName === 'P') { //all the tag names are capital
      console.log(event.target.id)

      fetch(`http://localhost:3000/api/v1/notes/${event.target.id}`)
        .then((response) => {
          return response.json()
        })
        .then((notejsonObject) => {
          const newNote = new Note(notejsonObject)
          userNotesContainer.innerHTML = newNote.render()
        })
    }
  })


  noteForm.addEventListener('submit', function(event) {
    const userNoteTitleInput = document.getElementById("noteTitle").value
    const userNoteBody = document.getElementById("noteBody").value

    fetch('http://localhost:3000/api/v1/notes', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: userNoteTitleInput,
        body: userNoteBody,
        user: {
          id: 1,
          name: "marissa"
        }
      })
    }).then((response) => {
      return response.json()
    }).then((notejsonObject) => {
      const newNote = new Note(notejsonObject)
      sideBar.innerHTML += newNote.renderAll()
    })
  }) // end of create fetch


  userNotesContainer.addEventListener("click", function(event) {
    if (event.target.innerText === "Delete") {
      fetch(`http://localhost:3000/api/v1/notes/${event.target.id}`, {
        method: "delete"
      })
      const deleteNoteDiv = document.getElementById(`${event.target.id}`)
      deleteNoteDiv.remove()

      const deleteNoteContainer = document.getElementById(`${event.target.id}`)
      deleteNoteContainer.remove()
    } else if (event.target.innerText === "Edit") {

      fetch(`http://localhost:3000/api/v1/notes/${event.target.id}`)
        .then((response) => {
          return response.json()

        }).then((notejsonObject) => {
          const newNote = new Note(notejsonObject)
          editFormContainer.innerHTML = newNote.renderForm()
        })

      console.log(editFormContainer)
      editFormContainer.addEventListener("click", function(event) {
          if (event.target.id === 'noteSubmitButton') {

            const newUserTitle = document.getElementById("editNoteTitle").value
            const newUserBody = document.getElementById("editNoteBody").value

            fetch(`http://localhost:3000/api/v1/notes/${event.target.dataset.id}`, {
              method: "PATCH",
              headers: {
                "Accept": 'applicaton/json',
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({ //parsing
                title: newUserTitle,
                body: newUserBody
              })
            }).then((response) => {
              return response.json()

            }).then(data => {
              const newNote = new Note(data)
              const linkToUpdate = document.getElementById(newNote.id)
              linkToUpdate.innerHTML = `<p id="${newNote.id}">${newNote.title}</p>`
              const formToDelete = document.querySelector(".editNoteForm").remove()
              document.querySelector(`#render-${newNote.id}`).remove()
            })
          }
        })
    }

  })









}) //end of DOMCONTENTLOADED
