import Note from "./components/Note"
import { useState } from "react"

const App = (props) => {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );
  const [showAll, setShowAll] = useState(true);
  
  const handleNoteChange = (event) => { // Handles any changes to the input field updating the newNote state
    console.log(event.target.value)
    setNewNote(event.target.value)
  };

  const notesToShow = showAll 
  ? notes // If true show all notes
  : notes.filter(note => note.important); //If false only show important notes

  const addNote = (event) => {
    event.preventDefault() // Prevents default action for a button click on submit. Prevents page reload among other things
    console.log('button clicked', event.target) // the event.target stores the target of the event, in this case the form.
    
    const noteObject = {      // Create object representing a new note
      content: newNote,
      important: Math.random() < 0.5, // Randomly decide if its true or false
      id: notes.length + 1,
    }; 

    setNotes(notes.concat(noteObject)); // Add note to the notes
    setNewNote(''); // Set new note back to empty string
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

export default App;
