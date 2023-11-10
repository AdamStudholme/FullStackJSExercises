import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('Enter name here');
  const [message, setMessage] = useState(null);  
  const [notificationClass, setNotificationClass] = useState('success');

  //use the person service to make call to the server and fetch the names already saved. useEffect is trigger on completion of render
  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => setPersons(initalPersons))
  }, [])

  const clearDefault = (event) => {
    event.preventDefault()
    if (newFilter === 'Enter name here') setFilter("");
  }

  //Regex for the filtering of names displayed
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

  // Saving new contact details
  const handleSaveDetails = (event) => {
    event.preventDefault()

    if(newName.trim() == "" || newNumber.trim() == ""){
      alert("Please complete details in form")
      
    } else{

    const personObj = {
      name: newName,
      number: newNumber,
    }

    // If person is in phone book ask if an update is required
    if (persons.map(person => person.name).includes(newName)) {
      if (confirm(`${newName} already exists in your phonebook. Would you like to replace the old number with a new one?`)) {
        const personUpdating = persons.filter(p => p.name === newName);

        // personService update called. Server is updated and returned updated value is pushed to the screen
        personService
          .update(personUpdating[0].id, personObj)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name !== updatedPerson.name ? person : updatedPerson));
            setMessage(`${personObj.name} successfully updated`);
            setNotificationClass('success');
          })
          .catch(error => {
            setMessage(`${personObj.name} has already been removed from the server`);
            setNotificationClass('error');
          }
          )
      }
    } else {
      // If person doesn't exist post the new details to the server
      personService
        .create(personObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setMessage(`${personObj.name} successfully created`);
          setNotificationClass('success');
        })
        .catch(error => {
          setMessage(`${personObj.name} has already been removed from the server`);
          setNotificationClass('error');
        })
      // updates displayed contacts
      setNewName(""); // sets form back to ""
      setNewNumber("");

    }
    setTimeout(() => { setMessage(null) }, 5000);
  }
  }

  const handleDelete = (person) => {
    if (confirm(`Would you like to delete ${person.name}?`)) {
      //Calls the remove method from the personService module.
      personService
        .remove(person)
        .then(confirmation => confirmation)
        .catch(error => {
          setMessage(`${person.name} has already been removed from the server`);
          setNotificationClass('error');
        })
      setPersons(persons.filter(p => p.id !== person.id)) // Updates displyed contacts
    }
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} class={notificationClass} />
      <Filter newFilter={newFilter} filterChangeHandler={handleFilterChange} clearDefaultHandler={clearDefault} />
      <h2>Add New Contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange} saveDetailsHandler={handleSaveDetails} />
      <h2>Numbers</h2>
      <Contacts persons={visiblePersons} deleteHandler={handleDelete} />
    </div>
  )
}

export default App

