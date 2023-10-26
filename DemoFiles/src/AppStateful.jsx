import { useState } from "react"


/*-------------------------Stateful Intro ---------------------------
const Display = ({counter}) =>  <div>{counter}</div>
 
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter +1)}
  const resetToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)}
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter -1)}

  return ( 
    <div>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="Plus" />
      <Button handleClick={decreaseByOne} text="Minus" />
      <Button handleClick={resetToZero} text="Reset" />
    </div>

  )
}



// ---------------------Complex States ------------------------

const App = () =>{
const [ clicks, setClicks ] = useState(
  {left: 0, right: 0})


  // ...clicks is object spread syntax, it allows the object to be copied with the same properties
  //except those defined.

  const handleLeftClick = () =>setClicks({...clicks, left: clicks.left + 1})
  const handleRightClick = () =>setClicks({...clicks, right: clicks.right + 1})
  
  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
*/

const History = ({ allClicks }) =>{
  if(allClicks.length === 0){
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  } // the histroy component is an example of contional rendering

  return (
    <div>
      Button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [ right, setRight ] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L')) 
    //setLeft(left +1)   
    // Must use concat rather than push as you should not mutate an object directly. Instead you should create a copy.
    //setTotal(left + right)
    const updatedLeft = left +1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }
  
  const handleRightClick = () => {
    
    setAll(allClicks.concat('R'))
    //setTotal(left + right) // This would actually return a value one less than total count due to Asyncronosity
    //setRight(right +1)
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(updatedRight + left)
  }

 return(
  <div>
    {left}
    <Button handleClick={handleLeftClick} text='Left'/>
    <Button handleClick={handleRightClick} text='Right'/>
    {right}
    <History allClicks={allClicks}/>
    <p>Click Total: {total}</p>
  </div>
)
}

export default App
