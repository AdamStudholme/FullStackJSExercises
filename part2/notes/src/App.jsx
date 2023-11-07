import Note from "./components/Note"
import { useState, useEffect } from "react"
import noteService from './services/notes'


// const promise2 = axios.get('http://localhost:3001/foobar') // Comes back with rejected as web address doesn't exist.
// console.log(promise2)

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleNoteChange = (event) => { // Handles any changes to the input field updating the newNote state
    console.log(event.target.value)
    setNewNote(event.target.value)
  };
  /*
   // To make the useEffect() clearer seperate the effect function
 
   const hook = () =>{
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);        
      })    
  }

  useEffect(hook, []); // You can see clearly now that the useEffect takes two parameters. 
  //The first is a function (the effect) which by default runs after the component has been rendered
  //However we only want it to run on first render, this is controlled by the empty array.
*/

  //-- Above can be simplified to
  useEffect(() => {
    noteService // Now the erver methods are imported from the services module
      .getAll()
      .then(response => {
        setNotes(response.data)
        console.log(notes);
      })
    // console.log('effect');
    // axios
    // .get('http://localhost:3001/notes')
    // .then(response =>{
    //   console.log('promise fulfilled');
    //   setNotes(response.data);          
    // }) 
  }, [])

  const notesToShow = showAll
    ? notes // If true show all notes
    : notes.filter(note => note.important); //If false only show important notes

  const addNote = (event) => {
    event.preventDefault() // Prevents default action for a button click on submit. Prevents page reload among other things
    //console.log('button clicked', event.target) // the event.target stores the target of the event, in this case the form.

    const noteObject = {      // Create object representing a new note
      content: newNote,
      important: Math.random() < 0.5, // Randomly decide if its true or false
    };

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response =>{
    //     console.log(response);
    //     setNotes(notes.concat(response.data)); // Add note to the notes
    //     setNewNote(''); // Set new note back to empty string        
  }



  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id); // Find the note with the matching id
    const changedNote = { ...note, important: !note.important } // This object spread syntax allows you create a copy and just edit the one property 
    //of the note object without having to type it all out

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data)) // Map changed data to displayed notes
      })
  }


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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
