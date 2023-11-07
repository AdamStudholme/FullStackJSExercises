
const PersonForm = (props) =>{
    return (
    <form>
        <div>
        Name: <input value={props.newName} onChange={props.nameChangeHandler} />
        </div>
        <div>
        Number: <input value={props.newNumber} onChange={props.numberChangeHandler} />
        </div>
        <div>
        <button type="submit" onClick={props.saveDetailsHandler} >add</button>
        </div>
  </form>)
}

export default PersonForm
