import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>;

const Button = ({clickHandler, text}) => <button style={{marginRight: 10}} onClick={clickHandler}>{text}</button>;

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>Number of votes: {votes}</p>
    </> )
};


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  //Set useState to an array of zeros of length anecdotes. This will store store to corrisponding votes
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const [highestVoted, setHighestVoted] =useState(0); // To store index of highest voted anecdote
  
  //Generates a random number between 0 and length of anecdotes - 1, which will enable selection of anecdotee
  const nextClickHandler = () => {
    setSelected(Math.floor(Math.random()* anecdotes.length));
  };

  const voteClickHandler =() =>{
    const newVotes =[...votes]; // Makes copy of votes and mutates the copy. This is then passed into the setter function
    newVotes[selected] += 1; // add one to the current anecdotes vote count

  // Checks if vote count for current anecdote is higher than current top voted
  // If it is it changes the saved index for top voted
    if(newVotes[selected] > votes[highestVoted]){
      setHighestVoted(selected)};
    
    setVotes(newVotes);
  };

  return (
    <div>
      <Header text='Anecdote of the Day' />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/> 
      <Button clickHandler={voteClickHandler} text='vote'/>
      <Button clickHandler={nextClickHandler} text='Next Anecdote'/>
      <Header text='Anecdote with Most Votes'/>
      <Anecdote anecdote={anecdotes[highestVoted]} votes={votes[highestVoted]}/> 
    </div>
  )
};

export default App

