import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Quote from "./Quote";
import "./App.css";
import useGetQuote from "./hooks/useGetQuote";


function App() {
  const [counter, setCounter] = useState(0);

  const currentQuote = useGetQuote();

  return (
    <>
      {currentQuote ? <Quote quoteData={currentQuote} /> : <p>Waiting...</p>}

      <h2>{counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </>
  );
}

export default App;
