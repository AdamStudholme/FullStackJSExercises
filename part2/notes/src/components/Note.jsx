const Note = ({ note , toggleImportance }) => {
  const label = note.important ? 'Make Unimportant' :'Make Important';

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

export default Note