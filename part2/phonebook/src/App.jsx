import { useState } from 'react'
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';


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

  const clearDefault = (event) => {
    event.preventDefault()
    if(newFilter === 'Enter name here') setFilter("");
  }

  let filterRegex = new RegExp(newFilter, "i");
  let visiblePersons = (newFilter === 'Enter name here' || newFilter.trim() === "") 
    ? persons 
    : persons.filter(({name}) => name.match(filterRegex));
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);       
  }  
   const  handleNameChange = (event) =>{
    setNewName(event.target.value);
  }
  const  handleNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleSaveDetails = (event) => {
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
  
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} filterChangeHandler={handleFilterChange} clearDefaultHandler={clearDefault}/>
      <h2>Add New Contact</h2>
       <PersonForm newName={newName} newNumber={newNumber} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange} saveDetailsHandler={handleSaveDetails}/>
      <h2>Numbers</h2>
        <Contacts persons={visiblePersons}/>
  </div>
  )
}

export default App

