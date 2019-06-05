import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const getRanNum = () => {
        return Math.floor(Math.random() * 5)
    }
    const handleSelected = () => {
        setSelected(getRanNum())
    }
    const handleVote = () => {
        props.votes[selected]++
        refresh()
    }
    var mostVotes = () => {
        var result = 0
        var i;
        for(i=0; i<=5; i++){
            if(props.votes[i]>props.votes[result])
            result = i
        }
        return result
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <br />
            <Votes votes = {props.votes[selected]} />
            <Button handleClick={handleVote} text='vote' /> 
            <Button handleClick={handleSelected} text='next' />  
            <br />
            <h1>Anecdote with most votes</h1>
            {anecdotes[mostVotes()]}
            <Votes votes = {props.votes[mostVotes()]} />
        </div>
    )
}

const Votes = (props) => {
    return (
        <div>
            has {props.votes} votes
        </div>
    )
}

const Button = ({ handleClick, text }) => (  
    <button onClick={handleClick}>    
      {text}  
    </button>
  )

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = [0,0,0,0,0,0]

const refresh = () => {
    ReactDOM.render(
        <App anecdotes={anecdotes} votes={votes} />,
        document.getElementById('root')
      )
}

refresh()
