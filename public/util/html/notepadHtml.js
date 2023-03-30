import showdown from "showdown";
const converter = new showdown.Converter();

import sortNotes from "../dataAccess/sortNotes.js";

import getNote from "../dataAccess/getNote.js";
import getNoteList from "../dataAccess/getNotelist.js";

async function getNotepadHtml(type, id) {
  switch (type) {
    case "terminal-commands":
      return await getTerminalCommands(type, id);
    case "code-snippets":
      return await getCodeSnippets(type, id);
    case "theory":
      return await getTheory(type, id);
    case "tools":
      return await getTools(type, id);
  }
}

async function getTerminalCommands(type, id) {
  if (id != null) {
    return await notepadHTMLWithNote(type, id);
  } else {
    return await notepadHtml(type);
  }
}
async function getCodeSnippets(type, id) {
  if (id != null) {
    return await notepadHTMLWithNote(type, id);
  } else {
    return await notepadHtml(type);
  }
}
async function getTheory(type, id) {
  if (id != null) {
    return await notepadHTMLWithNote(type, id);
  } else {
    return await notepadHtml(type);
  }
}
async function getTools(type, id) {
  if (id != null) {
    return await notepadHTMLWithNote(type, id);
  } else {
    return await notepadHtml(type);
  }
}

async function notepadHtml(type) {
  let htmlContent = ``;
  const htmlContentTitle = getPageTitle(type);
  const noteList2 = await getNoteList(type);
  if (noteList2 === null) {
    return `
        <div id="notelist-page">
            <div id="notelist-table">
                <h1>${htmlContentTitle}</h1>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td>No notes found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        `;
  }
  const noteList = await sortNotes(noteList2);

  htmlContent += `
    <div id="notelist-page">
            <div id="notelist-table">
                <h1>${htmlContentTitle}</h1>
                <div class="table-responsive">
                    <table class="table table-hover" style="cursor: pointer;">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                            </tr>
                        </thead>
                    <tbody>
    `;
  noteList.forEach((object) => {
    htmlContent += `
        <tr onclick="test('${type}', ${object.id})">
            <th scope="col">${object.id}</th> 
            <td>${object.name}</td>
        </tr> 
        `;
  });
  htmlContent += `
                </tbody>
            </table>
        </div>
    </div>
    `;
  return htmlContent;
}

async function notepadHTMLWithNote(type, id) {
  let htmlContent = ``;

  const noteList2 = await getNoteList(type);
  const noteList = await sortNotes(noteList2);
  const notepad = await getNote(type, id);

  const htmlContentTitle = getPageTitle(type);

  htmlContent += `
    <div id="notelist-page">
            <div id="notelist-table">
                <h1>${htmlContentTitle}</h1>
                <div class="table-responsive">
                    <table class="table table-hover" style="cursor: pointer;">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                            </tr>
                        </thead>
                    <tbody>
    `;
  noteList.forEach((object) => {
    htmlContent += `
        <tr onclick="test('${type}', ${object.id})">
            <th scope="col">${object.id}</th> 
            <td>${object.name}</td>
        </tr> 
        `;
  });
  htmlContent += `
                </tbody>
            </table>
        </div>
    </div>
    `;

  // Notepad
  htmlContent += `
    <div id="notepad-container">
        <div class="container border">
            <div id="notepad">
                <p id="notepad-test">
                    ${await readMarkdownToHtml(notepad.content)}
                </p>
            </div>
        </div>
        <div class="container my-4">
        <div class="btn-group" role="group" aria-label="Basic button group">
            <form id="delete-form" method="DELETE" action="/notepad/${type}/${
    notepad.id
  }">
                <button class="btn btn-primary">DELETE</button>
            </form>
            <button class="btn btn-primary" onclick="window.location.replace('http://localhost:8080/update-note/${type}/${
    notepad.id
  }')">EDIT</button>
            <button class="btn btn-primary">SAVE</button>
        </div>
        </div>
    </div>
    `;

  htmlContent += `
    <script>
    const form = document.getElementById('delete-form');
    form.addEventListener('submit', (event) => {
    window.location.replace('http://localhost:8080/notepad/${type}')
    event.preventDefault();
    const url = form.getAttribute('action');
    const method = 'DELETE';
    fetch(url, { method })
      .then(response => {
        if (response.ok) {
          console.log('File deleted successfully!');
          // perform any necessary actions after file deletion
        } else {
          console.error('Error deleting file:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
      window.location.replace('http://localhost:8080/notepad/' + type )
  });
</script>
    `;
  return htmlContent;
}

function getPageTitle(type) {
  switch (type) {
    case "terminal-commands":
      return "Terminal Commands Notes";
    case "code-snippets":
      return "Code Snippet Notes";
    case "tools":
      return "Tools Notes";
    case "theory":
      return "Theory Notes";
  }
}

async function readMarkdownToHtml(text) {
  const html = converter.makeHtml(text);
  return html;
}

export default {
  getNotepadHtml,
};
