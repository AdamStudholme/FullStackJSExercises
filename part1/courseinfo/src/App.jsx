//Header Component
const Header = ({course}) => <h1>{course}</h1>  

//Part Component
const Part = props => {
  console.log(props)
  return(
    <p>
      {props.part} {props.exercise}
    </p> 
  )
}

// Content Component, comprising of several Parts
const Content = ({parts}) => {
  
  return(<>
      <Part part={parts[0].name} exercise={parts[0].exercises}/>
      <Part part={parts[1].name} exercise={parts[1].exercises}/>
      <Part part={parts[2].name} exercise={parts[2].exercises}/>
     </>
   )
}

// To run console.log props must be used in the Component definition. It cannot be destructured like above components
const Total = props => {
  console.log(props)
    return(
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    
    )
 }


const App = () => {
  // Course is defined in an Object which can be passed into the components
  const course = {
      name: 'Half Stack application development',
      parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
