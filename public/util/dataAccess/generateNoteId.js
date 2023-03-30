import sortNotes from "./sortNotes.js";

const generateNoteId = async (notes) => {
  const sortedNotes = await sortNotes(notes);
  for (let i = 0; i < sortedNotes.length; i++) {
    const note = sortedNotes[i];
    if (note.id !== i + 1) {
      return i + 1;
    }
  }
  return sortedNotes.length + 1;
};

export default generateNoteId;
