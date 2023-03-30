import fs from "fs";
import path from "path";
import general from "../html/general.js";

export default async function getNoteList(type) {
    let noteList;
    switch (type) {
      case "terminal-commands":
        noteList = await generateNoteList(general.terminalCommandsPath);
        break;
      case "code-snippets":
        noteList = await generateNoteList(general.codeSnippetsPath);
        break;
      case "theory":
        noteList = await generateNoteList(general.theoryPath);
        break;
      case "tools":
        noteList = await generateNoteList(general.toolsPath);
        break;
      default:
        throw new Error(`Unknown note type: ${type}`);
    }
    return noteList;
  }
  
  
  
  

  async function generateNoteList(type){
    const directoryPath = type;
    const noteList = [];
    try {
    const files = await fs.promises.readdir(directoryPath);
    const markdownFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');
    let remainingFiles = markdownFiles.length;
    if(remainingFiles === 0){
    return null;
    }
    for (const file of markdownFiles) {
    const filePath = path.join(directoryPath, file);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const lines = data.split('\n');
    const id = getId(file);
    const name = getName(lines[0]);
    const content = getContent(data);
    const tempNote = {
    id: id,
    name: name,
    content: content
    };
    noteList.push(tempNote);
    remainingFiles--;
    if (remainingFiles === 0) {
    return noteList;
    }
    }
    } catch (err) {
    console.log('Unable to read directory: ' + err);
    return null;
    }
    }

function getId(data){
    let result = data.slice(0, -3);
    result = result.slice(4);
    return result;
}
function getName(data) {
    const segment = "# ";
    const index = data.indexOf(segment);
    if (index !== -1) {
    return data.substring(index + segment.length);
    }
    return data;
    }
    
function getContent(data){
    const result = data;
    return result;
}



