/*
const App = () =>  {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a+b); 

  console.log('Hello from component')
  return (   
      <div>
        <p>
          Hello World it's {now.toString()}
        </p>
        <p>
          {a} + {b} = {a +b}
        </p>
      </div>     
    )
  }
  

const Hello = (props) =>{
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

//You can use this newly defined componenet "Hello" inside the App component
const App = () =>{
const name = 'Peter'
const age = 30

  return(
    <div>
      <h1>Greetings</h1>
      <Hello  name='George' age={27} /> 
      <Hello  name='Daisy' age={27 +7}/> 
      <Hello  name={name} age={age}/> 
      <Hello /> 
    </div>
  )
}

const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}


// ------------- Destructuring ---------------------
//const Hello = (props) to:
const Hello = ({name, age}) => {

  // const name = props.name
  // const age = props.age 
  //  Shortens to:
      //const { name, age} = props
  // const bornYear = () => {
  //   const yearNow = new Date().getFullYear()
  //   return yearNow - age
  // } Shortens to:

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
  }
*/

App

export default App
