import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({clickHandler , text}) => <button style={{marginRight: 10}} onClick={clickHandler}>{text}</button>

//StatsLine helps format stats into a table
const StatsLine = ({text, stat}) => <tr><td>{text}:</td><td>{stat}</td></tr>

//Stats Component handles the calculations
const Stats = (props) => {
  console.log(props)
   const positivePercentage = (Math.round((((props.good/props.all)*100)+ Number.EPSILON)*100)/100 + ' %')
  let average 
  
  //Prevent a divide by zero error.
  props.all === 0 ? average = 0 : average = (props.good - props.bad)/props.all
  console.log(average)

  //Round average score to 3 decimal places
  average = Math.round((average + Number.EPSILON)*1000)/1000

  // Conditional rendering. If there are no votes display text. Otherwise display stats
  if(props.good + props.neutral + props.bad === 0) {
    return(
    <p>Currently there are no ratings.</p>)
    }
    return (<table>
      <tbody>
        <StatsLine text='Good' stat={props.good}/>
        <StatsLine text='Neutral' stat={props.neutral}/>
        <StatsLine text='Bad' stat={props.bad}/>
        <StatsLine text='All' stat={props.all}/>
        <StatsLine text='Average' stat={average}/>
        <StatsLine text='Positive' stat={positivePercentage}/>
      </tbody>
    </table>)
}


const App = () => {
  const [good, setGood] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad , setBad ] = useState(0)
  const [total, setTotal] = useState(0)
  
  const handleGoodClick = () => {
    const updatedClick = good + 1
    setGood(updatedClick)
    setTotal(total + 1)
  }

  const handleNeutralClick = () => {
    const updatedClick = neutral + 1
    setNeutral(updatedClick)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    const updatedClick = bad + 1
    setBad(updatedClick)
    setTotal(total + 1)
  }
  
  return(
    <div>
      <Title title='Give Feedback'/>
      <Button clickHandler={handleGoodClick} text='Good' />
      <Button clickHandler={handleNeutralClick} text='Neutral' />
      <Button clickHandler={handleBadClick} text='Bad' />
      <Title title='Statistics'/>      
      <Stats good={good} neutral={neutral} bad={bad} all={total}/>
    </div>
  )
}

export default App
