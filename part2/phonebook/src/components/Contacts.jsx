
const Contacts = ({persons, deleteHandler}) =>{
   return (persons.map(person => 
        <p key={person.id}> {person.name} {person.number} <button onClick={()=> deleteHandler(person)}>Delete Contact</button> </p> 
        ))
}

export default Contacts