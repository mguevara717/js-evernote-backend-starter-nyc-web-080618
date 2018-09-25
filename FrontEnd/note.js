class Note {
  constructor(notejsonObject) {
    this.id = notejsonObject.id
    this.title = notejsonObject.title
    this.body = notejsonObject.body
    this.user = notejsonObject.user //nested hash
  }

  render() {
    const newBody = this.body.replace("\\n", '<br>')
    return `<div id="render-${this.id}">
            <h2>${this.title}</h2>
            <p>${this.body}</p>
            <button class="deleteNote" id="${this.id}">Delete</button>
            <button class="editNote" id="${this.id}">Edit</button>
            </div>`
    }

    renderAll() {
      return `<a href="#"><p id="${this.id}">${this.title}</p></a>`
      }

    renderUser() {
        return `<h1 id="${this.user.id}>${this.user.name}</h1>`
      }

    renderForm() {
        return ` <form class="editNoteForm" id="${this.id}">
                    <h2>Edit Your Note</h2>
                    <label>Title</label>
                    <br>
                    <input type="text" id="editNoteTitle" placeholder="${this.title}">
                    <br>
                    <label>Body</label>
                    <br>
                    <input type="text" id="editNoteBody" placeholder="${this.body}">
                    <br>
                    <input type="submit" id="noteSubmitButton" data-id="${this.id}"></input>
                    <br>
                  </form>`
      }
}
