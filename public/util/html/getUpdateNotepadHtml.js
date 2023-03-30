import showdown from "showdown";
const converter = new showdown.Converter();

import getNote from "../dataAccess/getNote.js";

export default async function getUpdateNoteHtml(type, id) {
  const notepad = await getNote(type, id);
  let htmlContent = `
    <div>
    <h1>Update Note</h1>
    </div>
    `;
  htmlContent += `
    <form method="POST" action="">
        <input type="hidden" name="type" value="${type}">
        <input type="hidden" name="id" value="${id}">
        <div class="col-md-14">
            <textarea name="updateNoteInput" id="updateNoteInput" class="form-control notepad-input" placeholder="">${notepad.content}</textarea>
        </div>
    <button type="submit" class="btn btn-primary">Save</button>
    </form>
    `;
  return htmlContent;
}
