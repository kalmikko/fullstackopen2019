import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlegoodClick = () => {
    setGood(good + 1)
  }
  const handleneutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handlebadClick = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>
          give feedback
      </h1>
      <Button handleClick={handlegoodClick} text='good' />  
      <Button handleClick={handleneutralClick} text='neutral' />  
      <Button handleClick={handlebadClick} text='bad' />
      <Statistics gNum={good} nNum={neutral} bNum={bad} />  
    </div>
  )
}

const Statistics = (props) => {
    if(props.gNum === 0 && props.nNum === 0 && props.bNum === 0){
        return (
            <div>
                <p>
                    No feedback given
                </p>
            </div>
        )
    }

    const allClicks = () => (props.gNum + props.nNum + props.bNum)
    const averageClicks = () => ((props.gNum - props.bNum)/allClicks())
    const positivePercent = () => ((props.gNum / allClicks())*100)

    return (
        <>
        <h1>statistics</h1>
        <table>
            <tbody>
                <tr>
                    <td>good</td> 
                    <td>{props.gNum}</td>
                </tr>
                <tr>
                    <td>neutral</td> 
                    <td>{props.nNum}</td>
                </tr>
                <tr>
                    <td>bad</td> 
                    <td>{props.bNum}</td>
                </tr>
                <tr>
                    <td>all</td> 
                    <td>{allClicks()}</td>
                </tr>
                <tr>
                    <td>average</td> 
                    <td>{averageClicks()}</td>
                </tr>
                <tr>
                    <td>positive</td> 
                    <td>{positivePercent()} %</td>
                </tr>
            </tbody>    
        </table>
        </>
    )
}

const Button = ({ handleClick, text }) => (  
    <button onClick={handleClick}>    
      {text}  
    </button>
  )

ReactDOM.render(<App />, 
  document.getElementById('root')
)