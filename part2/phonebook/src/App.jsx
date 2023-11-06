import { useState } from 'react'
import Contacts from './components/Contacts';
import Form from './components/Form';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('Enter name here');

 
  const handleFilterChange = (event) => {
    setFilter(event.target.value);       
  }  

  const clearDefault = (event) => {
    event.preventDefault()
    if(newFilter === 'Enter name here') setFilter("");
  }
  /* --- Removed and put in Form Component
   const  handleNameChange = (event) =>{
    setNewName(event.target.value);
  }
  const  handleNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }

  const saveDetails = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) 
      return alert(`${newName} is already in the phone book`);
    const personObj ={
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  }
  */
  let filterRegex = new RegExp(newFilter, "i");
  let visiblePersons = (newFilter === 'Enter name here' || newFilter.trim() === "") 
    ? persons 
    : persons.filter(({name}) => name.match(filterRegex));
  
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          Filter by: <input value={newFilter} onClick={clearDefault} onChange={handleFilterChange} />
        </div>        
      <h2>Add New Contact</h2>
        <Form 
          setNewName={setNewName} 
          setNewNumber={setNewNumber} 
          newName={newName} 
          newNumber={newNumber} 
          persons={persons} 
          setPersons={setPersons}/>
        {/* <form> --- Put in form component
          <div>
            Name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            Number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={saveDetails} >add</button>
          </div>
        </form> */}
      <h2>Numbers</h2>
        <Contacts persons={visiblePersons}/>
  </div>
  )
}

export default App

