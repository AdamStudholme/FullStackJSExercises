import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('Enter name here');

  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => setPersons(initalPersons))
  }, [])

  const clearDefault = (event) => {
    event.preventDefault()
    if (newFilter === 'Enter name here') setFilter("");
  }

  let filterRegex = new RegExp(newFilter, "i");
  let visiblePersons = (newFilter === 'Enter name here' || newFilter.trim() === "")
    ? persons
    : persons.filter(({ name }) => name.match(filterRegex));

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSaveDetails = (event) => {
    event.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (persons.map(person => person.name).includes(newName))
      {
        if(confirm(`${newName} already exists in your phonebook. Would you like to replace the old number with a new one?`)){
          
          const personUpdating = persons.filter( p => p.name === newName)
          console.log(personUpdating);
          
          personService
            .update(personUpdating[0].id, personObj)
            .then(updatedPerson => setPersons(persons.map(person => person.name !== updatedPerson.name ? person : updatedPerson)))
        }
      };   

    personService
      .create(personObj)
      .then(newPerson => { setPersons(persons.concat(newPerson)) })
    setNewName("");
    setNewNumber("");
  }

  const handleDelete = (person) => {
    if (confirm(`Would you like to delete ${person.name}?`)) {

      personService
        .remove(person)
        .then(confirmation => confirmation)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterChangeHandler={handleFilterChange} clearDefaultHandler={clearDefault} />
      <h2>Add New Contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange} saveDetailsHandler={handleSaveDetails} />
      <h2>Numbers</h2>
      <Contacts persons={visiblePersons} deleteHandler={handleDelete} />
    </div>
  )
}

export default App

