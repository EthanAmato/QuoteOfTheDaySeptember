import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currentQuote, setCurrentQuote] = useState();


  const [counter, setCounter] = useState(0)

  // useEffect will help us call a callback upon changes to a value
  // and also synchronize our component to events outside of the component (apis, other DOM nodes, etc.)

  // The callback in the first input arg will be called upon first render or whenever react
  // senses a change in a value/state inside of our dependency array
  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_KEY
      }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      setCurrentQuote(data)
    })

  }, [])



  return (
    <>
     <h1>Hello, World</h1>
     <p>Extra text</p>
     <a href='https://google.com'>Link to google</a>

      {currentQuote ? <p>{currentQuote[0].quote}</p> : <p>Waiting...</p>}

     <h2>{counter}</h2>
     <button onClick={() => setCounter(counter+1)}>Increment</button>
    </>
  )
}

export default App
