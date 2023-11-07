import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';


const App = () => {

  useEffect(() =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  },[])

  const [persons, setPersons] = useState([])  
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

