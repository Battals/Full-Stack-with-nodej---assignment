export default async function sortNotes(noteList) {
  noteList.sort((a, b) => a.id - b.id);
  return noteList;
}
