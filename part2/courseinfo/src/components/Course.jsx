//Header Component
const Header = ({course}) => <h1>{course}</h1>  

//Part Component
const Part = props => {
  console.log(props);
  return(
    <p>
      {props.part} {props.exercises}
    </p> 
  );
};

// Content Component, comprising of several Parts
const Content = ({parts}) => {
  
 const mappedParts = parts.map( part =>
    <Part key={part.id} part={part.name} exercises={part.exercises}/>
  )
   return mappedParts;
};

// To run console.log props must be used in the Component definition. It cannot be destructured like above components
const Total = props => {
  console.log(props);
  const {parts} = props;
  const total = parts.map( part => part.exercises) // Map to just an array of exercise count
                    .reduce((part, total) => part + total, 0); // Reduce the array to sum the count total
      return(
      <h2>Number of exercises {total} </h2>    
    );
 };

 // Course Component
 const Course = ({course}) =>
  {
return (<>
  <Header course={course.name}/>
  <Content parts={course.parts}/>
  <Total parts={course.parts}/>
  </>)

}
export default Course
