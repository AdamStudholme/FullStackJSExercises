
const Form = (props) =>{
    const  handleNameChange = (event) =>{
        props.setNewName(event.target.value);
      }
      const  handleNumberChange = (event) =>{
        props.setNewNumber(event.target.value);
      }

    const saveDetails = (event) => {
        event.preventDefault()
        if(props.persons.map(person => person.name).includes(props.newName)) 
          return alert(`${prop.newName} is already in the phone book`);
        const personObj ={
          name: props.newName,
          number: props.newNumber,
          id: props.persons.length + 1
        }
        props.setPersons(props.persons.concat(personObj));
        props.setNewName("");
        props.setNewNumber("");
    }

    return (
    <form>
        <div>
        Name: <input value={props.newName} onChange={handleNameChange} />
        </div>
        <div>
        Number: <input value={props.newNumber} onChange={handleNumberChange} />
        </div>
        <div>
        <button type="submit" onClick={saveDetails} >add</button>
        </div>
  </form>)
}

export default Form
