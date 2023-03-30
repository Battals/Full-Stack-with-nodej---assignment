import getNoteList from "./getNotelist.js";

const getNote = async (type, id) => {
    const noteList = await getNoteList(type);
    return noteList.find(note => parseInt(note.id) === id);
};

export default getNote;
